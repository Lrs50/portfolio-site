import React,{ useEffect, useRef, useState } from "react";
import WordCloudSection from '../components/WordCloud';

export default function AboutMe() {
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-5xl whitespace-nowrap text-black font-medium leading font-inter mb-8">
        About <span className="text-mainPurple font-semibold">Me</span>
      </h1>
      <div className="flex flex-row w-full">
        {/* Left side with text */}
        <div className="w-1/2 flex flex-col justify-center px-10">
        <p class="text-base text-gray-800 text-justify">
            I am Lucas Reis, a Computer Engineering graduate from the Federal University of Pernambuco (UFPE). 
            Originally from Bahia, I moved to Recife to advance my academic and professional journey in technology.
            <br/><br/>
            I have a solid background in data science and MLOps, with experience in data collection, processing, model development, 
            and deployment. My academic experience includes research in 5G networks in collaboration with CIN/Motorola and work on 
            quantum neural networks through a PIBIC scholarship. I also served as Vice President of the Quantum Computing League (LACIQ), 
            fostering research and industry connections.
            <br/><br/>
            Currently I focus on developing scalable data pipelines, building predictive models, and integrating machine learning 
            systems into production environments. I intend to pursue a master’s degree in Computer Science with a focus on time series forecasting.
        </p>
        </div>

        {/* Right side with word cloud */}
        <div className="w-1/2 flex items-center justify-center overflow">
            <WordCloudSection />
        </div>
        </div>
      
    </div>
  );
}