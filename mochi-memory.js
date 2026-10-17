// Mochi remembers visitors (in their own browser only, nothing leaves the device)
// and drops Wazed's CV for anyone who plays with her properly.

export const CV_URL = "assets/Wazed-Khan-CV.pdf";
const KEY = "mochi_mem";

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } };
const save = (m) => { try { localStorage.setItem(KEY, JSON.stringify(m)); } catch (_) {} };

const mem = load();
const prev = mem.last || null;          // what they did on their previous visit
const prevDate = mem.lastDate || null;
mem.visits = (mem.visits || 0) + 1;
mem.last = { fed: 0, pet: 0, moved: 0, chats: 0 };
mem.lastDate = Date.now();
save(mem);

export const visit = mem.visits;
export const now = mem.last;            // this visit, live
export const cvGiven = () => !!mem.cv;

export function count(what) {
  if (!(what in now)) return;
  now[what]++;
  mem.lastDate = Date.now();
  save(mem);
}
export function markCv() { mem.cv = true; save(mem); }

// Earned when they've fed, petted AND chatted with her this visit.
export const earnedCv = () => !mem.cv && now.fed > 0 && now.pet > 0 && now.chats > 0;

const plural = (n, w) => `${n === 1 ? "once" : n === 2 ? "twice" : n + " times"}`;
export function welcomeBack() {
  if (visit < 2) return null;
  const days = prevDate ? Math.floor((Date.now() - prevDate) / 864e5) : 0;
  const when = days === 0 ? "Yay, you came back! 😸 I'm so happy to see you again." : days === 1 ? "You're back! 😸 I missed you since yesterday." : days < 30 ? `You're back! 😸 It's been ${days} days and I'm so happy to see you.` : "You came back! 😻 It's been a while, I'm so happy to see you.";
  let did = "";
  if (prev) {
    if (prev.fed) did = `You fed me ${plural(prev.fed)} last time. I still remember. 🐟`;
    else if (prev.pet) did = `You gave me ${prev.pet === 1 ? "a chin scratch" : prev.pet + " chin scratches"} last time. Purr.`;
    else if (prev.moved) did = `Last time you carried me around ${plural(prev.moved)}. That was fun.`;
    else if (prev.chats) did = "I loved our chat last time.";
    else did = "Maybe this time we can be friends? Chin scratches welcome.";
  }
  return { bubble: when, chat: `${when} ${did}`.trim() };
}

let cvExists = null;
export async function hasCv() {
  if (cvExists === null) {
    try { cvExists = (await fetch(CV_URL, { method: "HEAD", cache: "no-store" })).ok; } catch (_) { cvExists = false; }
  }
  return cvExists;
}
