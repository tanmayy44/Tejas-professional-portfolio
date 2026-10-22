import { useEffect, useState } from "react";
import { director } from "../engine/director";
export function Preloader() {
  const [done,setDone] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => { setDone(true); director.start(); window.dispatchEvent(new Event("portfolio:intro")); }, 950);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className={`preloader ${done?"finished":""}`} aria-hidden={done}>
    <div className="loader-half top-half"/><div className="loader-half bottom-half"/>
    <div className="loader-copy"><span className="mono">INDEPENDENT THINKING / PRECISE EXECUTION</span><strong>{done?"100":"000"}</strong><span className="mono">TEJAS PATIL — PORTFOLIO 2026</span></div>
  </div>;
}