import React,{ useEffect, useRef, useState } from "react";


export default function Hero(){

    return (
        <div className="flex justify-center flex-col">
            <span className="block mx-auto bg-white border border-black rounded-full px-5 py-1 text-base mt-8">
                Hello!
            </span>

            <div className="text-center mt-3">
                <h1 className="text-6xl font-medium leading right text-gray-900 font-urbanist">
                   I'm <span className="text-mainPurple font-semibold">Lucas</span>, <br />
                   Computer Engineer
                </h1>
            </div>
        </div>
    );

}