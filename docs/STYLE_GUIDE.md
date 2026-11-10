# Style guide

The rules every section of the site follows. `tailwind.config.js` holds the values. This file says when to use them. If the two disagree, fix one of them in the same change.

## Principles

1. **One bold element.** The lava dome behind the photo is the memorable thing. Everything around it stays quiet.
2. **Proof over decoration.** Show real work, real links and real names. Add nothing the site cannot back up.
3. **One accent.** Wine for shapes, rose for the few accented words and states. No pink, violet or lilac.
4. **Plain words.** Write the way a senior engineer talks to a hiring manager.

## Color

| Token | Hex | Use | Contrast on `ink` |
|---|---|---|---|
| `ink` | `#0b0610` | Page background | n/a |
| `ink2` | `#140a1a` | Raised areas, dialogs, the proof strip | n/a |
| `wine` | `#701438` | Brand. Buttons, timeline dots, the lava dome. Shapes only | 1.76:1, never text |
| `wineHover` | `#8a1a47` | Hover state of wine buttons | n/a |
| `rose` | `#d58aa6` | Accent text, active nav underline, carousel dot, focus ring | 7.65:1 |
| `bone` | `#ede8ec` | Headings, names, important labels | 16.56:1 |
| `mist` | `#a79cae` | Secondary text: dates, tool lists, captions | 7.64:1 |
| `white/75` to `white/80` | | Body text | about 11:1 |

White text on `wine` is 11.38:1, so buttons stay readable.

Borders are `white/10` (default) and `white/25` to `white/40` (hover). Light pools behind sections use wine only, at low opacity (`rgba(112,20,56,0.18)` to `0.38`).

Never use wine for text. Never put brand colors on icons (no LinkedIn blue, no WhatsApp green).

**One exception: the skills cloud** keeps its original pink and violet palette (`#ff6fae #ff9ccb #f2789f #c4a7ff #a78bfa #e6def0 #b3a6c4`). It is decorative, readable on ink, and lives only in `WordCloud.jsx`. Do not reuse these colors anywhere else.

## Typography

One family: **Bricolage Grotesque** (variable: weight 300 to 800, width 75 to 100, optical size 12 to 96). It is loaded in `index.html` and set as `font-sans`. Japanese, Korean and Chinese fall back to the system font.

| Role | Classes |
|---|---|
| Name (h1) | `font-display font-extrabold text-bone leading-[0.86] text-[clamp(3.5rem,16vw,8.5rem)]` |
| Section heading (h2) | `font-display font-extrabold text-bone leading-none text-[clamp(2.25rem,7vw,3.5rem)]`, the same in every panel |
| Card or dialog title | `font-display-sm font-bold text-bone` |
| Lead text | `text-lg text-mist leading-relaxed` |
| Body | `text-base text-white/80 leading-relaxed`, max `68ch` |
| Small print | `text-sm` or `text-xs text-mist` |

`font-display` (condensed, `wdth 80`) is for large type only. Below about 28 px use `font-display-sm` (`wdth 92`) so titles stay readable. Both live in `src/style.css`.

Do not:
- Color or bold a single word inside a heading.
- Use all caps labels, eyebrow labels above headings or numbered markers (01 / 02) for content that is not a sequence.
- Add a second font family or a monospace face for labels.
- Justify text.

## Layout

- Content width, the same for the hero and every section: `mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8`. Headings align left.
- Sections live in panels (see Components), so the page reads as a set of boxes on the dark background.
- Spacing rhythm:
  - The hero and the proof strip sit together with no gap.
  - Proof strip to the Projects panel: `pt-8`.
  - Between panels: `pt-6 desktop:pt-8` (and `gap-6 desktop:gap-8` for the side by side pair).
  - Inside a panel, heading to content: `mt-8`.
  - Footer: `mt-10` after the Contact panel.
- Breakpoint: `desktop` (768 px). Check every change at 1280 px and 360 px.
- Radius by role: `rounded-full` for buttons and pills, `rounded-3xl` for section panels, `rounded-2xl` for cards and dialogs. Images inside cards are not rounded on their own.

## Components

**Panel** (Projects, About, Trajectory, Contact): `rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-md p-6 desktop:p-10`. One recipe for every section.

