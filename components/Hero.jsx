// Hero with animated title + status strip
function Hero() {
  const [count, setCount] = React.useState(0);
  const fullName = "Abdul Wajed Khan.";
  const [typed, setTyped] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  // Fake "uptime" counter for the status strip
  React.useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const uptime = () => {
    const base = 1147 * 86400 + count; // ~3.1 years
    const d = Math.floor(base / 86400);
    const h = Math.floor((base % 86400) / 3600);
    const m = Math.floor((base % 3600) / 60);
    const s = base % 60;
    return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  };

  return (
    <section className="hero" id="home" data-screen-label="01 Hero">
      <div className="hero-status">
        <span className="dot" aria-hidden />
        <span>AVAILABLE FOR NEW ENGAGEMENTS — Q3 2026</span>
        <span className="hero-status-sep">/</span>
        <span>BENGALURU, IN · UTC+5:30</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-eyebrow">— Backend engineer</span>
        <span className="hero-line-1">
          <em>Python</em>, <em>Django</em>,
        </span>
        <span className="hero-line-2">
          increasingly <em>Go.</em>
        </span>
      </h1>

      <div className="hero-meta">
        <div className="hero-meta-col">
          <div className="label">Signed</div>
          <div className="sig">
            {typed}
            <span className="caret">▍</span>
          </div>
        </div>
        <div className="hero-meta-col">
          <div className="label">Uptime</div>
          <div className="mono">{uptime()}</div>
        </div>
        <div className="hero-meta-col">
          <div className="label">Focus</div>
          <div className="mono">Distributed systems · APIs · Data platforms</div>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="mono">↓ scroll</span>
        <span className="mono">00 — index</span>
      </div>
    </section>
  );
}

window.Hero = Hero;
