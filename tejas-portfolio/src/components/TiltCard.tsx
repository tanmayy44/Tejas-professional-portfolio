import { useRef, type PropsWithChildren, type MouseEvent } from "react";

export function TiltCard({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || window.innerWidth < 820) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 28}deg) rotateX(${-y * 28}deg)`;
    ref.current.style.setProperty("--glare-x", `${(x + .5) * 100}%`);
    ref.current.style.setProperty("--glare-y", `${(y + .5) * 100}%`);
  }
  function reset() { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)"; }
  return <div ref={ref} className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={reset}>{children}</div>;
}