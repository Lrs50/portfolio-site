import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbBrandLinkedin, TbExternalLink, TbBriefcase } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Reveal from "../components/Reveal";

const RECOMMENDATIONS_URL = "https://www.linkedin.com/in/lucas-dos-reis-lrs/details/recommendations/";
const LOOP_SECONDS = 36; // time for the strip to move by one full set of cards (lower is faster)

// What people who worked with Lucas say, as a strip that drifts sideways, stops while the visitor
// hovers it (or moves keyboard focus into it), and slides one card per arrow click. Quotes are cut from the real texts (LinkedIn and the
// manager's reference letter) and translated per language; a note says so when the site language is not
// the original. The manager is credited by role only (see AGENTS.md).

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function Card({ person, month }) {
  const { t, i18n } = useTranslation();
  return (
    <figure className="flex w-[min(78vw,20rem)] shrink-0 flex-col rounded-2xl border border-white/10 bg-ink2/70 p-4 transition-colors hover:border-white/25">
      <p className="flex items-center gap-2 text-xs text-mist">
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-white/75">
          {t(`recommendations.sources.${person.source}`)}
        </span>
        <span>{month(person.date)}</span>
      </p>

      <h3 className="mt-3 font-display-sm font-bold text-bone text-[1rem] leading-snug [text-wrap:balance]">
        {person.headline}
      </h3>

      <blockquote className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-white/80">
        <p>“{person.quote}”</p>
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
        <span aria-hidden="true" className="grid place-items-center shrink-0 w-8 h-8 rounded-full bg-wine text-white text-xs font-semibold">
          {person.isManager ? <TbBriefcase className="text-base" /> : initials(person.name)}
        </span>
        <span className="min-w-0 text-sm leading-tight">
          <span className="block font-semibold text-bone">{person.name}</span>
          <span className="block text-[0.8rem] text-mist">
            {person.isManager ? person.relation : `${person.role} · ${person.relation}`}
          </span>
          {person.lang && person.lang !== i18n.language && (
            <span className="block mt-1 text-[0.72rem] text-mist/80">{t(`recommendations.translatedFrom.${person.lang}`)}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

const NUDGE_MS = 450; // an arrow click slides the strip by one card in this time

// The drift, written straight to the strip's transform each frame (no React re-render).
// The strip holds the cards twice, so the offset wraps at half its width and the loop never shows a seam.
// Returns nudge(dir): slide one card back (-1) or forward (1).
function useDrift(stripRef, still) {
  const nudgeRef = useRef(() => {});

  useEffect(() => {
    const strip = stripRef.current;
    if (still || !strip) return;
    let offset = 0, last = performance.now(), frame = 0, paused = false, tween = null;

    const half = () => strip.firstElementChild?.offsetWidth || 1;
    const step = () => (strip.querySelector("li")?.offsetWidth || 300) + 16; // card plus gap-4
    const wrap = (x) => ((x % half()) + half()) % half();

    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (tween) {
        const p = Math.min(1, (now - tween.start) / NUDGE_MS);
        offset = tween.from + (tween.to - tween.from) * (1 - (1 - p) ** 3); // ease out
        if (p === 1) tween = null;
      } else if (!paused) {
        offset += (half() / (LOOP_SECONDS * 1000)) * dt;
      }
      strip.style.transform = `translate3d(${-wrap(offset)}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    nudgeRef.current = (dir) => {
      tween = { from: offset, to: offset + dir * step(), start: performance.now() };
    };

    // stop while the mouse is over the cards or keyboard focus is inside them
    const area = strip.parentElement;
    const pause = () => { paused = true; };
    const resume = () => { paused = !drag && (area.matches(":hover") || area.contains(document.activeElement)); };

    // press and move sideways to pull the strip (mouse, touch or pen); vertical touch scrolling is left to the page
    let drag = null;
    const onDown = (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, from: offset, id: e.pointerId };
      tween = null;
      paused = true;
      try { area.setPointerCapture(e.pointerId); } catch { /* keep dragging without capture */ }
      area.dataset.dragging = "1";
    };
    const onDragMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      offset = drag.from - (e.clientX - drag.x);
    };
    const onUp = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      delete area.dataset.dragging;
      // a mouse is still over the strip, so it stays paused; a finger has lifted, so the drift goes on
      paused = e.pointerType === "mouse" && area.matches(":hover");
    };
    area.addEventListener("pointerdown", onDown);
    area.addEventListener("pointermove", onDragMove);
    area.addEventListener("pointerup", onUp);
    area.addEventListener("pointercancel", onUp);
    const onFocusOut = () => setTimeout(resume); // focus has moved by the next task
    area.addEventListener("pointerenter", pause);
    area.addEventListener("pointerleave", resume);
    area.addEventListener("focusin", pause);
    area.addEventListener("focusout", onFocusOut);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointerenter", pause);
      area.removeEventListener("pointerleave", resume);
      area.removeEventListener("focusin", pause);
      area.removeEventListener("focusout", onFocusOut);
      area.removeEventListener("pointerdown", onDown);
      area.removeEventListener("pointermove", onDragMove);
      area.removeEventListener("pointerup", onUp);
      area.removeEventListener("pointercancel", onUp);
      nudgeRef.current = () => {};
    };
  }, [stripRef, still]);

  return (dir) => nudgeRef.current(dir);
}

export default function Recommendations() {
  const { t, i18n } = useTranslation();
  const manager = t("recommendations.manager", { returnObjects: true });
  const items = t("recommendations.items", { returnObjects: true });
  const people = [{ ...manager, name: manager.role, isManager: true }, ...items];
  const [still] = useState(reducedMotion);
  const stripRef = useRef(null);
  const rowRef = useRef(null);
  const nudge = useDrift(stripRef, still);

  // reduced motion: the arrows scroll the still row by one card
  const move = (dir) => {
    if (!still) return nudge(dir);
    const row = rowRef.current;
    const card = row?.querySelector("li")?.offsetWidth || 300;
    row?.scrollBy({ left: dir * (card + 16) });
  };

  const arrow = "grid place-items-center w-11 h-11 rounded-full border border-white/15 text-white/75 hover:text-white hover:border-white/40 transition-colors";

  const month = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    return new Intl.DateTimeFormat(i18n.language, { month: "short", year: "numeric" }).format(new Date(y, m - 1, 1));
  };

  return (
    <div className="relative isolate w-full">
    {/* faint wine light on the left, so the panels alternate down the page */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(112,20,56,0.20),transparent)]" />
    </div>
    <div className="mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8 pt-6 desktop:pt-8">
      <Reveal>
        <div className="spotlight rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-md py-6 desktop:py-10 overflow-hidden">
          <div className="px-6 desktop:px-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 className="font-display font-extrabold text-bone text-[clamp(1.9rem,5vw,2.75rem)] leading-none">
              {t("recommendations.title")}
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={RECOMMENDATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
            >
              <TbBrandLinkedin aria-hidden="true" className="text-base" />
              {t("recommendations.readAll")}
              <TbExternalLink aria-hidden="true" />
            </a>
            <div className="flex gap-3">
              <button type="button" aria-label={t("recommendations.prev")} className={arrow} onClick={() => move(-1)}>
                <IoIosArrowBack aria-hidden="true" className="text-xl" />
              </button>
              <button type="button" aria-label={t("recommendations.next")} className={arrow} onClick={() => move(1)}>
                <IoIosArrowForward aria-hidden="true" className="text-xl" />
              </button>
            </div>
            </div>
          </div>

          {still ? (
            // reduced motion: a still row the visitor scrolls by hand
            <ul ref={rowRef} className="mt-8 flex items-stretch gap-4 overflow-x-auto px-6 desktop:px-10 pb-2">
              {people.map((p) => (
                <li key={p.name} className="flex"><Card person={p} month={month} /></li>
              ))}
            </ul>
          ) : (
            // the strip: the cards twice in a row, moved by half its width, edges faded into the panel
            <div className="mt-6 cursor-grab select-none touch-pan-y data-[dragging]:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div ref={stripRef} className="flex w-max will-change-transform">
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex items-stretch gap-4 pr-4">
                    {people.map((p) => (
                      <li key={p.name} className="flex"><Card person={p} month={month} /></li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
    </div>
  );
}
