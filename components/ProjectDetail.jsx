// Project detail overlay that slides in from the right
function ProjectDetail({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const tailored = {
    placepoint: {
      context:
        "Placepoint is the real estate data platform I work on as an employee of Softwrd Limited (softwrd.ai) — Go microservices, MongoDB-heavy workloads, and federated GraphQL. I joined this product after shipping work on PropCloud at the same company.",
      what:
        "Integration and ingestion live in placepoint-integration-service (third-party APIs, valuation, data intake). Property access includes v2-property-service — a gqlgen subgraph federated through Apollo Router. Elsewhere we wire FastAPI/CDDV2 services with Poetry and uv, MongoDB aggregations (including GeoJSON and fields like housing type, price, and area), Docker, GitHub Actions on AWS, and Rover for supergraph operations.",
      role:
        "I ship and debug production paths end to end: gqlgen interface issues, supergraph drift causing 422 validation failures (fixed via subgraph publish + supergraph compose), propCloud → CDDV2 migrations with Linear-tracked debt, nil-pointer panics in request models, errors.Is mismatches against plain-string HTTP errors, wrapped JSON responses in comparable-plots (exported struct fields, int64 → float64), and CI with govulncheck, AWS OIDC, Slack notifications, and cron tuned to our Sunday–Thursday Asia/Dhaka cadence.",
      stack: [
        "Go",
        "gqlgen",
        "GraphQL Federation",
        "Apollo Router",
        "Rover CLI",
        "MongoDB",
        "FastAPI",
        "Python (CDDV2)",
        "Poetry / uv",
        "Docker",
        "GitHub Actions",
        "AWS",
      ],
      metrics: [
        ["Go", "microservices"],
        ["Fed", "GraphQL"],
        ["Mongo", "aggregations"],
        ["CI", "Actions + AWS"],
      ],
    },
    propcloud: {
      context:
        "PropCloud is the earlier real-estate data surface I worked on as a backend engineer at Softwrd Limited — before my focus shifted fully to Placepoint. Same employer, different chapter of the product roadmap.",
      what:
        "PropCloud centered on legacy property APIs and ingestion paths that later needed a disciplined move toward CDDV2 (newer FastAPI/Python services). That migration work — auditing calls, porting confirmed endpoints, ticketing stragglers — is the bridge many of us crossed on the way to today’s Go-forward architecture.",
      role:
        "I contributed backend engineering on PropCloud: legacy API usage, migration into CDDV2 where confirmed, and coordination with product and infra so Placepoint could inherit cleaner contracts.",
      stack: ["Python", "FastAPI (CDDV2)", "Legacy APIs", "MongoDB", "Migration / tech debt"],
      metrics: [
        ["Softwrd", "same employer"],
        ["Prior", "before Placepoint"],
        ["API", "migration focus"],
        ["CDD", "target stack"],
      ],
    },
    "grain-marketplace": {
      context:
        "Grain Marketplace (app.grainmarketplace.com.au) is an Australian web product that connects grain farmers and buyers — onboarding asks whether you are selling or sourcing before you enter the marketplace.",
      what:
        "The live app at app.grainmarketplace.com.au supports distinct farmer and buyer paths (sell grain vs. find deals). I owned the product end to end: experience design, UI, implementation, and delivery up to handover to the client team.",
      role:
        "Solo designer and developer — from first concepts through production-ready release and transition. After handover, ongoing ownership sits with the client.",
      stack: ["Product & UX design", "Responsive web app", "End-to-end delivery", "Client handover"],
      metrics: [
        ["Solo", "design + dev"],
        ["AU", "grain sector"],
        ["Live", "production app"],
        ["Done", "handed over"],
      ],
    },
    "unisphere-orps": {
      context:
        "Unisphere powers ORPS — the online result publication system for SSTU (orps.sstu.ac.bd). Students and staff sign in through a dedicated portal with password recovery and Bengali-language guidance alongside English.",
      what:
        "The login experience centers on secure access to published academic results: email and password authentication, forgot-password flow, and instructional copy for users who need help regaining access.",
      role:
        "I contributed engineering work across the university result system — building and refining parts of the web product so it stays reliable for peak result seasons and everyday academic use.",
      stack: ["Web application", "Authentication flows", "Bilingual UI (EN / BN)", "EdTech / results publication"],
      metrics: [
        ["SSTU", "institution"],
        ["ORPS", "result system"],
        ["Live", "orps.sstu.ac.bd"],
        ["Web", "student-facing"],
      ],
    },
    novacart: {
      context: "NovaCart is a sandbox for e-commerce–shaped microservices — a place to rehearse patterns that show up in production systems.",
      what: "Go services, containers, and boundaries I iterate on while learning distributed systems in depth.",
      role: "Solo author; complements my day-to-day work on Placepoint without sharing proprietary code.",
      stack: ["Go", "Docker", "Microservices", "REST/gRPC (as applicable)"],
      metrics: [
        ["Go", "primary language"],
        ["Micro", "service-shaped"],
        ["OSS", "public on GitHub"],
        ["Learn", "side project"],
      ],
    },
    problems: {
      context: "Competitive programming and interview prep reward repetition — this repo is my long-running scratchpad for solutions.",
      what: "Python solutions across platforms (LeetCode, Codeforces, HackerRank, InterviewBit) with a focus on clarity and patterns.",
      role: "I maintain the collection as I practice — problems, topics, and notes accumulate over time.",
      stack: ["Python", "Algorithms", "Data structures"],
      metrics: [
        ["Python", "main stack"],
        ["DSA", "core focus"],
        ["OSS", "public repo"],
        ["3", "GitHub stars"],
      ],
    },
    "go-playground": {
      context: "Go rewards small programs that compile fast and read clearly — this repo holds mine.",
      what: "Snippets, exercises, and experiments written while learning the language, concurrency, and the standard library.",
      role: "Personal playground — no production pretense, just honest practice.",
      stack: ["Go"],
      metrics: [
        ["Go", "language"],
        ["Learn", "primary goal"],
        ["OSS", "GitHub"],
        ["2025", "started"],
      ],
    },
    "portfolio-site": {
      context: "A personal site should feel like the person — this one is built to be lightweight on GitHub Pages and easy to iterate.",
      what: "Single-page portfolio with React (UMD), Babel in the browser, and CSS variables for theme and accent tweaks.",
      role: "Design and implementation are mine; content tracks how I work and what I ship.",
      stack: ["JavaScript", "React 18", "CSS", "GitHub Pages"],
      metrics: [
        ["Static", "Pages-ready"],
        ["React", "no bundler"],
        ["OSS", "source open"],
        ["You", "are here"],
      ],
    },
    praxis: {
      context: "Small Python projects and scripts that do not deserve their own org-level repo still deserve a home.",
      what: "Utilities, exercises, and miscellany in Python — a grab bag that stays honest about scope.",
      role: "Solo author; I add to it when something is too small for a standalone project.",
      stack: ["Python"],
      metrics: [
        ["Python", "focus"],
        ["Misc", "small tools"],
        ["OSS", "public"],
        ["Iter", "ongoing"],
      ],
    },
    "docker-notes": {
      context: "Containers bridge dev and ops — I keep scripts and notes here while learning the ecosystem.",
      what: "Docker-related Python utilities and experiments from coursework or self-study.",
      role: "Personal reference repo; grows as I touch new tooling.",
      stack: ["Python", "Docker"],
      metrics: [
        ["Docker", "topic"],
        ["Python", "glue code"],
        ["Notes", "learning"],
        ["OSS", "GitHub"],
      ],
    },
  }[project.id];

  const details = tailored || {
    context: "Open source work on my GitHub profile.",
    what: project.blurb,
    role: `${project.role}. See the repository for structure, issues, and commits.`,
    stack: project.tags,
    metrics: [
      ["OSS", "public repo"],
      ["GitHub", "WazedKhan"],
      ["BD", "Dhaka-based"],
      ["→", "open link below"],
    ],
  };

  const externalHref = project.url || project.companyUrl;
  const urlIsGithub = project.url && String(project.url).includes("github.com");
  let externalLabel = null;
  if (project.url) {
    externalLabel = urlIsGithub ? "View on GitHub ↗" : "Open live app ↗";
  } else if (project.companyUrl) {
    externalLabel = "softwrd.ai ↗";
  }

  const headBadge = project.url && !urlIsGithub ? "PRODUCT" : project.url ? "PROJECT" : "WORK";

  return (
    <div className="detail-overlay" onClick={onClose}>
      <aside className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-head">
          <div>
            <div className="mono dim">{headBadge} · {project.year}</div>
            <h3 className="detail-title">{project.title}</h3>
          </div>
          <button className="detail-close" onClick={onClose} aria-label="Close">
            <span className="mono">ESC</span>
            <span>×</span>
          </button>
        </div>

        <div className="detail-hero" style={{ background: project.color + "14" }}>
          <PlaceholderArt kind={project.image} color={project.color} />
        </div>

        <div className="detail-grid">
          <div className="detail-meta">
            <div className="label">Role</div>
            <div>{project.role}</div>
          </div>
          <div className="detail-meta">
            <div className="label">Year</div>
            <div className="mono">{project.year}</div>
          </div>
          <div className="detail-meta">
            <div className="label">Tags</div>
            <div className="mono">{project.tags.join(" · ")}</div>
          </div>
        </div>

        <div className="detail-section">
          <div className="label">Context</div>
          <p>{details.context}</p>
        </div>

        <div className="detail-section">
          <div className="label">What it is</div>
          <p>{details.what}</p>
        </div>

        <div className="detail-section">
          <div className="label">My role</div>
          <p>{details.role}</p>
        </div>

        <div className="detail-section">
          <div className="label">Stack</div>
          <div className="detail-stack">
            {details.stack.map((s) => (
              <span key={s} className="chip chip-static mono">{s}</span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <div className="label">Signals</div>
          <div className="detail-metrics">
            {details.metrics.map(([n, l]) => (
              <div key={l} className="detail-metric">
                <div className="detail-metric-n">{n}</div>
                <div className="mono dim">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-footer mono">
          {externalHref && externalLabel ? (
            <a className="link" href={externalHref} target="_blank" rel="noreferrer">{externalLabel}</a>
          ) : (
            <span>End of summary.</span>
          )}
          <button className="link" type="button" onClick={onClose}>Close overlay →</button>
        </div>
      </aside>
    </div>
  );
}

window.ProjectDetail = ProjectDetail;
