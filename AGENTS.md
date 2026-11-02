# AGENTS.md

Single-page personal portfolio. Vite 6 + React 19 + Tailwind 3, plain JavaScript (no TypeScript). npm.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- No tests, no linter, no formatter configured.

## Layout
- `index.html` – Vite entry (mounts `#app`).
- `src/main.jsx` → `src/App.jsx`: stacked sections (`Hero`, `Projects`, `About`, `Contact`) with anchor navigation. No router; `useActiveSection` (IntersectionObserver) drives the navbar.
- `src/sections/` – page sections. `src/components/` – Navbar, Dropdown, WordCloud (Footer, Cardproject are unused).
- `src/locales/{en,pt,fr,es,ja,ko,zh}.json` – all text AND project data.
- `public/imgs/` – images served as-is at `/imgs/...` (avatar, ellipse, project cards). `src/imgs/` – only `bg-texture.png` (used from CSS, bundled by Vite). `src/i18n.js` – i18next setup.

## Conventions
- Styling: Tailwind utility classes inline only (no CSS modules). Custom colors/fonts/`desktop` (768px) breakpoint in `tailwind.config.js`.
- Components: PascalCase `.jsx`, local `useState`/`useEffect`, no global store.
- All user-facing text goes through `react-i18next` (`t()` / `<Trans>`); never hardcode strings.
- Commits: `type: short lowercase description` (`add:`, `feat:`, `fix:`, `del:`), no body.

## i18n
- Language order: saved choice (localStorage `lang`, set only by `chooseLanguage()` in `src/i18n.js`), then `navigator.language`, then `en`.
- Arrays read with `t(key, { returnObjects: true })`; markup uses `<1>…</1>` placeholders with `<Trans components>`.
- Keep locale files in sync: same keys in every file (en.json is the reference).
- Add a language: new `src/locales/<code>.json`; register in `src/i18n.js` (import, `supportedLanguages`, `resources`); add it to the `languages` array in `src/components/Navbar.jsx`.

## Add a project
1. Add entry to `project.projects` in EVERY locale file (`title, img, desc, tools, githubLink, websiteLink`).
2. Put image in `public/imgs/` and set `img` to `"/imgs/x.png"`.
3. New tool name → add icon to `iconSources` in `src/sections/Projects.jsx` (key = lowercase, no spaces).

## Gotchas
- `img` paths in locale JSON and `<img src>` in components are plain `/imgs/x.png` strings (not Vite-processed). They only work if the file is in `public/imgs/`; check `dist/imgs/` after `npm run build`.
- `tailwind.config.js` uses CommonJS in a `"type": "module"` package; confirm it loads.
- `Contact.jsx` sends through EmailJS with hardcoded public keys. The EmailJS template needs Reply-To set to `{{email}}`. A hidden `website` field is a honeypot.
- No deploy config in repo yet; `vite.config.js` only sets `base: "/"` (planned host: Cloudflare Pages, see `target/SPEC.md`).
- The Resume button (`ResumeButton`) redirects to `VITE_RESUME_URL_EN` / `VITE_RESUME_URL_PT` from `.env` (PT when the site language is `pt`). No React Vite plugin, so every `.jsx` needs `import React from "react"`.
