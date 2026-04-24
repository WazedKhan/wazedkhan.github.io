// About + Services + Now + Writing + Press + Testimonials + Resume + Contact
function About() {
  return (
    <section className="section" id="about" data-screen-label="03 About">
      <div className="section-head">
        <span className="section-num">02</span>
        <span className="section-label">About</span>
        <span className="section-rule" />
      </div>

      <div className="about-grid">
        <div className="about-col">
          <p className="about-lead">
            Backend engineer, 3+ years — <em>Python, Django, and increasingly Go.</em>
          </p>
          <p>
            I like boring technology and obvious data models. Currently going deeper on distributed systems.
          </p>
        </div>

        <div className="about-aside">
          <div className="about-meta">
            <div className="label">Based in</div>
            <div>Bengaluru, India</div>
          </div>
          <div className="about-meta">
            <div className="label">Working in</div>
            <div>Python · Django · Go · Postgres</div>
          </div>
          <div className="about-meta">
            <div className="label">Learning</div>
            <div>Distributed systems · Consensus · Storage internals</div>
          </div>
          <div className="about-meta">
            <div className="label">Open to</div>
            <div>Full-time senior / staff roles · Contract engagements</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      n: "A",
      title: "Backend systems",
      body: "APIs and long-lived services in Django / Python.",
      deliverables: ["API design", "Data modeling"],
    },
    {
      n: "B",
      title: "Data & ETL",
      body: "Ingestion pipelines from messy sources to queryable data.",
      deliverables: ["Ingestion", "Orchestration"],
    },
    {
      n: "C",
      title: "Performance",
      body: "Find the slow thing. Fix it. Leave instrumentation behind.",
      deliverables: ["Profiling", "DB tuning"],
    },
    {
      n: "D",
      title: "Go migrations",
      body: "Hot paths out of the Python monolith, one at a time.",
      deliverables: ["Extraction", "Load testing"],
    },
  ];

  return (
    <section className="section" id="services" data-screen-label="04 Services">
      <div className="section-head">
        <span className="section-num">03</span>
        <span className="section-label">Services</span>
        <span className="section-rule" />
      </div>



      <div className="services-grid">
        {items.map((it) => (
          <div key={it.n} className="service">
            <div className="service-head">
              <span className="service-n mono">{it.n}</span>
              <h3 className="service-title">{it.title}</h3>
            </div>
            <p>{it.body}</p>
            <div className="service-deliverables">
              {it.deliverables.map((d) => (
                <span key={d} className="chip chip-static mono">{d}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Now() {
  const items = [
    ["Currently", "Backend lead at Placepoint."],
    ["Reading", "DDIA. Raft paper."],
    ["Writing", "Django → Go migration notes."],
    ["Side quest", "A CLI for Postgres replication lag."],
    ["Not doing", "Crypto. AI hype."],
  ];

  return (
    <section className="section" id="now" data-screen-label="05 Now">
      <div className="section-head">
        <span className="section-num">04</span>
        <span className="section-label">Now</span>
        <span className="section-rule" />
        <span className="section-count mono">Updated 14 Apr 2026</span>
      </div>

      <div className="now-list">
        {items.map(([k, v]) => (
          <div key={k} className="now-row">
            <div className="now-k mono">{k}</div>
            <div className="now-v">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  const posts = [
    {
      n: "01",
      date: "Apr 2026",
      title: "When to reach for Go from a Django shop",
      tag: "Architecture",
      mins: "8 min",
    },
    {
      n: "02",
      date: "Feb 2026",
      title: "Idempotency keys the way Stripe probably does it",
      tag: "APIs",
      mins: "6 min",
    },
    {
      n: "03",
      date: "Nov 2025",
      title: "A small, stubborn guide to Postgres indexes",
      tag: "Databases",
      mins: "11 min",
    },
    {
      n: "04",
      date: "Aug 2025",
      title: "Audit logs that an auditor actually wants",
      tag: "Security",
      mins: "5 min",
    },
  ];

  return (
    <section className="section" id="writing" data-screen-label="06 Writing">
      <div className="section-head">
        <span className="section-num">05</span>
        <span className="section-label">Writing</span>
        <span className="section-rule" />
      </div>

      <div className="writing-list">
        {posts.map((p) => (
          <a key={p.n} href="#writing" className="writing-row">
            <span className="mono dim">{p.n}</span>
            <span className="writing-title">{p.title}</span>
            <span className="mono dim">{p.tag}</span>
            <span className="mono dim">{p.mins}</span>
            <span className="mono dim">{p.date}</span>
            <span className="writing-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      body: "Turned our ingestion from a weekly fire drill into something nobody thinks about anymore.",
      who: "Eng Manager, Placepoint",
    },
    {
      body: "Writes the code you'd hope to inherit. Boring in the best way.",
      who: "Staff Engineer, former colleague",
    },
    {
      body: "Extracted a Go service from our monolith in increments none of us noticed. p99 dropped by half.",
      who: "CTO, portfolio company",
    },
  ];

  return (
    <section className="section" id="testimonials" data-screen-label="07 Testimonials">
      <div className="section-head">
        <span className="section-num">06</span>
        <span className="section-label">Kind Words</span>
        <span className="section-rule" />
      </div>

      <div className="quotes">
        {quotes.map((q, i) => (
          <figure key={i} className="quote">
            <blockquote>
              <span className="quote-mark">“</span>
              {q.body}
            </blockquote>
            <figcaption className="mono dim">— {q.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Press() {
  const logos = ["Placepoint", "Tessera", "Meridian Labs", "Northbound", "Kepler &amp; Co.", "Arcfield"];
  return (
    <section className="section" id="press" data-screen-label="08 Press">
      <div className="section-head">
        <span className="section-num">07</span>
        <span className="section-label">Trusted by</span>
        <span className="section-rule" />
      </div>
      <div className="press-row">
        {logos.map((l) => (
          <span key={l} className="press-logo" dangerouslySetInnerHTML={{ __html: l }} />
        ))}
      </div>
    </section>
  );
}

function Resume() {
  const entries = [
    {
      year: "2024 — present",
      role: "Backend Lead",
      org: "Placepoint",
      note: "Ingestion, valuation API, Go migration.",
    },
    {
      year: "2022 — 2024",
      role: "Senior Backend Engineer",
      org: "Tessera Systems",
      note: "Portfolio analytics, audit ledger.",
    },
    {
      year: "2021 — 2022",
      role: "Backend Engineer",
      org: "Meridian Labs",
      note: "Django services, risk scoring.",
    },
    {
      year: "2020 — 2021",
      role: "Engineering Intern → Jr. Engineer",
      org: "Northbound",
      note: "First production code. Learned a lot of lessons the hard way.",
    },
  ];

  return (
    <section className="section" id="resume" data-screen-label="09 Resume">
      <div className="section-head">
        <span className="section-num">08</span>
        <span className="section-label">Résumé</span>
        <span className="section-rule" />
        <a href="#" className="mono link">Download PDF ↓</a>
      </div>

      <div className="resume-list">
        {entries.map((e) => (
          <div key={e.year} className="resume-row">
            <div className="resume-year mono">{e.year}</div>
            <div className="resume-main">
              <div className="resume-role">{e.role}</div>
              <div className="mono dim">{e.org}</div>
            </div>
            <div className="resume-note">{e.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section-contact" id="contact" data-screen-label="10 Contact">
      <div className="section-head">
        <span className="section-num">09</span>
        <span className="section-label">Contact</span>
        <span className="section-rule" />
      </div>

      <h2 className="contact-title">
        Got a system problem? — <em>let's talk.</em>
      </h2>

      <div className="contact-grid">
        <a className="contact-card" href="mailto:hello@wajed.dev">
          <div className="label">Email</div>
          <div className="contact-val">hello@wajed.dev</div>
        </a>
        <a className="contact-card" href="https://www.linkedin.com/in/wajed-khan/" target="_blank" rel="noreferrer">
          <div className="label">LinkedIn</div>
          <div className="contact-val">/in/wajed-khan</div>
        </a>
        <a className="contact-card" href="#">
          <div className="label">Calendar</div>
          <div className="contact-val">Book 20 min</div>
        </a>
      </div>

      <footer className="footer">
        <div className="mono dim">© 2026 Abdul Wajed Khan</div>
        <div className="mono dim">Built by hand · No frameworks were harmed</div>
        <div className="mono dim">↑ back to top</div>
      </footer>
    </section>
  );
}

Object.assign(window, { About, Services, Now, Writing, Testimonials, Press, Resume, Contact });
