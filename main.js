const root = document.documentElement;
const body = document.body;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// ---------- Theme (day / night) ----------
let scene = null;
const isNight = () => root.getAttribute("data-theme") === "dark";
function toggleTheme() {
  const next = isNight() ? "light" : "dark";
  window.trackEvent && window.trackEvent(next === "dark" ? "🌙 Switched to night" : "☀️ Switched to day");
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  document.querySelector('meta[name="theme-color"]').setAttribute("content", next === "dark" ? "#15132a" : "#efedf6");
  if (scene) scene.setNight(next === "dark");
}
document.querySelector(".theme-btn").addEventListener("click", toggleTheme);

// ---------- The desk ----------
const hero = document.getElementById("top");
const heroSticky = hero.querySelector(".hero-sticky");
const tip = heroSticky.querySelector(".tip");
const bubble = heroSticky.querySelector(".bubble");
let bubbleTimer;
const ui = {
  tip(text, x, y) {
    if (!text) { tip.classList.remove("on"); return; }
    tip.textContent = text;
    tip.style.left = x + "px"; tip.style.top = y + "px";
    tip.classList.add("on");
  },
  bubble(text, x, y) {
    bubble.textContent = text;
    bubble.style.left = Math.min(x, heroSticky.clientWidth - 250) + "px";
    bubble.style.top = Math.max(80, y) + "px";
    bubble.classList.add("on");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("on"), 2600);
  },
  toggleTheme,
  poke(id, label) {
    const names = { duck: "🦆 Rubber duck", mug: "🍵 Tea mug", plant: "🌵 Cactus", money: "🌿 Money plant", lamp: "💡 Lamp (day/night)", monitor: "🖥️ Monitor (jumped to projects)", poster: "🗻 Tokyo poster", window: "🪟 Window" };
    const what = id === "book" ? `📚 Book: ${label}` : names[id] || id;
    window.trackEvent && window.trackEvent(`Desk: ${what}`);
  },
  goto(sel) { document.querySelector(sel).scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); },
};

(async () => {
  try {
    const test = document.createElement("canvas");
    if (!(test.getContext("webgl2") || test.getContext("webgl"))) throw new Error("no webgl");
    const { startScene } = await import("./scene.js");
    scene = startScene(document.getElementById("desk"), ui);
    scene.setNight(isNight());
    onScroll();
  } catch (err) {
    console.warn(err);
    body.classList.add("no-webgl");
  }
})();

const heroCopy = hero.querySelector(".hero-copy");
const heroHint = hero.querySelector(".hero-hint");
const scrollCue = hero.querySelector(".scroll-cue");
const heroFade = hero.querySelector(".hero-fade");

// ---------- Projects: horizontal track ----------
const projects = document.getElementById("projects");
const track = projects.querySelector(".track");
const projI = document.getElementById("proj-i");
const panels = [...track.children];
const wide = window.matchMedia("(min-width: 861px)");

// Solace calendar: draw a streak grid
(function () {
  const g = document.querySelector(".p-solace .days");
  if (!g) return;
  const ns = "http://www.w3.org/2000/svg";
  for (let i = 0; i < 28; i++) {
    const c = i % 7, r = Math.floor(i / 7);
    const done = [0,1,2,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23].includes(i);
    const rect = document.createElementNS(ns, "rect");
    Object.entries({ x: 58 + c * 28, y: 96 + r * 38, width: 22, height: 22, rx: 6, fill: done ? "#3f7f52" : "#e9e5ff" }).forEach(([k, v]) => rect.setAttribute(k, v));
    g.appendChild(rect);
  }
})();

// ---------- Journey: the train ----------
const journey = document.getElementById("journey");
const trainFill = journey.querySelector(".train-fill");
const train = journey.querySelector(".train");
const stops = [...journey.querySelectorAll(".stop")];

function placeTrain() {
  const r = journey.querySelector(".line").getBoundingClientRect();
  const vh = window.innerHeight;
  const p = clamp((vh * 0.75 - r.top) / (r.height + vh * 0.2));
  const trackEl = journey.querySelector(".train-track");
  if (wide.matches) {
    // track sits on the dots row
    trackEl.style.top = (journey.querySelector(".line").offsetTop + 12) + "px";
    trackEl.style.bottom = "auto";
    const reach = 0.605; // the train waits at Softwrd; the next stop is still dashed
    const pct = p * reach * 100;
    trainFill.style.width = pct + "%";
    train.style.left = pct + "%";
    train.style.top = "-9px";
    stops.forEach((s, i) => s.classList.toggle("reached", p * reach >= (s.offsetLeft) / journey.querySelector('.line').offsetWidth - 0.01 && i < stops.length - 1));
  } else {
    const line = journey.querySelector(".line");
    trackEl.style.top = line.offsetTop + "px";
    trackEl.style.bottom = (journey.offsetHeight - line.offsetTop - line.offsetHeight + 40) + "px";
    const h = trackEl.offsetHeight * p * 0.88;
    trainFill.style.height = h + "px";
    train.style.top = h + "px";
    train.style.left = "4px";
    stops.forEach((s, i) => s.classList.toggle("reached", s.offsetTop - line.offsetTop <= h + 10 && i < stops.length - 1));
  }
}

