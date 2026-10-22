#!/usr/bin/env python3
"""Extract and matte video frames into public/frames/{lg,sm}.

Requires ffmpeg/ffprobe, Python packages: rembg, onnxruntime, pillow, numpy,
scipy, opencv-python. Usage: python scripts/process_video.py video.mp4
The source footage and resume are intentionally not bundled; supply your own files.
"""
from __future__ import annotations
import json, subprocess, sys, re
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
import cv2
from rembg import remove, new_session

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "frames"
FULL = ROOT / "tmp" / "full"
VIRTUAL = (1600, 900)
BG = 247

def run(args):
    return subprocess.run(args, check=True, text=True, capture_output=True).stdout

def scene_cuts(video: str):
    cmd = ["ffmpeg", "-i", video, "-vf", "select='gte(scene,0)',metadata=print", "-an", "-f", "null", "-"]
    p = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    scores = []
    for line in p.stderr.splitlines():
        if "lavfi.scene_score" in line:
            m = re.search(r"lavfi\.scene_score=([0-9.]+)", line)
            if m and float(m.group(1)) >= .30:
                scores.append(float(m.group(1)))
    return scores

def connected_mask(mask: np.ndarray) -> np.ndarray:
    opened = ndimage.binary_opening(mask, structure=np.ones((3,3), dtype=bool))
    labels, count = ndimage.label(opened)
    sizes = np.bincount(labels.ravel())
    keep = sizes > 4000
    keep[0] = False
    return ndimage.binary_dilation(keep[labels], iterations=4).astype(np.float32)

def process_frame(path: Path, session):
    image = Image.open(path).convert("RGB").resize(VIRTUAL, Image.Resampling.LANCZOS)
    rgb = np.asarray(image).astype(np.float32)
    # Human mask from the requested U2Net human segmentation model.
    person = remove(image, session=session, only_mask=True)
    pm = np.asarray(person.convert("L"), dtype=np.float32) / 255.0
    corners = np.concatenate([rgb[:40,:40].reshape(-1,3), rgb[:40,-40:].reshape(-1,3),
                              rgb[-40:,:40].reshape(-1,3), rgb[-40:,-40:].reshape(-1,3)])
    bg = np.median(corners, axis=0)
    distance = np.max(np.abs(rgb - bg[None,None,:]), axis=2)
    props = np.clip((distance - 14) / (40 - 14), 0, 1)
    props = connected_mask(props > .12)
    alpha = np.maximum(pm, props)
    alpha_img = Image.fromarray(np.uint8(np.clip(alpha*255,0,255))).filter(ImageFilter.GaussianBlur(.8))
    a = np.asarray(alpha_img).astype(np.float32) / 255.0
    valid = a > .05
    for c in range(3):
        channel = rgb[:,:,c]
        channel[valid] = (channel[valid] - (1-a[valid])*BG) / np.maximum(a[valid], .05)
        rgb[:,:,c] = np.clip(channel,0,255)
    # Conservative erosion removes the pale source-background fringe.
    min_alpha = np.asarray(Image.fromarray(np.uint8(a*255)).filter(ImageFilter.MinFilter(3))).astype(np.float32)/255
    a = .35*a + .65*min_alpha
    a = np.clip((a-.14)/.86,0,1)**1.4
    lum = .2126*rgb[:,:,0] + .7152*rgb[:,:,1] + .0722*rgb[:,:,2]
    edge = a < .95
    a[edge] *= 1 - .8*np.clip((lum[edge]-150)/70,0,1)
    rgba = np.dstack([np.uint8(np.clip(rgb,0,255)), np.uint8(np.clip(a*255,0,255))])
    return Image.fromarray(rgba, "RGBA")

def main(video):
    FULL.mkdir(parents=True, exist_ok=True)
    OUT.joinpath("lg").mkdir(parents=True, exist_ok=True)
    OUT.joinpath("sm").mkdir(parents=True, exist_ok=True)
    run(["ffmpeg", "-y", "-i", video, "-start_number", "0", str(FULL / "f%03d.png")])
    frames = sorted(FULL.glob("f*.png"))
    if not frames:
        raise RuntimeError("ffmpeg extracted no frames")
    # Cut detection is also emitted for review; edit boundaries if the source has more/less than four shots.
    scores = scene_cuts(video)
    print(f"Detected scene scores >= .30: {len(scores)}; expected approximately four shots.")
    session = new_session("u2net_human_seg")
    processed = []
    for i, p in enumerate(frames):
        if i % 25 == 0: print(f"Matting {i+1}/{len(frames)}")
        processed.append(process_frame(p, session))
    # Four equal temporal shots are a safe initial segmentation; review cuts.json and adjust when needed.
    bounds = [round(i*len(frames)/4) for i in range(5)]
    shots = []
    for si in range(4):
        start, end = bounds[si], max(bounds[si]+1, bounds[si+1])
        union = Image.new("L", VIRTUAL, 0)
        for im in processed[start:end]:
            union = Image.fromarray(np.maximum(np.asarray(union), np.asarray(im.getchannel("A"))))
        bbox = union.getbbox() or (0,0,*VIRTUAL)
        x0,y0,x1,y1 = bbox
        # Person centre from alpha-weighted x in top 45% of the shot; table is excluded by upper-body crop.
        weights = np.zeros((VIRTUAL[1], VIRTUAL[0]), dtype=np.float64)
        for im in processed[start:end]:
            a = np.asarray(im.getchannel("A"), dtype=np.float64)
            weights[:int(VIRTUAL[1]*.45)] += a[:int(VIRTUAL[1]*.45)]
        weights[:, :x0] = 0; weights[:, x1:] = 0
        yy,xx = np.indices(weights.shape)
        cx = float((xx*weights).sum() / max(weights.sum(),1) / VIRTUAL[0])
        shots.append({"from": start, "to": end-1, "box":[x0,y0,x1-x0,y1-y0], "cx":cx})
        for idx in range(start,end):
            crop = processed[idx].crop(bbox)
            crop.save(OUT/"lg"/f"f{idx:03d}.webp", "WEBP", quality=80, alpha_quality=90, method=6)
            crop.resize((max(1,crop.width//2),max(1,crop.height//2)),Image.Resampling.LANCZOS).save(OUT/"sm"/f"f{idx:03d}.webp","WEBP",quality=78,alpha_quality=90,method=6)
    (OUT/"manifest.json").write_text(json.dumps({"w":1600,"h":900,"count":len(frames),"shots":shots},indent=2))
    (ROOT/"tmp"/"scene_scores.txt").write_text("\n".join(map(str,scores)))
    print("Frames complete. Inspect on red before shipping; adjust shot boundaries to actual detected cuts.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/process_video.py video.mp4")
    main(sys.argv[1])