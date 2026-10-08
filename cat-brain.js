// Mochi's brain: a small, friendly matcher over things Wazed told the cat.
// Runs fully in the browser, so it works on GitHub Pages with no backend.
//
// Want real AI answers? Deploy a tiny proxy (Cloudflare Worker, Vercel function
// or an Echo endpoint) that calls an LLM with the facts below as its system
// prompt, rate-limits by IP, and returns { "reply": "..." }. Then put its URL
// here. If the proxy fails or times out, Mochi falls back to this local brain.
export const CAT_API = "";

const EMAIL = "wajed.abdul.khan@gmail.com";

export const GREETING = "Meow! I'm Mochi, Wazed's desk cat. Ask me about his work, his projects or how to hire him. Chin scratches also accepted.";
export const SUGGESTIONS = ["Who is Wazed?", "What's his stack?", "Is he open to work?", "Show me a project", "Do you like fish?"];

const INTENTS = [
  { id: "greet", w: 0.5, k: ["hi", "hello", "hey", "salam", "assalamu", "yo", "hola", "konnichiwa", "good morning", "good evening"],
    a: [GREETING, "Mrrp, hello! What do you want to know about Wazed?"] },
  { id: "mochi", k: ["who are you", "your name", "are you ai", "are you an ai", "are you real", "bot", "robot", "mochi"],
    a: ["I'm Mochi, the cat on Wazed's desk. Not a big fancy AI, just a small cat with a list of things Wazed told me. Ask me about him and I'll do my best."] },
  { id: "about", k: ["who is", "about him", "about wazed", "tell me", "himself", "introduce", "summary", "wazed", "wajed"],
    a: ["Wazed (Abdul Wajed Khan) is a full-stack engineer in Dhaka with a soft spot for the backend. About four years shipping production software in Python, Django and Go, and more React and TypeScript lately. His favourite part is detective work: turning \"the app feels slow\" into one specific query."] },
  { id: "skills", k: ["skill", "stack", "tech", "language", "tools", "golang", "go", "python", "django", "react", "typescript", "postgres", "docker", "kubernetes", "aws", "graphql", "redis", "fastapi", "echo", "backend", "frontend", "full stack", "fullstack"],
    a: ["His daily drivers: Go (Echo) and Python (Django, FastAPI) on the backend, PostgreSQL and Redis for data, GraphQL for APIs, Docker, Kubernetes and AWS for shipping, and React with TypeScript on the front. He uses AI tools every day too, and still reviews every line himself."] },
  { id: "work", k: ["job", "work", "current", "softwrd", "placepoint", "hjemla", "propcloud", "company", "norway", "employer", "day job"],
    a: ["He's a backend engineer at Softwrd, the team behind Placepoint, working remotely with people in Norway and Portugal. He's building a Go service layer that gives client apps one clean API over older microservices, plus GraphQL work on Placepoint and Hjemla."] },
  { id: "experience", k: ["experience", "years", "history", "career", "repliq", "healthos", "kodeeo", "lead", "leadership", "background", "previous", "senior"],
    a: ["About four years in. He mentored 10 students at Kodeeo, then joined Repliq and worked on HealthOS, stepping up as acting tech lead for a team of seven when the lead left. Since December 2024 he's been at Softwrd. The full route is in the Journey section."] },
  { id: "projects", k: ["project", "built", "portfolio", "side project", "apps", "show me"],
    a: ["Five on the shelf: Placepoint and Hjemla (day job), GrainX (a live grain auction he built solo), Solace (a habit tracker API in plain Go), DamDekho (price comparison for restaurants in Bangladesh) and Unisphere (a university results portal). Ask me about any of them, or click the monitor."] },
  { id: "damdekho", w: 2, k: ["damdekho", "dam dekho", "price comparison", "restaurant", "supplier"],
    a: ["DamDekho means \"check the price\" in Bangla. Restaurant owners log what each supplier charges, then see the cheapest source for every item and how prices move. Go backend, bilingual React frontend, and he's turning it into a real business: https://damdekho-frontend.vercel.app/"] },
  { id: "grainx", w: 2, k: ["grainx", "grain", "auction", "australia", "bid", "farmer"],
    a: ["GrainX is a live auction marketplace for an Australian client: farmers list grain, buyers bid. He built it solo with Django and PostgreSQL, and every bid runs in a transaction so prices stay consistent when lots of buyers pounce at once. I respect a good pounce."] },
  { id: "solace", w: 2, k: ["solace", "habit", "journal"],
    a: ["Solace is a habit tracker and journal API in plain Go, no framework: JWT auth, streaks, soft-deleted journal entries and photo uploads to S3, shipped as a tiny Docker image. He's building it now."] },
  { id: "unisphere", w: 2, k: ["unisphere", "sstu", "result", "results portal"],
    a: ["Unisphere is the online results portal for SSTU. He worked on secure login, account recovery and bilingual guidance, so a nervous student on results day doesn't get stuck at the door."] },
  { id: "bugs", k: ["bug", "bugs", "debug", "hardest", "challenge", "proud", "problem", "performance", "slow", "optimi", "fix"],
    a: ["His favourite catch: HealthOS pages hanging for about 30 seconds every busy afternoon. N+1 queries plus missing indexes. He fixed both and cached hot reads in Redis, down to about 2 seconds. He also stopped duplicate invoices with select_for_update() and a unique constraint. More in the Bugs section."] },
  { id: "hire", w: 1.5, k: ["hire", "hiring", "available", "open to", "relocat", "visa", "sponsor", "uk", "europe", "eu", "uae", "dubai", "remote", "role", "position", "opportunit", "recruit", "interview", "looking for"],
    a: [`Yes, he's looking! A full-stack or backend role with visa sponsorship in the UK, EU or UAE, or a remote one. Fastest way to reach him: ${EMAIL}. Tell him Mochi sent you.`] },
  { id: "contact", w: 1.5, k: ["contact", "email", "mail", "reach", "linkedin", "github", "connect", "cv", "resume", "message him", "talk to him"],
    a: [`Email: ${EMAIL}. LinkedIn: https://www.linkedin.com/in/wajed-khan. GitHub: https://github.com/WazedKhan. He answers faster than I do when someone opens a tuna can.`] },
  { id: "education", k: ["education", "study", "studied", "university", "degree", "iubat", "graduat", "cse", "college"],
    a: ["He has a BSc in Computer Science and Engineering from IUBAT in Dhaka, and graduated in 2022."] },
  { id: "opensource", k: ["open source", "package", "pypi", "library", "blog", "medium", "article", "writing"],
    a: ["He published two Python packages: django-notebook-config (use the Django ORM from a Jupyter notebook) and static-type-enforcer (makes type hints reject bad arguments at runtime). He also writes on Medium, like a post on graceful shutdown in Go."] },
  { id: "ai", k: ["ai tools", "chatgpt", "copilot", "llm", "claude", "use ai"],
    a: ["He uses AI tools every day for scaffolding, tests and unfamiliar code, and reviews every line like it's going to production. I review nothing. I just sit on the keyboard."] },
  { id: "hobbies", k: ["hobby", "hobbies", "fun", "free time", "anime", "japan", "tokyo", "travel", "book", "read", "tea", "weekend"],
    a: ["Anime, milk tea, books, and planning a trip to Japan (see the Tokyo poster). He reads mostly fiction: The Alchemist, Before the Coffee Gets Cold, Humayun Ahmed's Himu books and a pile of Jules Verne. They're on the shelf behind me."] },
  { id: "location", k: ["where", "location", "live", "based", "dhaka", "bangladesh", "timezone", "time zone"],
    a: ["He's in Dhaka, Bangladesh (UTC+6), working remotely. That's the Dhaka skyline out the window. Well, a drawing of it."] },
  { id: "food", w: 1.5, k: ["food", "fish", "treat", "tuna", "hungry", "eat", "milk", "breakfast"],
    a: ["Fish, please. Wazed says I've already had breakfast. Wazed is lying.", "Treats are accepted at any time. Wazed keeps them in the second drawer. You didn't hear that from me."] },
  { id: "meow", w: 1.5, k: ["meow", "mew", "purr", "nya", "nyan"],
    a: ["Meow meow. (Translation: hire Wazed, he refills my water bowl on time.)", "Mrrrrow."] },
  { id: "love", w: 1.5, k: ["cute", "good kitty", "good cat", "love you", "pet", "adorable", "sweet"],
    a: ["Purrrr. Flattery works on me. Scroll down if you want to see what Wazed builds."] },
  { id: "duck", w: 1.5, k: ["duck"],
    a: ["The duck is the senior debugging consultant. I'm in charge of sitting on things."] },
  { id: "thanks", k: ["thanks", "thank you", "thx", "bye", "goodbye", "see you"],
    a: ["Anytime. If you end up hiring him, I take payment in treats."] },
];

