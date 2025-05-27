import "keen-slider/keen-slider.min.css";
import React, { useState } from "react";
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
import { TbBrandCSharp } from "react-icons/tb";
import { MdScreenSearchDesktop } from "react-icons/md";
import { TbBlocks } from "react-icons/tb";

const iconSources = {
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
  return (
    <>
    <div
      className="keen-slider__slide flex justify-center"
      style={{ overflow: "visible" }}
    >
      <div
        className="w-[300px] backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl
        shadow-lg transition-transform duration-300 transform-gpu hover:scale-105 hover:z-30 z-10
        px-3 pt-3 pb-0 rounded-br-none"
      >
        <div className="h-[3.8rem] flex items-center justify-center text-center px-0">
          <h3
            className="text-white text-[clamp(1.1rem,1.7vw,1.5rem)] font-semibold tracking-wide 
            leading-tight line-clamp-2 overflow-hidden"
          >
            {title}
          </h3>
        </div>
        <hr className="w-full border-t border-white/20 mb-10" />

        <div className="relative mt-8 -mx-3" style={{ marginBottom: '-12px' }}>
          <div className="absolute inset-0 -translate-y-6 scale-[0.92] rounded-3xl
            bg-white/10 backdrop-blur-md border border-white/10 z-0 shadow-md" />
          <div className="absolute inset-0 -translate-y-3 scale-[0.96] rounded-3xl
            bg-white/15 backdrop-blur-md border border-white/10 z-0 shadow-md" />

          <button
          onClick={() => setShowDetails(true)}
          className="p-0 m-0 border-none bg-transparent appearance-none leading-none block"
        >
          <img
            src={img}
            alt={title}
            className="relative z-10 w-full rounded-3xl object-cover shadow-xl rounded-br-none block"
          />
        </button>
          <div className="absolute -bottom-9 -right-5 p-3 z-20">
          <button onClick={() => setShowDetails(true)}>
            <BsBookmarkPlusFill className="text-mainPurple w-16 h-16 transition hover:scale-125" />
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
        onClose={() => setShowDetails(false)}
      />
    )}
    </>
  );
}

function MoreDetails({ title = "", desc = "", githubLink = "", websiteLink = "", tools = [], onClose }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex justify-center items-center p-6">
      <div className="relative bg-offWhite rounded-3xl w-[85vw] max-w-4xl p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute -top-1 right-2 text-black text-4xl hover:text-red-500"
        >
          &times;
        </button>

        <p className="mb-5 text-center text-3xl font-semibold">{title}</p>

        <div className="mb-5">
          <div className="flex items-center gap-2">
            <p className="text-justify text-xs font-extralight">{t("project.tool")}</p>
            <hr className="flex-grow border-t border-black/20" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {tools.map((tool) => {
              const toolKey = tool.toLowerCase().replace(/\s+/g, '');
              const toolData = iconSources[toolKey];
              const Icon = toolData?.icon || FaQuestionCircle;
              const label = toolData?.label || tool;

              return (
                <div key={tool} className="relative group flex flex-col items-center">
                  <Icon className="text-[25px] text-gray-700 hover:scale-125 transition-transform duration-300 ease-in-out" />
                  <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="flex-grow border-t border-black/20 mt-4" />
        </div>

        <p className="text-justify">
          {desc.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        
        <hr className="flex-grow border-t border-black/20 my-4" />

        <div className="flex items-center justify-start gap-4">
          {githubLink && (
            <button
              className="flex items-center justify-start gap-1 hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={() => window.open(githubLink, '_blank', 'noopener,noreferrer')}
            >
              <TbBrandGithubFilled className="text-black text-xl" />
              <p className="text-black text-sm font-extralight">{t("project.githublink")}</p>
            </button>
          )}

          {websiteLink && (
            <button
              className="flex items-center justify-start gap-1 hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={() => window.open(websiteLink, '_blank', 'noopener,noreferrer')}
            >
              <TbExternalLink className="text-black text-xl" />
              <p className="text-black text-sm font-extralight">{t("project.websitelink")}</p>
            </button>
          )}
        </div>

        {(githubLink || websiteLink) && (<hr className="flex-grow border-t border-black/20 mt-4" />)}
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
        <div className=" justify-center px-3">
          <div className="w-full pt-16 pb-8 bg-[url('./imgs/bg-texture.png')] overflow-x-hidden 
          bg-cover bg-center rounded-3xl shadow-xl">
          <div className="-mt-10 mx-[40px]">
              <h1 className="text-5xl text-center text-white font-medium leading right text-gray-900 font-inter">
              <Trans
              i18nKey="project.title"
              components={{ 1: <span className="text-mainPurple font-semibold">{t('project.title')}</span> }}
              />
              </h1>
              <div className="relative  ">

              <IoIosArrowForward 
              className="absolute text-white text-7xl -right-10 top-1/2 transform -translate-y-1/2 z-10
              hover:scale-125 transition-transform duration-300 cursor-pointer" 
              onClick={() => slider.current?.next()}/>

              <IoIosArrowBack
              className="absolute text-white text-7xl -left-10 top-1/2 transform -translate-y-1/2 z-10
              hover:scale-125 transition-transform duration-300 cursor-pointer"
              onClick={() => slider.current?.prev()}/>
              
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
            <div className="flex flex-wrap items-center gap-1 justify-center mt-8">
              
              {[...Array(projects.length)].map((_,i) => {
                if (i===currentSlide){
                  return <div className="rounded-full bg-mainPurple w-7 h-2"></div>
                }
                return <div className="rounded-full bg-offWhite justify-center w-2 h-2"></div>
            })}
            </div>
          </div>
        </div>

    );
}