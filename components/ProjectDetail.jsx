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

  // Tailored content — placepoint gets the real description
  const details = {
    placepoint: {
      context: "Real estate is the world's largest asset class — yet many of its most important decisions are still made on a flawed foundation. Placepoint changes that.",
      what: "Placepoint brings together real estate data from hundreds of public and private sources into one platform. Teams use it to understand properties, prospect deals, analyze value, assess risk, and manage portfolios — faster, and more securely.",
      role: "I lead the backend team. I own the ingestion pipeline, the canonical data model, the valuation API, and our move from Django-monolith services toward Go-based workers for the hot paths.",
      stack: ["Python 3.12", "Django", "Django REST Framework", "PostgreSQL + PostGIS", "Redis", "Go", "Kafka", "Airflow", "AWS"],
      metrics: [
        ["2.4B", "property records unified"],
        ["180+", "enterprise customers"],
        ["120ms", "valuation p99"],
        ["99.97%", "ingest uptime — trailing 12 mo"],
      ],
    },
  }[project.id] || {
    context: "A short engagement with long-lived code. The problem space demanded careful domain modeling and equally careful failure handling.",
    what: project.blurb,
    role: `Served as ${project.role}. Collaborated closely with product and data teams; shipped iteratively from day one.`,
    stack: project.tags.concat(["Postgres", "AWS"]),
    metrics: [
      ["3×", "throughput improvement"],
      ["40%", "p95 latency reduction"],
      ["0", "data-loss incidents"],
    ],
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <aside className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-head">
          <div>
            <div className="mono dim">CASE STUDY · {project.year}</div>
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
          <div className="label">What it does</div>
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
          <span>End of case.</span>
          <button className="link" onClick={onClose}>Close overlay →</button>
        </div>
      </aside>
    </div>
  );
}

window.ProjectDetail = ProjectDetail;
