import React, { useEffect, useRef, useState } from "react";
import WordCloudSection from '../components/WordCloud';
import Reveal from '../components/Reveal';
import { useTranslation } from 'react-i18next';

function TimeLinePoint({ title = "", info = "", desc = "", side = "right", reached = true }) {
  const isLeft = side === "left";
  
  // The text stays in the flow so each row is as tall as its text (no overlap on narrow screens).
  // Phones: one sided, line on the left. Desktop: dot in the middle column, text alternates sides.
  return (
    <div className="relative grid grid-cols-[12px_minmax(0,1fr)] desktop:grid-cols-[minmax(0,1fr)_12px_minmax(0,1fr)] items-center gap-x-4 desktop:gap-x-5 py-1">
      <div className={`relative z-10 col-start-1 row-start-1 desktop:col-start-2 w-3 h-3 rounded-full transition-colors duration-500 ${reached ? "bg-rose ring-2 ring-rose/30" : "bg-wine ring-2 ring-white/15"}`} />

      <div className={`col-start-2 row-start-1 text-left ${isLeft ? "desktop:col-start-1 desktop:text-right" : "desktop:col-start-3"}`}>
        <span className="block text-[0.8rem] desktop:text-sm font-semibold text-bone leading-tight">{title}</span>
        <span className="block text-[0.7rem] desktop:text-xs text-mist leading-tight">{info}</span>
        <div className={`mt-1 text-[0.75rem] desktop:text-[0.875rem] text-white/75 border-white/15 border-l-2 pl-4 ${
          isLeft ? "desktop:border-l-0 desktop:pl-0 desktop:border-r-2 desktop:pr-4" : ""
        }`}>
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

  // the center line fills in rose as the visitor reads down; dots light up when the fill reaches them
  const trackRef = useRef(null);
  const [fill, setFill] = useState(0); // px from the top of the track
  const [centers, setCenters] = useState([]);
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const reading = window.innerHeight * 0.65;
      setFill(reduced ? r.height : Math.max(0, Math.min(r.height, reading - r.top)));
      setCenters([...timelineContentRef.current.children].map((c) => c.offsetTop + c.offsetHeight / 2));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [gap]);

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
      className="flex flex-col items-center w-full h-full px-2" 
      ref={containerRef}
    >
      <h2 className="self-start font-display font-extrabold text-bone text-[clamp(1.9rem,5vw,2.75rem)] leading-none mb-8">
        {t('aboutMe.timeline.title')}
      </h2>

      <div ref={trackRef} className="relative w-full max-w-3xl my-5 flex-grow">
        {/* Vertical dashed line, and the rose fill that follows the reader */}
        {/* phones: through the dot column (6 px, half the 12 px dot); desktop: the center */}
        <div className="absolute left-[6px] desktop:left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-white/25 -translate-x-[1px]" />
        <div aria-hidden="true" className="absolute left-[6px] desktop:left-1/2 top-0 w-[2px] -translate-x-[1px] bg-gradient-to-b from-rose/0 via-rose/70 to-rose" style={{ height: fill }} />

        {/* Timeline points */}
        <div ref={timelineContentRef} className="flex flex-col" style={{ gap: `${gap}px` }}>
          {events.map((event, i) => (
            <TimeLinePoint
              key={i}
              title={event.title}
              info={event.info}
              desc={event.desc}
              side={event.side}
              reached={centers[i] === undefined || centers[i] <= fill}
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
    <div className="relative isolate w-full">
      {/* faint wine light behind the two cards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(112,20,56,0.18),transparent)]" />
      </div>
      <div className="mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8 pt-6 desktop:pt-8">
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6 desktop:gap-8">
        
        {/* About Me block */}
        <Reveal className="h-full">
        <div className="spotlight h-full rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-md p-6 desktop:p-10">
          <h2 className="font-display font-extrabold text-bone text-[clamp(1.9rem,5vw,2.75rem)] leading-none mb-8">
              {t('aboutMe.title')}
          </h2>

          {history.map((paragraph, i) => (
            <p
              key={i}
              className="text-[0.95rem] text-white/80 leading-relaxed mb-4 max-w-[68ch]"
            >
              {paragraph}
            </p>
          ))}

          <WordCloudSection />
        </div>
        </Reveal>

        {/* Timeline block */}
        <Reveal delay={120} className="h-full">
        <div className="spotlight h-full rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-md p-6 desktop:p-10 flex">
          <Timeline />
        </div>
        </Reveal>
      </div>
    </div>
    </div>
  );

}
