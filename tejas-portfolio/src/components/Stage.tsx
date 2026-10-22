import { useEffect, useRef } from "react";
import { FrameLoader } from "../engine/frames";
import { director, SCENES, easeInOutSine } from "../engine/director";

const loader = new FrameLoader();
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let mouseX = 0, mouseY = 0, px = 0, py = 0, lastKey = "";
    let manifest: Awaited<ReturnType<typeof loader.load>> | null = null;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
      draw();
    };
    const pointer = (e: MouseEvent) => { mouseX = (e.clientX / innerWidth - .5) * 28; mouseY = (e.clientY / innerHeight - .5) * 28; };
    const getSceneFrame = (sceneIndex: number, p: number) => {
      const s = SCENES[sceneIndex];
      return s.from + (s.to - s.from) * p;
    };
    const paintFrame = (frame: number, sceneIndex: number, alpha = 1, shiftX = 0) => {
      if (!manifest) return;
      const shotIndex = Math.min(3, Math.max(0, sceneIndex < 3 ? sceneIndex : 3));
      const shot = manifest.shots[shotIndex];
      const img = loader.get(Math.floor(frame), shotIndex);
      if (!img) return;
      const vw = innerWidth, vh = innerHeight, mobile = vw < 820;
      const box = shot?.box ?? [0, 0, 1600, 900];
      const cx = shot?.cx ?? .5;
      let scale = vh * SCENES[sceneIndex].k / 900;
      let x = SCENES[sceneIndex].x;
      if (mobile) { x = .5; scale = Math.min(vh * .74 / 900, vw * 1.05 / Math.max(1, box[2])); }
      const offY = vh - 900 * scale;
      const offX = x * vw - cx * 1600 * scale + px + shiftX;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, offX + box[0] * scale, offY + box[1] * scale, img.width * scale, img.height * scale);
      const frac = frame - Math.floor(frame);
      if (frac > 0) {
        const next = loader.get(Math.floor(frame) + 1, shotIndex);
        if (next) { ctx.globalAlpha = alpha * frac; ctx.drawImage(next, offX + box[0] * scale, offY + box[1] * scale, next.width * scale, next.height * scale); }
      }
      ctx.globalAlpha = 1;
    };
    const draw = () => {
      if (!manifest) return;
      px += (mouseX - px) * .06; py += (mouseY - py) * .06;
      const y = window.scrollY, vh = innerHeight, vw = innerWidth, lead = .78 * vh, span = .62 * vh;
      const states = director.states;
      let active = 0;
      states.forEach((s, i) => { if (y >= s.top - lead) active = i; });
      const state = states[active];
      const scene = SCENES[active];
      const frame = getSceneFrame(active, state?.p ?? 0);
      const prev = Math.max(0, active - 1);
      const transitionT = active === 0 ? 1 : easeInOutSine(clamp((y - ((state?.top ?? 0) - lead)) / span));
      const key = `${active}|${Math.floor(frame)}|${Math.round((frame % 1) * 100)}|${Math.round(transitionT * 100)}|${loader.loaded}|${vw}|${vh}`;
      if (key === lastKey) return;
      lastKey = key;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      if (active > 0 && transitionT < 1) {
        const skew = .2 * vh, e = -skew + (vw + 2 * skew) * transitionT;
        ctx.save();
        ctx.beginPath(); ctx.moveTo(e + skew, 0); ctx.lineTo(vw, 0); ctx.lineTo(vw, vh); ctx.lineTo(e - skew, vh); ctx.closePath(); ctx.clip();
        const prevState = states[prev];
        paintFrame(getSceneFrame(prev, prevState?.p ?? 1), prev, 1 - .35 * transitionT, 60 * transitionT);
        ctx.restore();
        ctx.save();
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(e + skew, 0); ctx.lineTo(e - skew, vh); ctx.lineTo(0, vh); ctx.closePath(); ctx.clip();
        paintFrame(frame, active, 1, -60 * (1 - transitionT));
        ctx.restore();
        ctx.save(); ctx.strokeStyle = active === 6 ? "#fff" : "#ff1f1f"; ctx.lineWidth = 3; ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 24;
        ctx.beginPath(); ctx.moveTo(e + skew, 0); ctx.lineTo(e - skew, vh); ctx.stroke(); ctx.restore();
      } else paintFrame(frame, active);
    };
    const unsub = director.subscribe(() => draw());
    const unsubLoader = loader.subscribe(() => draw());
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", pointer, { passive: true });
    void loader.load().then(m => { manifest = m; draw(); }).catch(() => { /* Placeholder state remains graceful until frames are supplied. */ });
    resize();
    return () => { unsub(); unsubLoader(); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", pointer); };
  }, []);
  return <canvas className="stage" ref={canvasRef} aria-hidden="true" />;
}