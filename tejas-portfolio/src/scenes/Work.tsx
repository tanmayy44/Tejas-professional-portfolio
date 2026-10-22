import { useState } from "react";
import { portfolio } from "../data";

export function Work() {
  const [active, setActive] = useState(0);
  const project = portfolio.projects[active];
  const total = portfolio.projects.length;

  return (
    <section className="scene work" id="work" data-scene="work">
      <div className="sticky">
        <div className="work-grid" />
        <div className="work-head">
          <div>
            <p className="section-label"><span>(03)</span> — SELECTED WORK</p>
            <h2>FEATURED<br/><span className="red">PROJECTS.</span></h2>
          </div>
          <div className="work-count">
            <strong>0{active + 1}</strong> / 0{total}
            <div className="work-progress">
              <i style={{ width: `${((active + 1) / total) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="project-deck">
          <div className="project-card">
            <div className="project-copy">
              <p className="mono red">{project.number} / {project.category}</p>
              <h3>{project.name.split("\n").map((line, i) => <span key={i}>{line}<br/></span>)}</h3>
              <p className="project-description">{project.description}</p>
              <div className="chips">
                {project.chips.map(chip => <span key={chip}>{chip}</span>)}
              </div>
              <a className="project-link" data-cursor="Open" href={project.href} target="_blank" rel="noreferrer">
                {project.linkText || "View Project ↗"}
              </a>
            </div>
            <div className={`project-visual ${project.visual}`} aria-hidden="true">
              {project.visual === "gauge" ? (
                <>
                  <div className="gauge"><span>88.4%</span><small>MODEL FIT</small></div>
                  <div className="visual-lines"><i/><i/><i/><i/></div>
                </>
              ) : project.visual === "heatmap" ? (
                <div className="heatmap">
                  {Array.from({ length: 36 }, (_, i) => (
                    <i key={i} style={{ opacity: 0.18 + ((i * 17) % 70) / 100 }} />
                  ))}
                </div>
              ) : (
                <div className="chat-mock"><i/><i/><i/><b>AI &amp; PIPELINE ↗</b></div>
              )}
              <span className="visual-mark">TP / SPORTS DATA LAB</span>
            </div>
          </div>
          <div className="project-controls">
            {portfolio.projects.map((p, i) => (
              <button
                key={p.number}
                className={i === active ? "selected" : ""}
                onClick={() => setActive(i)}
                aria-label={`Show ${p.name.replace("\n", " ")}`}
              >
                {p.number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}