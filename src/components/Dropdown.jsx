import React,{ useState, useRef, useEffect } from "react";


export default function Dropdown({label="Dropdown",options=[],onSelect,position="left",className = "",ariaLabel}){

    const positionClass = {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 -translate-x-1/2",
      }[position];

    const [open,setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        }

        document.addEventListener("mousedown",handleClickOutside)
        return () => document.removeEventListener("mousedown",handleClickOutside)
    },[]);

    // Escape closes the list and gives focus back to the button
    useEffect(() => {
        if (!open) return;
        function handleKey(event) {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open]);

    function handleOptionClick(option){
        setOpen(false)
        if (onSelect) onSelect(option);
    }

    return (
        <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
            <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label={ariaLabel ? `${ariaLabel}: ${label}` : undefined}
            className="relative bg-transparent text-white px-2.5 desktop:px-4 py-2 rounded group overflow-hidden whitespace-nowrap"
            >
            {label}

            {/* Underline */}
            <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-rose transition-all duration-500 group-hover:w-3/4"
            ></span>
            </button>
            {open && (
                <ul className={`p-4 absolute mt-2.5 whitespace-nowrap w-auto bg-ink/95 backdrop-blur-md border border-white/10 text-white rounded-xl shadow-glass z-100 ${positionClass}`}>
                {options.map((option, index) => (
                    <li key={index}>
                    <button
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className="relative group block w-full p-1 text-center rounded-full px-5"
                    >
                    {option}

                    <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-rose transition-all duration-500 group-hover:w-3/4"
                    ></span>

                    </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );

}
