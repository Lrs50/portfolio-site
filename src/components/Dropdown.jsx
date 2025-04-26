import React,{ useState, useRef, useEffect } from "react";


export default function Dropdown({label="Dropdown",options=[],onSelect,position="left",className = ""}){

    const positionClass = {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 -translate-x-1/2",
      }[position];

    const [open,setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        }

        document.addEventListener("mousedown",handleClickOutside)
        return () => document.removeEventListener("mousedown",handleClickOutside)
    },[]);

    function handleOptionClick(option){
        setOpen(false)
        if (onSelect) onSelect(option);
    }

    return (
        <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}> 
            <button
            onClick={() => setOpen(!open)}
            className="relative bg-black text-white px-4 py-2 rounded group overflow-hidden"
            >
            {label}
            
            {/* Underline */}
            <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-mainPurple transition-all duration-500 group-hover:w-3/4"
            ></span>
            </button>
            {open && (
                <ul className={`p-4 absolute mt-2.5 whitespace-nowrap w-auto bg-black text-white rounded-xl shadow-lg z-100 ${positionClass}`}>
                {options.map((option, index) => (
                    <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="relative group p-1 text-center rounded-full w-auto px-5"
                    >
                    {option}
                    
                    <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-mainPurple transition-all duration-500 group-hover:w-3/4"
                    ></span>

                    </li>
                ))}
                </ul>
            )}
        </div>
    );

}