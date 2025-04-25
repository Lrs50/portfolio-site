import React,{ useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";

export default function Contact(){

    return (
        <div className="w-full bg-offBlack overflow-x-hidden bg-center">
            <div className="flex flex-wrap items-center gap-1 justify-center mt-10">
                <h1 className="text-3xl text-white font-medium font-inter text-center mx-8">
                    Got an awesome project idea or just want to connect? 
                    <span className="text-mainPurple font-semibold"> Let’s chat!</span>
                </h1>

                <div className="w-[600px] mx-auto mt-4 px-3 py-2 flex items-center 
                        justify-between border border-white shadow-md rounded-full">
                
                    <div className="px-3 py-1 bg-pastelOrange rounded-3xl">
                        <MdEmail className="text-mainPurple text-3xl"/>
                    </div>
                    <div className="px-4 py-2 bg-mainPurple rounded-3xl">
                        <button className="text-white text-sm">
                        Send
                        </button>
                    </div>

                    
                </div>
                
            </div>
            <div className="mt-5 mx-3">
                <hr className="w-full border-t border-darkBlue/50 mb-1" />
                <p className="text-center text-white font-light text-xs">Copyright© 2025  Lucas Reis. All Rights Reserved.</p>
                <hr className="w-full border-t border-darkBlue/50 mb-3 mt-1" />
            </div>
            
        </div>
    );

}