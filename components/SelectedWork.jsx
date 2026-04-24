// Selected work — list of projects with hover reveal thumbnails anchored to cursor
const PROJECTS = [
  {
    id: "placepoint",
    year: "2024 —",
    title: "Placepoint",
    role: "Backend Lead",
    tags: ["Django", "Postgres", "Go", "ETL"],
    blurb: "Real estate intelligence — hundreds of sources, one platform.",
    color: "#b8612a",
    image: "placepoint",
  },
  {
    id: "orbit-ingest",
    year: "2024",
    title: "Orbit Ingest",
    role: "Staff Engineer",
    tags: ["Go", "Kafka", "Distributed"],
    blurb: "2.4B property events / week.",
    color: "#3a5a4a",
    image: "orbit",
  },
  {
    id: "valuation-api",
    year: "2023",
    title: "Valuation API v2",
    role: "Backend Engineer",
    tags: ["Django", "REST", "ML Ops"],
    blurb: "AVM serving 180+ clients. 120ms p99.",
    color: "#2d3e5c",
    image: "val",
  },
  {
    id: "prospector",
    year: "2023",
    title: "Prospector",
    role: "Full-stack",
    tags: ["Django", "Postgres", "GIS"],
    blurb: "Geospatial search for commercial brokers.",
    color: "#6b4d2a",
    image: "prosp",
  },
  {
    id: "audit-ledger",
    year: "2022",
    title: "Audit Ledger",
    role: "Backend Engineer",
    tags: ["Python", "Postgres", "Security"],
    blurb: "Cryptographically verifiable append-only log.",
    color: "#4a3a55",
    image: "audit",
  },
  {
    id: "risk-assessor",
    year: "2022",
    title: "Risk Assessor",
    role: "Contract",
    tags: ["Python", "Pandas"],
    blurb: "40+ factor risk scoring for a commercial lender.",
    color: "#5a3232",
    image: "risk",
  },
];

// Decorative placeholder — no real imagery. Varies by project id.
function PlaceholderArt({ kind, color }) {
  const bg = color + "22";
  if (kind === "placepoint") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={i * 30} y1="0" x2={i * 30} y2="280" stroke={color} strokeOpacity="0.25" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke={color} strokeOpacity="0.25" strokeWidth="0.5" />
        ))}
        <rect x="120" y="80" width="60" height="120" fill={color} fillOpacity="0.35" />
        <rect x="185" y="60" width="60" height="140" fill={color} fillOpacity="0.55" />
        <rect x="250" y="100" width="50" height="100" fill={color} fillOpacity="0.4" />
        <text x="20" y="260" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ placepoint — platform overview ]</text>
      </svg>
    );
  }
  if (kind === "orbit") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <circle cx="200" cy="140" r="90" fill="none" stroke={color} strokeOpacity="0.5" strokeDasharray="2 4" />
        <circle cx="200" cy="140" r="50" fill="none" stroke={color} strokeOpacity="0.7" />
        <circle cx="200" cy="140" r="8" fill={color} />
        <circle cx="290" cy="140" r="4" fill={color} />
        <circle cx="145" cy="95" r="3" fill={color} />
        <text x="20" y="260" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ orbit ingest — topology ]</text>
      </svg>
    );
  }
  if (kind === "val") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <polyline points="20,220 70,180 110,190 160,120 210,140 260,80 320,100 380,50" fill="none" stroke={color} strokeWidth="2" />
        <polyline points="20,240 70,210 110,220 160,170 210,180 260,140 320,150 380,110" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
        <text x="20" y="260" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ valuation api — p99 trend ]</text>
      </svg>
    );
  }
  if (kind === "prosp") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <path d="M 40 80 L 120 50 L 200 90 L 280 60 L 360 100 L 360 220 L 40 220 Z" fill={color} fillOpacity="0.25" stroke={color} />
        <circle cx="160" cy="150" r="6" fill={color} />
        <circle cx="240" cy="130" r="4" fill={color} />
        <circle cx="300" cy="170" r="5" fill={color} />
        <text x="20" y="260" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ prospector — tiles ]</text>
      </svg>
    );
  }
  if (kind === "audit") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <rect x="60" y={40 + i * 26} width="280" height="18" fill="none" stroke={color} strokeOpacity="0.6" />
            <rect x="66" y={46 + i * 26} width={60 + (i * 37) % 180} height="6" fill={color} fillOpacity="0.5" />
          </g>
        ))}
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ audit ledger — entries ]</text>
      </svg>
    );
  }
  // risk
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <rect width="400" height="280" fill={bg} />
      {Array.from({ length: 10 }).map((_, i) =>
        Array.from({ length: 6 }).map((_, j) => (
          <rect key={`${i}-${j}`} x={40 + i * 32} y={30 + j * 32} width="28" height="28" fill={color} fillOpacity={((i + j * 3) % 9) / 10} />
        ))
      )}
      <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ risk assessor — heatmap ]</text>
    </svg>
  );
}

function SelectedWork({ onOpen }) {
  const [filter, setFilter] = React.useState("All");
  const [hover, setHover] = React.useState(null);
  const [cursor, setCursor] = React.useState({ x: 0, y: 0 });
  const listRef = React.useRef(null);

  const allTags = React.useMemo(() => {
    const t = new Set(["All"]);
    PROJECTS.forEach((p) => p.tags.forEach((tag) => t.add(tag)));
    return [...t];
  }, []);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  const onMove = (e) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="section" id="work" data-screen-label="02 Work">
      <div className="section-head">
        <span className="section-num">01</span>
        <span className="section-label">Selected Work</span>
        <span className="section-rule" />
        <span className="section-count mono">{filtered.length.toString().padStart(2, "0")} projects</span>
      </div>

      <h2 className="section-title">
        Systems that shipped — <em>still running.</em>
      </h2>

      <div className="work-filters">
        <span className="mono dim">Filter:</span>
        {allTags.map((t) => (
          <button
            key={t}
            className={`chip ${filter === t ? "chip-active" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="work-list" ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {filtered.map((p, i) => (
          <button
            key={p.id}
            className="work-row"
            onMouseEnter={() => setHover(p)}
            onClick={() => onOpen(p)}
          >
            <span className="work-row-num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="work-row-title">{p.title}</span>
            <span className="work-row-role mono">{p.role}</span>
            <span className="work-row-year mono">{p.year}</span>
            <span className="work-row-arrow">↗</span>
          </button>
        ))}

        {hover && (
          <div
            className="work-preview"
            style={{
              transform: `translate(${cursor.x + 24}px, ${cursor.y - 80}px)`,
            }}
          >
            <div className="work-preview-art" style={{ background: hover.color + "10" }}>
              <PlaceholderArt kind={hover.image} color={hover.color} />
            </div>
            <div className="work-preview-meta mono">
              <span>{hover.tags.join(" · ")}</span>
              <span>View case →</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

window.SelectedWork = SelectedWork;
window.PROJECTS = PROJECTS;
window.PlaceholderArt = PlaceholderArt;