**Project card** (carousel, 1 per view on phones, 2 from 768 px, 3 from 1100 px, 4 from 1500 px): `rounded-2xl border border-white/10 bg-ink2/60`, hover changes only the border to `white/25`. Image on top (3:2), then title, one-line `summary`, up to four tools plus a count, then links behind a `white/10` divider.

**Primary button**: `rounded-full bg-wine hover:bg-wineHover text-white font-semibold px-5 py-2`. One primary action per card or block (Resume, Try it live, Send).

**Secondary link**: text with `underline decoration-white/30 underline-offset-4`, hover to `decoration-white`.

**Icons**: monochrome. `text-white/70`, `hover:text-white`, no scale on hover. Icons that carry meaning get `aria-label`; decorative ones get `aria-hidden`.

**Skills cloud** (`WordCloud.jsx`, built on `d3-cloud`): the original word list and palette, no buttons or labels. Font sizes scale with the panel width so every word fits (taller cloud on phones). The drawing is `aria-hidden`; a visually hidden list carries the words for screen readers.

**Trajectory**: two sided timeline on a dashed center line. Text alternates left and right, dates in mist. Dots are wine until the rose fill reaches them.

**Contact panel**: two columns on desktop (`minmax(0,1fr)` and `minmax(0,1.3fr)`, `gap-12`), stacked on phones. Left: a small heading (`font-display-sm font-bold text-[clamp(1.6rem,4vw,2.25rem)]`, smaller than section headings on purpose), one line in mist, the email link. Right: the form as one card (`rounded-2xl border-white/15 bg-white/[0.04]`, rose border on focus) with the email row, the message and a footer row holding the status text and the Send button.

**Carousel controls**: round outline buttons (`w-11 h-11 border-white/15`) next to the heading. Position dots: `w-1.5` white/25, the active one `w-6 bg-rose`.

## Motion

Motion is allowed where it says something. Current set, nothing else:
- Hero load: elements rise in with `animate-rise` and staggered `animationDelay` (0, 120, 150, 220, 320 ms).
- Lava dome: slow drift (`wax`, 26 s) and a lean toward a mouse pointer. Touch input is ignored.
- Panels: each section box fades in and rises 24 px once when it enters the view (`src/components/Reveal.jsx`, 700 ms). The right panel of a pair starts 120 ms later.
- Projects: the cards rise in once, 90 ms apart, starting 250 ms after the panel appears.
- Skills cloud: the words assemble from the center once, biggest first (about 1 s). Then, with a mouse, words within 120 px of the pointer slide up to 26 px away, and the word under the pointer grows to 1.3x, turns white and bold with a soft pink glow while the others fade to 55%. On touch, a tap makes the word stand out for a moment without pushing.
- Trajectory: the center line fills in rose as the reader scrolls (reading point at 65% of the viewport) and the dots light up as it reaches them.
- Hover changes color, border or image brightness, never size. The skills cloud is the one exception.
- `prefers-reduced-motion` stops the animations (global rule in `src/style.css`), the dome lean (`motion-reduce:`), the cloud stagger, push and scale (only the color change stays) and the timeline fill (drawn in full).

## Copy

- Plain and specific, sentence case, no exclamation marks, no dashes, no filler.
- Buttons say what happens: "Try it live", "Watch video", "View package", "Send".
- Errors say what failed and what to do next.

| Before | After |
|---|---|
| HELLO! | (removed) |
| I'm Lucas / Computer Engineer | Lucas Reis / Computer Engineer |
| A dream began | Computer Engineering at UFPE. |
| Graduated! Looking for my next big challenge. | Graduated in Computer Engineering. Bachelor's degree from UFPE. |
| Got an awesome project idea or just want to connect? Let's chat! | Want to talk about a role or a project? Send me a message. |
| Error sending the message! | The message was not sent. Try again or email me directly. |

All text goes through the locale files. Every language gets the same change.

## Before merging a UI change

- [ ] Uses only the tokens above. No new hex values inline, except the documented light pools.
- [ ] Checked at 1280 px and 360 px.
- [ ] Keyboard focus visible (rose outline) on every control.
- [ ] Reduced motion still gives a correct, still page.
- [ ] Lighthouse accessibility at 100.
- [ ] All seven locale files have the same keys.
