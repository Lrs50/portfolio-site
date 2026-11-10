# AGENTS.md

Single-page personal portfolio. Vite 6 + React 19 + Tailwind 3, plain JavaScript (no TypeScript). npm.

## Commands

- `npm run dev` / `npm run build` / `npm run preview`
- No tests, linter or formatter. `.github/workflows/build.yml` runs `npm ci` and `npm run build` on every push and PR. `README.md` is the short public overview; this file is the working guide.

## Layout

- `index.html`: Vite entry (mounts `#app`, holds the title, social preview tags and fonts).
- `src/main.jsx` → `src/App.jsx`: stacked sections with anchor navigation. No router. `Projects`, `AboutMe` and `Contact` are lazy-loaded; `useActiveSection` (IntersectionObserver) drives the navbar.
- `src/sections/`: `Hero`, `Projects`, `AboutMe`, `Contact`.
- `src/components/`: `Navbar`, `Dropdown`, `ResumeButton`, `WordCloud`, `Reveal` (fades and raises a section panel once when it scrolls into view), `LavaDome` (the lava-lamp half-circle behind the Hero photo: pure SVG with a goo filter, animated by the `wax` keyframes in `tailwind.config.js`).
- `src/locales/{en,pt,fr,es,ja,ko,zh}.json`: all text AND project data. `src/i18n.js`: i18next setup.
- `src/contact.js`: the public email address, used by `Hero` and `Contact`.
- `public/imgs/`: WebP images served at `/imgs/...` (avatar 1400 px, project cards about 800 px).
- `.env.production` (public build values) and `.env.example` (template). `docs/screenshot.jpg` is the README image.

## Design

- Follow `docs/STYLE_GUIDE.md` (tokens, type scale, components, motion, copy, pre-merge checklist). Values live in `tailwind.config.js`.
- Dark theme. Tokens: `ink`, `ink2`, `wine` (brand `#701438`, shapes only), `wineHover`, `rose` (the only accent on text), `bone` (headings), `mist` (secondary text), `shadow-glass`, the `desktop` breakpoint (768px) and a 15% opacity step.
- One font family, Bricolage Grotesque. `font-display` for large headings, `font-display-sm` for small ones (both in `src/style.css`).
- Wine on the near-black background has very low contrast (1.76:1). Never use it for text, and keep Lighthouse accessibility at 100.

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

1. Add an entry to `project.projects` in EVERY locale file (`title, summary, img, desc, tools, githubLink, websiteLink`). `summary` is the one line shown on the carousel card; `desc` is the long text in the dialog. Order is by importance: the first cards are seen first.
2. Put the image in `public/imgs/` as WebP (about 800 px wide) and set `img` to `"/imgs/x.webp"`.
3. New tool name: add its icon to `iconSources` in `src/sections/Projects.jsx` (key = lowercase, no spaces).

## Gotchas

- `img` paths in locale JSON and `<img src>` are plain `/imgs/x.webp` strings (not processed by Vite). They only work if the file is in `public/imgs/`; check `dist/imgs/` after a build.
- `tailwind.config.js` is CommonJS in a `"type": "module"` package; confirm it loads after edits.
- Env values are public (Vite bakes `VITE_*` into the bundle): keep them in `.env.production`, list new ones in `.env.example`, never put private keys there. `ResumeButton` opens `VITE_RESUME_URL_EN` / `VITE_RESUME_URL_PT` (PT when the language is `pt`) in a new tab; while they are empty it links to `/` in the same tab.
- `Contact.jsx` sends through EmailJS (`emailjs.send`). Service ID, template ID and public key come from `VITE_EMAILJS_*` variables kept out of git: `.env.local` locally (git-ignored via `*.local`) and the Cloudflare Pages variables or secrets when deployed (set in the project Settings, then Variables and Secrets; secrets work as well). Without them the form shows the error state. They still end up in the built site, so restrict the allowed origins in the EmailJS dashboard. The template body only needs `{{message}}`; the visitor's email is optional and is appended to the message as a `Reply to:` line. A hidden `website` field is a honeypot. If sends fail, read the status in the browser console (`EmailJS error <status> <text>`): 412 "Invalid grant" means the email service (Gmail) must be reconnected in the EmailJS dashboard.
- Deployed on Cloudflare Pages from `master` (build `npm run build`, output `dist`); Node is pinned in `.node-version`.
- The word cloud is a custom component on `d3-cloud` (`src/components/WordCloud.jsx`): layout, entrance, the push away from the mouse and the hover standout all live there. Pointer effects write styles straight to the SVG nodes (no React re-render per move). It keeps its original pink and violet palette on purpose (see `docs/STYLE_GUIDE.md`).
- After any UI change, check the page at 1280 px and 360 px and run a Lighthouse accessibility pass.

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>