const FALLBACK = [
  `Hmm, I'm only a cat, so I don't know that one. Wazed would, though: ${EMAIL}`,
  "That's above my pay grade (I'm paid in treats). Try asking about his skills, his projects or how to hire him.",
];

let turn = 0;
const pick = (arr) => arr[turn++ % arr.length];

export function localReply(question) {
  const norm = " " + question.toLowerCase().replace(/[^a-z0-9ঀ-৿+#]+/g, " ").trim() + " ";
  const words = norm.trim().split(" ");
  let best = null, bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.k) {
      const hit = kw.includes(" ") ? norm.includes(" " + kw + " ") || norm.includes(" " + kw)
        : words.some((w) => w === kw || (kw.length >= 4 && w.startsWith(kw)));
      if (hit) score += intent.w || 1;
    }
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  if (!best) return { text: pick(FALLBACK), intent: "unknown" };
  return { text: pick(best.a), intent: best.id };
}

export async function reply(question) {
  if (CAT_API) {
    try {
      const res = await fetch(CAT_API, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: question.slice(0, 300) }),
        signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined,
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.reply === "string" && data.reply.trim()) return { text: data.reply.trim(), intent: "ai" };
      }
    } catch (e) { /* fall through to the local brain */ }
  }
  return localReply(question);
}
