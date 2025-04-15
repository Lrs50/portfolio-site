import React,{ useEffect, useRef, useState } from "react";


export default function Hero(){

    return (
        <div className="flex justify-center flex-col">
            <span className="block mx-auto bg-white border border-black rounded-full px-5 py-1 text-base mt-8">
                Hello!
            </span>

            <div className="text-center mt-3">
                <h1 className="text-4xl desktop:text-6xl font-medium leading right text-gray-900 font-urbanist">
                   I'm <span className="text-mainPurple font-semibold">Lucas</span>, <br />
                   Computer Engineer
                </h1>
            </div>

            <div className="relative w-[410px] desktop:w-[700px] mx-auto mt-[65px] desktop:mt-[120px]">
                <img
                src="src\imgs\ellipse.png" 
                alt="Purple ellipse" 
                className="block w-[85%] z-0 mx-auto"
                />

                <img
                src="src\imgs\avatar.png" 
                alt="My picture" 
                className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 "
                />
            </div>
        </div>
    );

}