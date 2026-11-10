import { useEffect, useState, lazy, Suspense } from 'react';
import React from 'react'
import NavBar from './components/Navbar'
import Hero from './sections/Hero'
// below the fold: loaded in separate chunks so the Hero paints sooner
const Projects = lazy(() => import('./sections/Projects'))
const AboutMe = lazy(() => import('./sections/AboutMe'))
const Recommendations = lazy(() => import('./sections/Recommendations'))
const Contact = lazy(() => import('./sections/Contact'))

// kept outside the component so the observer effect does not re-run on every render
const SECTION_IDS = ["Hero", "Projects", "About", "Recommendations", "Contact"];

function useActiveSection(sectionIds) {
    const [activeSection, setActiveSection] = useState("");
  
    useEffect(() => {
      const observers = [];
  
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
  
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.5 } // 50% of the section should be visible
        );
  
        observer.observe(section);
        observers.push(observer);
      });
  
      return () => {
        observers.forEach((observer) => observer.disconnect());
      };
    }, [sectionIds]);
  
    return activeSection;
  }


export default function App(){
    const activeSection = useActiveSection(SECTION_IDS);
    return (
        <div>
            <NavBar activeSection={activeSection}/>
            <main>
              <section id="Hero" className='mt-16 scroll-mt-16'>
                <Hero/>
            </section>
            <section id="Projects" className='scroll-mt-16'>
                <Suspense fallback={<div className="min-h-screen" />}><Projects/></Suspense>
            </section>
            <section id="About" className='scroll-mt-16'>
                <Suspense fallback={<div className="min-h-screen" />}><AboutMe/></Suspense>
            </section>
            <section id="Recommendations" className='scroll-mt-16'>
                <Suspense fallback={<div className="min-h-[60vh]" />}><Recommendations/></Suspense>
            </section>
            <section id="Contact" className='scroll-mt-16'>
                <Suspense fallback={<div className="min-h-[50vh]" />}><Contact/></Suspense>
            </section>
            </main>
        </div>
        
    );
}