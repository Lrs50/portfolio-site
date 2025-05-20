import React, { useEffect, useRef, useState } from "react";
import WordCloudSection from '../components/WordCloud';

function TimeLinePoint({ title = "", info = "", desc = "", side = "right", color = "mainPurple" }) {
  const isLeft = side === "left";
  
  return (
    <div className={`relative py-4 group`}>
      {/* Centered Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-3 h-3 flex items-center">
        <div className={`bg-${color} w-full h-full rounded-full z-10 justify-center transition-transform duration-300 ease-in-out group-hover:scale-105`}></div>
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-black z-0"></div>
      </div>

      {/* Text Block - positioned based on side */}
      <div 
        className={`absolute ${isLeft ? "right-[53%] text-right" : "left-[53%] text-left"} 
        top-1/2 -translate-y-1/2 max-w-[90%] transition-transform duration-300 ease-in-out group-hover:scale-105`}
      >
        <span className="block text-sm font-semibold text-black leading-tight">{title}</span>
        <span className="block text-xs text-gray-500 leading-tight">{info}</span>
        <div className={`mt-1 text-[0.85rem] text-justify text-gray-700 italic ${
          isLeft ? "border-r-2 pr-4" : "border-l-2 pl-4"
        } border-gray-300`}>
          {desc}
        </div>
      </div>
    </div>
  );
}



function Timeline() {
  const containerRef = useRef(null);
  const timelineContentRef = useRef(null);
  const [gap, setGap] = useState(40); // Default gap

  useEffect(() => {
    const updateGap = () => {
      if (!containerRef.current || !timelineContentRef.current) return;

      // Get container height (available space)
      const containerHeight = containerRef.current.offsetHeight;
      
      // Get the actual content elements (TimeLinePoint components)
      const timelineItems = timelineContentRef.current.children;
      const numberOfItems = timelineItems.length;
      
      if (numberOfItems <= 1) return; // No need to calculate gap with 0 or 1 items
      
      // Calculate the total height of all timeline items without gaps
      let totalItemsHeight = 0;
      for (let i = 0; i < numberOfItems; i++) {
        totalItemsHeight += timelineItems[i].offsetHeight;
      }
      
      // Calculate available space for gaps
      // 150px is an approximation for the header height - adjust if needed
      const availableSpaceForGaps = containerHeight - totalItemsHeight - 150;
      
      // Calculate optimal gap size with a minimum of 20px
      const optimalGap = Math.max(20, availableSpaceForGaps / (numberOfItems - 1));
      
      // Update gap state
      setGap(optimalGap);

    };

    // Run the calculation once component is mounted with a short delay
    const initialTimer = setTimeout(updateGap, 100);
    
    // Set up resize observer for responsive adjustments
    let resizeTimer;
    const resizeObserver = new ResizeObserver(() => {
      // Debounce pattern to avoid excessive recalculations
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateGap, 100);
    });
    
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section 
      className="flex flex-col items-center w-full h-full mt-3 px-2" 
      ref={containerRef}
      style={{ minHeight: '100vh' }} // Ensure container has height
    >
      <h1 className="text-5xl whitespace-nowrap text-black font-medium font-inter mb-8">
        My <span className="text-mainPurple font-semibold">Trajectory</span>
      </h1>

      <div className="relative w-full max-w-3xl my-5 flex-grow">
        {/* Vertical dashed line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-black -translate-x-[1px]" />

        {/* Timeline points */}
        <div ref={timelineContentRef} className="flex flex-col" style={{ gap: `${gap}px` }}>
          <TimeLinePoint
            title="Started Bachelor's in Computer Engineering"
            info="August 2018"
            desc="A dream began"
            side="right"
            color="mainPurple"
          />

          <TimeLinePoint
            title="Researcher at CIN/Motorola"
            info="Jul 2020 – May 2021"
            desc="5G network research, Linux automation with Docker & Bash, packet analysis."
            side="left"
            color="mainPurple"
          />

          <TimeLinePoint
            title="PIBIC Researcher (CNPq)"
            info="Sep 2022 – Oct 2023"
            desc="Developed quantum/classical regression models with PyTorch and Pennylane."
            side="right"
            color="mainPurple"
          />

          <TimeLinePoint
            title="VP at LACIQ (Quantum Comp. League)"
            info="Jul 2023 – Nov 2024"
            desc="Led events/workshops in quantum ML, mentored students, built academic partnerships."
            side="left"
            color="mainPurple"
          />

          <TimeLinePoint
            title="Internship at Sebrae"
            info="Nov 2024 – Apr 2025"
            desc="Data analysis, ML models, API integration, ETL pipelines, technical reports."
            side="right"
            color="mainPurple"
          />

          <TimeLinePoint
            title="Graduated!"
            info="May 2025"
            desc="Looking for my next big challenge."
            side="left"
            color="mainPurple"
          />

          <TimeLinePoint
            title="Master's in Computer Science"
            info="Planned"
            desc="I plan to pursue a Master's in Computer Science with a focus on time series forecasting."
            side="right"
            color="mainPurple"
          />
        </div>
      </div>
    </section>
  );
}

export default function AboutMe() {
  return (
    <div className="w-full bg-zinc-100">
      <div className="w-full mx-auto grid desktop:grid-cols-2">
        
        {/* About Me block */}
        <div className="bg-white rounded-3xl shadow-xl p-8 m-3">
          <h1 className="text-5xl text-center text-black font-medium font-inter mt-3 mb-4">
            About <span className="text-mainPurple font-semibold">Me</span>
          </h1>

          <p className="text-base text-gray-800 text-justify leading-relaxed">
            I am Lucas Reis, a Computer Engineering graduate from the Federal University of Pernambuco (UFPE).
            Originally from Bahia, I moved to Recife to advance my academic and professional journey in technology.
            <br /><br />
            I have a solid background in data science and MLOps, with experience in data collection, processing,
            model development, and deployment. My academic experience includes research in 5G networks in
            collaboration with CIN/Motorola and work on quantum neural networks through a PIBIC scholarship.
            I also served as Vice President of the Quantum Computing League (LACIQ), fostering research and industry connections.
            <br /><br />
            Currently I focus on developing scalable data pipelines, building predictive models, and integrating
            machine learning systems into production environments. I intend to pursue a master's degree in Computer
            Science with a focus on time series forecasting.
          </p>

          <WordCloudSection />
        </div>

        {/* Timeline block */}
        <div className="bg-white rounded-3xl shadow-xl p-8 m-3">
          <Timeline />
        </div>
      </div>

    </div>
  );

}
