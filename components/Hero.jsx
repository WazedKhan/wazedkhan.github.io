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

  React.useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const githubYears = () => {
    const start = new Date("2019-06-14T00:00:00Z");
    const now = new Date();
    const ms = now - start + count * 1000;
    const y = (ms / (365.25 * 86400 * 1000)).toFixed(2);
    return `${y} yrs on GitHub`;
  };

  return (
    <section className="hero" id="home" data-screen-label="01 Hero">
      <div className="hero-status">
        <span className="dot" aria-hidden />
        <span>BACKEND ENGINEER · SOFWRD LTD</span>
        <span className="hero-status-sep">/</span>
        <span>DHAKA, BD · UTC+6</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-eyebrow">— Python, Django &amp; Go</span>
        <span className="hero-line-1">
          <em>Microservices</em> that ship,
        </span>
        <span className="hero-line-2">
          <em>GraphQL</em> that scales.
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
          <div className="label">GitHub</div>
          <div className="mono">{githubYears()}</div>
        </div>
        <div className="hero-meta-col">
          <div className="label">Focus</div>
          <div className="mono">Placepoint · Go · Federation · MongoDB · AWS</div>
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
