# 📚 AI Research Papers — Reading Tracker

A clean, minimal, and aesthetic web app to read, track, and explore the most essential AI research papers from **1986 to 2026** — all in one place.

---

## ✨ Features

- **60+ landmark papers** curated from 1986 to 2026, ordered newest first
- **Read Paper** button on every entry — opens the original arXiv, Nature, or technical report directly
- **Mark as read** — tick any paper with a satisfying checkmark; read papers fade with a strikethrough so you always know what's left
- **Progress bar** in the header tracks your reading completion percentage
- **Search** by title or author name instantly
- **Topic filter** dropdown — filter by LLM, RL, Diffusion, Vision, Biology, Alignment, and more
- **Estimated reading time** shown for every paper
- **New badge** on 2025–2026 papers so the latest work is easy to spot
- **Persistent state** — your progress is saved automatically across sessions via `localStorage`
- **Fully responsive** — works on desktop, tablet, and mobile

---

## 🖥️ Preview

```
┌─────────────────────────────────────────┐
│  AI Research Papers            98 left  │
│  4 of 60 read · 6% complete   ░░░░░░░░  │
├─────────────────────────────────────────┤
│  ⌕ Search...         [ All Topics ▼]   │
├─────────────────────────────────────────┤
│  2026                             New   │
│  ─────────────────────────────  0/4     │
│  ○  Gemini 2.5 Pro: Thinking at Scale   │
│     Google DeepMind · arXiv · ~25 min   │
│     [LLM] [Reasoning] [Multimodal]      │
│                                         │
│  ✓  GPT-5: A Unified Reasoning System   │
│     OpenAI · Technical Report · ~30 min │
│     [LLM] [Reasoning] [Multimodal]  ✓   │
└─────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Option 1 — Run in Claude.ai (Zero Setup)

Open the `.jsx` file in any Claude.ai artifact viewer and it runs instantly. No installation needed.

### Option 2 — Run Locally with Vite (Recommended)

```bash
# 1. Create a new Vite + React project
npm create vite@latest ai-papers -- --template react
cd ai-papers

# 2. Install dependencies
npm install

# 3. Replace src/App.jsx with the contents of ai-research-2026.jsx

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Option 3 — Run Locally with Create React App

```bash
npx create-react-app ai-papers
cd ai-papers
npm start
```

Replace `src/App.js` with the contents of `ai-research-2026.jsx`.

---

## 📁 Project Structure

```
ai-papers/
├── src/
│   └── App.jsx          ← The entire app (single file)
├── public/
│   └── index.html
├── package.json
└── README.md
```

The entire application lives in **one single file** — no external dependencies beyond React itself.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Google Fonts — Spectral | Elegant serif for headings and titles |
| Google Fonts — Inter | Clean sans-serif for UI labels and meta |
| CSS-in-JS (inline + `<style>`) | All styling, no external CSS files |
| `localStorage` | Persistent read/unread state |

No Tailwind. No component libraries. No build-time dependencies beyond React.

---

## 📖 Papers Included

The list spans the full arc of modern AI — from the foundational algorithms of the 1980s to the frontier models of 2026.

| Era | Highlights |
|---|---|
| **2026** | Mercury 2, AlphaGenome, Gemini 2.5 Pro, GPT-5 |
| **2025** | DeepSeek-R1, Llama 4, Qwen3, Gemini 2.0, Claude Computer Use, Era of Experience |
| **2024** | GPT-4o, Gemini 1.5, Mamba, Sora, AlphaFold 3, 1-bit LLMs |
| **2023** | GPT-4, Constitutional AI, LoRA, Chain-of-Thought, Toolformer |
| **2022** | InstructGPT, Chinchilla, Stable Diffusion, DALL-E 2, Whisper |
| **2021** | CLIP, AlphaFold 2, Codex |
| **2020** | GPT-3, Scaling Laws, DDPM, T5 |
| **2017–2019** | Transformers, PPO, AlphaGo Zero, BERT, GPT-1 & 2 |
| **Pre-2017** | AlexNet, GANs, Attention, Dropout, DQN, Backpropagation |

**Topics covered:** LLM · Reasoning · RL · Alignment · Safety · Multimodal · Diffusion · Vision · Biology · Architecture · Scaling · Agents · Fine-tuning · NLP · Speech · Code

---

## 🎨 Design Philosophy

- **Warm off-white background** (`#f7f5f0`) — easy on the eyes during long reading sessions
- **Spectral serif font** — designed specifically for comfortable on-screen reading
- **Sage green accents** for progress and completion — calming, not jarring
- **Minimal chrome** — no sidebars, no modals, no noise. Just papers.
- **Read papers fade** with a subtle strikethrough — visible progress without clutter

---

## 💾 Data Persistence

Read/unread state is saved automatically to `localStorage` under the key `airt8`. It persists across browser sessions with no account or backend required.

To reset your progress:

```js
// Run in browser console
localStorage.removeItem('airt8')
```

---

## 🔧 Customization

### Add a new paper

Add an entry to the `PAPERS` array in `App.jsx`:

```js
{
  id: 999,
  year: 2026,
  title: "Your Paper Title",
  authors: "Author Name, Institution",
  venue: "arXiv 2026",
  tags: ["LLM", "Reasoning"],
  mins: 20,
  url: "https://arxiv.org/abs/xxxx.xxxxx",
  abstract: "One paragraph summary of the paper's contribution."
}
```

### Add a new topic tag

Tags are derived automatically from the `tags` array of all papers — just add your new tag string and it appears in the dropdown filter instantly.

---

## 📜 License

MIT — free to use, modify, and share.

---

*Built with Claude · 60 papers · 1986 – 2026*