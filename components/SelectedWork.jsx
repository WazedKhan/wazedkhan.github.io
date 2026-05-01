// Selected work — day job (Placepoint) + public GitHub
const PROJECTS = [
  {
    id: "placepoint",
    year: "Present",
    title: "Placepoint",
    role: "Backend · Softwrd Ltd",
    tags: ["Go", "GraphQL", "MongoDB", "AWS"],
    blurb: "Real estate data platform at Softwrd Limited — Go microservices, federated GraphQL, integrations & valuation (after PropCloud).",
    color: "#b8612a",
    image: "placepoint",
    url: null,
    companyUrl: "https://softwrd.ai",
  },
  {
    id: "propcloud",
    year: "Prior @ Softwrd",
    title: "PropCloud",
    role: "Backend · Softwrd Ltd",
    tags: ["Python", "APIs", "Migration"],
    blurb: "Earlier chapter at the same employer — legacy property APIs, CDDV2 migration, and tracks that fed into today’s Placepoint stack.",
    color: "#9a6b42",
    image: "propcloud",
    url: null,
    companyUrl: "https://softwrd.ai",
  },
  {
    id: "grain-marketplace",
    year: "Handover",
    title: "Grain Marketplace",
    role: "Solo design + build",
    tags: ["Web", "Product", "UX"],
    blurb: "Australian grain trading app — farmer & buyer journeys from first sketch through build to client handover.",
    color: "#a67c32",
    image: "grain",
    url: "https://app.grainmarketplace.com.au/",
  },
  {
    id: "unisphere-orps",
    year: "Live",
    title: "Unisphere (ORPS)",
    role: "Engineering",
    tags: ["Web", "EdTech", "UX"],
    blurb: "SSTU online result publication system — secure login, account recovery, and bilingual student guidance.",
    color: "#3d6b8e",
    image: "unisphere",
    url: "https://orps.sstu.ac.bd/login",
  },
  {
    id: "novacart",
    year: "2025 —",
    title: "NovaCart",
    role: "Author",
    tags: ["Go", "Microservices", "Docker"],
    blurb: "E-commerce microservice sandbox — practice for distributed systems patterns I use in production.",
    color: "#5c7a9e",
    image: "novacart",
    url: "https://github.com/WazedKhan/NovaCart",
  },
  {
    id: "problems",
    year: "2021 —",
    title: "Problems",
    role: "Maintainer",
    tags: ["Python", "DSA", "LeetCode"],
    blurb: "Competitive programming and interview solutions — algorithms & data structures.",
    color: "#6b8f7a",
    image: "problems",
    url: "https://github.com/WazedKhan/Problems",
  },
  {
    id: "go-playground",
    year: "2025 —",
    title: "Go-Playground",
    role: "Author",
    tags: ["Go", "Learning"],
    blurb: "Experiments and exercises while deepening Go and concurrency.",
    color: "#6a9fb5",
    image: "go-play",
    url: "https://github.com/WazedKhan/Go-Playground",
  },
  {
    id: "portfolio-site",
    year: "2024 —",
    title: "wazedkhan.github.io",
    role: "Design + build",
    tags: ["JavaScript", "React", "CSS"],
    blurb: "This portfolio — static GitHub Pages, React via CDN, editorial layout.",
    color: "#8b7355",
    image: "portfolio",
    url: "https://github.com/WazedKhan/wazedkhan.github.io",
  },
  {
    id: "praxis",
    year: "2024 —",
    title: "praxis",
    role: "Author",
    tags: ["Python"],
    blurb: "Python practice and small utilities.",
    color: "#7a6b9e",
    image: "praxis",
    url: "https://github.com/WazedKhan/praxis",
  },
  {
    id: "docker-notes",
    year: "2024 —",
    title: "docker",
    role: "Notes",
    tags: ["Python", "DevOps"],
    blurb: "Docker-related scripts and learning material.",
    color: "#9e7a6b",
    image: "docker",
    url: "https://github.com/WazedKhan/docker",
  },
];

