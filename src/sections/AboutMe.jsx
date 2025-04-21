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
            <p className="text-lg text-gray-700 leading-relaxed">
            I’m a full stack engineer with a strong background in data science,
            MLOps, and cloud computing. I love building systems that combine smart
            automation with clean architecture, and I’m passionate about creating
            technology that makes a real impact.
            </p>
        </div>

        {/* Right side with word cloud */}
        <div className="w-1/2 flex items-center justify-center">
            <WordCloudSection />
        </div>
        </div>
      
    </div>
  );
}