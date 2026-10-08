// Wazed's desk in Dhaka, as a little Three.js diorama.
// Drag to look around, click objects, scroll to fly into the monitor.
import * as THREE from "three";
import { purr, meow, walking as walkSound, eating as eatSound } from "./cat-sound.js?v=d39df41";

const CODE = `package main

// Wazed's desk, Dhaka. Status: shipping.
func main() {
    srv := &http.Server{Addr: ":8080", Handler: router()}
    go srv.ListenAndServe()

    stop := make(chan os.Signal, 1)
    signal.Notify(stop, os.Interrupt)
    <-stop // wait for Ctrl+C

    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()
    srv.Shutdown(ctx) // let requests finish first
}`;

const PALETTE = {
  floor: 0xd9b48c, wallBack: 0xe8e2f3, wallLeft: 0xdcd4ec, desk: 0x8b5d3f, legs: 0x3a3347,
  frame: 0x2a2838, chair: 0x3f7f52, rug: 0xff9f7a, mug: 0xff7f50, tea: 0x7a4a2a,
  pot: 0xf3ede2, leaf: 0x3f7f52, duck: 0xffd23f, beak: 0xff8a3d, lamp: 0x2f2b45, white: 0xffffff,
  books: [0x3f7f52, 0xff8a5b, 0x5b5bd6, 0xffd166, 0xe86a92, 0x2f2b45, 0x8fb8ff],
};

function canvasTex(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.userData = { canvas: c, ctx };
  return t;
}

function drawSky(ctx, w, h, night) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  if (night) { g.addColorStop(0, "#151a45"); g.addColorStop(1, "#3b2d6e"); }
  else { g.addColorStop(0, "#ff9e7a"); g.addColorStop(0.55, "#ffc58a"); g.addColorStop(1, "#ffe6b8"); }
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  if (night) {
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 70; i++) { const s = Math.random() * 2 + 0.5; ctx.globalAlpha = Math.random() * 0.8 + 0.2; ctx.fillRect(Math.random() * w, Math.random() * h * 0.6, s, s); }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fdf3c8"; ctx.beginPath(); ctx.arc(w * 0.75, h * 0.22, 26, 0, 7); ctx.fill();
    ctx.fillStyle = "#151a45"; ctx.beginPath(); ctx.arc(w * 0.75 + 12, h * 0.22 - 6, 24, 0, 7); ctx.fill();
  } else {
    ctx.fillStyle = "#fff3d6"; ctx.beginPath(); ctx.arc(w * 0.3, h * 0.62, 44, 0, 7); ctx.fill();
    ctx.strokeStyle = "#7a4b5a"; ctx.lineWidth = 2.5;
    [[0.6, 0.25], [0.66, 0.3], [0.7, 0.22]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(w * x - 8, h * y - 4); ctx.quadraticCurveTo(w * x - 3, h * y - 7, w * x, h * y);
      ctx.quadraticCurveTo(w * x + 3, h * y - 7, w * x + 8, h * y - 4); ctx.stroke();
    });
  }
  // Dhaka skyline: dense, uneven rooftops, water tanks, a mosque dome
  const base = h * 0.98;
  let x = 0, seed = 7;
  const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  ctx.fillStyle = night ? "#221d45" : "#b9808c";
  while (x < w) {
    const bw = 30 + r() * 45, bh = 70 + r() * 170;
    ctx.fillRect(x, base - bh, bw - 3, bh);
    if (r() > 0.6) ctx.fillRect(x + 6, base - bh - 12, 12, 12);
    // windows
    ctx.save();
    for (let yy = base - bh + 10; yy < base - 10; yy += 16) for (let xx = x + 5; xx < x + bw - 10; xx += 11) {
      const on = r();
      if (night ? on > 0.55 : on > 0.86) { ctx.fillStyle = night ? "#ffd166" : "#d79aa4"; ctx.fillRect(xx, yy, 5, 7); }
    }
    ctx.restore();
    x += bw;
  }
  ctx.beginPath(); ctx.arc(w * 0.47, base - 150, 26, Math.PI, 0); ctx.fill();
  ctx.fillRect(w * 0.47 - 30, base - 150, 60, 150);
  ctx.fillRect(w * 0.47 - 2, base - 196, 4, 22);
}

function drawPoster(ctx, w, h) {
  ctx.fillStyle = "#f7efe2"; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#e5484d"; ctx.beginPath(); ctx.arc(w / 2, h * 0.36, w * 0.24, 0, 7); ctx.fill();
  ctx.fillStyle = "#4a5a8a";
  ctx.beginPath(); ctx.moveTo(w * 0.08, h * 0.68); ctx.lineTo(w * 0.42, h * 0.42); ctx.lineTo(w * 0.58, h * 0.42); ctx.lineTo(w * 0.92, h * 0.68); ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.moveTo(w * 0.36, h * 0.47); ctx.lineTo(w * 0.42, h * 0.42); ctx.lineTo(w * 0.58, h * 0.42); ctx.lineTo(w * 0.64, h * 0.47);
  ctx.lineTo(w * 0.57, h * 0.455); ctx.lineTo(w * 0.5, h * 0.48); ctx.lineTo(w * 0.43, h * 0.455); ctx.fill();
  ctx.fillStyle = "#2a2838"; ctx.textAlign = "center";
  ctx.font = "700 34px 'Bricolage Grotesque', sans-serif"; ctx.fillText("TOKYO", w / 2, h * 0.82);
  ctx.font = "italic 22px Georgia, serif"; ctx.fillText("someday", w / 2, h * 0.9);
}

const KW = /\b(package|func|go|defer|return|make|chan|if|for|range|var|const)\b/g;
function drawCode(ctx, w, h, text, caret) {
  ctx.fillStyle = "#1c1b2b"; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#26243a"; ctx.fillRect(0, 0, w, 34);
  ["#ff6b6b", "#ffd166", "#7cc492"].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(22 + i * 22, 17, 7, 0, 7); ctx.fill(); });
  ctx.fillStyle = "#a6a1c0"; ctx.font = "16px 'JetBrains Mono', monospace"; ctx.fillText("main.go", 100, 22);
  ctx.font = "19px 'JetBrains Mono', monospace";
  const lines = text.split("\n");
  lines.forEach((ln, i) => {
    const y = 66 + i * 27;
    ctx.fillStyle = "#4d4968"; ctx.textAlign = "right"; ctx.fillText(String(i + 1), 40, y); ctx.textAlign = "left";
    const ci = ln.indexOf("//");
    const code = ci >= 0 ? ln.slice(0, ci) : ln;
    let x = 58; let last = 0; let m; KW.lastIndex = 0;
    const put = (s, col) => { ctx.fillStyle = col; ctx.fillText(s, x, y); x += ctx.measureText(s).width; };
    while ((m = KW.exec(code))) { put(code.slice(last, m.index), "#e4e0f5"); put(m[0], "#ff8a5b"); last = m.index + m[0].length; }
    const rest = code.slice(last);
    rest.split(/("[^"]*")/).forEach((part) => put(part, part.startsWith('"') ? "#ffd166" : "#e4e0f5"));
    if (ci >= 0) put(ln.slice(ci), "#7cc492");
    if (caret && i === lines.length - 1) { ctx.fillStyle = "#ffd166"; ctx.fillRect(x + 2, y - 17, 10, 21); }
  });
}

