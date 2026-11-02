import React,{ useEffect, useRef, useState } from "react";
import { TbBrandLinkedin ,  TbBrandGithubFilled, TbBrandMedium, TbBrandWhatsapp, TbMail } from 'react-icons/tb';
import { Trans, useTranslation } from 'react-i18next';
import ResumeButton from '../components/ResumeButton';
import LavaDome from '../components/LavaDome';

const EMAIL = "lrs5@cin.ufpe.br";

export default function Hero(){
    const { t } = useTranslation();
    return (
        <div className="relative isolate flex justify-center flex-col">
            {/* light pools: the lamp lights the room */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-[900px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(226,54,127,0.38),rgba(112,20,56,0.18)_55%,transparent)]" />
                <div className="absolute -left-40 top-0 w-[620px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.16),transparent)]" />
                <div className="absolute -right-40 top-24 w-[560px] h-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(255,111,174,0.12),transparent)]" />
            </div>
            <span style={{ animationDelay: "0ms" }} className="animate-rise block mx-auto bg-white/5 backdrop-blur-sm border border-white/15 rounded-full px-5 py-1 text-sm desktop:text-base font-semibold text-white/90 tracking-wide mt-10 shadow-glass">
            {t('hero.hello')}
            </span>

            <div style={{ animationDelay: "150ms" }} className="animate-rise text-center mt-6 px-4">
                <h1 className="text-4xl desktop:text-6xl font-light leading-tight text-white font-urbanist max-w-4xl mx-auto">
                    <Trans
                    i18nKey="hero.introLine1"
                    components={{ 1: <span className="font-bold tracking-wide text-glow" /> }}
                    />
                    <br />
                    <span className="text-white font-medium">{t('hero.introLine2')}</span>
                    <br />
                    <span className="text-white/70 text-lg desktop:text-xl -mt-1 mb-1 block">
                    {t('hero.introLine3')}
                    </span>
                </h1>
                <ResumeButton className="relative z-0 mt-6 px-6 py-2 text-base" />
            </div>
            <div className="relative w-full max-w-[410px] desktop:max-w-none desktop:w-[700px] mx-auto mt-[45px] desktop:mt-[10px]">
                <LavaDome className="relative block left-1/2 -translate-x-1/2 w-[95%] desktop:w-[118%] max-w-none z-0" />

                <img
                src="/imgs/avatar.webp"
                width="1400" height="935" fetchPriority="high"
                alt={t("hero.photoAlt")}
                className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                />

            <div className="absolute backdrop-blur-md bg-ink/50 border border-white/15 rounded-full 
                            px-5 desktop:px-7 py-1 flex gap-3 desktop:gap-6 justify-center items-center shadow-glass z-20 
                            -mt-[50px] desktop:-mt-[80px] left-1/2 -translate-x-1/2">
                <a href="https://www.linkedin.com/in/lucas-dos-reis-lrs/" aria-label={t("hero.linkedin")} target="_blank" rel="noopener noreferrer">
                <TbBrandLinkedin  className="text-3xl desktop:text-5xl text-[#4aa3df] hover:scale-125 transition-transform  z-30" />
                </a>
                <a href="https://github.com/Lrs50" aria-label={t("hero.github")} target="_blank" rel="noopener noreferrer">
                    < TbBrandGithubFilled className="text-3xl desktop:text-5xl text-white hover:scale-125 transition-transform z-30" />
                </a>
                <a href="https://medium.com/@lucasreissi" aria-label={t("hero.medium")} target="_blank" rel="noopener noreferrer">
                    <TbBrandMedium className="text-3xl desktop:text-5xl text-white hover:scale-125 transition-transform z-30" />
                </a>
                <a href={`mailto:${EMAIL}`} aria-label={t("hero.email")}>
                    <TbMail className="text-3xl desktop:text-5xl text-white hover:scale-125 transition-transform z-30" />
                </a>
                <a href={`https://wa.me/5575999646980?text=${encodeURIComponent(t("hero.whatsappMessage"))}`} aria-label={t("hero.whatsapp")} target="_blank" rel="noopener noreferrer">
                    <TbBrandWhatsapp className="text-3xl desktop:text-5xl text-[#25D366] hover:scale-125 transition-transform z-30" />
                </a>

            </div>

            </div>

        </div>
    );

}