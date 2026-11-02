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
- `src/imgs/` – images. `src/i18n.js` – i18next setup.

## Conventions
- Styling: Tailwind utility classes inline only (no CSS modules). Custom colors/fonts/`desktop` (768px) breakpoint in `tailwind.config.js`.
- Components: PascalCase `.jsx`, local `useState`/`useEffect`, no global store.
- All user-facing text goes through `react-i18next` (`t()` / `<Trans>`); never hardcode strings.
- Commits: `type: short lowercase description` (`add:`, `feat:`, `fix:`, `del:`), no body.

## i18n
- Detection: `navigator.language` on load only, fallback `en`. Not persisted.
- Arrays read with `t(key, { returnObjects: true })`; markup uses `<1>…</1>` placeholders with `<Trans components>`.
- Keep locale files in sync: same keys in every file (en.json is the reference).
- Add a language: new `src/locales/<code>.json`; register in `src/i18n.js` (import, `supportedLanguages`, `resources`); add flag to `emojiToLang`, `langToEmoji` and the `Dropdown` options in `src/components/Navbar.jsx`.

## Add a project
1. Add entry to `project.projects` in EVERY locale file (`title, img, desc, tools, githubLink, websiteLink`).
2. Put image in `src/imgs/`.
3. New tool name → add icon to `iconSources` in `src/sections/Projects.jsx` (key = lowercase, no spaces).

## Gotchas
- `img` paths in locale JSON are plain `"src/imgs/x.png"` strings (not Vite-processed); verify they resolve in `npm run build`.
- `tailwind.config.js` uses CommonJS in a `"type": "module"` package; confirm it loads.
- `Contact.jsx` uses hardcoded English `alert()`s and hardcoded EmailJS keys.
- No deploy config in repo; no `vite.config`.
- `index.html` has static `lang="pt-br"`.
