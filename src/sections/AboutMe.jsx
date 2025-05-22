import React, { useEffect, useRef, useState } from "react";
import WordCloudSection from '../components/WordCloud';
import { Trans, useTranslation } from 'react-i18next';

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
        <span className="block text-[0.8rem] desktop:text-sm font-semibold text-black leading-tight">{title}</span>
        <span className="block text-[0.6rem] desktop:text-xs text-gray-500 leading-tight">{info}</span>
        <div className={`mt-1 text-[0.7rem] desktop:text-[0.85rem] text-justify text-gray-700 italic ${
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
  const { t } = useTranslation();

  const events = t("aboutMe.timeline.events", { returnObjects: true });

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
      let totalItemsHeight = 10;
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
        <Trans
          i18nKey="aboutMe.timeline.title"
          components={{ 1: <span className="text-mainPurple font-semibold">{t('aboutMe.timeline.title')}</span> }}
          />
      </h1>

      <div className="relative w-full max-w-3xl my-5 flex-grow">
        {/* Vertical dashed line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-black -translate-x-[1px]" />

        {/* Timeline points */}
        <div ref={timelineContentRef} className="flex flex-col" style={{ gap: `${gap}px` }}>
          {events.map((event, i) => (
            <TimeLinePoint
              key={i}
              title={event.title}
              info={event.info}
              desc={event.desc}
              side={event.side}
              color="mainPurple"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutMe() {
  const { t } = useTranslation();

  const history = t("aboutMe.history", { returnObjects: true });

  return (
    <div className="w-full bg-zinc-100">
      <div className="p-3">
      <div className=" mx-auto grid grid-cols-1 desktop:w-full desktop:grid-cols-2 gap-3">
        
        {/* About Me block */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-5xl text-center text-black font-medium font-inter mt-3 mb-4">
              <Trans
              i18nKey="aboutMe.title"
              components={{ 1: <span className="text-mainPurple font-semibold">{t('aboutMe.title')}</span> }}
              />
          </h1>

          {history.map((paragraph, i) => (
            <p
              key={i}
              className="text-base text-gray-800 text-justify leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}

          <WordCloudSection />
        </div>

        {/* Timeline block */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <Timeline />
        </div>
      </div>
    </div>
    </div>
  );

}
