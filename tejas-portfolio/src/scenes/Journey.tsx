import { portfolio } from "../data";

export function Journey() {
  return (
    <section className="scene journey" id="journey" data-scene="journey">
      <div className="sticky">
        <div className="journey-year">2026</div>
        <div className="journey-content">
          <p className="section-label"><span>(04)</span> — THE JOURNEY</p>
          <h2>EXPERIENCE &amp;<br/><span className="red">EDUCATION.</span></h2>
          <div className="timeline">
            {portfolio.journey.map((item) => (
              <article key={item.title} className="timeline-item">
                <span className="timeline-dot" />
                <p className="mono red">{item.year}</p>
                <h3>{item.title}</h3>
                <p style={{ fontWeight: 600 }}>{item.organisation}</p>
                {item.details && (
                  <p style={{ fontSize: "13px", marginTop: "4px", color: "var(--mute)" }}>
                    {item.details}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}