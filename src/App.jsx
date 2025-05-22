import { useEffect, useState } from 'react';
import React from 'react'
import NavBar from './components/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import AboutMe from './sections/AboutMe'
import Contact from './sections/Contact'

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
    const activeSection = useActiveSection(["Hero", "Projects", "About", "Tools", "Contact"]);
    return (
        <div>
            <NavBar activeSection={activeSection}/>
              <section id="Hero" className='mt-16 scroll-mt-16'>
                <Hero/>
            </section>
            <section id="Projects" className='scroll-mt-16'>
                <Projects/>
            </section>
            <section id="About" className='scroll-mt-16'>
                <AboutMe/>
            </section>
            <section id="Contact" className='scroll-mt-16'>
                <Contact/>
            </section>
        </div>
        
    );
}