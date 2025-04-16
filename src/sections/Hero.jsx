import React,{ useEffect, useRef, useState } from "react";
import { TbBrandLinkedin ,  TbBrandGithubFilled, TbBrandMedium } from 'react-icons/tb';

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

            <div className="absolute backdrop-blur-md bg-white/10 border border-white/20 rounded-full 
                            px-5 desktop:px-7 py-1 flex gap-3 desktop:gap-6 justify-center items-center shadow-lg z-20 
                            -mt-[50px] desktop:-mt-[80px] left-1/2 -translate-x-1/2">
                <a href="https://www.linkedin.com/in/lucas-dos-reis-lrs/" target="_blank" rel="noopener noreferrer">
                <TbBrandLinkedin  className="text-3xl desktop:text-5xl text-blue-600 hover:scale-125 transition-transform  z-30" />
                </a>
                <a href="https://github.com/Lrs50" target="_blank" rel="noopener noreferrer">
                    < TbBrandGithubFilled className="text-3xl desktop:text-5xl text-black hover:scale-125 transition-transform z-30" />
                </a>
                <a href="https://medium.com/@lucasreissi" target="_blank" rel="noopener noreferrer">
                    <TbBrandMedium className="text-3xl desktop:text-5xl text-neutral-800 hover:scale-125 transition-transform z-30" />
                </a>
            </div>

            </div>

        </div>
    );

}