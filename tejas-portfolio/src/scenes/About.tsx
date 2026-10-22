import { portfolio } from "../data";
import { TiltCard } from "../components/TiltCard";
import { Odometer } from "../components/Odometer";

export function About() {
  return (
    <section className="scene about" id="about" data-scene="about">
      <div className="sticky">
        <div className="about-wash" />
        <div className="section-label"><span>(02)</span> — ABOUT ME</div>
        <div className="about-content">
          <p className="manifesto">
            {portfolio.manifesto.split(" ").map((word, i) => (
              <span
                key={i}
                className={/quality|precision|integrity|discipline|clarity|decisive|learning/i.test(word) ? "keyword" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="stats-row">
            {portfolio.stats.map((stat, i) => (
              <TiltCard key={stat.label}>
                <div className="stat-value">
                  <Odometer value={stat.value} suffix={stat.suffix} />
                </div>
                <p>{stat.label}</p>
                <span className="stat-index">0{i + 1}</span>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}