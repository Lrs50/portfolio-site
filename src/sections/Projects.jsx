import "keen-slider/keen-slider.min.css";
import React, { useState, useEffect, useRef } from "react";
import { BsBookmarkPlusFill, BsWhatsapp } from "react-icons/bs";
import { useKeenSlider } from "keen-slider/react";
import { useMediaQuery } from "react-responsive"
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
} from 'react-icons/si';
import { FaGitAlt, FaPython, FaDocker, FaQuestionCircle } from 'react-icons/fa';
import { TbSql, TbBrandGithubFilled, TbExternalLink } from 'react-icons/tb';
import { LiaChartBarSolid } from 'react-icons/lia';
import { BsGraphUpArrow } from 'react-icons/bs';
import { MdOutlineSoupKitchen } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Trans, useTranslation } from 'react-i18next';
import { SiNgrok } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { FaDatabase } from "react-icons/fa";
import { BsRegex } from "react-icons/bs";
import { SiUv } from "react-icons/si";
import { SiPydantic } from "react-icons/si";
import { IoIosCodeDownload } from "react-icons/io";
import { FaMasksTheater } from "react-icons/fa6";
import { TbBrandCSharp, TbAtom2 } from "react-icons/tb";
import { MdScreenSearchDesktop } from "react-icons/md";
import { TbBlocks } from "react-icons/tb";

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


function Project({ title = "", img = "",desc="",githubLink="", websiteLink="", tools=[]}) {
  const [showDetails, setShowDetails] = useState(false);
  const openerRef = useRef(null);
  const closeDetails = () => {
    setShowDetails(false);
    openerRef.current?.focus();
  };
  return (
    <>
    <div
      className="keen-slider__slide flex justify-center"
      style={{ overflow: "visible" }}
    >
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
        }}
        className="group relative w-[300px] backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-3xl
        shadow-glass transition-transform duration-300 transform-gpu hover:scale-105 hover:z-30 z-10
        px-3 pt-3 pb-0 rounded-br-none"
      >
        {/* soft light that follows the pointer */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl rounded-br-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(260px_circle_at_var(--x)_var(--y),rgba(255,111,174,0.12),transparent_70%)]" />
        <div className="h-[3.8rem] flex items-center justify-center text-center px-0">
          <h3
            className="text-white text-[clamp(1.1rem,1.7vw,1.5rem)] font-semibold tracking-wide
            leading-tight line-clamp-2 overflow-hidden"
          >
            {title}
          </h3>
        </div>
        <hr className="w-full border-t border-white/10 mb-10" />

        <div className="relative mt-8 -mx-3" style={{ marginBottom: '-12px' }}>
          <div className="absolute inset-0 -translate-y-6 scale-[0.92] rounded-3xl
            bg-white/[0.05] backdrop-blur-md border border-white/10 z-0" />
          <div className="absolute inset-0 -translate-y-3 scale-[0.96] rounded-3xl
            bg-white/[0.08] backdrop-blur-md border border-white/10 z-0" />

          <button
          ref={openerRef}
          type="button"
          onClick={() => setShowDetails(true)}
          aria-haspopup="dialog"
          className="p-0 m-0 border-none bg-transparent appearance-none leading-none block"
        >
          <img
            src={img}
            alt={title}
            width="800"
            height="534"
            loading="lazy"
            decoding="async"
            className="relative z-10 w-full rounded-3xl object-cover shadow-glass rounded-br-none block"
          />
        </button>
          <div className="absolute -bottom-9 -right-5 p-3 z-20">
          <button type="button" onClick={() => setShowDetails(true)} aria-label={title} aria-haspopup="dialog">
            <BsBookmarkPlusFill aria-hidden="true" className="text-glow w-16 h-16 transition hover:scale-125" />
          </button>
          </div>
        </div>
      </div>
    </div>
    {showDetails && (
      <MoreDetails
        title={title}
        desc={desc}
        tools={tools}
        githubLink={githubLink}
        websiteLink={websiteLink}
        onClose={closeDetails}
      />
    )}
    </>
  );
}

