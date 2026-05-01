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
            <div className="label">Availability</div>
            <div style={{ color: "var(--accent)", fontWeight: 500 }}>Open to relocation · Remote · Available immediately</div>
          </div>
          <div className="about-meta">
            <div className="label">Employer</div>
            <div>Softwrd Limited · PropCloud → Placepoint</div>
          </div>
          <div className="about-meta">
            <div className="label">Previously</div>
            <div>Repliq Limited · HealthOS (acting tech lead, 7-person team)</div>
          </div>
          <div className="about-meta">
            <div className="label">Core stack</div>
            <div>Python · Django · DRF · FastAPI · PostgreSQL · Redis</div>
          </div>
          <div className="about-meta">
            <div className="label">Current stack</div>
            <div>Go · gqlgen · Apollo Router · MongoDB · Docker · AWS · GitHub Actions</div>
          </div>
          <div className="about-meta">
            <div className="label">Learning</div>
            <div>Advanced Kubernetes · GraphQL architecture · Concurrency patterns · system design</div>
          </div>
          <div className="about-meta">
            <div className="label">Goal</div>
            <div>High-throughput, production-ready systems that scale — with observability and humane CI/CD.</div>
          </div>
          <div className="about-meta">
            <div className="label">Education</div>
            <div>BSc Computer Science &amp; Engineering · IUBAT, Dhaka</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactMetrics() {
  const stats = [
    {
      n: "93%",
      label: "API response time cut",
      note: "30s → 2s under peak traffic. Root cause: N+1 query chains and CPU spikes. Fix: database index redesign, Redis caching, and query-level profiling. HealthOS · Repliq Limited.",
    },
    {
      n: "4,500",
      label: "Active users protected",
      note: "Resolved a race condition in invoice generation using Django atomic transactions + select_for_update() + DB-level unique constraints — preventing data corruption at scale.",
    },
    {
      n: "7",
      label: "Person team led",
      note: "Stepped up as Acting Tech Lead for 6–7 months on HealthOS — backend planning, PR reviews, production releases, and frontend architecture coordination.",
    },
  ];

  return (
    <section className="section" id="impact" data-screen-label="04 Impact">
      <div className="section-head">
        <span className="section-num">03</span>
        <span className="section-label">Production impact</span>
        <span className="section-rule" />
      </div>

      <h2 className="section-title" style={{ marginBottom: "36px" }}>
        Real systems, <em>measurable outcomes.</em>
      </h2>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-n">{s.n}</div>
            <div className="stat-card-label mono">{s.label}</div>
            <p className="stat-card-note">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="case-study">
        <h3 className="case-study-head mono">Case study · Race condition in financial workflows</h3>
        <div className="case-study-grid">
          <div className="case-step">
            <div className="label">Problem</div>
            <p>
              Concurrent invoice generation requests were creating duplicate records. Under load, two threads would both pass the uniqueness check before either committed — classic TOCTOU bug.
            </p>
          </div>
          <div className="case-step">
            <div className="label">Root cause</div>
            <p>
              Application-level uniqueness checks without database-level locking. Django ORM queries ran in separate transactions with no coordination, making duplicates unavoidable under load.
            </p>
          </div>
          <div className="case-step">
            <div className="label">Solution</div>
            <p>
              Wrapped invoice creation in <code style={{ fontFamily: "var(--mono)", fontSize: "13px" }}>atomic()</code> blocks, added <code style={{ fontFamily: "var(--mono)", fontSize: "13px" }}>select_for_update()</code> on the lookup, and added a DB-level unique constraint as the final guard. Zero duplicates since deploy.
            </p>
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
    <section className="section" id="services" data-screen-label="05 Services">
      <div className="section-head">
        <span className="section-num">04</span>
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

function OpenSource() {
  const packages = [
    {
      name: "django-notebook-config",
      version: "v0.1.1",
      released: "Nov 28, 2024",
      license: "MIT",
      requires: "Python ≥ 3.6",
      pip: "pip install django-notebook-config",
      pypi: "https://pypi.org/project/django-notebook-config/",
      github: "https://github.com/WazedKhan/django-notebook-config",
      problem: "Running Django ORM queries inside Jupyter notebooks meant spinning up a full shell or server just to inspect data — a painful context switch during debugging.",
      solution: "Wires Django's ORM directly into IDE Jupyter Notebooks via a single init_django() call. One install, one import, zero context switching. Supports VS Code + JetBrains.",
      tags: ["Python", "Django", "Jupyter", "PyPI", "MIT"],
      snippet: (
        <code>
          <span className="token-keyword">from</span> django_notebook_config <span className="token-keyword">import</span> init_django{"\n"}
          init_django(project_name=&quot;config&quot;){"\n"}
          <span className="token-comment"># Now use Django ORM directly in the notebook</span>{"\n"}
          <span className="token-keyword">from</span> myapp.models <span className="token-keyword">import</span> User{"\n"}
          users = User.objects.filter(is_active=True)
        </code>
      ),
    },
    {
      name: "static-type-enforcer",
      version: "v0.1.0",
      released: "Nov 20, 2024",
      license: "MIT",
      requires: "Python ≥ 3.7",
      pip: "pip install static-type-enforcer",
      pypi: "https://pypi.org/project/static-type-enforcer/",
      github: "https://github.com/WazedKhan/enforcer",
      problem: "Python type hints are documentation by default — they don't stop bad arguments from reaching your functions at runtime.",
      solution: "A lightweight decorator library (zero dependencies) that enforces type hints at runtime, raising TypeError automatically. No Pydantic, no mypy CI required.",
      tags: ["Python", "Type safety", "Decorator", "PyPI", "MIT"],
      snippet: (
        <code>
          <span className="token-keyword">from</span> enforcer <span className="token-keyword">import</span> enforce_types{"\n\n"}
          @enforce_types{"\n"}
          <span className="token-keyword">def</span> greet(name: str, age: int):{"\n"}
          {"    "}<span className="token-keyword">print</span>(f&quot;{"{"}name{"}"} is {"{"}age{"}"} years old!&quot;){"\n\n"}
          greet(&quot;Alice&quot;, &quot;twenty-five&quot;)  <span className="token-comment"># raises TypeError</span>
        </code>
      ),
    },
  ];

  return (
    <section className="section" id="opensource" data-screen-label="06 Open source">
      <div className="section-head">
        <span className="section-num">05</span>
        <span className="section-label">Open source</span>
        <span className="section-rule" />
      </div>

      <h2 className="section-title" style={{ marginBottom: "36px" }}>
        Published packages — <em>solving real developer pain.</em>
      </h2>

      <div className="oss-list">
        {packages.map((pkg) => (
          <article key={pkg.name} className="oss-card">
            <div className="oss-card-head">
              <h3 className="oss-name">{pkg.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                <span className="chip chip-static mono">{pkg.version}</span>
                <div className="oss-links">
                  <a href={pkg.pypi} className="chip mono" target="_blank" rel="noreferrer">PyPI ↗</a>
                  <a href={pkg.github} className="chip mono" target="_blank" rel="noreferrer">GitHub ↗</a>
                </div>
              </div>
            </div>
            <div className="oss-meta-row">
              Released: {pkg.released} · {pkg.license} · {pkg.requires}
            </div>
            <div className="oss-pip-row">
              <span className="oss-pip">{pkg.pip}</span>
              <button
                type="button"
                className="oss-copy-btn"
                onClick={(e) => {
                  navigator.clipboard.writeText(pkg.pip).then(() => {
                    const btn = e.currentTarget;
                    btn.textContent = "Copied!";
                    setTimeout(() => {
                      btn.textContent = "Copy";
                    }, 1500);
                  });
                }}
              >
                Copy
              </button>
            </div>
            <div className="oss-body">
              <div className="oss-col">
                <div className="label">The problem</div>
                <p>{pkg.problem}</p>
              </div>
              <div className="oss-col">
                <div className="label">The solution</div>
                <p>{pkg.solution}</p>
              </div>
            </div>
            <div className="oss-snippet">{pkg.snippet}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {pkg.tags.map((t) => (
                <span key={t} className="chip chip-static mono">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "24px" }}>
        <a className="press-link" href="https://github.com/WazedKhan?tab=repositories" target="_blank" rel="noreferrer">
          104 public repositories on GitHub ↗
        </a>
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
    <section className="section" id="now" data-screen-label="08 Now">
      <div className="section-head">
        <span className="section-num">07</span>
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
  const articles = [
    {
      n: "01",
      href: "https://medium.com/@wazedkhan111024/solving-a-mystery-using-sql-a-detectives-journey-through-databases-and-clues-e9daf70c2bc1",
      title: "Solving a Mystery Using SQL — a detective's journey through databases",
      tag: "SQL",
      hint: "11 min read",
      outlet: "Medium",
      date: "Nov 2024",
    },
    {
      n: "02",
      href: "https://medium.com/@wazedkhan111024/sub-classing-pythons-extending-built-in-immutable-classes-in-python-a06c9ecb759d",
      title: "Sub-classing Python's built-in immutable classes",
      tag: "Python",
      hint: "4 min read",
      outlet: "Medium",
      date: "Jul 2024",
    },
    {
      n: "03",
      href: "https://medium.com/@wazedkhan111024/pythons-new-method-crafting-objects-with-precision-862f29af31c8",
      title: "Python's __new__ — crafting objects with precision",
      tag: "Python",
      hint: "2 min read",
      outlet: "Medium",
      date: "Jun 2024",
    },
  ];

  const repos = [
    {
      n: "01",
      href: "https://app.grainmarketplace.com.au/",
      title: "Grain Marketplace — AU grain trading (live)",
      tag: "Product",
      hint: "Client ship",
      outlet: "Web",
      date: "—",
    },
    {
      n: "02",
      href: "https://orps.sstu.ac.bd/login",
      title: "Unisphere (ORPS) — SSTU results portal",
      tag: "EdTech",
      hint: "Live",
      outlet: "Web",
      date: "—",
    },
    {
      n: "03",
      href: "https://pypi.org/project/django-notebook-config/",
      title: "django-notebook-config — PyPI package",
      tag: "Python",
      hint: "Published",
      outlet: "PyPI",
      date: "—",
    },
    {
      n: "04",
      href: "https://pypi.org/project/static-type-enforcer/",
      title: "static-type-enforcer — PyPI package",
      tag: "Python",
      hint: "Published",
      outlet: "PyPI",
      date: "—",
    },
    {
      n: "05",
      href: "https://github.com/WazedKhan/NovaCart",
      title: "NovaCart — microservices sandbox (Go)",
      tag: "Go",
      hint: "Repository",
      outlet: "GitHub",
      date: "—",
    },
    {
      n: "06",
      href: "https://github.com/WazedKhan/Problems",
      title: "Problems — DSA & platforms",
      tag: "Python",
      hint: "Repository",
      outlet: "GitHub",
      date: "—",
    },
    {
      n: "07",
      href: "https://github.com/WazedKhan/Go-Playground",
      title: "Go-Playground — snippets & exercises",
      tag: "Go",
      hint: "Repository",
      outlet: "GitHub",
      date: "—",
    },
  ];

  const row = (p) => (
    <a key={`${p.n}-${p.href}`} href={p.href} className="writing-row" target="_blank" rel="noreferrer">
      <span className="mono dim">{p.n}</span>
      <span className="writing-title">{p.title}</span>
      <span className="mono dim">{p.tag}</span>
      <span className="mono dim">{p.hint}</span>
      <span className="mono dim">{p.outlet || "GitHub"}</span>
      <span className="mono dim">{p.date}</span>
      <span className="writing-arrow">↗</span>
    </a>
  );

  return (
    <section className="section" id="writing" data-screen-label="07 Code & writing">
      <div className="section-head">
        <span className="section-num">06</span>
        <span className="section-label">Code & writing</span>
        <span className="section-rule" />
      </div>

      <h2 className="section-title" style={{ marginBottom: "36px" }}>
        Public code, published packages &amp; <em>technical writing.</em>
      </h2>

      <div className="label" style={{ marginBottom: "12px" }}>Medium articles</div>
      <div className="writing-list">
        {articles.map(row)}
      </div>

      <div style={{ padding: "20px 0 12px", borderTop: "1px solid var(--line)" }} className="label">
        Repositories &amp; live products
      </div>
      <div className="writing-list">
        {repos.map(row)}
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
    <section className="section" id="testimonials" data-screen-label="09 Snapshot">
      <div className="section-head">
        <span className="section-num">08</span>
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
    <section className="section" id="press" data-screen-label="10 Links">
      <div className="section-head">
        <span className="section-num">09</span>
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
      note: "93% API performance improvement (30s → 2s) and race condition fix for 4,500 users (select_for_update + atomic transactions). Building Go/Echo wrapper service… PropCloud, then Placepoint — same employer. On PropCloud: legacy property APIs and migration toward CDDV2. On Placepoint: Go microservices, GraphQL Federation (gqlgen + Apollo Router), MongoDB aggregations, FastAPI/CDDV2, Docker, GitHub Actions on AWS, Slack-integrated CI tuned to team timezone.",
    },
    {
      year: "Previously",
      role: "Acting Tech Lead",
      org: "Repliq Limited",
      note: "HealthOS — technical leadership and engineering delivery in an acting tech lead role before joining Softwrd Limited.",
    },
    {
      year: "Jul 2022–Jan 2023",
      role: "Programming Mentor",
      org: "Kodeeo Limited",
      note: "Mentored 10 students in backend and full-stack development using Django — ORM usage, API design, RESTful architecture. Supervised end-to-end projects from backend through frontend integration.",
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
    {
      year: "Education",
      role: "BSc Computer Science & Engineering",
      org: "IUBAT – International University of Business Agriculture and Technology, Dhaka",
      note: "Computer Science and Engineering — foundational degree underpinning 3+ years of production backend work.",
    },
  ];

  return (
    <section className="section" id="resume" data-screen-label="11 Resume">
      <div className="section-head">
        <span className="section-num">10</span>
        <span className="section-label">Résumé</span>
        <span className="section-rule" />
        <a href="https://www.linkedin.com/in/abdulwajedkhan" target="_blank" rel="noreferrer" className="mono link">LinkedIn CV ↗</a>
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
    <section className="section section-contact" id="contact" data-screen-label="12 Contact">
      <div className="section-head">
        <span className="section-num">11</span>
        <span className="section-label">Contact</span>
        <span className="section-rule" />
      </div>

      <h2 className="contact-title">
        Let&apos;s talk systems — <em>Python, Go, or GraphQL.</em>
      </h2>

      <div style={{ marginBottom: "12px" }} className="mono dim">
        Open to relocation · Remote · Available immediately for interviews
      </div>

      <div className="contact-grid">
        <a className="contact-card" href="mailto:wajed.abdul.khan@gmail.com">
          <div className="label">Email</div>
          <div className="contact-val">wajed.abdul.khan@gmail.com</div>
        </a>
        <a className="contact-card" href="https://www.linkedin.com/in/abdulwajedkhan" target="_blank" rel="noreferrer">
          <div className="label">LinkedIn</div>
          <div className="contact-val">Abdul Wajed Khan</div>
        </a>
        <a className="contact-card" href="https://github.com/WazedKhan" target="_blank" rel="noreferrer">
          <div className="label">GitHub</div>
          <div className="contact-val">@WazedKhan</div>
        </a>
        <a className="contact-card" href="tel:+8801775070922">
          <div className="label">Phone / WhatsApp</div>
          <div className="contact-val">+880 1775 070922</div>
        </a>
        <a className="contact-card" href="https://softwrd.ai" target="_blank" rel="noreferrer">
          <div className="label">Employer</div>
          <div className="contact-val">Softwrd Limited</div>
        </a>
        <div className="contact-card contact-card-static">
          <div className="label">Location</div>
          <div className="contact-val" style={{ fontSize: "22px" }}>Dhaka, Bangladesh</div>
          <div className="mono dim" style={{ fontSize: "11px" }}>Open to global relocation</div>
        </div>
      </div>

      <footer className="footer">
        <div className="mono dim">© 2026 Abdul Wajed Khan</div>
        <div className="mono dim">GitHub Pages · React + hand-tuned CSS</div>
        <a href="#home" className="mono dim link">↑ back to top</a>
      </footer>
    </section>
  );
}

Object.assign(window, { About, ImpactMetrics, Services, OpenSource, Now, Writing, Testimonials, Press, Resume, Contact });
