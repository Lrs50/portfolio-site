import React,{ useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
function NavItem({text,to,active  }){
    return (
        <div className="relative group p-1 rounded-full w-auto px-5">
        <a href={`#${to}`} className="text-white text-center whitespace-nowrap">
            {text}
        </a>
        <span
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] bg-mainPurple transition-all duration-500 ${
            active ? "w-3/4" : "w-0 group-hover:w-3/4"
            }`}
        ></span>
        </div>
    );
}


export default function NavBar({ activeSection }){

    const [selectedLang, setSelectedLang] = useState("🇬🇧");
    const [userSession, setUserSession] = useState("Home");
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const to = (activeSection==="Hero") ? "Home" : activeSection; 
        setUserSession(to);
      }, [activeSection]);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 30) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <nav className={`fixed left-1/2 -translate-x-1/2 mx-auto flex items-center 
                        justify-between bg-black shadow-md z-[100] transition-all duration-300 ease-in-out
                        ${ isScrolled 
                            ? "w-full top-0 px-2"
                            : "w-[95%] px-3 py-1 top-2 rounded-full"
                        }`}>

            <Dropdown
                label={selectedLang}
                options={["🇧🇷", "🇬🇧", "🇫🇷","🇪🇸"]}
                onSelect={(option) => setSelectedLang(option)}
            />
            <h3 className="absolute left-1/2 -translate-x-1/2 text-white text-xl
            desktop:static desktop:translate-x-0 desktop:left-auto  px-6 whitespace-nowrap" >My Portfolio</h3>

            {/* NabBar MOBILE */}

            <Dropdown
                className = "block desktop:hidden"
                label={`☰ ${userSession}`}
                options={["Home","Projects","About","Tools","Contact"]}
                onSelect={(option) => {
                    const to = (option==="Home") ? "Hero" : option; 
                    setUserSession(option);
                    const element = document.getElementById(to);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                position = "right"
                
            />
 
            {/* NabBar Desktop */}
            <div className="hidden desktop:flex desktop:flex-wrap desktop:gap-2 desktop:justify-end desktop:w-full"> 
                <NavItem text="Home" to="Hero" active={activeSection === "Hero"} />
                <NavItem text="Projects" to="Projects" active={activeSection === "Projects"}/>
                <NavItem text="About" to="About" active={activeSection === "About"}/>
                <NavItem text="Tools" to="Tools" active={activeSection === "Tools"}/>
                <NavItem text="Contact" to="Contact" active={activeSection === "Contact"}/>
            </div>

        </nav>
    );
}