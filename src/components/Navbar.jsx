import React,{ useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
function NavItem({text,to }){
    return (
        <div className="p-1 rounded-full w-auto px-5 hover:bg-mainPurple" >
            <a href={`#${to }`} className=" text-white text-center whitespace-nowrap">{text}</a>
        </div>
    );
}


export default function NavBar(){

    const [selectedLang, setSelectedLang] = useState("🇬🇧");
    const [userSession, setUserSession] = useState("Home");

    return (
        <nav className="w-[95%] mx-auto mt-4 px-3 py-2 flex items-center 
                        justify-between bg-black shadow-md rounded-full">

            <Dropdown
                label={selectedLang}
                options={["🇧🇷", "🇬🇧", "🇫🇷","🇪🇸"]}
                onSelect={(option) => setSelectedLang(option)}
            />
            <h3 className="text-white text-xl px-6 whitespace-nowrap" >My Portfolio</h3>

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