import { useEffect, useRef } from "react";
import { portfolio } from "../data";
export function Skills() {
  const orbitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = orbitRef.current; if (!el) return;
    const chips = [...el.querySelectorAll<HTMLElement>(".orbit-chip")];
    let angle = 0, mx = 0;
    const move = (e: MouseEvent) => { mx = (e.clientX / innerWidth - .5) * .8; };
    window.addEventListener("mousemove", move);
    let raf = 0;
    const tick = () => {
      angle += .0018;
      chips.forEach((chip,i) => {
        const phi = Math.acos(-1 + (2*(i+.5))/chips.length);
        const theta = Math.sqrt(chips.length*Math.PI)*phi + angle*5 + mx;
        const x = Math.cos(theta)*Math.sin(phi), y = Math.sin(theta)*Math.sin(phi)*.78, z = Math.cos(phi);
        chip.style.transform = `translate3d(${x*220}px,${y*190}px,${z*220}px) rotateY(${-theta}rad)`;
        chip.style.opacity = z < 0 ? ".56" : "1";
        chip.style.zIndex = String(Math.round((z+1)*10));
        chip.classList.toggle("behind",z<0);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",move); };
  }, []);
  return <section className="scene skills" id="skills" data-scene="skills">
    <div className="sticky"><p className="section-label"><span>(05)</span> — THE TOOLKIT</p><h2>EVERYTHING<br/><span className="red">IN ORBIT.</span></h2>
      <div className="orbit" ref={orbitRef}><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/>{portfolio.skills.map((skill,i)=><span className="orbit-chip" key={skill} style={{left:"50%",top:"50%"}}>{skill}</span>)}</div>
      <div className="skill-tape"><div>{[...portfolio.skills,...portfolio.skills].map((s,i)=><span key={`${s}-${i}`}>{s} <b>✦</b> </span>)}</div></div>
    </div>
  </section>;
}