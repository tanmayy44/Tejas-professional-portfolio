import { portfolio } from "../data";

export function Contact() {
  return (
    <section className="scene contact" id="contact" data-scene="contact">
      <div className="sticky">
        <div className="contact-red" />
        <div className="contact-giant">LET’S<br/>CONNECT.</div>
        <div className="contact-bottom">
          <div>
            <p className="section-label"><span>(07)</span> — GET IN TOUCH</p>
            <a className="email-link" data-cursor="Write" href={`mailto:${portfolio.email}`}>
              {portfolio.email.split("@")[0]}<br/>
              <span>@{portfolio.email.split("@")[1]}</span>
            </a>
            <div style={{ marginTop: "14px", display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "14px", opacity: 0.9 }}>
              <span>📍 {portfolio.location}</span>
              <span>📞 <a href={`tel:${portfolio.phone}`} style={{ color: "inherit", textDecoration: "none" }}>{portfolio.phone}</a></span>
            </div>
          </div>
          <div className="contact-links">
            <a data-cursor="Open" href={portfolio.github} target="_blank" rel="noreferrer">
              GitHub <span>↗</span>
            </a>
            <a data-cursor="Open" href={portfolio.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span>↗</span>
            </a>
            <a data-cursor="PDF" href={portfolio.resume} target="_blank" rel="noreferrer">
              Résumé (PDF) <span>↗</span>
            </a>
          </div>
        </div>
        <footer>
          <span>© {new Date().getFullYear()} {portfolio.fullName.toUpperCase()}</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button>
          <span>SPORTS DATA ANALYTICS &amp; BUSINESS INTELLIGENCE</span>
        </footer>
      </div>
    </section>
  );
}