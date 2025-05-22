import "keen-slider/keen-slider.min.css";
import React, {useRef, useState,useEffect } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useKeenSlider } from "keen-slider/react";
import { useMediaQuery } from "react-responsive"
import { FaPython, FaGitAlt, FaDocker, FaLinux, FaAws, FaCode } from 'react-icons/fa';
import {
  SiC,
  SiCplusplus,
  SiUnity,
  SiGnubash,
  SiPandas,
  SiNumpy,
  SiApacheairflow,
  SiStreamlit,
  SiSelenium,
  SiFastapi,
  SiPytorch,
  SiScikitlearn,
  SiQiskit,
  SiGooglecloud,
  SiApachespark,
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { LiaChartBarSolid } from 'react-icons/lia';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoIosArrowBack ,IoIosArrowForward } from "react-icons/io";
import { TbBrandGithubFilled,TbExternalLink } from 'react-icons/tb';

const iconSources = {
  python: { icon: FaPython, label: "Python" },
  sql: { icon: TbSql, label: "SQL" },
  c: { icon: SiC, label: "C" },
  cplusplus: { icon: SiCplusplus, label: "C++" },
  csharp: { icon: FaCode, label: "C#" },
  unity: { icon: SiUnity, label: "Unity" },
  bash: { icon: SiGnubash, label: "Bash" },
  git: { icon: FaGitAlt, label: "Git" },
  pandas: { icon: SiPandas, label: "Pandas" },
  numpy: { icon: SiNumpy, label: "NumPy" },
  pyspark: { icon: SiApachespark, label: "PySpark" },
  airflow: { icon: SiApacheairflow, label: "Apache Airflow" },
  streamlit: { icon: SiStreamlit, label: "Streamlit" },
  selenium: { icon: SiSelenium, label: "Selenium" },
  beautifulsoup: { icon: FaCode, label: "BeautifulSoup" },
  fastapi: { icon: SiFastapi, label: "FastAPI" },
  pytorch: { icon: SiPytorch, label: "PyTorch" },
  scikitlearn: { icon: SiScikitlearn, label: "Scikit-Learn" },
  prophet: { icon: LiaChartBarSolid, label: "Prophet" },
  xgboost: { icon: GiArtificialIntelligence, label: "XGBoost" },
  statsmodels: { icon: LiaChartBarSolid, label: "Statsmodels" },
  pennylane: { icon: GiArtificialIntelligence, label: "Pennylane" },
  qiskit: { icon: SiQiskit, label: "Qiskit" },
  algoritmosgeneticos: { icon: GiArtificialIntelligence, label: "Algoritmos Genéticos" },
  docker: { icon: FaDocker, label: "Docker" },
  linux: { icon: FaLinux, label: "Linux" },
  googlecloud: { icon: SiGooglecloud, label: "Google Cloud" },
  aws: { icon: FaAws, label: "AWS" },
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
        px-3 pt-3 pb-6 rounded-br-none"
      >
        <h3 className="text-white text-lg mb-4">{title}</h3>
        <hr className="w-full border-t border-white/20 mb-10" />

        <div className="relative mt-8 -mb-6 -mx-3">
          <div className="absolute inset-0 -translate-y-6 scale-[0.92] rounded-3xl
            bg-white/10 backdrop-blur-md border border-white/10 z-0 shadow-md" />
          <div className="absolute inset-0 -translate-y-3 scale-[0.96] rounded-3xl
            bg-white/15 backdrop-blur-md border border-white/10 z-0 shadow-md" />

          <button
          onClick={() => setShowDetails(true)}
          className="p-0 m-0 border-none bg-transparent appearance-none leading-none align-top"
        >
          <img
            src={img}
            alt={title}
            className="relative z-10 w-full rounded-3xl object-cover shadow-xl rounded-br-none"
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
            <p className="text-justify text-xs font-extralight">Ferramentas</p>
            <hr className="flex-grow border-t border-black/20" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {tools.map((tool) => {
              const toolData = iconSources[tool];
              if (!toolData) return null;
              const { icon: Icon, label } = toolData;
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

        <p className="text-justify">{desc}</p>
        
        <hr className="flex-grow border-t border-black/20 my-4" />

        <div className="flex items-center justify-start gap-4">
          {githubLink && (
            <button
              className="flex items-center justify-start gap-1 hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={() => window.open(githubLink, '_blank', 'noopener,noreferrer')}
            >
              <TbBrandGithubFilled className="text-black text-xl" />
              <p className="text-black text-sm font-extralight">Github Link</p>
            </button>
          )}

          {websiteLink && (
            <button
              className="flex items-center justify-start gap-1 hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={() => window.open(websiteLink, '_blank', 'noopener,noreferrer')}
            >
              <TbExternalLink className="text-black text-xl" />
              <p className="text-black text-sm font-extralight">Project Website</p>
            </button>
          )}
        </div>

        {(githubLink || websiteLink) && (<hr className="flex-grow border-t border-black/20 mt-4" />)}
      </div>
    </div>
  );
}

export default function Projects() {


    const desc = `O preço do café e dos ovos disparou. Mas... e os outros itens do café da manhã?

    Foi com essa dúvida que surgiu meu novo projeto: uma solução completa para prever os preços dos principais alimentos consumidos no café da manhã pelos próximos 6 meses. ☕🍞🥚
    `;

    const tools = [
      "python",
      "sql",
      "c",
      "cplusplus",
      "csharp",
      "unity",
      "bash",
      "git",
      "pandas",
      "numpy",
      "pyspark",
      "airflow",
      "streamlit",
      "selenium",
      "beautifulsoup",
      "fastapi",
      "pytorch",
      "scikitlearn",
      "prophet",
      "xgboost",
      "statsmodels",
      "pennylane",
      "qiskit",
      "algoritmosgeneticos",
      "docker",
      "linux",
      "googlecloud",
      "aws"
    ];

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
    
    const projects = [
        { title: "Projeto 1", img: "src/imgs/breakfast_timeseries.png", desc:desc, tools:tools,githubLink:"https://github.com/Lrs50/breakfast-forecast?tab=readme-ov-file",websiteLink:"https://breakfast-forecast.streamlit.app/"},
        { title: "Projeto 2", img: "src/imgs/breakfast_timeseries.png", desc:desc, tools:tools},
        { title: "Projeto 3", img: "src/imgs/breakfast_timeseries.png", desc:desc, tools:tools},
        { title: "Projeto 4", img: "src/imgs/breakfast_timeseries.png", desc:desc, tools:tools},
        { title: "Projeto 5", img: "src/imgs/breakfast_timeseries.png", desc:desc, tools:tools},
        { title: "Projeto 6", img: "src/imgs/breakfast_timeseries.png", desc:desc, tools:tools},
    ];


    return (
        <div className=" justify-center px-3">
          <div className="w-full pt-16 pb-8 bg-[url('./imgs/bg-texture.png')] overflow-x-hidden 
          bg-cover bg-center rounded-3xl shadow-xl">
          <div className="-mt-10 mx-[40px]">
              <h1 className="text-5xl text-center text-white font-medium leading right text-gray-900 font-inter">
              My <span className="text-mainPurple font-semibold">Projects</span>
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