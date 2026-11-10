import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbBrandLinkedin, TbExternalLink, TbBriefcase } from "react-icons/tb";
import Reveal from "../components/Reveal";

const RECOMMENDATIONS_URL = "https://www.linkedin.com/in/lucas-dos-reis-lrs/details/recommendations/";
const LOOP_SECONDS = 36; // time for the strip to move by one full set of cards (lower is faster)

// What people who worked with Lucas say, as a strip that drifts sideways and stops while the visitor
// hovers it (or moves keyboard focus into it). Quotes are cut from the real texts (LinkedIn and the
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

export default function Recommendations() {
  const { t, i18n } = useTranslation();
  const manager = t("recommendations.manager", { returnObjects: true });
  const items = t("recommendations.items", { returnObjects: true });
  const people = [{ ...manager, name: manager.role, isManager: true }, ...items];
  const [still] = useState(reducedMotion);

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
          </div>

          {still ? (
            // reduced motion: a still row the visitor scrolls by hand
            <ul className="mt-8 flex items-stretch gap-4 overflow-x-auto px-6 desktop:px-10 pb-2">
              {people.map((p) => (
                <li key={p.name} className="flex"><Card person={p} month={month} /></li>
              ))}
            </ul>
          ) : (
            // the strip: the cards twice in a row, moved by half its width, edges faded into the panel
            <div className="group mt-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
                style={{ animationDuration: `${LOOP_SECONDS}s` }}
              >
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
