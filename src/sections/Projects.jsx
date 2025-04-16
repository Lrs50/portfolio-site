import React,{ useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function Project({title="",img="",link=""}){

    const [expanded, setExpanded] = useState(false);
    

    return (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl 
            shadow-lg transition hover:scale-105 hover:z-30 z-20 max-w-xs w-full px-3 pt-3 pb-6 rounded-br-none">

            <h3 className="text-white text-lg mb-4">{title}</h3>
            <hr className="w-full border-t border-white/20 mb-10" />

            <div className="relative overflow-visible mt-8 -mb-6 -mx-3">

                <div className="absolute inset-0 -translate-y-6 scale-[0.92] rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/10 z-0 shadow-md">
                </div>

                <div className="absolute inset-0 -translate-y-3 scale-[0.96] rounded-3xl 
                    bg-white/15 backdrop-blur-md border border-white/10 z-0 shadow-md">
                </div>

                <img
                src={img}
                alt={title}
                className="relative z-10 w-full rounded-3xl object-cover shadow-xl rounded-br-none"
                />

                {/* Arrow Button */}
                <div className="absolute bottom-1 right-1 bg-neutral-900 rounded-full p-3 shadow-lg z-10">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                    <FaArrowRight className="text-white w-4 h-4 -rotate-45 transition hover:scale-125"  />
                    </a>
                </div>

            </div>
        </div>

    );
}

export default function Projects(){

    return (
        <div className="w-full py-24 bg-[url('.\imgs\bg-texture.png')] bg-cover bg-center">
            <div className="-mt-10 ml-[20px]">
                <h1 className="text-5xl whitespace-nowrap text-white  font-medium leading right text-gray-900 font-inter">
                   My <span className="text-mainPurple font-semibold">Projects</span>
                </h1>
                
                <div className="flex gap-3 mt-12">

                    <Project title="Projeto 1" img="src\imgs\breakfast_timeseries.png"/>
                    <Project title="Projeto 2" img="src\imgs\breakfast_timeseries.png"/>
                    <Project title="Projeto 3" img="src\imgs\breakfast_timeseries.png"/>
                </div>

                
            </div>

        </div>
    );

}