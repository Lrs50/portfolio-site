# AGENTS.md

Single-page personal portfolio. Vite 6 + React 19 + Tailwind 3, plain JavaScript (no TypeScript). npm.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- No tests, linter or formatter. `.github/workflows/build.yml` runs `npm ci` and `npm run build` on every push and PR. `README.md` is the short public overview; this file is the working guide.

## Layout
- `index.html`: Vite entry (mounts `#app`, holds the title, social preview tags and fonts).
- `src/main.jsx` → `src/App.jsx`: stacked sections with anchor navigation. No router. `Projects`, `AboutMe` and `Contact` are lazy-loaded; `useActiveSection` (IntersectionObserver) drives the navbar.
- `src/sections/`: `Hero`, `Projects`, `AboutMe`, `Contact`.
- `src/components/`: `Navbar`, `Dropdown`, `ResumeButton`, `WordCloud`, `LavaDome` (the lava-lamp half-circle behind the Hero photo: pure SVG with a goo filter, animated by the `wax` keyframes in `tailwind.config.js`).
- `src/locales/{en,pt,fr,es,ja,ko,zh}.json`: all text AND project data. `src/i18n.js`: i18next setup.
- `public/imgs/`: WebP images served at `/imgs/...` (avatar 1400 px, project cards about 800 px).
- `.env.production` (public build values) and `.env.example` (template). `docs/screenshot.jpg` is the README image.

## Design
- Dark theme. Tokens in `tailwind.config.js`: `ink` (page), `ink2` (raised), `glow` (accent, the brand dark purple `#701438`), `violet`, `shadow-glass`, plus the `desktop` breakpoint (768px) and a 15% opacity step.
- Card recipe: `bg-white/[0.04] border border-white/10 shadow-glass backdrop-blur-md rounded-3xl`. Headings white, body `text-white/80`, soft radial "light pools" behind sections. No glowing text or buttons.
- Dark purple on the near-black background has very low contrast. Use it for shapes, not for body text, and keep Lighthouse accessibility at 100.

## Conventions
- Tailwind utility classes inline only (no CSS modules).
- Components: PascalCase `.jsx`, local `useState`/`useEffect`, no global store. No React Vite plugin, so every `.jsx` needs `import React from "react"`.
- All user-facing text goes through `react-i18next` (`t()` / `<Trans>`); never hardcode strings.
- Commits: `type: short lowercase description` (`add:`, `feat:`, `fix:`, `del:`, `chore:`), no body.

## Content rules
- No claims the site cannot back up. Quantum Dice runs on a classical simulator, so its output is pseudo-random.
- No internal product names and no invented metrics.
- Keep "Computer Engineer" as the positioning.
- Never publish the Tractian reference letter (it contains personal data).
- Write plainly, without dashes or filler.

## i18n
- Language order: saved choice (localStorage `lang`, set only by `chooseLanguage()` in `src/i18n.js`), then `navigator.language`, then `en`.
- Arrays read with `t(key, { returnObjects: true })`; markup uses `<1>…</1>` placeholders with `<Trans components>`.
- Keep locale files in sync: same keys in every file (`en.json` is the reference).
- Add a language: new `src/locales/<code>.json`; register it in `src/i18n.js` (import, `supportedLanguages`, `resources`) and in the `languages` array in `src/components/Navbar.jsx`.

## Add a project
1. Add an entry to `project.projects` in EVERY locale file (`title, img, desc, tools, githubLink, websiteLink`).
2. Put the image in `public/imgs/` as WebP (about 800 px wide) and set `img` to `"/imgs/x.webp"`.
3. New tool name: add its icon to `iconSources` in `src/sections/Projects.jsx` (key = lowercase, no spaces).

## Gotchas
- `img` paths in locale JSON and `<img src>` are plain `/imgs/x.webp` strings (not processed by Vite). They only work if the file is in `public/imgs/`; check `dist/imgs/` after a build.
- `tailwind.config.js` is CommonJS in a `"type": "module"` package; confirm it loads after edits.
- Env values are public (Vite bakes `VITE_*` into the bundle): keep them in `.env.production`, list new ones in `.env.example`, never put private keys there. `ResumeButton` opens `VITE_RESUME_URL_EN` / `VITE_RESUME_URL_PT` (PT when the language is `pt`) in a new tab; while they are empty it links to `/` in the same tab.
- `Contact.jsx` sends through EmailJS with public keys. The template needs Reply-To set to `{{email}}` and the allowed origins restricted in the EmailJS dashboard. A hidden `website` field is a honeypot.
- Deployed on Cloudflare Pages from `master` (build `npm run build`, output `dist`); Node is pinned in `.node-version`.
- `.npmrc` sets `legacy-peer-deps` because `react-wordcloud` does not declare React 19 support. A plain `npm install` fails without it.
- After any UI change, check the page at 1280 px and 360 px and run a Lighthouse accessibility pass.
