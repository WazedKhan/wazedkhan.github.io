// Custom crosshair cursor that tracks the mouse and swells on interactive elements
function Cursor() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [active, setActive] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return setActive(false);
      setActive(!!el.closest('a, button, [data-cursor="hover"], input, textarea'));
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  const size = active ? 44 : 18;
  return (
    <div
      className="cc-cursor"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: size,
        height: size,
        opacity: hidden ? 0 : 1,
      }}
    >
      <div className="cc-cursor-inner" data-active={active}>
        <span className="cc-cursor-tick cc-cursor-tick-t" />
        <span className="cc-cursor-tick cc-cursor-tick-b" />
        <span className="cc-cursor-tick cc-cursor-tick-l" />
        <span className="cc-cursor-tick cc-cursor-tick-r" />
      </div>
    </div>
  );
}

window.Cursor = Cursor;
