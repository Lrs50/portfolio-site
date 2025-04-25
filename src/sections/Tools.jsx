import React,{ useEffect, useRef, useState } from "react";
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

const iconSources = {
    programmingLanguages: {
      python: { icon: FaPython, label: "Python" },
      sql: { icon: TbSql, label: "SQL" },
      c: { icon: SiC, label: "C" },
      cplusplus: { icon: SiCplusplus, label: "C++" },
      csharp: { icon: FaCode, label: "C#" },
      bash: { icon: SiGnubash, label: "Bash" },
    },
    dataManipulation: {
      pandas: { icon: SiPandas, label: "Pandas" },
      numpy: { icon: SiNumpy, label: "NumPy" },
      pyspark: { icon: SiApachespark, label: "PySpark" },
      airflow: { icon: SiApacheairflow, label: "Apache Airflow" },
      beautifulsoup: { icon: FaCode, label: "BeautifulSoup" },
      selenium: { icon: SiSelenium, label: "Selenium" },
    },
    dataScienceML: {
      scikitlearn: { icon: SiScikitlearn, label: "Scikit-Learn" },
      pytorch: { icon: SiPytorch, label: "PyTorch" },
      prophet: { icon: LiaChartBarSolid, label: "Prophet" },
      xgboost: { icon: GiArtificialIntelligence, label: "XGBoost" },
      statsmodels: { icon: LiaChartBarSolid, label: "Statsmodels" },
    },
    webDevelopment: {
      fastapi: { icon: SiFastapi, label: "FastAPI" },
      streamlit: { icon: SiStreamlit, label: "Streamlit" },
    },
    devOpsCloud: {
      docker: { icon: FaDocker, label: "Docker" },
      git: { icon: FaGitAlt, label: "Git" },
      linux: { icon: FaLinux, label: "Linux" },
      googlecloud: { icon: SiGooglecloud, label: "Google Cloud" },
      aws: { icon: FaAws, label: "AWS" },
    },
    quantumComputing: {
      pennylane: { icon: GiArtificialIntelligence, label: "Pennylane" },
      qiskit: { icon: SiQiskit, label: "Qiskit" },
    },
    gameDevelopment: {
      unity: { icon: SiUnity, label: "Unity" },
    },
    optimization: {
      algoritmosgeneticos: { icon: GiArtificialIntelligence, label: "Algoritmos Genéticos" },
    },
  };

  function ReturnIcons({ iconsList, title = "Programming Languages" }) {
    return (
      <div className="flex flex-col items-center gap-4 mx-5">
        <h3 className="text-lg text-offWhite font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="flex gap-6 flex-wrap justify-center">
          {Object.entries(iconsList).map(([key, { icon: Icon, label }]) => (
            <div
              key={key}
              className="relative group flex flex-col items-center"
            >
              <Icon className="text-[40px] text-offWhite transition duration-300 ease-in-out group-hover:scale-125 group-hover:text-white" />
              <div className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default function Tools() {
    return (
      <div className="w-full py-24 bg-[url('./imgs/bg-texture.png')] overflow-x-hidden bg-cover bg-center">
        <h1 className="text-5xl text-center text-white font-medium font-inter mb-8 mx-10">
          The Tools That Power{" "}
          <span className="text-mainPurple font-semibold">My Code</span>
        </h1>
  
        <div className="bg-white/10 backdrop-blur-md flex justify-center items-center py-12 px-6 rounded-3xl mx-10 border border-white/20 shadow-lg">
          <div className="flex flex-wrap gap-10 justify-center">
            <ReturnIcons
              title="Programming Languages"
              iconsList={iconSources.programmingLanguages}
            />
            <ReturnIcons
              title="Data Manipulation"
              iconsList={iconSources.dataManipulation}
            />
            <ReturnIcons
              title="Data Science"
              iconsList={iconSources.dataScienceML}
            />
            <ReturnIcons
              title="Web Development"
              iconsList={iconSources.webDevelopment}
            />
            <ReturnIcons
              title="DevOps & Cloud"
              iconsList={iconSources.devOpsCloud}
            />
            <ReturnIcons
              title="Quantum Computing"
              iconsList={iconSources.quantumComputing}
            />
            <ReturnIcons
              title="Optimization"
              iconsList={iconSources.optimization}
            />
          </div>
        </div>
      </div>
    );
  }