// ---------- Marquee (speeds up while you scroll) ----------
const marquee = document.querySelector(".marquee-inner");
let mx = 0, lastY = window.scrollY, velocity = 0;

function onScroll() {
  const vh = window.innerHeight;
  // hero
  const hr = hero.getBoundingClientRect();
  const hp = clamp(-hr.top / (hr.height - vh));
  if (scene) scene.setProgress(clamp(hp / 0.85));
  heroCopy.style.opacity = 1 - clamp(hp * 4);
  heroHint.style.opacity = 1 - clamp(hp * 6);
  scrollCue.style.opacity = 1 - clamp(hp * 8);
  heroFade.style.opacity = clamp((hp - 0.78) / 0.2);

  // projects
  if (wide.matches) {
    const pr = projects.getBoundingClientRect();
    const pp = clamp(-pr.top / (pr.height - vh));
    const maxX = track.scrollWidth - window.innerWidth;
    track.style.transform = `translate3d(${-pp * Math.max(0, maxX)}px,0,0)`;
    projI.textContent = Math.min(panels.length, Math.round(pp * (panels.length - 1)) + 1);
  } else {
    track.style.transform = "";
  }

  placeTrain();
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { onScroll(); ticking = false; });
}, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

function loop() {
  const y = window.scrollY;
  velocity = velocity * 0.9 + Math.abs(y - lastY) * 0.1;
  lastY = y;
  if (marquee && !reduced) {
    mx -= 0.6 + velocity * 0.35;
    const half = marquee.scrollWidth / 2;
    if (-mx > half) mx += half;
    marquee.style.transform = `translate3d(${mx}px,0,0)`;
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ---------- Draggable stickers ----------
const board = document.querySelector(".board");
if (board) {
  const stickers = [...board.querySelectorAll(".sticker")];
  function scatter() {
    const w = board.clientWidth, h = board.clientHeight;
    let seed = 11;
    const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const cols = w < 500 ? 3 : 4;
    stickers.forEach((s, i) => {
      const c = i % cols, row = Math.floor(i / cols);
      const cw = (w - 30) / cols;
      const x = 14 + c * cw + r() * Math.max(0, cw - s.offsetWidth - 10);
      const y = 48 + row * ((h - 70) / Math.ceil(stickers.length / cols)) + r() * 14;
      const rot = (r() - 0.5) * 16;
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--r", rot + "deg");
      s.style.transform = `rotate(${rot}deg)`;
    });
  }
  scatter();
  document.fonts && document.fonts.ready.then(scatter);
  let z = 10;
  stickers.forEach((s) => {
    s.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      s.setPointerCapture(e.pointerId);
      const start = { x: e.clientX, y: e.clientY, l: s.offsetLeft, t: s.offsetTop };
      s.classList.add("dragging"); s.style.zIndex = ++z;
      const move = (ev) => {
        const l = clamp(start.l + ev.clientX - start.x, 0, board.clientWidth - s.offsetWidth);
        const t = clamp(start.t + ev.clientY - start.y, 0, board.clientHeight - s.offsetHeight);
        s.style.left = l + "px"; s.style.top = t + "px";
      };
      const up = () => {
        s.classList.remove("dragging");
        const rot = (Math.random() - 0.5) * 16;
        s.style.setProperty("--r", rot + "deg");
        s.style.transform = `rotate(${rot}deg)`;
        s.removeEventListener("pointermove", move);
        s.removeEventListener("pointerup", up);
        s.removeEventListener("pointercancel", up);
      };
      s.addEventListener("pointermove", move);
      s.addEventListener("pointerup", up);
      s.addEventListener("pointercancel", up);
    });
  });
}

// ---------- Copy buttons ----------
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = "Copied!"; }
    catch (e) { btn.textContent = "Select and copy"; }
    setTimeout(() => (btn.textContent = "Copy"), 1600);
  });
});
