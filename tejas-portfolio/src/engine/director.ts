import Lenis from "lenis";
import gsap from "gsap";

export type SceneDefinition = { id: string; from: number; to: number; x: number; k: number; label: string };
export type SceneState = { id: string; top: number; height: number; enter: number; p: number; exit: number; vis: number };
export const SCENES: SceneDefinition[] = [
  { id: "hero", from: 0, to: 119, x: .70, k: 1, label: "Hello" },
  { id: "about", from: 120, to: 239, x: .27, k: 1, label: "About" },
  { id: "work", from: 240, to: 359, x: .77, k: .86, label: "Work" },
  { id: "journey", from: 360, to: 419, x: .26, k: 1, label: "Journey" },
  { id: "skills", from: 420, to: 444, x: .50, k: .98, label: "Toolkit" },
  { id: "awards", from: 445, to: 459, x: .75, k: 1, label: "Awards" },
  { id: "contact", from: 119, to: 0, x: .50, k: 1, label: "Contact" },
];
const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export class Director {
  lenis: Lenis;
  states: SceneState[] = [];
  y = 0;
  vw = window.innerWidth;
  vh = window.innerHeight;
  private subs = new Set<(s: SceneState[], y: number) => void>();
  private elements = new Map<string, HTMLElement>();
  private raf = (time: number) => {
    this.lenis.raf(time);
    this.y = window.scrollY;
    this.vw = window.innerWidth; this.vh = window.innerHeight;
    this.measure();
    this.subs.forEach(fn => fn(this.states, this.y));
  };
  private resizeObserver = new ResizeObserver(() => this.measure());

  constructor() {
    history.scrollRestoration = "manual";
    this.lenis = new Lenis({ lerp: .075, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.4, autoRaf: false });
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(this.raf);
    this.lenis.stop();
  }
  register(id: string, el: HTMLElement) { this.elements.set(id, el); this.resizeObserver.observe(el); this.measure(); }
  subscribe(fn: (s: SceneState[], y: number) => void) { this.subs.add(fn); return () => { this.subs.delete(fn); }; }
  start() { this.lenis.start(); }
  scrollTo(id: string) { this.lenis.scrollTo(`#${id}`, { duration: 2.2, easing: t => 1 - Math.pow(1 - t, 4) }); }
  measure() {
    this.states = SCENES.map(scene => {
      const el = this.elements.get(scene.id);
      const rect = el?.getBoundingClientRect();
      const top = rect ? rect.top + window.scrollY : 0;
      const height = el?.offsetHeight ?? window.innerHeight;
      const enter = clamp((this.y - (top - this.vh)) / this.vh);
      const p = clamp((this.y - top) / Math.max(1, height - this.vh));
      const exit = clamp((this.y - (top + height - this.vh)) / this.vh);
      return { id: scene.id, top, height, enter, p, exit, vis: clamp(Math.min(enter * 1.6, 1 - exit * 2.2)) };
    });
  }
  destroy() { gsap.ticker.remove(this.raf); this.resizeObserver.disconnect(); this.lenis.destroy(); }
}
export const director = new Director();