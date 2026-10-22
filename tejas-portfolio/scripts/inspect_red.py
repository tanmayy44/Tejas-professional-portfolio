"""Composite sample transparent frames over red to inspect fringe artifacts."""
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
frames=sorted((ROOT/"public/frames/lg").glob("f*.webp"))
if not frames: raise SystemExit("No processed frames. Run process_video.py first.")
out=ROOT/"tmp/red_checks"; out.mkdir(parents=True,exist_ok=True)
for idx in sorted(set([0,len(frames)//4,len(frames)//2,3*len(frames)//4,len(frames)-1])):
    im=Image.open(frames[idx]).convert("RGBA")
    bg=Image.new("RGBA",im.size,(255,0,0,255)); bg.alpha_composite(im)
    bg.convert("RGB").save(out/f"check-{idx:03d}.jpg",quality=92)
print(f"Red composite checks written to {out}")