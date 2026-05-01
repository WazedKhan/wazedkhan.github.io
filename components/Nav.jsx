// Top navigation — minimal, with section index + theme toggle
function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["01", "Work", "#work"],
    ["02", "About", "#about"],
    ["03", "Skills", "#services"],
    ["04", "Repos", "#writing"],
    ["05", "Now", "#now"],
    ["06", "Contact", "#contact"],
  ];

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a href="#home" className="nav-mark">
        <span className="nav-mark-box">AWK</span>
        <span className="nav-mark-name">/ Backend · Softwrd Ltd</span>
      </a>
      <ul className="nav-links">
        {links.map(([n, label, href]) => (
          <li key={n}>
            <a href={href}>
              <span className="nav-num">{n}</span>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-theme" onClick={onToggleTheme} aria-label="Toggle theme">
        <span className="nav-theme-dot" data-on={theme === "dark"} />
        <span className="mono">{theme === "dark" ? "DARK" : "LIGHT"}</span>
      </button>
    </nav>
  );
}

window.Nav = Nav;
