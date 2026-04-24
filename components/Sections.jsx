// About + Services + Now + Writing + Testimonials + Press + Resume + Contact
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
            Backend engineer with <em>3+ years</em> shipping web backends — mostly Python and Django — now deep in <em>Go</em>, microservices, and distributed systems.
          </p>
          <p>
            I&apos;m employed by <strong>Softwrd Limited</strong> (<a href="https://softwrd.ai" target="_blank" rel="noreferrer" className="link">softwrd.ai</a>).
            I started on <strong>PropCloud</strong>, then moved to <strong>Placepoint</strong> — both real estate data products at the same company. Today my focus is Placepoint: a Go-heavy platform
            for integrations, ingestion, valuation, and a federated GraphQL surface (gqlgen subgraphs, Apollo Router). I care about throughput, correctness, and CI that matches how the team actually works.
          </p>
          <p>
            Earlier I was <strong>acting tech lead</strong> on <strong>HealthOS</strong> at <strong>Repliq Limited</strong> — leading engineering delivery in that capacity before joining Softwrd Limited.
          </p>
          <p>
            I also <strong>solo-designed and built</strong>{" "}
            <a href="https://app.grainmarketplace.com.au/" target="_blank" rel="noreferrer" className="link">Grain Marketplace</a>
            {" "}(Australia) — a grain trading web app for farmers and buyers — from first sketch through implementation until handover to the client.
          </p>
          <p>
            I also worked on{" "}
            <a href="https://orps.sstu.ac.bd/login" target="_blank" rel="noreferrer" className="link">Unisphere (ORPS)</a>
            {" "}— SSTU&apos;s <strong>university online result publication</strong> system: secure login, recovery paths, and bilingual guidance for students and staff.
          </p>
          <p>
            <strong>Ask me about</strong> Python, Django performance, or why I&apos;m bullish on Go for service boundaries. Off the clock I geek out about digital privacy
            (GrapheneOS, NextDNS, VPNs), read widely (Atomic Habits, Grit, Man&apos;s Search for Meaning, true crime), and keep dependencies boring unless the problem truly needs more.
          </p>
        </div>

        <div className="about-aside">
          <div className="about-meta">
            <div className="label">Based in</div>
            <div>Dhaka, Bangladesh</div>
          </div>
          <div className="about-meta">
            <div className="label">Employer</div>
            <div>Softwrd Limited · PropCloud → Placepoint</div>
          </div>
          <div className="about-meta">
            <div className="label">Previously</div>
            <div>Repliq Limited · HealthOS (acting tech lead)</div>
          </div>
          <div className="about-meta">
            <div className="label">Stack</div>
            <div>Go · gqlgen · Apollo · MongoDB · FastAPI · Python · Docker · AWS · GitHub Actions</div>
          </div>
          <div className="about-meta">
            <div className="label">Learning</div>
            <div>Advanced Kubernetes · GraphQL architecture · Concurrency patterns · system design</div>
          </div>
          <div className="about-meta">
            <div className="label">Goal</div>
            <div>High-throughput, production-ready systems that scale — with observability and humane CI/CD.</div>
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
      title: "Go microservices",
      body: "Go services on Placepoint — integrations and property APIs — plus migration lessons carried over from PropCloud at Softwrd Limited.",
      deliverables: ["Go", "Docker", "AWS"],
    },
    {
      n: "B",
      title: "GraphQL federation",
      body: "Subgraphs with gqlgen, composition with Rover, routing via Apollo Router — schema evolution and operational sharp edges included.",
      deliverables: ["gqlgen", "Apollo", "Rover"],
    },
    {
      n: "C",
      title: "Data & Python",
      body: "MongoDB aggregation pipelines on real estate payloads (GeoJSON, pricing, housing types) plus FastAPI/CDDV2 services using Poetry and uv.",
      deliverables: ["MongoDB", "FastAPI", "Python"],
    },
    {
      n: "D",
      title: "Platform engineering",
      body: "GitHub Actions with govulncheck, AWS credentials via OIDC, Slack notifications, and schedules aligned to a Dhaka-timezone delivery cadence.",
      deliverables: ["Actions", "CI/CD", "Slack"],
    },
  ];

  return (
    <section className="section" id="services" data-screen-label="04 Services">
      <div className="section-head">
        <span className="section-num">03</span>
        <span className="section-label">What I ship</span>
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
    ["Day job", "Backend Software Engineer at Softwrd Limited (softwrd.ai) — Placepoint today; PropCloud earlier at the same company. Go microservices, GraphQL subgraphs, MongoDB."],
    ["Client delivery", "Solo-designed and built Grain Marketplace (app.grainmarketplace.com.au) for the Australian grain sector — through handover to the client."],
    ["EdTech", "Engineering on Unisphere (ORPS) — SSTU online result publication at orps.sstu.ac.bd (login, recovery, bilingual student UX)."],
    ["Focus", "Sharpening system design and migrating more surface area to Go where it earns its keep."],
    ["Learning", "Advanced Kubernetes, GraphQL architecture at scale, and Go concurrency patterns."],
    ["Recent wins", "Supergraph drift & 422 GraphQL validation fixes; propCloud → CDDV2 migration with Linear-tracked debt; nil-pointer and errors.Is hardening; comparable-plots JSON/type fixes; CI with govulncheck + AWS OIDC + Slack."],
    ["Dev setup", "Ubuntu daily driver, comfortable with kernel & package tooling — previously debugged act, Docker sockets, and zsh env migrations."],
    ["Community", "Active on LinkedIn in a mentorship-adjacent way around Python and Django."],
  ];

  return (
    <section className="section" id="now" data-screen-label="05 Now">
      <div className="section-head">
        <span className="section-num">04</span>
        <span className="section-label">Now</span>
        <span className="section-rule" />
        <span className="section-count mono">Updated 24 Apr 2026</span>
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
  const repos = [
    {
      n: "01",
      href: "https://app.grainmarketplace.com.au/",
      title: "Grain Marketplace — AU grain trading (live)",
      tag: "Product",
      hint: "Client ship",
      outlet: "Web",
    },
    {
      n: "02",
      href: "https://orps.sstu.ac.bd/login",
      title: "Unisphere (ORPS) — SSTU results portal",
      tag: "EdTech",
      hint: "Live",
      outlet: "Web",
    },
    {
      n: "03",
      href: "https://github.com/WazedKhan/NovaCart",
      title: "NovaCart — microservices sandbox (Go)",
      tag: "Go",
      hint: "Repository",
    },
    {
      n: "04",
      href: "https://github.com/WazedKhan/Problems",
      title: "Problems — DSA & platforms",
      tag: "Python",
      hint: "Repository",
    },
    {
      n: "05",
      href: "https://github.com/WazedKhan/Go-Playground",
      title: "Go-Playground — snippets & exercises",
      tag: "Go",
      hint: "Repository",
    },
    {
      n: "06",
      href: "https://github.com/WazedKhan?tab=repositories&q=&type=source&language=&sort=",
      title: "All public repositories",
      tag: "GitHub",
      hint: "Profile",
    },
  ];

  return (
    <section className="section" id="writing" data-screen-label="06 Repos">
      <div className="section-head">
        <span className="section-num">05</span>
        <span className="section-label">On GitHub</span>
        <span className="section-rule" />
      </div>

      <h2 className="section-title" style={{ marginBottom: "36px" }}>
        Live client work &amp; public code — <em>outside Placepoint.</em>
      </h2>

      <div className="writing-list">
        {repos.map((p) => (
          <a key={p.n} href={p.href} className="writing-row" target="_blank" rel="noreferrer">
            <span className="mono dim">{p.n}</span>
            <span className="writing-title">{p.title}</span>
            <span className="mono dim">{p.tag}</span>
            <span className="mono dim">{p.hint}</span>
            <span className="mono dim">{p.outlet || "GitHub"}</span>
            <span className="writing-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const stats = [
    {
      n: "3+",
      label: "Years in backend",
      note: "Python & Django foundations; PropCloud → Placepoint at Softwrd; earlier acting tech lead on HealthOS at Repliq.",
    },
    {
      n: "102+",
      label: "Public repositories",
      note: "Experiments, DSA, tooling — plus solo delivery of Grain Marketplace before handover.",
    },
    {
      n: "Ask",
      label: "Python · Django · Go",
      note: "Performance tuning, service boundaries, and why boring dependencies win.",
    },
  ];

  return (
    <section className="section" id="testimonials" data-screen-label="07 Snapshot">
      <div className="section-head">
        <span className="section-num">06</span>
        <span className="section-label">At a glance</span>
        <span className="section-rule" />
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-n">{s.n}</div>
            <div className="stat-card-label mono">{s.label}</div>
            <p className="stat-card-note">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Press() {
  return (
    <section className="section" id="press" data-screen-label="08 Links">
      <div className="section-head">
        <span className="section-num">07</span>
        <span className="section-label">Find me</span>
        <span className="section-rule" />
      </div>
      <div className="press-row press-row-links">
        <a className="press-link" href="https://softwrd.ai/team" target="_blank" rel="noreferrer">softwrd.ai</a>
        <a className="press-link" href="https://github.com/WazedKhan" target="_blank" rel="noreferrer">GitHub</a>
        <a className="press-link" href="https://www.linkedin.com/in/abdul-wajed-khan-138134209/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="press-link" href="https://gist.github.com/WazedKhan" target="_blank" rel="noreferrer">Gists</a>
      </div>
    </section>
  );
}

function Resume() {
  const entries = [
    {
      year: "Present",
      role: "Backend Software Engineer",
      org: "Softwrd Limited · Dhaka (softwrd.ai)",
      note: "PropCloud, then Placepoint — same employer. On PropCloud: legacy property APIs and migration toward CDDV2. On Placepoint: Go microservices, GraphQL Federation (gqlgen + Apollo Router), MongoDB aggregations, FastAPI/CDDV2, Docker, GitHub Actions on AWS, Slack-integrated CI tuned to team timezone.",
    },
    {
      year: "Previously",
      role: "Acting Tech Lead",
      org: "Repliq Limited",
      note: "HealthOS — technical leadership and engineering delivery in an acting tech lead role before joining Softwrd Limited.",
    },
    {
      year: "Handover",
      role: "Grain Marketplace — solo product",
      org: "Australia · client engagement",
      note: "Designed and developed https://app.grainmarketplace.com.au/ (farmer & buyer journeys) through launch; handed off to the client for long-term ownership.",
    },
    {
      year: "Live",
      role: "Unisphere (ORPS)",
      org: "SSTU · Bangladesh",
      note: "University online result publication system — https://orps.sstu.ac.bd/login — engineering on secure access, recovery flows, and bilingual (English / Bangla) student-facing UX.",
    },
    {
      year: "Ongoing",
      role: "Open source & continuous practice",
      org: "GitHub · @WazedKhan",
      note: "NovaCart (Go microservices learning), DSA in Python, tooling, and this portfolio — complements production work without mixing proprietary code.",
    },
  ];

  return (
    <section className="section" id="resume" data-screen-label="09 Resume">
      <div className="section-head">
        <span className="section-num">08</span>
        <span className="section-label">Résumé</span>
        <span className="section-rule" />
        <a href="https://www.linkedin.com/in/abdul-wajed-khan-138134209/" target="_blank" rel="noreferrer" className="mono link">LinkedIn CV ↗</a>
      </div>

      <div className="resume-list">
        {entries.map((e) => (
          <div key={e.year + e.org} className="resume-row">
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
        Let&apos;s talk systems — <em>Python, Go, or GraphQL.</em>
      </h2>

      <div className="contact-grid">
        <a className="contact-card" href="https://github.com/WazedKhan" target="_blank" rel="noreferrer">
          <div className="label">GitHub</div>
          <div className="contact-val">@WazedKhan</div>
        </a>
        <a className="contact-card" href="https://www.linkedin.com/in/abdul-wajed-khan-138134209/" target="_blank" rel="noreferrer">
          <div className="label">LinkedIn</div>
          <div className="contact-val">Abdul Wajed Khan</div>
        </a>
        <a className="contact-card" href="https://softwrd.ai" target="_blank" rel="noreferrer">
          <div className="label">Employer</div>
          <div className="contact-val">Softwrd Limited</div>
        </a>
      </div>

      <footer className="footer">
        <div className="mono dim">© 2026 Abdul Wajed Khan</div>
        <div className="mono dim">GitHub Pages · React + hand-tuned CSS</div>
        <a href="#home" className="mono dim link">↑ back to top</a>
      </footer>
    </section>
  );
}

Object.assign(window, { About, Services, Now, Writing, Testimonials, Press, Resume, Contact });
