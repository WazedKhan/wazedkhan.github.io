// Tweaks panel — toggled from toolbar
function Tweaks({ state, setState, open, onClose }) {
  if (!open) return null;

  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));

  return (
    <div className="tweaks" role="dialog">
      <div className="tweaks-head">
        <span className="mono">Tweaks</span>
        <button onClick={onClose} aria-label="Close tweaks">×</button>
      </div>

      <div className="tweaks-row">
        <div className="label">Direction</div>
        <div className="tweaks-options">
          {[
            ["editorial", "Editorial"],
            ["terminal", "Terminal"],
            ["swiss", "Swiss"],
          ].map(([k, l]) => (
            <button
              key={k}
              className={`chip ${state.direction === k ? "chip-active" : ""}`}
              onClick={() => set("direction", k)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="mono dim tweaks-hint">Shifts fonts, layout and rhythm</div>
      </div>

      <div className="tweaks-row">
        <div className="label">Accent</div>
        <div className="tweaks-swatches">
          {[
            ["oxide", "oklch(0.62 0.14 45)"],
            ["moss", "oklch(0.58 0.08 145)"],
            ["indigo", "oklch(0.55 0.12 265)"],
            ["plum", "oklch(0.52 0.11 340)"],
            ["mono", "transparent"],
          ].map(([k, c]) => (
            <button
              key={k}
              className={`swatch ${state.accent === k ? "swatch-active" : ""}`}
              style={{ background: c === "transparent" ? "var(--fg)" : c }}
              onClick={() => set("accent", k)}
              title={k}
            />
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <div className="label">Display type</div>
        <div className="tweaks-options">
          {[
            ["instrument", "Instrument Serif"],
            ["fraktion", "Sans-display"],
            ["monodisplay", "Mono-display"],
          ].map(([k, l]) => (
            <button
              key={k}
              className={`chip ${state.displayFont === k ? "chip-active" : ""}`}
              onClick={() => set("displayFont", k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <div className="label">Density</div>
        <div className="tweaks-options">
          {[
            ["airy", "Airy"],
            ["default", "Default"],
            ["tight", "Tight"],
          ].map(([k, l]) => (
            <button
              key={k}
              className={`chip ${state.density === k ? "chip-active" : ""}`}
              onClick={() => set("density", k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <div className="label">Grain overlay</div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={state.grain}
            onChange={(e) => set("grain", e.target.checked)}
          />
          <span>{state.grain ? "On" : "Off"}</span>
        </label>
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
