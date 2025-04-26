import React,{ useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
function NavItem({text,to }){
    return (
        <div className="relative group p-1 rounded-full w-auto px-5" >
            <a href={`#${to }`} className=" text-white text-center whitespace-nowrap">{text}</a>

            <span
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-mainPurple transition-all duration-500 group-hover:w-3/4"
            ></span>
        </div>
    );
}


export default function NavBar(){

    const [selectedLang, setSelectedLang] = useState("🇬🇧");
    const [userSession, setUserSession] = useState("Home");
    const [isScrolled, setIsScrolled] = useState(false);

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
                onSelect={(option) => setUserSession(option)}
                position = "right"
                
            />
 
            {/* NabBar Desktop */}
            <div className="hidden desktop:flex desktop:flex-wrap desktop:gap-2 desktop:justify-end desktop:w-full"> 
                <NavItem text="Home" to ="Home"/>
                <NavItem text="Projects" to ="Projects"/>
                <NavItem text="About" to ="About"/>
                <NavItem text="Tools" to ="Tools"/>
                <NavItem text="Contact" to ="Contact"/>
            </div>

        </nav>
    );
}