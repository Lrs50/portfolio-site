import React,{ useEffect, useRef, useState } from "react";
import { TbBrandLinkedin ,  TbBrandGithubFilled, TbBrandMedium, TbBrandWhatsapp } from 'react-icons/tb';
import { Trans, useTranslation } from 'react-i18next';

export default function Hero(){
    const { t } = useTranslation();
    return (
        <div className="flex justify-center flex-col">
            <span className="block mx-auto bg-white/70 backdrop-blur-sm border border-black/40 rounded-full px-5 py-1 text-sm desktop:text-base font-semibold text-black tracking-wide mt-10 shadow-sm hover:shadow-md transition">
            {t('hero.hello')}
            </span>

            <div className="text-center mt-6 px-4">
                <h1 className="text-4xl desktop:text-6xl font-light leading-tight text-gray-900 font-urbanist max-w-4xl mx-auto">
                    <Trans
                    i18nKey="hero.introLine1"
                    components={{ 1: <span className="text-mainPurple font-bold tracking-wide" /> }}
                    />
                    <br />
                    <span className="text-black font-medium">{t('hero.introLine2')}</span>
                    <br />
                    <span className="text-gray-700 text-lg desktop:text-xl -mt-1 mb-1 block">
                    {t('hero.introLine3')}
                    </span>
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
                <TbBrandLinkedin  className="text-3xl desktop:text-5xl text-[#0077B5] hover:scale-125 transition-transform  z-30" />
                </a>
                <a href="https://github.com/Lrs50" target="_blank" rel="noopener noreferrer">
                    < TbBrandGithubFilled className="text-3xl desktop:text-5xl text-[#181717] hover:scale-125 transition-transform z-30" />
                </a>
                <a href="https://medium.com/@lucasreissi" target="_blank" rel="noopener noreferrer">
                    <TbBrandMedium className="text-3xl desktop:text-5xl text-neutral-800 hover:scale-125 transition-transform z-30" />
                </a>
                <a href="https://wa.me/5575999646980" target="_blank" rel="noopener noreferrer">
                    <TbBrandWhatsapp className="text-3xl desktop:text-5xl text-[#25D366] hover:scale-125 transition-transform z-30" />
                </a>

            </div>

            </div>

        </div>
    );

}