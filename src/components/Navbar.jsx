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

    // const menuRef = useRef(null)
    // const buttonRef = useRef(null)
    // const [menuOpen, setMenuOpen] = useState(false)

    // useEffect(() => {
    // function handleClickOutside(e) {
    //     const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(e.target)
    //     const clickedButton = buttonRef.current && buttonRef.current.contains(e.target)

    //     if (clickedOutsideMenu && !clickedButton) {
    //     setMenuOpen(false)
    //     }
    // }

//   document.addEventListener('mousedown', handleClickOutside)
//   return () => document.removeEventListener('mousedown', handleClickOutside)
// }, [])

    return (
        <nav className="w-[95%] mx-auto mt-4 px-3 py-2 flex items-center 
                        justify-between bg-black shadow-md rounded-full">

            <Dropdown
                label="🌍"
                options={["🇧🇷", "🇺🇸", "🇪🇸"]}
                onSelect={(option) => console.log("Selected:", option)}
            />
            <h3 className="text-white text-xl px-6 whitespace-nowrap" >My Portfolio</h3>

            {/* <button className="text-white text-3xl md:hidden px-4" onClick={() => setMenuOpen(!menuOpen)}>☰</button> */}
            <Dropdown
                label="☰"
                options={["Home","Projects","About","Tools","Contact"]}
                onSelect={(option) => console.log("Selected:", option)}
                position = "right"
                
            />
            {/* NabBar MOBILE */}
            {/* <div className={`${menuOpen? 'flex':'hidden'}
                            absolute top-[70px] right-[15px] flex-col items-center gap-2 
                            bg-black p-4 rounded-xl shadow-lg z-50 md:hidden`}> 
                <NavItem text="Home" to ="Home"/>
                <NavItem text="Projects" to ="Projects"/>
                <NavItem text="About" to ="About"/>
                <NavItem text="Tools" to ="Tools"/>
                <NavItem text="Contact" to ="Contact"/>
            </div> */}
            {/* NabBar Desktop */}
            <div className="hidden md:flex md:flex-wrap md:gap-2 md:justify-end md:w-full"> 
                <NavItem text="Home" to ="Home"/>
                <NavItem text="Projects" to ="Projects"/>
                <NavItem text="About" to ="About"/>
                <NavItem text="Tools" to ="Tools"/>
                <NavItem text="Contact" to ="Contact"/>
            </div>

        </nav>
    );
}