function MoreDetails({ title = "", desc = "", githubLink = "", websiteLink = "", tools = [], onClose }) {
  const { t } = useTranslation();
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

  return (
    <div
      className="fixed inset-0 z-[999] bg-ink/70 backdrop-blur-sm flex justify-center items-center p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative bg-ink2 border border-white/10 text-white/80 rounded-3xl w-[85vw] max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-glass"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("project.close")}
          className="absolute -top-1 right-2 text-white/70 text-4xl hover:text-white"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h2 id="project-dialog-title" className="mb-5 text-center text-3xl font-semibold text-white">{title}</h2>

        <div className="mb-5">
          <div className="flex items-center gap-2">
            <p className="text-justify text-xs text-white/60">{t("project.tool")}</p>
            <hr className="flex-grow border-t border-white/10" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {tools.map((tool) => {
              const toolKey = tool.toLowerCase().replace(/\s+/g, '');
              const toolData = iconSources[toolKey];
              const Icon = toolData?.icon || FaQuestionCircle;
              const label = toolData?.label || tool;

              return (
                <div key={tool} className="relative group flex flex-col items-center">
                  <Icon role="img" aria-label={label} className="text-[25px] text-white/70 hover:text-white hover:scale-125 transition-transform duration-300 ease-in-out" />
                  <div aria-hidden="true" className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition bg-ink border border-white/10 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="flex-grow border-t border-white/10 mt-4" />
        </div>

        <p className="text-justify">
          {desc.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        
        <hr className="flex-grow border-t border-white/10 my-4" />

        <div className="flex items-center justify-start gap-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-1 hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <TbBrandGithubFilled aria-hidden="true" className="text-white text-xl" />
              <span className="text-white text-sm">{t("project.githublink")}</span>
            </a>
          )}

          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-1 hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <TbExternalLink aria-hidden="true" className="text-white text-xl" />
              <span className="text-white text-sm">{t("project.websitelink")}</span>
            </a>
          )}
        </div>

        {(githubLink || websiteLink) && (<hr className="flex-grow border-t border-white/10 mt-4" />)}
      </div>
    </div>
  );
}

export default function Projects() {


    const { t } = useTranslation();
    const projects = t('project.projects', { returnObjects: true });

    const isDesktop = useMediaQuery({ minWidth: 768 })
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef,slider] = useKeenSlider({
        loop: true,
        renderMode: "performance",
        slides: {
        perView: isDesktop? 4 : 1,
        spacing: 15,

        },
        dragSpeed: 0.5,
        slideChanged(s) {
          setCurrentSlide(s.track.details.rel);
        },
    });
    
    return (
        <div className="relative isolate justify-center px-3">
          {/* light pool under the carousel */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.14),rgba(226,54,127,0.08)_55%,transparent)]" />
          </div>
          {/* framed panel: dark glass lit from the top, a sibling of the About cards but not identical */}
          <div className="w-full pt-16 pb-8 overflow-x-hidden rounded-3xl border border-white/10 shadow-glass backdrop-blur-md
          bg-[radial-gradient(120%_70%_at_50%_0%,rgba(255,111,174,0.10),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
          <div className="-mt-10 mx-[40px]">
              <h2 className="text-5xl text-center text-white font-medium font-inter">
              <Trans
              i18nKey="project.title"
              components={{ 1: <span className="text-glow font-semibold">{t('project.title')}</span> }}
              />
              </h2>
              <div className="relative" role="region" aria-roledescription="carousel" aria-label={t("nav.projects")}>

              <button
              type="button"
              aria-label={t("project.next")}
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10
              hover:scale-125 transition-transform duration-300"
              onClick={() => slider.current?.next()}>
                <IoIosArrowForward aria-hidden="true" className="text-white/60 hover:text-white transition-colors text-7xl" />
              </button>

              <button
              type="button"
              aria-label={t("project.prev")}
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10
              hover:scale-125 transition-transform duration-300"
              onClick={() => slider.current?.prev()}>
                <IoIosArrowBack aria-hidden="true" className="text-white/60 hover:text-white transition-colors text-7xl" />
              </button>

              <div
              ref={sliderRef}
              className="keen-slider mt-12"
              style={{ overflow: "visible" }}
              >
              {projects.map((proj, i) => (
                  <Project key={i} title={proj.title} img={proj.img} desc={proj.desc} tools={proj.tools} githubLink={proj.githubLink} websiteLink={proj.websiteLink}/>
              ))}
              </div>
              </div>

          </div>
            <div aria-hidden="true" className="flex flex-wrap items-center gap-1 justify-center mt-8">

              {[...Array(projects.length)].map((_,i) => {
                if (i===currentSlide){
                  return <div key={i} className="rounded-full bg-glow w-7 h-2 transition-all"></div>
                }
                return <div key={i} className="rounded-full bg-white/25 justify-center w-2 h-2 transition-all"></div>
            })}
            </div>
          </div>
        </div>

    );
}