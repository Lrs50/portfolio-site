import React, { useEffect, useRef, useState } from "react";
import WordCloudSection from '../components/WordCloud';

function TimeLinePoint({ title = "", info = "", desc = "", side = "right", color = "mainPurple" }) {
  const isLeft = side === "left";
  
  return (
    <div className={`relative py-4`}>
      {/* Centered Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-3 h-3 flex items-center justify-center">
        <div className={`bg-${color} w-full h-full rounded-full z-10`}></div>
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-black z-0"></div>
      </div>

      {/* Text Block - positioned based on side */}
      <div 
        className={`absolute ${isLeft ? "right-[52%] text-right" : "left-[52%] text-left"} top-1/2 -translate-y-1/2 max-w-[45%]`}
      >
        <span className="block text-sm font-semibold text-black leading-tight">{title}</span>
        <span className="block text-xs text-gray-500 leading-tight">{info}</span>
        <div className={`mt-1 text-[0.85rem] text-gray-700 italic ${
          isLeft ? "border-r-2 pr-4" : "border-l-2 pl-4"
        } border-gray-300`}>
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function AboutMe() {
  return (
    <>
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-5xl whitespace-nowrap text-black font-medium leading font-inter mb-8">
        About <span className="text-mainPurple font-semibold">Me</span>
      </h1>
      <div className="flex flex-row w-full">
        {/* Left side with text */}
        <div className="w-1/2 flex flex-col justify-center px-10">
          <p className="text-base text-gray-800 text-justify">
            I am Lucas Reis, a Computer Engineering graduate from the Federal University of Pernambuco (UFPE). 
            Originally from Bahia, I moved to Recife to advance my academic and professional journey in technology.
            <br/><br/>
            I have a solid background in data science and MLOps, with experience in data collection, processing, model development, 
            and deployment. My academic experience includes research in 5G networks in collaboration with CIN/Motorola and work on 
            quantum neural networks through a PIBIC scholarship. I also served as Vice President of the Quantum Computing League (LACIQ), 
            fostering research and industry connections.
            <br/><br/>
            Currently I focus on developing scalable data pipelines, building predictive models, and integrating machine learning 
            systems into production environments. I intend to pursue a master's degree in Computer Science with a focus on time series forecasting.
          </p>
        </div>

        {/* Right side with word cloud */}
        <div className="w-1/2 flex items-center justify-center overflow">
          <WordCloudSection />
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-5xl whitespace-nowrap text-black font-medium leading font-inter mb-8">
        My <span className="text-mainPurple font-semibold">Trajectory</span>
      </h1>
      
      <div className="relative w-full max-w-3xl">
        {/* Dotted line that matches the circle's border-dashed style */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-black -translate-x-[1px]"></div>
        
        {/* Timeline points with alternating sides */}
        <div className="py-5">
          <TimeLinePoint
            title="Started Bachelor's in Computer Engineering"
            info="August 2018"
            desc="A dream began"
            side="right"
            color="mainPurple"
          />
        </div>
        
        <div className="py-5">
          <TimeLinePoint
            title="Internship at Sebrae"
            info="May 2022"
            desc="First experience with data engineering"
            side="left"
            color="mainPurple"
          />
        </div>
        
        <div className="py-5">
          <TimeLinePoint
            title="Graduated!"
            info="June 2025"
            desc="Looking for my next big challenge."
            side="right"
            color="mainPurple"
          />
        </div>
      </div>
    </div>
    </>
  );
}