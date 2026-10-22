import { useEffect, useState } from "react";
import { director } from "../engine/director";
import { portfolio, sectionOrder } from "../data";

export function Chrome() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = director.subscribe((states, y) => {
      const current = [...states].reverse().find(s => y >= s.top - window.innerHeight * 0.78);
      if (current) setActive(current.id);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.round((y / max) * 100) : 0);
    });
    return () => { unsub(); };
  }, []);

  return (
    <>
      <header className={`hud ${active === "contact" ? "hud-contact" : ""}`}>
        <a
          className="brand"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            director.scrollTo("hero");
          }}
          aria-label={`${portfolio.name} home`}
        >
          {portfolio.firstName}<sup>®</sup>
        </a>
        <nav className="nav-pill" aria-label="Main navigation">
          {sectionOrder.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "page" : undefined}
              onClick={() => director.scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <div className={`progress-hud ${active === "contact" ? "on-red" : ""}`} aria-label={`Reading progress: ${progress}%`}>
        <span>{String(progress).padStart(2, "0")}%</span>
        <i><b style={{ height: `${progress}%` }} /></i>
      </div>
    </>
  );
}