import { portfolio } from "../data";
export function Hero() {
  return <section className="scene hero" id="hero" data-scene="hero">
    <div className="sticky"><div className="hero-giant" aria-hidden="true">{portfolio.firstName}</div>
      <div className="hero-copy">
        <p className="eyebrow"><span>(01)</span> — INTRODUCING</p>
        <p className="intro-line">Hi, I'm <strong>{portfolio.name}</strong> —</p>
        <h1><span>SPORTS DATA</span><span className="red">ANALYST.</span></h1>
        <p className="hero-desc">{portfolio.intro}</p>
        <div className="actions">
          <a className="pill-button red-button" data-cursor="Go" href="#work">View Projects ↘</a>
          <a className="pill-button outline-button" data-cursor="PDF" href={portfolio.resume} target="_blank" rel="noreferrer">Download Résumé ↗</a>
          <a className="pill-button outline-button" data-cursor="Talk" href="#contact">Contact Me ↘</a>
        </div>
      </div>
      <div className="hero-index mono">SCROLL TO EXPLORE <span>↓</span></div>
    </div>
  </section>;
}