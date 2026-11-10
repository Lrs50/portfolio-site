import "keen-slider/keen-slider.min.css";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useKeenSlider } from "keen-slider/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  SiApacheairflow,
  SiFastapi,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiSelenium,
  SiStreamlit,
  SiUnity,
  SiGnubash,
  SiGooglecloud,
  SiGooglegemini,
  SiMicrogenetics,
  SiPlotly,
  SiNgrok,
  SiUv,
  SiPydantic,
} from 'react-icons/si';
import { FaGitAlt, FaPython, FaDocker, FaQuestionCircle, FaDatabase } from 'react-icons/fa';
import { FaMasksTheater } from "react-icons/fa6";
import { TbSql, TbBrandGithubFilled, TbExternalLink, TbBrandCSharp, TbAtom2, TbBlocks } from 'react-icons/tb';
import { LiaChartBarSolid } from 'react-icons/lia';
import { BsGraphUpArrow, BsRegex } from 'react-icons/bs';
import { MdOutlineSoupKitchen, MdScreenSearchDesktop } from 'react-icons/md';
import { IoLogoWhatsapp, IoIosCodeDownload } from "react-icons/io";
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import Reveal from "../components/Reveal";

const iconSources = {
  pennylane:{icon:TbAtom2, label: "PennyLane"},
  uv:{icon:SiUv, label: "UV"},
  pydantic:{icon:SiPydantic, label: "Pydantic"},
  requests:{icon:IoIosCodeDownload, label: "Requests"},
  playwright:{icon:FaMasksTheater, label: "Playwright"},
  csharp:{icon:TbBrandCSharp, label: "C#"},
  searchalgorithm:{icon:MdScreenSearchDesktop, label: "Search Algorithms"},
  tkinter:{icon:TbBlocks, label: "TKinter"},
  ngrok:{icon:SiNgrok, label: "Ngrok"},
  whatsapp:{icon:IoLogoWhatsapp, label: "WhatsApp"},
  heyoo:{icon:HiOutlineChatBubbleLeftRight, label: "Heyoo"},
  tinydb:{icon:FaDatabase, label: "TinyDB"},
  regex:{icon:BsRegex, label: "Regex"},
  plotly:{icon:SiPlotly, label: "Plotly"},
  gemini:{icon:SiGooglegemini, label: "Gemini"},
  algoritmogenetico:{icon:SiMicrogenetics, label: "Genetic Algorithms"},
  prophet:{icon:LiaChartBarSolid, label: "Facebook Prophet"},
  python: { icon: FaPython, label: "Python" },
  sql: { icon: TbSql, label: "SQL" },
  unity: { icon: SiUnity, label: "Unity" },
  bash: { icon: SiGnubash, label: "Bash" },
  git: { icon: FaGitAlt, label: "Git" },
  pandas: { icon: SiPandas, label: "Pandas" },
  numpy: { icon: SiNumpy, label: "NumPy" },
  airflow: { icon: SiApacheairflow, label: "Apache Airflow" },
  streamlit: { icon: SiStreamlit, label: "Streamlit" },
  selenium: { icon: SiSelenium, label: "Selenium" },
  beautifulsoup: { icon: MdOutlineSoupKitchen, label: "BeautifulSoup" },
  fastapi: { icon: SiFastapi, label: "FastAPI" },
  scikitlearn: { icon: SiScikitlearn, label: "Scikit-Learn" },
  docker: { icon: FaDocker, label: "Docker" },
  googlecloud: { icon: SiGooglecloud, label: "Google Cloud" },
  matplotlib:{ icon: BsGraphUpArrow, label: "Matplotlib" },
};

const toolKey = (tool) => tool.toLowerCase().replace(/\s+/g, '');
const toolLabel = (tool) => iconSources[toolKey(tool)]?.label || tool;

