// Mochi's voice, synthesized with Web Audio (no audio files to download).
// Browsers only allow sound after the visitor has clicked or tapped the page.
let ctx = null;
let muted = false;
try { muted = localStorage.getItem("mochi-sound") === "off"; } catch (e) {}

function audio() {
  if (muted) return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx.state === "running" ? ctx : null;
}

export const isMuted = () => muted;
export function setMuted(m) {
  muted = m;
  try { localStorage.setItem("mochi-sound", m ? "off" : "on"); } catch (e) {}
}

let purrUntil = 0;
export function purr(dur = 1.8) {
  const c = audio(); if (!c) return;
  const t = c.currentTime;
  if (t < purrUntil - 0.3) return; // already purring
  purrUntil = t + dur;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource(); src.buffer = buf;
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 160; lp.Q.value = 1.2;
  const pulse = c.createGain(); pulse.gain.value = 0.5;
  const lfo = c.createOscillator(); lfo.frequency.value = 24 + Math.random() * 4;
  const depth = c.createGain(); depth.gain.value = 0.5;
  lfo.connect(depth).connect(pulse.gain);
  const out = c.createGain();
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(0.9, t + 0.25);
  out.gain.setValueAtTime(0.9, t + dur - 0.4);
  out.gain.linearRampToValueAtTime(0, t + dur);
  src.connect(lp).connect(pulse).connect(out).connect(c.destination);
  src.start(t); lfo.start(t); src.stop(t + dur); lfo.stop(t + dur);
}

// short = a little "mrrp" instead of a full meow
export function meow(short = false) {
  const c = audio(); if (!c) return;
  const t = c.currentTime;
  const p = 0.9 + Math.random() * 0.25;
  const len = short ? 0.22 : 0.55;
  const o = c.createOscillator(); o.type = "sawtooth";
  o.frequency.setValueAtTime(480 * p, t);
  o.frequency.linearRampToValueAtTime((short ? 640 : 820) * p, t + len * 0.3);
  o.frequency.linearRampToValueAtTime(560 * p, t + len);
  const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 3.5;
  bp.frequency.setValueAtTime(800, t);
  bp.frequency.linearRampToValueAtTime(1700, t + len * 0.3);
  bp.frequency.linearRampToValueAtTime(1000, t + len);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.16, t + 0.04);
  g.gain.linearRampToValueAtTime(0.11, t + len * 0.7);
  g.gain.linearRampToValueAtTime(0, t + len);
  o.connect(bp).connect(g).connect(c.destination);
  o.start(t); o.stop(t + len + 0.05);
}
