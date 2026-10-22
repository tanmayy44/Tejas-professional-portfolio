export type Shot = { from: number; to: number; box: [number, number, number, number]; cx: number };
export type FrameManifest = { w: number; h: number; count: number; shots: Shot[] };

export class FrameLoader {
  manifest: FrameManifest | null = null;
  frames = new Map<number, HTMLImageElement>();
  loaded = 0;
  private base = "./frames/lg/";
  private listeners = new Set<() => void>();

  subscribe(fn: () => void) { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; }
  private notify() { this.listeners.forEach(fn => fn()); }

  async load() {
    const manifestResponse = await fetch("./frames/manifest.json");
    if (!manifestResponse.ok) throw new Error("Frame manifest missing. Add the processed video frames first.");
    this.manifest = await manifestResponse.json() as FrameManifest;
    if (window.innerWidth < 820) this.base = "./frames/sm/";
    const total = this.manifest.count;
    const order: number[] = [];
    const boundaries = new Set<number>();
    this.manifest.shots.forEach(s => { boundaries.add(s.from); boundaries.add(s.to); });
    order.push(...[...boundaries].sort((a,b)=>a-b));
    for (const stride of [8, 4, 2, 1]) {
      for (let i = 0; i < total; i += stride) order.push(i);
    }
    const unique = [...new Set(order)].filter(i => i >= 0 && i < total);
    const firstQuarter = new Set(unique.slice(0, Math.max(1, Math.ceil(total / 4))));
    const tasks = unique.map(i => this.loadOne(i));
    await Promise.all(tasks.filter((_, i) => firstQuarter.has(unique[i])));
    // Remaining tasks keep streaming in the background.
    void Promise.all(tasks);
    return this.manifest;
  }

  private async loadOne(index: number) {
    if (this.frames.has(index)) return;
    const img = new Image();
    img.decoding = "async";
    img.src = `${this.base}f${String(index).padStart(3, "0")}.webp`;
    try {
      await img.decode();
      this.frames.set(index, img);
      this.loaded = this.frames.size;
      this.notify();
    } catch {
      // A failed frame is deliberately omitted; get() finds the nearest loaded frame in its shot.
    }
  }

  get(index: number, shotIndex?: number) {
    const direct = this.frames.get(index);
    if (direct) return direct;
    if (!this.manifest) return undefined;
    const shot = shotIndex === undefined ? this.manifest.shots.find(s => index >= s.from && index <= s.to) : this.manifest.shots[shotIndex];
    const from = shot?.from ?? 0, to = shot?.to ?? this.manifest.count - 1;
    let best: HTMLImageElement | undefined, distance = Infinity;
    this.frames.forEach((img, frame) => {
      if (frame >= from && frame <= to && Math.abs(frame - index) < distance) {
        best = img; distance = Math.abs(frame - index);
      }
    });
    return best;
  }
}