export function startScene(canvas, ui) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);

  const room = new THREE.Group();
  scene.add(room);
  const clickables = [];

  const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, flatShading: true, ...extra });
  const box = (w, h, d, color, x, y, z, parent = room, m) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m || mat(color));
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const cyl = (rt, rb, h, color, x, y, z, parent = room, seg = 20) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(color));
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const tag = (obj, id, label, quip) => { obj.traverse((o) => { o.userData.id = id; o.userData.label = label; o.userData.quip = quip; o.userData.root = obj; }); clickables.push(obj); return obj; };

  // ---- Room shell ----
  box(10, 0.3, 10, PALETTE.floor, 0, -0.15, 0);
  for (let i = -4; i <= 4; i += 1.25) box(0.02, 0.01, 10, 0xc89f75, i, 0.005, 0); // floor boards
  box(10, 7, 0.3, PALETTE.wallBack, 0, 3.5, -5.15);
  box(0.3, 7, 10, PALETTE.wallLeft, -5.15, 3.5, 0);
  box(10, 0.3, 0.1, 0xffffff, 0, 0.15, -4.98);
  box(0.1, 0.3, 10, 0xffffff, -4.98, 0.15, 0);

  // ---- Window with Dhaka skyline ----
  const winG = new THREE.Group(); room.add(winG);
  const skyTex = canvasTex(512, 384, (c, w, h) => drawSky(c, w, h, false));
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.4), new THREE.MeshBasicMaterial({ map: skyTex, toneMapped: false }));
  sky.position.set(2.6, 4.6, -4.99); winG.add(sky);
  const fc = 0xffffff;
  box(3.5, 0.15, 0.2, fc, 2.6, 5.85, -4.9, winG); box(3.6, 0.15, 0.45, fc, 2.6, 3.35, -4.8, winG);
  box(0.15, 2.6, 0.2, fc, 0.85, 4.6, -4.9, winG); box(0.15, 2.6, 0.2, fc, 4.35, 4.6, -4.9, winG);
  box(0.08, 2.4, 0.12, fc, 2.6, 4.6, -4.92, winG);
  tag(winG, "window", "The view from home");

  // ---- Poster ----
  const posterTex = canvasTex(256, 360, drawPoster);
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.95), new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.9 }));
  poster.rotation.y = Math.PI / 2; poster.position.set(-4.98, 4.7, -2.9); room.add(poster);
  tag(poster, "poster", "Tokyo, someday");

  // ---- Bookshelf with the books I'm actually reading ----
  const shelf = new THREE.Group(); room.add(shelf);
  const SX = -4.6;
  const shelfYs = [2.25, 3.5, 4.75];
  shelfYs.forEach((y) => {
    box(0.78, 0.1, 3.5, PALETTE.desk, SX, y, 0.85, shelf);
    [-0.7, 2.2].forEach((z) => box(0.45, 0.07, 0.06, PALETTE.legs, -4.78, y - 0.1, z, shelf));
  });
  const pageMat = mat(0xf4ecd8);
  const BOOKS = [
    // shelf 0
    { s: 0, face: "alchemist", title: "The Alchemist", by: "Paulo Coelho", quip: "The Alchemist. A reminder to keep chasing the treasure." },
    { s: 0, title: "The Kite Runner", by: "Khaled Hosseini", bg: "#c44d3b", fg: "#fff3e0", quip: "The Kite Runner. Still not over it." },
    { s: 0, title: "হিমু", by: "হুমায়ূন আহমেদ", bg: "#f2c230", fg: "#3a2a00", label: "Himu, Humayun Ahmed", quip: "Himu, by Humayun Ahmed. Yellow panjabi, no plans." },
    { s: 0, title: "বাদশাহ নামদার", by: "হুমায়ূন আহমেদ", bg: "#2f3f6e", fg: "#ffd166", label: "Badshah Namdar, Humayun Ahmed", quip: "Badshah Namdar, by Humayun Ahmed. History, told like a story." },
    { s: 0, bg: "#7a8fb3" },
    // shelf 1
    { s: 1, face: "coffee", title: "Before the Coffee Gets Cold", by: "Toshikazu Kawaguchi", quip: "Before the Coffee Gets Cold. Drink it while it's warm." },
    { s: 1, title: "Around the World in 80 Days", by: "VERNE", bg: "#1f5a43", fg: "#f2d58a", quip: "Jules Verne. Around the world, no visa queue." },
    { s: 1, title: "20,000 Leagues Under the Seas", by: "VERNE", bg: "#1f5a43", fg: "#f2d58a", quip: "Jules Verne. Captain Nemo would hate standups." },
    { s: 1, title: "Journey to the Centre of the Earth", by: "VERNE", bg: "#1f5a43", fg: "#f2d58a", quip: "Jules Verne. Basically a deep dive into the stack." },
    { s: 1, title: "The Mysterious Island", by: "VERNE", bg: "#1f5a43", fg: "#f2d58a", quip: "Jules Verne. Survival engineering at its best." },
    // shelf 2
    { s: 2, face: "morisaki", title: "Days at the Morisaki Bookshop", by: "Satoshi Yagisawa", quip: "Days at the Morisaki Bookshop. A Tokyo bookshop I'd happily move into." },
    { s: 2, bg: "#e86a92" }, { s: 2, bg: "#ffd166" },
    { s: 2, flat: true },
  ];

  function spineTex(b) {
    return canvasTex(96, 720, (c, w, h) => {
      c.fillStyle = b.bg; c.fillRect(0, 0, w, h);
      if (!b.title) return;
      c.fillStyle = b.fg; c.globalAlpha = 0.35; c.fillRect(0, 28, w, 6); c.fillRect(0, h - 34, w, 6); c.globalAlpha = 1;
      c.save(); c.translate(w / 2, h / 2); c.rotate(Math.PI / 2);
      c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = b.fg;
      let size = 46; c.font = `800 ${size}px 'Bricolage Grotesque', 'Kohinoor Bangla', 'Bangla Sangam MN', 'Noto Sans Bengali', sans-serif`;
      while (c.measureText(b.title).width > h - 200 && size > 22) { size -= 2; c.font = `800 ${size}px 'Bricolage Grotesque', 'Kohinoor Bangla', 'Bangla Sangam MN', 'Noto Sans Bengali', sans-serif`; }
      c.fillText(b.title, -50, 0);
      c.font = `600 24px 'Bricolage Grotesque', 'Kohinoor Bangla', 'Bangla Sangam MN', sans-serif`;
      c.globalAlpha = 0.8; c.fillText(b.by, h / 2 - 90, 0);
      c.restore();
    });
  }
  function coverTex(kind) {
    return canvasTex(400, 560, (c, w, h) => {
      const T = (txt, y, size, col, weight = 800, font = "'Bricolage Grotesque', sans-serif") => {
        c.fillStyle = col; c.textAlign = "center"; c.font = `${weight} ${size}px ${font}`;
        const words = txt.split(" "); let line = "", yy = y;
        words.forEach((wd) => { const t = line ? line + " " + wd : wd; if (c.measureText(t).width > w - 60) { c.fillText(line, w / 2, yy); line = wd; yy += size * 1.05; } else line = t; });
        c.fillText(line, w / 2, yy);
      };
      if (kind === "alchemist") {
        c.fillStyle = "#f1c27d"; c.fillRect(0, 0, w, h);
        c.fillStyle = "#fff1c9"; c.beginPath(); c.arc(w * 0.7, h * 0.5, 54, 0, 7); c.fill();
        c.fillStyle = "#c98a3d"; c.beginPath(); c.moveTo(30, h * 0.78); c.lineTo(w * 0.36, h * 0.48); c.lineTo(w * 0.62, h * 0.78); c.fill();
        c.fillStyle = "#b5732e"; c.beginPath(); c.moveTo(w * 0.45, h * 0.78); c.lineTo(w * 0.66, h * 0.58); c.lineTo(w * 0.9, h * 0.78); c.fill();
        c.fillStyle = "#e0a75a"; c.fillRect(0, h * 0.78, w, h * 0.22);
        T("The Alchemist", 92, 64, "#5a2d0c"); T("Paulo Coelho", h - 40, 30, "#5a2d0c", 600);
      } else if (kind === "coffee") {
        c.fillStyle = "#2f6f73"; c.fillRect(0, 0, w, h);
        c.fillStyle = "#f6efe2"; c.beginPath(); c.ellipse(w / 2, h * 0.62, 110, 26, 0, 0, 7); c.fill();
        c.fillStyle = "#ffffff"; c.beginPath(); c.moveTo(w / 2 - 70, h * 0.48); c.lineTo(w / 2 + 70, h * 0.48); c.lineTo(w / 2 + 52, h * 0.6); c.lineTo(w / 2 - 52, h * 0.6); c.fill();
        c.strokeStyle = "#ffffff"; c.lineWidth = 10; c.beginPath(); c.arc(w / 2 + 78, h * 0.53, 18, -1.4, 1.4); c.stroke();
        c.strokeStyle = "rgba(255,255,255,.6)"; c.lineWidth = 5;
        [-25, 0, 25].forEach((dx) => { c.beginPath(); c.moveTo(w / 2 + dx, h * 0.45); c.bezierCurveTo(w / 2 + dx - 15, h * 0.4, w / 2 + dx + 15, h * 0.37, w / 2 + dx, h * 0.32); c.stroke(); });
        T("Before the Coffee Gets Cold", 74, 50, "#fff3d6"); T("Toshikazu Kawaguchi", h - 40, 28, "#fff3d6", 600);
      } else {
        c.fillStyle = "#cfe3c4"; c.fillRect(0, 0, w, h);
        const cols = ["#e5484d", "#3f7f52", "#5b6fd6", "#ffd166", "#2f2b45", "#ff8a5b"];
        for (let i = 0; i < 9; i++) { c.fillStyle = cols[i % cols.length]; c.fillRect(60 + i * 32, h * 0.42 + (i % 3) * 10, 26, h * 0.3 - (i % 3) * 10); }
        c.fillStyle = "#8b5d3f"; c.fillRect(40, h * 0.72, w - 80, 14);
        T("Days at the Morisaki Bookshop", 74, 48, "#1f3a26"); T("Satoshi Yagisawa", h - 40, 28, "#1f3a26", 600);
      }
    });
  }

  const zCursor = [-0.85, -0.85, -0.85];
  const bookObjs = [];
  [...BOOKS.filter((b) => !b.face), ...BOOKS.filter((b) => b.face)].forEach((b) => {
    const y = shelfYs[b.s] + 0.05;
    if (b.face) {
      const g = new THREE.Group();
      const geo = new THREE.BoxGeometry(0.1, 0.98, 0.78);
      const cover = new THREE.MeshStandardMaterial({ map: coverTex(b.face), roughness: 0.8 });
      const m = new THREE.Mesh(geo, [cover, pageMat, pageMat, pageMat, pageMat, pageMat]);
      m.castShadow = true; g.add(m);
      g.position.set(SX - 0.12, y + 0.49, zCursor[b.s] + 0.47);
      g.rotation.z = 0.1;
      shelf.add(g); zCursor[b.s] += 0.88;
      tag(g, "book", `${b.title}, ${b.by}`, b.quip); bookObjs.push(g);
      return;
    }
    if (b.flat) {
      [0, 1, 2].forEach((i) => box(0.55, 0.12, 0.8, PALETTE.books[i + 2], SX, y + 0.06 + i * 0.13, zCursor[b.s] + 0.45, shelf).rotation.y = (i - 1) * 0.12);
      zCursor[b.s] += 0.95; return;
    }
    const t = b.title ? 0.24 : 0.16, hh = b.title ? 0.98 : 0.8 + Math.random() * 0.12;
    const spine = b.title ? new THREE.MeshStandardMaterial({ map: spineTex(b), roughness: 0.8 }) : mat(new THREE.Color(b.bg).getHex());
    const body = mat(new THREE.Color(b.bg).getHex());
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.58, hh, t), [spine, body, pageMat, body, body, body]);
    m.position.set(SX, y + hh / 2, zCursor[b.s] + t / 2); m.castShadow = true; m.receiveShadow = true;
    shelf.add(m); zCursor[b.s] += t + 0.015;
    if (b.title) { tag(m, "book", b.label || `${b.title}, ${b.by}`, b.quip); bookObjs.push(m); }
  });

  // ---- Rug + chair ----
  const rug = cyl(2.7, 2.7, 0.04, PALETTE.rug, -0.6, 0.02, -0.9, room, 48); rug.castShadow = false;
  const chair = new THREE.Group(); room.add(chair);
  chair.position.set(-1.3, 0, -1.7); chair.rotation.y = 0.35;
  box(1.3, 0.18, 1.2, PALETTE.chair, 0, 1.55, 0, chair);
  box(1.3, 1.5, 0.16, PALETTE.chair, 0, 2.35, 0.6, chair);
  cyl(0.07, 0.07, 1.3, PALETTE.legs, 0, 0.85, 0, chair);
  for (let i = 0; i < 5; i++) { const a = box(0.8, 0.08, 0.1, PALETTE.legs, 0, 0.2, 0, chair); a.rotation.y = (i / 5) * Math.PI * 2; a.translateX(0.4); }

  // ---- Desk ----
  const desk = new THREE.Group(); room.add(desk);
  box(4.8, 0.16, 2.2, PALETTE.desk, -1.25, 2.5, -3.85, desk);
  [[-3.5, -4.8], [1.0, -4.8], [-3.5, -2.9], [1.0, -2.9]].forEach(([x, z]) => box(0.14, 2.42, 0.14, PALETTE.legs, x, 1.21, z, desk));

  // ---- Monitor with live code ----
  const mon = new THREE.Group(); room.add(mon);
  box(2.5, 1.5, 0.12, PALETTE.frame, -1.35, 3.8, -4.35, mon);
  box(0.16, 0.75, 0.12, PALETTE.frame, -1.35, 2.95, -4.45, mon);
  box(0.9, 0.06, 0.5, PALETTE.frame, -1.35, 2.61, -4.4, mon);
  const codeTex = canvasTex(1024, 600, (c, w, h) => drawCode(c, w, h, "", true));
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.36, 1.38), new THREE.MeshBasicMaterial({ map: codeTex, toneMapped: false }));
  screen.position.set(-1.35, 3.8, -4.285); mon.add(screen);
  tag(mon, "monitor", "Click to see my projects");

  // keyboard
  const kb = new THREE.Group(); room.add(kb);
  box(1.75, 0.08, 0.6, PALETTE.frame, -1.35, 2.62, -3.3, kb);
  const keyGeo = new THREE.BoxGeometry(0.095, 0.05, 0.095);
  const keyMat = mat(0xe8e4f4);
  const keys = new THREE.InstancedMesh(keyGeo, keyMat, 15 * 4);
  const km = new THREE.Matrix4(); let ki = 0;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) { km.setPosition(-1.35 - 0.77 + c * 0.11, 2.68, -3.3 - 0.18 + r * 0.12); keys.setMatrixAt(ki++, km); }
  keys.castShadow = true; kb.add(keys);
  box(0.2, 0.07, 0.3, 0xe8e4f4, -0.15, 2.62, -3.3, room); // mouse

  // ---- Mug of cha + steam ----
  const mug = new THREE.Group(); room.add(mug);
  mug.position.set(0.25, 2.58, -3.5);
  cyl(0.2, 0.18, 0.45, PALETTE.mug, 0, 0.225, 0, mug);
  cyl(0.17, 0.17, 0.02, PALETTE.tea, 0, 0.43, 0, mug);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.035, 8, 16), mat(PALETTE.mug));
  handle.position.set(0.22, 0.22, 0); mug.add(handle);
  const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false });
  const steam = [0, 1, 2, 3, 4].map((i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), steamMat.clone()); s.userData.phase = i / 5; mug.add(s); return s; });
  tag(mug, "mug", "Cha. Second cup.");

  // ---- Cactus on the desk ----
  const plant = new THREE.Group(); room.add(plant);
  plant.position.set(-3.15, 2.58, -4.3);
  cyl(0.24, 0.18, 0.36, 0xf3ede2, 0, 0.18, 0, plant);
  cyl(0.21, 0.21, 0.03, 0x6b4a33, 0, 0.36, 0, plant);
  const cMat = mat(0x5f9e63);
  const cBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.5, 4, 10), cMat); cBody.position.y = 0.72; cBody.castShadow = true; plant.add(cBody);
  [[-1, 0.62, 0.9], [1, 0.8, -0.9]].forEach(([side, y, rz]) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.16, 4, 8), cMat);
    arm.position.set(side * 0.2, y, 0); arm.rotation.z = rz; arm.castShadow = true; plant.add(arm);
    const up = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.18, 4, 8), cMat);
    up.position.set(side * 0.28, y + 0.14, 0); up.castShadow = true; plant.add(up);
  });
  const flower = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), mat(0xff6fa5)); flower.position.y = 1.12; plant.add(flower);
  tag(plant, "plant", "My cactus");

  // ---- Money plant in a glass bottle on the windowsill ----
  const money = new THREE.Group(); room.add(money);
  const glass = new THREE.MeshStandardMaterial({ color: 0xbfe8d0, transparent: true, opacity: 0.45, roughness: 0.1 });
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.55, 18), glass); bottle.position.set(3.85, 3.7, -4.72); money.add(bottle);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.16, 0.25, 14), glass); neck.position.set(3.85, 4.1, -4.72); money.add(neck);
  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.35, 14), new THREE.MeshStandardMaterial({ color: 0x8fd3c1, transparent: true, opacity: 0.5 })); water.position.set(3.85, 3.6, -4.72); money.add(water);
  const heart = new THREE.Shape();
  heart.moveTo(0, -0.1); heart.bezierCurveTo(-0.02, -0.06, -0.11, -0.02, -0.1, 0.04); heart.bezierCurveTo(-0.09, 0.09, -0.03, 0.1, 0, 0.06);
  heart.bezierCurveTo(0.03, 0.1, 0.09, 0.09, 0.1, 0.04); heart.bezierCurveTo(0.11, -0.02, 0.02, -0.06, 0, -0.1);
  const leafGeo = new THREE.ShapeGeometry(heart, 6);
  const leafMats = [0x3f8f4a, 0x5aa85a, 0x8cc24f].map((c) => new THREE.MeshStandardMaterial({ color: c, side: THREE.DoubleSide, roughness: 0.6 }));
  const stemMat = mat(0x4f7f3a);
  const vines = [
    [[3.85, 4.15, -4.72], [3.7, 4.55, -4.62], [3.25, 4.75, -4.7], [2.8, 4.55, -4.75], [2.45, 4.9, -4.78]],
    [[3.9, 4.15, -4.7], [4.15, 4.0, -4.5], [4.3, 3.55, -4.45], [4.3, 3.0, -4.55], [4.2, 2.4, -4.7], [4.3, 1.9, -4.8]],
    [[3.82, 4.15, -4.74], [3.95, 4.7, -4.82], [4.15, 5.3, -4.85], [4.05, 5.75, -4.86]],
    [[3.85, 4.15, -4.7], [3.55, 4.1, -4.45], [3.2, 3.6, -4.4], [3.0, 3.45, -4.35]],
  ];
  const leaves = [];
  vines.forEach((pts, vi) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const stem = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.012, 5), stemMat); money.add(stem);
    const n = Math.round(curve.getLength() / 0.17);
    for (let i = 1; i <= n; i++) {
      const p = curve.getPoint(i / (n + 0.5));
      const leaf = new THREE.Mesh(leafGeo, leafMats[(i + vi) % 3]);
      const sc = 0.8 + Math.random() * 0.6; leaf.scale.setScalar(sc);
      leaf.position.copy(p);
      leaf.rotation.set(Math.random() * 1.2 - 0.6, Math.random() * 1.6 - 0.3, (i % 2 ? 1 : -1) * (0.6 + Math.random() * 0.8));
      leaf.castShadow = true; leaf.userData.base = leaf.rotation.z; leaf.userData.ph = Math.random() * 6;
      money.add(leaf); leaves.push(leaf);
    }
  });
  tag(money, "money", "My money plant");

  // ---- Lamp ----
  const lamp = new THREE.Group(); room.add(lamp);
  lamp.position.set(0.65, 2.58, -4.45);
  cyl(0.26, 0.28, 0.07, PALETTE.lamp, 0, 0.035, 0, lamp);
  const arm1 = box(0.06, 1.1, 0.06, PALETTE.lamp, 0, 0.55, 0, lamp); arm1.rotation.z = 0.25;
  const arm2 = box(0.06, 0.8, 0.06, PALETTE.lamp, -0.32, 1.25, 0, lamp); arm2.rotation.z = -1.0;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.35, 16, 1, true), mat(PALETTE.lamp, { side: THREE.DoubleSide }));
  head.position.set(-0.68, 1.35, 0); head.rotation.z = 0.6; head.castShadow = true; lamp.add(head);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff1c4 }));
  bulb.position.set(-0.72, 1.28, 0); lamp.add(bulb);
  const lampLight = new THREE.PointLight(0xffc979, 0, 7, 1.6);
  lampLight.position.set(-0.75, 1.15, 0.1); lampLight.castShadow = true; lampLight.shadow.mapSize.set(512, 512); lamp.add(lampLight);
  tag(lamp, "lamp", "Click to switch day and night");

  // ---- Rubber duck (senior debugging consultant) ----
  const duck = new THREE.Group(); room.add(duck);
  duck.position.set(-2.75, 2.58, -3.15); duck.rotation.y = 0.6;
  const dBody = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 10), mat(PALETTE.duck)); dBody.scale.set(1, 0.75, 1.2); dBody.position.y = 0.17; dBody.castShadow = true; duck.add(dBody);
  const dHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), mat(PALETTE.duck)); dHead.position.set(0, 0.42, 0.14); dHead.castShadow = true; duck.add(dHead);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 8), mat(PALETTE.beak)); beak.rotation.x = Math.PI / 2; beak.position.set(0, 0.4, 0.31); duck.add(beak);
  [-0.07, 0.07].forEach((x) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), new THREE.MeshBasicMaterial({ color: 0x1c1a2e })); e.position.set(x, 0.47, 0.26); duck.add(e); });
  tag(duck, "duck", "Senior debugging consultant");

  // ---- Mochi, the desk cat (click to chat, stroke to pet) ----
  const CATC = { fur: 0xf0a05a, dark: 0xc9743a, cream: 0xfbe9d0, pink: 0xff9aa8 };
  const cat = new THREE.Group(); room.add(cat);
  cat.position.set(1.55, 3.425, -4.68); cat.rotation.y = 0.85; cat.scale.setScalar(1.15);
  const furMat = mat(CATC.fur), darkMat = mat(CATC.dark), creamMat = mat(CATC.cream), pinkMat = mat(CATC.pink);
  const part = (geo, m, x, y, z, parent) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; };
  const catBody = new THREE.Group(); cat.add(catBody);
  const torso = part(new THREE.SphereGeometry(0.3, 16, 12), furMat, 0, 0.21, 0, catBody); torso.scale.set(0.95, 0.7, 1.35);
  const belly = part(new THREE.SphereGeometry(0.2, 12, 10), creamMat, 0, 0.16, 0.2, catBody); belly.scale.set(1.05, 0.8, 0.9);
  [-0.2, -0.07, 0.06].forEach((z) => { // stripes over the back
    const k = Math.sqrt(1 - (z / 0.405) ** 2) * 1.03;
    const s = part(new THREE.TorusGeometry(1, 0.075, 5, 16, Math.PI), darkMat, 0, 0.21, z, catBody);
    s.scale.set(0.285 * k, 0.21 * k, 0.25);
  });
  const catHead = new THREE.Group(); catHead.position.set(0, 0.43, 0.32); catBody.add(catHead);
  const skull = part(new THREE.SphereGeometry(0.2, 16, 12), furMat, 0, 0, 0, catHead); skull.scale.set(1.12, 0.95, 0.95);
  part(new THREE.BoxGeometry(0.03, 0.07, 0.02), darkMat, 0, 0.13, 0.12, catHead).rotation.x = -0.5;
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1c1a2e });
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const whiskerMat = new THREE.MeshBasicMaterial({ color: 0xfff8ee });
  const eyes = [];
  [-1, 1].forEach((s) => {
    const ear = part(new THREE.ConeGeometry(0.08, 0.17, 4), furMat, s * 0.12, 0.17, -0.02, catHead); ear.rotation.set(-0.1, Math.PI / 4, -s * 0.35);
    const inner = part(new THREE.ConeGeometry(0.045, 0.1, 3), pinkMat, s * 0.118, 0.155, 0.015, catHead); inner.rotation.set(-0.1, 0, -s * 0.35);
    const eye = new THREE.Group(); eye.position.set(s * 0.078, 0.03, 0.172); catHead.add(eye);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.036, 12, 8), eyeMat); ball.scale.z = 0.6; eye.add(ball);
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.011, 6, 4), glintMat); glint.position.set(0.012, 0.014, 0.02); eye.add(glint);
    eyes.push(eye);
    part(new THREE.SphereGeometry(0.05, 10, 8), creamMat, s * 0.035, -0.065, 0.16, catHead);
    for (let j = 0; j < 2; j++) {
      const wk = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.006, 0.006), whiskerMat);
      wk.position.set(s * 0.14, -0.055 + j * 0.03, 0.15); wk.rotation.set(0, -s * 0.35, s * (j - 0.5) * 0.3); catHead.add(wk);
    }
  });
  const nose = part(new THREE.SphereGeometry(0.02, 8, 6), pinkMat, 0, -0.03, 0.2, catHead); nose.scale.set(1.3, 0.8, 0.8);
  const paws = [-1, 1].map((s) => { const p = part(new THREE.SphereGeometry(0.065, 10, 8), creamMat, s * 0.11, 0.04, 0.42, catBody); p.scale.set(1, 0.6, 1.3); return p; });
  const pawR = paws[1];
  const legs = [[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([sx, sz]) => {
    const hip = new THREE.Group(); hip.position.set(sx * 0.13, 0.12, sz * 0.24); catBody.add(hip);
    const leg = part(new THREE.CapsuleGeometry(0.045, 0.2, 4, 8), sz > 0 ? creamMat : furMat, 0, -0.15, 0, hip);
    hip.scale.y = 0.02; hip.userData = { front: sz > 0, phase: (sx * sz > 0) ? 0 : Math.PI };
    return hip;
  });
  const tailJoints = [];
  let tailParent = new THREE.Group(); tailParent.position.set(0.1, 0.1, -0.36); catBody.add(tailParent);
  for (let i = 0; i < 7; i++) {
    const j = new THREE.Group(); if (i > 0) j.position.z = -0.085; tailParent.add(j);
    const seg = part(new THREE.CapsuleGeometry(0.05 - i * 0.003, 0.05, 4, 8), i >= 5 ? darkMat : furMat, 0, 0, -0.0425, j);
    seg.rotation.x = Math.PI / 2;
    j.userData.base = i === 0 ? 0.9 : 0.38;
    j.rotation.x = i === 0 ? -0.3 : i >= 5 ? 0.25 : 0.02;
    tailJoints.push(j); tailParent = j;
  }
  tag(cat, "cat", "Mochi. Click to chat, stroke to pet, drag to move");

  // ---- Mochi's food bowl ----
  const bowl = new THREE.Group(); room.add(bowl);
  bowl.position.set(1.6, 0, 1.15);
  cyl(0.34, 0.27, 0.16, 0x5bb8b0, 0, 0.08, 0, bowl, 24);
  const bowlIn = cyl(0.28, 0.28, 0.02, 0x2f6f6a, 0, 0.155, 0, bowl, 24); bowlIn.castShadow = false;
  const kibbleMat = mat(0x9a5b2e);
  const kibble = [];
  for (let i = 0; i < 9; i++) {
    const k = new THREE.Mesh(new THREE.DodecahedronGeometry(0.055, 0), kibbleMat);
    const a = (i / 9) * Math.PI * 2, r = i % 3 === 0 ? 0.04 : 0.15;
    k.position.set(Math.cos(a) * r, 0.19 + (i % 2) * 0.03, Math.sin(a) * r); k.rotation.set(i, i * 2, 0);
    k.visible = false; bowl.add(k); kibble.push(k);
  }
  tag(bowl, "bowl", "Mochi's bowl. Click to feed her");
  let bowlWiggle = 0;

  // little floating hearts and z's
  const glyphTex = (draw) => canvasTex(64, 64, (c, w, h) => draw(c, w, h));
  const zTex = glyphTex((c, w, h) => { c.fillStyle = "#6b6be0"; c.font = "800 50px 'Bricolage Grotesque', sans-serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("z", w / 2, h / 2); });
  const heartTex = glyphTex((c) => { c.fillStyle = "#ff6f91"; c.beginPath(); c.moveTo(32, 54); c.bezierCurveTo(2, 34, 8, 6, 32, 22); c.bezierCurveTo(56, 6, 62, 34, 32, 54); c.fill(); });
  const catFx = [];
  function catPuff(tex, n) {
    for (let i = 0; i < n; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
      s.raycast = () => {};
      s.scale.setScalar(0.2); s.visible = false;
      s.userData = { t: -i * 0.22, vx: (Math.random() - 0.5) * 0.4, ph: Math.random() * 6 };
      cat.add(s); catFx.push(s);
    }
  }
  let catLast = performance.now(), catHappy = 0, catSwat = 0, catChatter = 0, catSleep = 0, nextBlink = 0, blinkAt = 0, zAt = 0, stroke = 0, petN = 0;
  const pointerNdc = new THREE.Vector2(0, 0);
  const PURR_LINES = ["Purrrr.", "Mrrrp. Again.", "Okay, that's the spot.", "Purr. Wazed never stops for pets during a deploy."];
  // ---- Where Mochi can go: spots to rest on, and how they connect ----
  const SPOTS = {
    sillA: { p: [1.55, 3.425, -4.68], yaw: 0.85, rest: true },
    sillB: { p: [2.95, 3.425, -4.68], yaw: 0.6, rest: true },
    deskR: { p: [0.95, 2.58, -3.0] },
    deskL: { p: [-3.2, 2.58, -3.55], yaw: 0.7, rest: true },
    chair: { p: [-1.3, 1.64, -1.7], yaw: 0.6, rest: true },
    rug: { p: [0.6, 0.04, -0.2], yaw: 0.8, rest: true },
    bowl: { p: [1.6, 0, 0.5], yaw: 0 },
    floorB: { p: [-2.8, 0.04, -1.9] },
    floorC: { p: [-3.5, 0, 1.3] },
    shelf0: { p: [-4.45, 2.3, 1.85], yaw: 0.3, rest: true },
    shelf1: { p: [-4.45, 3.55, 1.85] },
    shelf2: { p: [-4.45, 4.8, 2.0], yaw: 0.3, rest: true },
  };
  const LINKS = [["sillA", "sillB"], ["sillA", "deskR"], ["deskR", "deskL"], ["deskR", "rug"], ["deskL", "floorB"], ["rug", "floorB"],
    ["rug", "chair"], ["rug", "bowl"], ["floorB", "chair"], ["floorB", "floorC"], ["floorC", "shelf0"], ["shelf0", "shelf1"], ["shelf1", "shelf2"]];
  for (const k in SPOTS) { SPOTS[k].v = new THREE.Vector3(...SPOTS[k].p); SPOTS[k].n = []; }
  LINKS.forEach(([a, b]) => { SPOTS[a].n.push(b); SPOTS[b].n.push(a); });
  const RESTS = Object.keys(SPOTS).filter((k) => SPOTS[k].rest);
  function route(from, to) {
    const prev = { [from]: null }, q = [from];
    while (q.length) { const c = q.shift(); if (c === to) break; for (const n of SPOTS[c].n) if (!(n in prev)) { prev[n] = c; q.push(n); } }
    const path = []; for (let c = to; c; c = prev[c]) path.unshift(c);
    return path;
  }
  const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
  const mood = { mode: "rest", at: "sillA", next: performance.now() + 7000, yaw: SPOTS.sillA.yaw };
  let stand = 0, stretchP = 0, walkPh = 0, land = 0;
  let eatP = 0, hungry = false, askedFood = false, fedThisVisit = false, visitorLast = performance.now();
  const pageStart = performance.now();
  try { askedFood = sessionStorage.getItem("mochi-asked") === "1"; fedThisVisit = sessionStorage.getItem("mochi-fed") === "1"; } catch (e) {}
  ["pointermove", "keydown", "scroll", "touchstart"].forEach((ev) => window.addEventListener(ev, () => { visitorLast = performance.now(); }, { passive: true }));
  function feedMochi() {
    kibble.forEach((k) => { k.visible = true; });
    bowlWiggle = 1; fedThisVisit = true; askedFood = true; catSleep = 0; catLast = performance.now();
    try { sessionStorage.setItem("mochi-fed", "1"); } catch (e) {}
    if (!(mood.mode === "eat")) {
      if (mood.at !== "bowl" || mood.mode !== "rest") bubbleAt(bowl, hungry ? "Food!" : "Did someone say food?");
      meow(true);
      goTo("bowl", () => Object.assign(mood, { mode: "eat", t: 0, bite: 0.6 }));
    }
  }
  const legFrom = new THREE.Vector3(), legCtrl = new THREE.Vector3(), legTo = new THREE.Vector3();
  function startLeg() {
    const to = mood.path[mood.i + 1];
    legFrom.copy(cat.position); legTo.copy(SPOTS[to].v);
    const dy = legTo.y - legFrom.y, flat = Math.hypot(legTo.x - legFrom.x, legTo.z - legFrom.z);
    mood.jump = Math.abs(dy) > 0.15;
    mood.t = 0; mood.phase = "turn";
    mood.dur = mood.jump ? 0.55 + Math.hypot(flat, dy) * 0.09 : Math.max(0.2, flat / 0.6);
    legCtrl.copy(legFrom).add(legTo).multiplyScalar(0.5);
    legCtrl.y = Math.max(legFrom.y, legTo.y) + 0.5 + flat * 0.12;
    if (mood.path[mood.i].startsWith("shelf") && to.startsWith("shelf")) legCtrl.x += 1.6; // hop out around the shelf board
    mood.yaw = flat > 0.25 ? Math.atan2(legTo.x - legFrom.x, legTo.z - legFrom.z) : Math.PI / 2;
  }
  function goTo(name, onArrive = null) {
    if (mood.mode === "travel" || mood.mode === "drag") { mood.queued = [name, onArrive]; return; }
    if (mood.mode === "stretch") { mood.mode = "rest"; stretchP = 0; }
    if (mood.at === name) { mood.mode = "rest"; if (onArrive) onArrive(); return; }
    const path = route(mood.at, name);
    if (path.length < 2) return;
    Object.assign(mood, { mode: "travel", path, i: 0, onArrive });
    startLeg();
  }
  function settle() { if (mood.mode === "stretch") { mood.mode = "rest"; stretchP = 0; mood.next = performance.now() + 12000; } }

  // ---- Picking Mochi up and putting her somewhere else ----
  const dragPlane = new THREE.Plane(), dragHit = new THREE.Vector3(), camDir = new THREE.Vector3();
  const DROP_LINES = ["Hmph. Fine, I'll sit here.", "Mrrow! Warn me next time.", "Oh. Nice spot, actually.", "I meant to come here anyway."];
  let dropN = 0;
  function startCatDrag() {
    mood.mode = "drag"; stretchP = 0; catSleep = 0; catLast = performance.now();
    camera.getWorldDirection(camDir); cat.getWorldPosition(dragHit);
    dragPlane.setFromNormalAndCoplanarPoint(camDir, dragHit);
    meow(true);
  }
  function moveCatDrag() {
    ray.setFromCamera(pointerNdc, camera);
    if (!ray.ray.intersectPlane(dragPlane, dragHit)) return;
    room.worldToLocal(dragHit);
    // keep her inside the room: walls are at x = -5 and z = -5, the floor ends at +5
    cat.position.set(THREE.MathUtils.clamp(dragHit.x, -4.4, 4.5), THREE.MathUtils.clamp(dragHit.y - 0.45, 0, 6.2), THREE.MathUtils.clamp(dragHit.z, -4.45, 4.5));
  }
  function dropCat() {
    let best = "sillA", bd = Infinity;
    for (const k in SPOTS) {
      const v = SPOTS[k].v;
      const d = Math.hypot(v.x - cat.position.x, v.z - cat.position.z) + Math.max(0, v.y - cat.position.y) * 0.6 + Math.max(0, cat.position.y - v.y) * 0.25;
      if (d < bd) { bd = d; best = k; }
    }
    Object.assign(mood, { mode: "travel", path: ["_drop", best], i: 0 });
    startLeg();
    legCtrl.copy(legFrom).add(legTo).multiplyScalar(0.5);
    legCtrl.y = Math.max(legFrom.y, legTo.y + 0.4);
    Object.assign(mood, { phase: "air", t: 0, dur: 0.3 + legFrom.distanceTo(legTo) * 0.08, yaw: cat.rotation.y });
    mood.dropped = true;
    ui.poke && ui.poke("cat-drag", best);
  }
  function petCat(say = true) {
    settle(); purr();
    catHappy = 1; catLast = performance.now(); catPuff(heartTex, 3);
    if (say) bubbleAt(catHead, PURR_LINES[petN++ % PURR_LINES.length]);
    ui.poke && ui.poke("cat-pet");
  }

  // ---- Lights ----
  const hemi = new THREE.HemisphereLight(0xfff4e8, 0xb9a6d6, 1.6);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffd8b0, 2.4);
  sun.position.set(7, 12, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(1536, 1536);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
  sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const screenGlow = new THREE.PointLight(0x9fb4ff, 0, 4, 2);
  screenGlow.position.set(-1.35, 3.7, -3.6); scene.add(screenGlow);

  // ---- Theme ----
  let night = false, firstTheme = true;
  const light = { hemi: 1.6, sun: 2.4, lamp: 0, glow: 0 };
  const target = { ...light };
  function setNight(n) {
    night = n;
    Object.assign(target, n ? { hemi: 0.55, sun: 0.35, lamp: 3.2, glow: 1.4 } : { hemi: 1.6, sun: 2.4, lamp: 0, glow: 0 });
    hemi.color.set(n ? 0x8d8fd8 : 0xfff4e8);
    hemi.groundColor.set(n ? 0x2a2248 : 0xb9a6d6);
    sun.color.set(n ? 0x9fb0ff : 0xffd8b0);
    const { ctx, canvas: c } = skyTex.userData; drawSky(ctx, c.width, c.height, n); skyTex.needsUpdate = true;
    bulb.material.color.set(n ? 0xfff1c4 : 0xd9d4e6);
    eyeMat.color.set(n ? 0xc8f26a : 0x1c1a2e);
    if (reduced || firstTheme) Object.assign(light, target);
    firstTheme = false;
    dirty = true;
  }

  // ---- Typing animation ----
  let typed = 0, pauseUntil = 0, lastType = 0, burst = 0;
  function tickCode(now) {
    if (now < pauseUntil) return false;
    const speed = burst > now ? 8 : 40;
    if (now - lastType < speed) return false;
    const n = Math.min(12, Math.floor((now - lastType) / speed));
    lastType = now;
    if (typed >= CODE.length) typed = 0;
    typed += n + (CODE[typed] === " " ? 1 : 0);
    if (typed >= CODE.length) { typed = CODE.length; pauseUntil = now + 4000; }
    const { ctx, canvas: c } = codeTex.userData;
    drawCode(ctx, c.width, c.height, CODE.slice(0, typed), Math.floor(now / 500) % 2 === 0);
    codeTex.needsUpdate = true;
    return true;
  }
  if (reduced) { const { ctx, canvas: c } = codeTex.userData; drawCode(ctx, c.width, c.height, CODE, false); codeTex.needsUpdate = true; }
  document.fonts && document.fonts.ready.then(() => {
    const { ctx, canvas: c } = posterTex.userData; drawPoster(ctx, c.width, c.height); posterTex.needsUpdate = true; dirty = true;
  });

  // ---- Interaction ----
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hovered = null;
  let rotTarget = 0, rot = 0, tiltTarget = 0, tilt = 0;
  let drag = null;
  const hits = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const h = ray.intersectObjects(clickables, true)[0];
    return h ? h.object : null;
  };
  let catGrab = null;
  canvas.addEventListener("pointerdown", (e) => {
    catLast = performance.now();
    const o = hits(e);
    if (o && o.userData.id === "cat" && !reduced) {
      catGrab = { x: e.clientX, y: e.clientY, moved: false }; drag = null;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      return;
    }
    drag = { x: e.clientX, y: e.clientY, rot: rotTarget, moved: false };
  });
  window.addEventListener("pointerup", (e) => {
    if (catGrab) {
      const g = catGrab; catGrab = null; canvas.style.cursor = "pointer";
      if (g.moved) dropCat(); else act("cat", {});
      return;
    }
    if (drag && !drag.moved) {
      const o = hits(e);
      if (o) { act(o.userData.id, o.userData); }
    }
    drag = null;
  });
  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointerNdc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    catLast = performance.now();
    if (catGrab) {
      if (!catGrab.moved && Math.hypot(e.clientX - catGrab.x, e.clientY - catGrab.y) > 6) { catGrab.moved = true; startCatDrag(); }
      if (catGrab.moved) { moveCatDrag(); ui.tip(null); canvas.style.cursor = "grabbing"; }
      return;
    }
    tiltTarget = ((e.clientY - r.top) / r.height - 0.5) * 0.12;
    if (drag) {
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) drag.moved = true;
      rotTarget = Math.max(-0.7, Math.min(0.55, drag.rot + dx * 0.004));
      ui.tip(null);
      return;
    }
    if (e.pointerType === "mouse") rotTarget += (((e.clientX - r.left) / r.width - 0.5) * 0.25 - rotTarget) * 0.04;
    const o = hits(e);
    const id = o ? o.userData.id : null;
    if (id !== hovered) {
      if (id === "cat" && catSleep < 0.5 && Math.random() < 0.6) catSwat = 1;
      if (id !== "cat") stroke = 0;
      hovered = id; canvas.style.cursor = id ? "pointer" : "grab";
    }
    if (id === "cat" && e.pointerType === "mouse") {
      stroke += Math.hypot(e.movementX || 0, e.movementY || 0);
      if (stroke > 260) { stroke = 0; petCat(); }
    }
    ui.tip(o ? o.userData.label : null, e.clientX - r.left, e.clientY - r.top);
  });
  canvas.addEventListener("pointerleave", () => { ui.tip(null); hovered = null; });

  let duckHop = 0, mugPuff = 0, plantWiggle = 0;
  const worldPos = new THREE.Vector3();
  function bubbleAt(obj, text, ms) {
    obj.getWorldPosition(worldPos); worldPos.y += 0.7; worldPos.project(camera);
    const r = canvas.getBoundingClientRect();
    ui.bubble(text, (worldPos.x * 0.5 + 0.5) * r.width, (-worldPos.y * 0.5 + 0.5) * r.height, ms);
  }
  const DUCK_LINES = ["Have you tried explaining it out loud?", "Quack. Check the logs.", "It's always DNS. Or a missing index.", "Did you add a test for that?"];
  let duckN = 0, moneyWiggle = 0;
  function act(id, data = {}) {
    ui.poke && ui.poke(id, data.label);
    if (id === "duck") { duckHop = 1; bubbleAt(duck, DUCK_LINES[duckN++ % DUCK_LINES.length]); }
    if (id === "mug") { mugPuff = 1; bubbleAt(mug, "Milk tea. Fuel for debugging."); }
    if (id === "plant") { plantWiggle = 1; bubbleAt(plant, "A cactus. Low maintenance, high uptime."); }
    if (id === "money") { moneyWiggle = 1; bubbleAt(bottle, "Money plant, growing in a bottle. Still waiting on the money."); }
    if (id === "book" && data.root) { const r = data.root; r.userData.pop = 1; bubbleAt(r, data.quip); }
    if (id === "lamp") { ui.toggleTheme(); }
    if (id === "bowl") feedMochi();
    if (id === "cat") {
      if (catSleep > 0.5) { bubbleAt(catHead, "Mrrp? I was napping."); meow(true); } else meow();
      catSleep = 0; petCat(false); ui.openCat && ui.openCat();
    }
    if (id === "monitor") { burst = performance.now() + 1500; ui.goto("#projects"); }
    if (id === "poster") bubbleAt(poster, "Japan is top of my travel list.");
    if (id === "window") bubbleAt(sky, night ? "Dhaka, after midnight." : "Dhaka, around 6pm.");
    dirty = true;
  }

  // ---- Camera path ----
  const camA = { pos: new THREE.Vector3(13.5, 10, 13.5), look: new THREE.Vector3(-0.6, 2.6, -1.2) };
  const camB = { pos: new THREE.Vector3(-1.35, 3.8, -1.55), look: new THREE.Vector3(-1.35, 3.8, -4.3) };
  const tmpP = new THREE.Vector3(), tmpL = new THREE.Vector3();
  let progress = 0, progTarget = 0, aspect = 1, vw = 1, vh = 1, lastShift = null;
  const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function resize() {
    const r = canvas.parentElement.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    aspect = r.width / r.height; vw = r.width; vh = r.height; lastShift = null;
    camera.aspect = aspect;
    camera.fov = aspect < 0.8 ? 46 : aspect < 1.2 ? 38 : 30;
    camera.updateProjectionMatrix();
    dirty = true;
  }
  window.addEventListener("resize", resize);

  let dirty = true, visible = true, last = performance.now();
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(canvas);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; walkSound(false); eatSound(false); return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now;

    const k = reduced ? 1 : 1 - Math.exp(-dt * 7);
    const k2 = 1 - Math.exp(-dt * 5);
    progress += (progTarget - progress) * k;
    rot += (rotTarget - rot) * k2;
    tilt += (tiltTarget - tilt) * k2;
    for (const key in light) light[key] += (target[key] - light[key]) * (reduced ? 1 : k2);
    hemi.intensity = light.hemi; sun.intensity = light.sun; lampLight.intensity = light.lamp; screenGlow.intensity = light.glow;

    const p = ease(Math.min(1, progress));
    room.rotation.y = rot * (1 - p);
    // on narrow screens, frame the desk a bit further out
    const far = aspect < 0.8 ? 1.3 : aspect > 1.2 ? 1.2 : 1.08;
    // on wide screens, push the room to the right so the headline has space
    const shift = aspect > 1.2 ? -0.15 * (1 - p) : 0;
    // on tall screens, push it down below the headline
    const drop = aspect < 0.8 ? -0.2 * (1 - p) : 0;
    const key = shift + ":" + drop;
    if (key !== lastShift) {
      if (!shift && !drop) camera.clearViewOffset();
      else camera.setViewOffset(vw, vh, shift * vw, drop * vh, vw, vh);
      lastShift = key;
    }
    tmpP.copy(camA.pos).multiplyScalar(far).lerp(camB.pos, p);
    tmpP.y += tilt * 6 * (1 - p);
    tmpL.copy(camA.look).lerp(camB.look, p);
    camera.position.copy(tmpP); camera.lookAt(tmpL);

    if (!reduced) {
      tickCode(now);
      steam.forEach((s) => {
        const t = (now / 2200 + s.userData.phase) % 1;
        s.position.set(Math.sin(t * 9 + s.userData.phase * 5) * 0.06, 0.5 + t * (0.7 + mugPuff * 0.6), 0);
        s.scale.setScalar(0.6 + t * (1.4 + mugPuff * 1.5));
        s.material.opacity = (1 - t) * (0.45 + mugPuff * 0.3);
      });
      mugPuff *= 0.985;
      if (duckHop > 0.01) { duckHop *= 0.94; duck.position.y = 2.58 + Math.abs(Math.sin(duckHop * 12)) * 0.35 * duckHop; duck.rotation.y = 0.6 + (1 - duckHop) * Math.PI * 2; }
      leaves.forEach((l) => { l.rotation.z = l.userData.base + Math.sin(now / 900 + l.userData.ph) * (0.05 + moneyWiggle * 0.35); });
      moneyWiggle *= 0.97;
      bookObjs.forEach((b) => {
        if (!b.userData.pop) return;
        b.userData.pop *= 0.9; if (b.userData.pop < 0.01) b.userData.pop = 0;
        b.position.x = (b.userData.homeX ??= b.position.x) + Math.sin(b.userData.pop * Math.PI) * 0.35;
      });
      // Mochi: wander, jump, stretch, get carried around
      const idle = (now - catLast) / 1000;
      const chatting = !!(ui.catOpen && ui.catOpen());
      const sleepTarget = idle > 22 && !chatting && mood.mode === "rest" ? 1 : 0;
      if (mood.mode === "rest" && now > mood.next && catSleep < 0.2 && catHappy < 0.2 && !chatting) {
        if (mood.stretchAfter || Math.random() < 0.3) { mood.stretchAfter = false; Object.assign(mood, { mode: "stretch", t: 0 }); }
        else { let to; do { to = RESTS[Math.floor(Math.random() * RESTS.length)]; } while (to === mood.at); goTo(to); }
      }
      if (mood.mode === "travel") {
        if (mood.phase === "turn" && stand > 0.85 && Math.abs(angleDiff(mood.yaw, cat.rotation.y)) < 0.25) { mood.phase = mood.jump ? "crouch" : "walk"; mood.t = 0; }
        else if (mood.phase === "crouch") { mood.t += dt; if (mood.t > 0.3) { mood.phase = "air"; mood.t = 0; } }
        else if (mood.phase === "walk" || mood.phase === "air") {
          mood.t += dt;
          const u = Math.min(1, mood.t / mood.dur);
          if (mood.phase === "walk") {
            cat.position.lerpVectors(legFrom, legTo, u); walkPh += dt * 10;
            const p = cat.position; // walking across the keyboard types a little
            if (p.y > 2.5 && p.y < 2.7 && p.x > -2.3 && p.x < -0.4) burst = now + 250;
          } else {
            cat.position.set(0, 0, 0).addScaledVector(legFrom, (1 - u) * (1 - u)).addScaledVector(legCtrl, 2 * u * (1 - u)).addScaledVector(legTo, u * u);
            const vy = 2 * (1 - u) * (legCtrl.y - legFrom.y) + 2 * u * (legTo.y - legCtrl.y);
            mood.pitch = THREE.MathUtils.clamp(-vy * 0.12, -0.6, 0.6);
          }
          if (u >= 1) {
            if (mood.phase === "air") land = 1;
            mood.pitch = 0; mood.i++;
            if (mood.i >= mood.path.length - 1) {
              const at = mood.path[mood.i];
              if (mood.dropped) { mood.dropped = false; bubbleAt(catHead, DROP_LINES[dropN++ % DROP_LINES.length]); }
              Object.assign(mood, { mode: "rest", at, yaw: SPOTS[at].yaw ?? cat.rotation.y, next: now + 9000 + Math.random() * 12000, stretchAfter: Math.random() < 0.35 });
              const cb = mood.onArrive, q = mood.queued; mood.onArrive = null; mood.queued = null;
              if (cb) cb();
              if (q) goTo(q[0], q[1]);
            } else startLeg();
          }
        }
      } else mood.pitch = 0;
      if (mood.mode === "rest") mood.yaw = SPOTS[mood.at].yaw ?? mood.yaw;
      if (mood.mode === "stretch") {
        mood.t += dt; stretchP = Math.sin(Math.min(1, mood.t / 2.6) * Math.PI);
        if (mood.t > 2.6) { stretchP = 0; mood.mode = "rest"; mood.next = now + 10000 + Math.random() * 10000; }
      }
      // eating
      if (mood.mode === "eat") {
        mood.t += dt; mood.yaw = 0;
        if (mood.t > mood.bite) {
          mood.bite += 0.5;
          const k = kibble.find((x) => x.visible); if (k) k.visible = false;
          if (!kibble.some((x) => x.visible)) {
            Object.assign(mood, { mode: "rest", next: now + 15000 });
            hungry = false; petCat(false); bubbleAt(catHead, "Thank you, human. Wazed would approve.", 4000);
          }
        }
      }
      eatP += ((mood.mode === "eat" ? 1 : 0) - eatP) * (1 - Math.exp(-dt * 6));
      eatSound(mood.mode === "eat");
      walkSound(mood.mode === "travel" && mood.phase === "walk");
      // once per visit: if the visitor sits idle at the top, Mochi asks for food
      if (!askedFood && !fedThisVisit && now - pageStart > 20000 && now - visitorLast > 12000 && progTarget < 0.05
          && !chatting && mood.mode === "rest" && catSleep < 0.5 && !document.hidden) {
        askedFood = true; catLast = now;
        try { sessionStorage.setItem("mochi-asked", "1"); } catch (e) {}
        goTo("bowl", () => {
          if (kibble.some((k) => k.visible)) return;
          hungry = true; mood.next = now + 40000; bowlWiggle = 1; catLast = performance.now();
          meow(); bubbleAt(catHead, "Mrrow... my bowl is empty. Click it?", 7000);
        });
      }
      if (hungry) bowlWiggle = Math.max(bowlWiggle, 0.35);
      if (bowlWiggle > 0.01) { bowl.rotation.z = Math.sin(now / 70) * 0.06 * bowlWiggle; bowlWiggle *= 0.985; } else bowl.rotation.z = 0;
      const chairBound = (mood.at === "chair" && mood.mode !== "travel" && mood.mode !== "drag")
        || (mood.mode === "travel" && mood.path[mood.path.length - 1] === "chair");
      chair.rotation.y += ((chairBound ? 0.35 + Math.PI : 0.35) - chair.rotation.y) * (1 - Math.exp(-dt * 3));
      const standT = mood.mode === "drag" ? 1 : mood.mode === "stretch" ? 0.6 : mood.mode === "travel" ? (mood.phase === "crouch" ? 0.45 : 1) : 0;
      stand += (standT - stand) * (1 - Math.exp(-dt * (mood.phase === "crouch" ? 10 : 4)));
      if (mood.mode !== "drag") cat.rotation.y += angleDiff(mood.yaw, cat.rotation.y) * (1 - Math.exp(-dt * 6));
      land *= 0.88;
      const inAir = mood.mode === "travel" && mood.phase === "air" ? 1 : 0;
      const walking = mood.mode === "travel" && mood.phase === "walk" ? 1 : 0;
      const dangling = mood.mode === "drag" ? 1 : 0;
      catBody.position.y = stand * 0.18 + Math.abs(Math.sin(walkPh)) * 0.015 * walking - land * 0.07;
      catBody.rotation.x = stretchP * 0.3 + (mood.pitch || 0);
      torso.scale.z = 1.35 * (1 + stretchP * 0.15 + inAir * 0.12);
      legs.forEach((l) => {
        l.scale.y = Math.max(0.02, stand);
        const f = l.userData.front;
        l.rotation.x = Math.sin(walkPh + l.userData.phase) * 0.55 * walking - (f ? stretchP * 1.1 : 0)
          + inAir * (f ? -0.8 : 0.8) + dangling * Math.sin(now / 140 + l.userData.phase) * 0.35;
      });
      paws.forEach((p) => p.scale.setScalar(Math.max(0.01, 1 - stand * 1.5)));
      tailJoints[0].rotation.x = -0.3 + stand * 1.3 - dangling * 1.6;
      catSleep += (sleepTarget - catSleep) * (1 - Math.exp(-dt * (sleepTarget ? 0.7 : 6)));
      const awake = 1 - catSleep;
      catHead.getWorldPosition(worldPos); worldPos.project(camera);
      const yawT = THREE.MathUtils.clamp((pointerNdc.x - worldPos.x) * 1.1, -0.5, 0.5) * awake * (1 - stand * 0.7) * (1 - eatP);
      const pitchT = THREE.MathUtils.clamp(-(pointerNdc.y - worldPos.y) * 1.1, -0.35, 0.3) * awake * (1 - stand * 0.7) + catSleep * 0.45 - stretchP * 0.6 + eatP * (0.6 + Math.sin(now / 110) * 0.12);
      catHead.rotation.y += (yawT - catHead.rotation.y) * k2;
      catHead.rotation.x += (pitchT - catHead.rotation.x) * k2;
      catHead.rotation.z = Math.sin(now / 140) * 0.08 * catHappy + catSleep * 0.18 + Math.sin(now / 90) * 0.05 * catChatter;
      catHead.position.y = 0.43 - catSleep * 0.08 + Math.abs(Math.sin(now / 110)) * 0.02 * catChatter;
      torso.scale.y = 0.7 * (1 + Math.sin(now / (catSleep > 0.5 ? 1100 : 650)) * 0.025) + Math.sin(now / 22) * 0.006 * catHappy;
      if (now > nextBlink) { blinkAt = now; nextBlink = now + 2500 + Math.random() * 4000; }
      const lid = Math.min(now - blinkAt < 130 ? 0.1 : 1, 1 - 0.88 * Math.max(catSleep, catHappy * 0.95));
      eyes.forEach((e) => { e.scale.y = Math.max(0.08, lid); });
      const amp = 0.08 + awake * 0.06 + catHappy * 0.25 + catChatter * 0.3;
      const tempo = catSleep > 0.5 ? 1500 : 520;
      tailJoints.forEach((j, i) => { j.rotation.y = j.userData.base + Math.sin(now / tempo - i * 0.7) * amp * (i / 6 + 0.3); });
      if (catSwat > 0.01 && stand < 0.1) {
        catSwat *= 0.93; const a = Math.sin((1 - catSwat) * Math.PI);
        pawR.position.set(0.11, 0.04 + a * 0.2, 0.42 + a * 0.1); pawR.rotation.x = -a * 0.8;
      } else if (catSwat) { catSwat = 0; pawR.position.set(0.11, 0.04, 0.42); pawR.rotation.x = 0; }
      catHappy *= 0.985; catChatter *= 0.965;
      if (catSleep > 0.8 && now > zAt) { zAt = now + 1400; catPuff(zTex, 1); }
      for (let i = catFx.length - 1; i >= 0; i--) {
        const s = catFx[i], u = s.userData; u.t += dt;
        if (u.t < 0) continue;
        s.visible = true;
        s.position.set(u.vx * u.t + Math.sin(u.t * 4 + u.ph) * 0.05, 0.62 + u.t * 0.45, 0.3);
        s.material.opacity = Math.max(0, 1 - u.t / 1.6);
        if (u.t > 1.6) { cat.remove(s); s.material.dispose(); catFx.splice(i, 1); }
      }
      if (plantWiggle > 0.01) { plantWiggle *= 0.95; plant.rotation.z = Math.sin(now / 60) * 0.12 * plantWiggle; }
      renderer.render(scene, camera);
    } else if (dirty) {
      renderer.render(scene, camera);
    }
    dirty = false;
  }

  resize();
  requestAnimationFrame(frame);

  return {
    setNight,
    setProgress(v) { progTarget = v; dirty = true; },
    catTalk() { catChatter = 1; catLast = performance.now(); },
  };
}
