import React, { useRef } from "react";
import { TbBrandLinkedin, TbBrandGithubFilled, TbBrandMedium, TbBrandWhatsapp, TbMail } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import ResumeButton from '../components/ResumeButton';
import LavaDome from '../components/LavaDome';
import { EMAIL } from '../contact';

const iconLink = "text-white/70 hover:text-white transition-colors";

export default function Hero(){
    const { t } = useTranslation();
    const places = t('hero.places', { returnObjects: true });
    const lampRef = useRef(null);

    // the wax leans toward a mouse pointer (touch and pen are ignored). The values go from -1 to 1.
    const onPointerMove = (e) => {
        if (e.pointerType !== "mouse" || !lampRef.current) return;
        const r = lampRef.current.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1;
        const y = ((e.clientY - r.top) / r.height) * 2 - 1;
        lampRef.current.style.setProperty("--px", Math.max(-1, Math.min(1, x)).toFixed(3));
        lampRef.current.style.setProperty("--py", Math.max(-1, Math.min(1, y)).toFixed(3));
    };
    const onPointerLeave = () => {
        lampRef.current?.style.setProperty("--px", "0");
        lampRef.current?.style.setProperty("--py", "0");
    };

    return (
        <div className="relative isolate" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
            {/* one wine light pool: the lamp lights the room */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute right-[-10%] bottom-[-20%] w-[1000px] h-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(112,20,56,0.38),rgba(112,20,56,0.10)_60%,transparent)]" />
            </div>

            <div className="mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8 pt-10 desktop:pt-24 grid gap-10 desktop:grid-cols-[1fr_1.15fr] desktop:items-end">
                <div className="desktop:pb-20">
                    <h1 style={{ animationDelay: "0ms" }} className="animate-rise font-display font-extrabold text-bone leading-[0.86] text-[clamp(3.5rem,16vw,8.5rem)]">
                        {t('hero.introLine1')}
                    </h1>
                    <p style={{ animationDelay: "120ms" }} className="animate-rise mt-5 text-xl desktop:text-2xl font-medium text-bone">
                        {t('hero.introLine2')}
                    </p>
                    <p style={{ animationDelay: "220ms" }} className="animate-rise mt-3 max-w-[34ch] text-lg leading-relaxed text-mist">
                        {t('hero.introLine3')}
                    </p>

                    <div style={{ animationDelay: "320ms" }} className="animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <ResumeButton className="px-6 py-2.5 text-base" />
                        <div className="flex items-center gap-5 text-2xl">
                            <a href="https://www.linkedin.com/in/lucas-dos-reis-lrs/" aria-label={t("hero.linkedin")} target="_blank" rel="noopener noreferrer" className={iconLink}>
                                <TbBrandLinkedin aria-hidden="true" />
                            </a>
                            <a href="https://github.com/Lrs50" aria-label={t("hero.github")} target="_blank" rel="noopener noreferrer" className={iconLink}>
                                <TbBrandGithubFilled aria-hidden="true" />
                            </a>
                            <a href="https://medium.com/@lucasreissi" aria-label={t("hero.medium")} target="_blank" rel="noopener noreferrer" className={iconLink}>
                                <TbBrandMedium aria-hidden="true" />
                            </a>
                            <a href={`mailto:${EMAIL}`} aria-label={t("hero.email")} className={iconLink}>
                                <TbMail aria-hidden="true" />
                            </a>
                            <a href={`https://wa.me/5575999646980?text=${encodeURIComponent(t("hero.whatsappMessage"))}`} aria-label={t("hero.whatsapp")} target="_blank" rel="noopener noreferrer" className={iconLink}>
                                <TbBrandWhatsapp aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* the lamp: the one bold element of the page */}
                <div ref={lampRef} style={{ animationDelay: "150ms" }} className="animate-rise relative w-full max-w-[720px] mx-auto desktop:mx-0 desktop:justify-self-end">
                    <LavaDome className="block w-full" />
                    <img
                        src="/imgs/avatar.webp"
                        width="1400" height="935" fetchPriority="high"
                        alt={t("hero.photoAlt")}
                        className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 w-[92%] pointer-events-none"
                    />
                </div>
            </div>

            {/* where the work happened, as plain names */}
            <div className="border-y border-white/10 bg-ink2/60">
                <div className="mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8 py-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
                    <p className="text-sm text-mist">{t('hero.proofLabel')}</p>
                    <ul className="flex flex-wrap gap-x-8 gap-y-2">
                        {places.map((p) => (
                            <li key={p} className="text-lg font-semibold text-bone/90">{p}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
