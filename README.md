# Lucas Reis, portfolio

Personal portfolio of Lucas Reis, computer engineer: a single page with projects, an About section and a contact form, in 7 languages (EN, PT, ES, FR, JA, KO, ZH).

![Hero](docs/screenshot.jpg)

## Stack

Vite, React 19, Tailwind CSS 3, react-i18next, keen-slider, EmailJS.

## Run

```bash
npm install
npm run dev       # development
npm run build     # production build in dist/
npm run preview   # serve the build
```

## Configuration

All variables are listed in `.env.example`.

| Variable | Purpose | Set in |
|---|---|---|
| `VITE_SITE_URL` | Site address (link preview, canonical tag) | `.env.production` |
| `VITE_RESUME_URL_EN` | Resume button link (English and other languages) | `.env.production` |
| `VITE_RESUME_URL_PT` | Resume button link (Portuguese) | `.env.production` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service for the contact form | `.env.local` and Cloudflare |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template for the contact form | `.env.local` and Cloudflare |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | `.env.local` and Cloudflare |

- Empty resume values make the Resume button return to the main page.
- The EmailJS values are not committed. Use `.env.local` locally (git-ignored) and the Cloudflare Pages variables or secrets for the live site. Without them the contact form shows an error.

## Deploy

Cloudflare Pages from `master`: build `npm run build`, output `dist`. Add the three EmailJS variables in the project settings (Variables and Secrets) before deploying.

## Contributing

Structure, conventions and how to add a project or a language are in `AGENTS.md`.
