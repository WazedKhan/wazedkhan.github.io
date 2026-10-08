// Mochi's sounds: real clips from assets/sounds (meow, eating, footsteps) plus a
// synthesized purr, all played through one Web Audio context.
//
// Browsers only allow sound after the visitor clicks or taps. Safari is stricter:
// it only unlocks audio if we resume the context inside that click. So we resume
// on the first pointerdown/keydown, and after that clips can start at any time,
// even seconds later when Mochi reaches her bowl.
const SND = {
  meow: "assets/sounds/stu9-cute-cat-352656.mp3",
  eat: "assets/sounds/freesound_community-cat-eating-81278.mp3",
  walk: "assets/sounds/freesound_community-walking-96582.mp3",
};

const AC = window.AudioContext || window.webkitAudioContext;
let ctx = null;
let muted = false;
try { muted = localStorage.getItem("mochi-sound") === "off"; } catch (e) {}

// Clips are fetched and decoded shortly after the page loads (with an offline
// context, which needs no click), so the very first meow plays instantly.
const buffers = {};
let loading = false;
function load() {
  if (loading) return;
  const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!OAC) return;
  loading = true;
  const decoder = new OAC(1, 1, 44100);
  Object.entries(SND).forEach(async ([name, url]) => {
    try {
      const data = await (await fetch(url)).arrayBuffer();
      buffers[name] = await new Promise((res, rej) => decoder.decodeAudioData(data, res, rej));
    } catch (e) { /* missing file: that sound just stays silent */ }
  });
}
setTimeout(load, 1500);

function unlock() {
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state !== "running") ctx.resume().catch(() => {});
  load();
}
["pointerdown", "keydown", "touchend"].forEach((ev) => window.addEventListener(ev, unlock, { passive: true, capture: true }));

const ready = () => (!muted && ctx && ctx.state === "running" ? ctx : null);

// ---- looping sounds that follow what Mochi is doing ----
const loops = {};
function loop(name, on, vol) {
  const cur = loops[name];
  if (on === !!cur) return;
  if (on) {
    const c = ready();
    if (!c || !buffers[name]) return; // not unlocked or not loaded yet: try again next frame
    const src = c.createBufferSource(); src.buffer = buffers[name]; src.loop = true;
    const g = c.createGain();
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.15);
    src.connect(g).connect(c.destination);
    src.start();
    loops[name] = { src, g };
  } else {
    loops[name] = null;
    const t = ctx.currentTime;
    cur.g.gain.cancelScheduledValues(t);
    cur.g.gain.setValueAtTime(cur.g.gain.value, t);
    cur.g.gain.linearRampToValueAtTime(0, t + 0.2);
    cur.src.stop(t + 0.25);
  }
}
const stopLoops = () => Object.keys(loops).forEach((n) => { if (loops[n]) loop(n, false); });
export const walking = (on) => loop("walk", on, 0.22);
export const eating = (on) => loop("eat", on, 0.6);
document.addEventListener("visibilitychange", () => { if (document.hidden) stopLoops(); });

export const isMuted = () => muted;
export function setMuted(m) {
  muted = m;
  if (m) stopLoops();
  try { localStorage.setItem("mochi-sound", m ? "off" : "on"); } catch (e) {}
}

// short = a quick, higher "mrrp" instead of a full meow
export function meow(short = false) {
  const c = ready(); if (!c || !buffers.meow) return;
  const src = c.createBufferSource(); src.buffer = buffers.meow;
  src.playbackRate.value = short ? 1.35 : 0.95 + Math.random() * 0.12;
  const g = c.createGain(); g.gain.value = short ? 0.35 : 0.55;
  src.connect(g).connect(c.destination);
  src.start();
}

let purrUntil = 0;
export function purr(dur = 1.8) {
  const c = ready(); if (!c) return;
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

// debug hook for tests: which loops are playing right now
export const playingLoops = () => Object.keys(loops).filter((n) => loops[n]);