// The demo link says what it opens: a running app, a video or a package page.
function useDemoLabel() {
  const { t } = useTranslation();
  return (url) => {
    if (/youtube\.com|youtu\.be/.test(url)) return t("project.watch");
    if (/pypi\.org/.test(url)) return t("project.package");
    return t("project.tryLive");
  };
}

// A title that stays within two lines: it starts at `max` px and shrinks one pixel at a time (down to `min`)
// until the text fits. It re-fits when the text changes (language), when the width changes and when fonts finish loading.
function FitTitle({ as: Tag = "h3", text, max, min, className = "", ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastWidth = -1;
    const fit = () => {
      let size = max;
      el.style.fontSize = size + "px";
      while (size > min && el.scrollHeight > el.clientHeight + 1) {
        size -= 1;
        el.style.fontSize = size + "px";
      }
      lastWidth = el.clientWidth;
    };
    fit();
    const observer = new ResizeObserver(() => {
      if (el.clientWidth !== lastWidth) fit();
    });
    observer.observe(el);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [text, max, min]);

  return (
    <Tag ref={ref} className={`line-clamp-2 ${className}`} {...rest}>
      {text}
    </Tag>
  );
}

function ProjectLinks({ project, onDetails, openerRef, compact = false }) {
  const { t } = useTranslation();
  const demoLabel = useDemoLabel();
  return (
    <div className={`flex flex-wrap items-center gap-y-3 ${compact ? "gap-x-4 text-sm" : "gap-x-5"}`}>
      {project.websiteLink && (
        <a
          href={project.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full bg-wine hover:bg-wineHover text-white font-semibold transition-colors ${compact ? "px-4 py-1.5 text-sm" : "px-5 py-2"}`}
        >
          {demoLabel(project.websiteLink)}
          <TbExternalLink aria-hidden="true" />
        </a>
      )}
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-bone hover:text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
        >
          <TbBrandGithubFilled aria-hidden="true" />
          {t("project.code")}
        </a>
      )}
      <button
        ref={openerRef}
        type="button"
        onClick={onDetails}
        aria-haspopup="dialog"
        className="text-mist hover:text-white underline decoration-white/20 underline-offset-4 hover:decoration-white transition-colors"
      >
        {t("project.details")}
      </button>
    </div>
  );
}

// Opens the long description in a dialog; keeps focus handling in one place.
function useDetails() {
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);
  const close = () => {
    setOpen(false);
    openerRef.current?.focus();
  };
  const { t } = useTranslation();
  return { open, openerRef, show: () => setOpen(true), close, label: t("project.details") };
}

function ProjectCard({ project, index, revealed }) {
  const details = useDetails();
  const extra = project.tools.length - 4;
  return (
    <div className="keen-slider__slide">
      <article
        style={{ animationDelay: `${250 + Math.min(index, 3) * 90}ms` }}
        className={`spotlight group h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink2/60 transition-colors duration-300 hover:border-white/25
        ${revealed ? "animate-rise" : "opacity-0"}`}
      >
        <button
          type="button"
          onClick={details.show}
          aria-haspopup="dialog"
          aria-label={`${project.title}: ${details.label}`}
          className="block border-b border-white/10"
        >
          <img
            src={project.img}
            alt=""
            width="800"
            height="534"
            loading="lazy"
            decoding="async"
            className="block w-full aspect-[3/2] object-cover transition-[filter] duration-300 group-hover:brightness-110"
          />
        </button>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display-sm font-bold text-bone text-[1.15rem] leading-tight line-clamp-2 min-h-[2.5em]">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-white/75 line-clamp-3">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-mist">
            {project.tools.slice(0, 4).map((tool) => <li key={tool}>{toolLabel(tool)}</li>)}
            {extra > 0 && <li>+{extra}</li>}
          </ul>
          <div className="mt-5 pt-4 border-t border-white/10">
            <ProjectLinks project={project} onDetails={details.show} openerRef={details.openerRef} compact />
          </div>
        </div>
      </article>
      {details.open && <MoreDetails {...project} onClose={details.close} />}
    </div>
  );
}

function MoreDetails({ title = "", desc = "", githubLink = "", websiteLink = "", tools = [], onClose }) {
  const { t } = useTranslation();
  const demoLabel = useDemoLabel();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // focus moves into the dialog, Escape closes it, Tab stays inside it, the page behind does not scroll
  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // rendered straight into <body> so `fixed` covers the whole page and the navbar
  return createPortal(
    <div
      className="fixed inset-0 z-[999] bg-ink/75 backdrop-blur-sm flex justify-center items-center p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative bg-ink2 border border-white/10 text-white/80 rounded-2xl w-[92vw] desktop:w-[85vw] max-w-3xl max-h-[85vh] max-h-[85dvh] overflow-y-auto overscroll-contain p-6 desktop:p-10 shadow-glass"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("project.close")}
          className="absolute top-2 right-4 text-white/70 text-4xl leading-none hover:text-white"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <FitTitle
          as="h2"
          id="project-dialog-title"
          text={title}
          max={36}
          min={18}
          className="mb-6 pr-8 font-display-sm font-bold leading-tight text-bone"
        />

        <div className="mb-6">
          <p className="text-sm text-mist mb-3">{t("project.tool")}</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => {
              const Icon = iconSources[toolKey(tool)]?.icon || FaQuestionCircle;
              const label = toolLabel(tool);
              return (
                <div key={tool} className="relative group flex flex-col items-center">
                  <Icon role="img" aria-label={label} className="text-[24px] text-white/70 group-hover:text-white transition-colors" />
                  <div aria-hidden="true" className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity bg-ink border border-white/10 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="leading-relaxed max-w-[68ch]">
          {desc.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        {(githubLink || websiteLink) && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6">
            {websiteLink && (
              <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-wine hover:bg-wineHover text-white font-semibold px-5 py-2 transition-colors">
                {demoLabel(websiteLink)}
                <TbExternalLink aria-hidden="true" />
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone hover:text-white underline decoration-white/30 underline-offset-4">
                <TbBrandGithubFilled aria-hidden="true" />
                {t("project.code")}
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const projects = t('project.projects', { returnObjects: true });
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    dragSpeed: 0.6,
    slides: { perView: 1.08, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1100px)": { slides: { perView: 3, spacing: 24 } },
      "(min-width: 1500px)": { slides: { perView: 4, spacing: 24 } },
    },
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
  });

  // the cards rise in once, the first time the section is seen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const arrow = "grid place-items-center w-11 h-11 rounded-full border border-white/15 text-white/75 hover:text-white hover:border-white/40 transition-colors";

  return (
    <div className="relative isolate w-full">
    {/* faint wine light on the left, so the panels alternate down the page */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-15%] top-1/3 w-[900px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(112,20,56,0.24),transparent)]" />
    </div>
    <div className="mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8 pt-8">
    <Reveal>
    <div ref={sectionRef} className="spotlight rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-md p-6 desktop:p-10">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display font-extrabold text-bone text-[clamp(1.9rem,5vw,2.75rem)] leading-none">
          {t('project.title')}
        </h2>
        <div className="flex gap-3">
          <button type="button" aria-label={t("project.prev")} className={arrow} onClick={() => slider.current?.prev()}>
            <IoIosArrowBack aria-hidden="true" className="text-xl" />
          </button>
          <button type="button" aria-label={t("project.next")} className={arrow} onClick={() => slider.current?.next()}>
            <IoIosArrowForward aria-hidden="true" className="text-xl" />
          </button>
        </div>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label={t("nav.projects")} className="mt-8">
        <div ref={sliderRef} className="keen-slider">
          {projects.map((p, i) => (
            <ProjectCard key={p.githubLink || p.title} project={p} index={i} revealed={revealed} />
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="mt-8 flex items-center gap-1.5">
        {projects.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-rose" : "w-1.5 bg-white/25"}`} />
        ))}
      </div>
    </div>
    </Reveal>
    </div>
    </div>
  );
}