function PlaceholderArt({ kind, color }) {
  const bg = color + "22";
  if (kind === "placepoint") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={i * 30} y1="0" x2={i * 30} y2="280" stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
        ))}
        <rect x="120" y="80" width="60" height="120" fill={color} fillOpacity="0.3" />
        <rect x="185" y="60" width="60" height="140" fill={color} fillOpacity="0.48" />
        <rect x="250" y="100" width="50" height="100" fill={color} fillOpacity="0.35" />
        <circle cx="200" cy="40" r="6" fill={color} fillOpacity="0.7" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ placepoint — data plane ]</text>
      </svg>
    );
  }
  if (kind === "propcloud") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <ellipse cx="200" cy="95" rx="100" ry="28" fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1" />
        <ellipse cx="160" cy="118" rx="72" ry="22" fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.35" />
        <rect x="70" y="160" width="260" height="10" fill={color} fillOpacity="0.3" rx="1" />
        <rect x="90" y="182" width="100" height="8" fill={color} fillOpacity="0.22" />
        <rect x="210" y="182" width="100" height="8" fill={color} fillOpacity="0.18" />
        <rect x="110" y="205" width="180" height="6" fill={color} fillOpacity="0.15" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ propcloud — legacy → cdd ]</text>
      </svg>
    );
  }
  if (kind === "grain") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <ellipse cx="200" cy="200" rx="160" ry="36" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
        <ellipse cx="200" cy="175" rx="120" ry="28" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 60 + (i % 8) * 36 + (Math.sin(i) * 6);
          const y = 95 + Math.floor(i / 8) * 22;
          return <circle key={i} cx={x} cy={y} r={2.2 + (i % 3)} fill={color} fillOpacity={0.25 + (i % 5) * 0.1} />;
        })}
        <rect x="165" y="48" width="70" height="52" fill={color} fillOpacity="0.25" stroke={color} strokeOpacity="0.5" rx="2" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ grain marketplace — AU ]</text>
      </svg>
    );
  }
  if (kind === "unisphere") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <path d="M 200 55 L 245 115 L 155 115 Z" fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
        <ellipse cx="200" cy="118" rx="48" ry="8" fill={color} fillOpacity="0.2" />
        <rect x="88" y="145" width="224" height="8" fill={color} fillOpacity="0.35" rx="1" />
        <rect x="88" y="162" width="180" height="6" fill={color} fillOpacity="0.22" rx="1" />
        <rect x="88" y="176" width="200" height="6" fill={color} fillOpacity="0.18" rx="1" />
        <rect x="88" y="198" width="120" height="28" fill="none" stroke={color} strokeOpacity="0.4" rx="3" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ orps — unisphere / sstu ]</text>
      </svg>
    );
  }
  if (kind === "portfolio") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <rect x="48" y="40" width="304" height="200" fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1" />
        <rect x="48" y="40" width="304" height="36" fill={color} fillOpacity="0.2" />
        <circle cx="70" cy="58" r="5" fill={color} fillOpacity="0.6" />
        <circle cx="92" cy="58" r="5" fill={color} fillOpacity="0.4" />
        <rect x="64" y="100" width="160" height="10" fill={color} fillOpacity="0.35" />
        <rect x="64" y="122" width="260" height="8" fill={color} fillOpacity="0.2" />
        <rect x="64" y="138" width="220" height="8" fill={color} fillOpacity="0.2" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ github pages — portfolio ]</text>
      </svg>
    );
  }
  if (kind === "novacart") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <rect x="70" y="90" width="90" height="70" fill={color} fillOpacity="0.35" stroke={color} />
        <rect x="180" y="70" width="90" height="90" fill={color} fillOpacity="0.5" stroke={color} />
        <rect x="290" y="100" width="70" height="60" fill={color} fillOpacity="0.28" stroke={color} />
        <path d="M 120 200 L 200 160 L 280 200" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ novacart — services ]</text>
      </svg>
    );
  }
  if (kind === "go-play") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <circle cx="200" cy="140" r="90" fill="none" stroke={color} strokeOpacity="0.5" strokeDasharray="2 4" />
        <circle cx="200" cy="140" r="50" fill="none" stroke={color} strokeOpacity="0.7" />
        <circle cx="200" cy="140" r="8" fill={color} />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ go — playground ]</text>
      </svg>
    );
  }
  if (kind === "problems") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        {Array.from({ length: 10 }).map((_, i) =>
          Array.from({ length: 6 }).map((_, j) => (
            <rect key={`${i}-${j}`} x={40 + i * 32} y={30 + j * 32} width="28" height="28" fill={color} fillOpacity={((i + j * 3) % 9) / 12} />
          ))
        )}
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ problems — dsa ]</text>
      </svg>
    );
  }
  if (kind === "praxis") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        <polyline points="20,220 70,180 110,190 160,120 210,140 260,80 320,100 380,50" fill="none" stroke={color} strokeWidth="2" />
        <polyline points="20,240 70,210 110,220 160,170 210,180 260,140 320,150 380,110" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ praxis — python ]</text>
      </svg>
    );
  }
  if (kind === "docker") {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="280" fill={bg} />
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <rect x="60" y={40 + i * 26} width="280" height="18" fill="none" stroke={color} strokeOpacity="0.6" />
            <rect x="66" y={46 + i * 26} width={60 + (i * 37) % 180} height="6" fill={color} fillOpacity="0.5" />
          </g>
        ))}
        <text x="20" y="268" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ docker — layers ]</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <rect width="400" height="280" fill={bg} />
      <text x="20" y="140" fontFamily="ui-monospace, monospace" fontSize="10" fill={color}>[ project ]</text>
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
        <span className="section-count mono">{filtered.length.toString().padStart(2, "0")} entries</span>
      </div>

      <h2 className="section-title">
        Employer work, <em>client delivery,</em> and open repos.
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
              <span>Details →</span>
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
