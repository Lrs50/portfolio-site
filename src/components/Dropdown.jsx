import React,{ useState, useRef, useEffect } from "react";


export default function Dropdown({label="Dropdown",options=[],onSelect,position="left"}){

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
        <div ref={dropdownRef} className="relative inline-block text-left"> 
            <button onClick={()=>setOpen(!open)} 
            className="bg-black text-white px-4 py-2 rounded hover:bg-mainPurple">
                {label}
            </button>
            {open && (
                <ul className={`p-4 absolute mt-2.5 whitespace-nowrap w-auto bg-black text-white rounded-xl shadow-lg z-100 ${positionClass}`}>
                {options.map((option, index) => (
                    <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="p-1 text-center rounded-full w-auto px-5 hover:bg-mainPurple"
                    >
                    {option}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );

}