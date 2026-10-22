import { portfolio } from "../data";

export function Awards() {
  return (
    <section className="scene awards" id="awards" data-scene="awards">
      <div className="sticky">
        <p className="section-label"><span>(06)</span> — PROOF OF PRACTICE</p>
        <h2>BUILT BY<br/><span className="red">DISCIPLINE.</span></h2>
        <div className="coding-stats">
          {portfolio.codingStats.map((s, i) => (
            <div className={`coding-card c${i}`} key={s.label}>
              <strong>{s.value}<sup>{s.suffix}</sup></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <p className="mono cert-label">VERIFIED CREDENTIALS &amp; CERTIFICATIONS (CLICK TO VERIFY)</p>
        <div className="cert-cylinder">
          {portfolio.certifications.map((c, i) => (
            <a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Verify ${c.title} certificate from ${c.issuer}`}
              className={`cert-card cert-${i}`}
              style={{
                transform: `rotateY(${(360 / portfolio.certifications.length) * i}deg) translateZ(310px)`,
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div className="cert-front">
                <span className="mono">TP / VERIFIED CREDENTIAL</span>
                <h3>{c.title}</h3>
                <p>{c.issuer}</p>
                <b>↗</b>
              </div>
              <div className="cert-back">
                <span>VERIFY<br/>CREDENTIAL ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}