import React from 'react'
import NavBar from './components/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import AboutMe from './sections/AboutMe'
import Tools from './sections/Tools'
import Contact from './sections/Contact'

export default function App(){

    return (
        <div>
            <NavBar />
            <Hero />
            <Projects />
            <AboutMe />
            <Tools />
            <Contact />
        </div>
        
    );
}