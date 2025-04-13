import React from "react";


export default function Card({title,desc}){
    return (
        <div className="rounded-[12px] bg-black p-6 w-60 shadow-md">
            <h3 className="text-white text-xl text-center mb-2">{title}</h3>
            <p className="text-white text-sm">{desc}</p>
        </div>
    );
}