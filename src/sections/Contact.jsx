import React,{ useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useTranslation, Trans } from "react-i18next";

const EMAIL = "lrs5@cin.ufpe.br";

export default function Contact(){

    const form = useRef();
    const { t } = useTranslation();
    // "idle" | "sending" | "success" | "error"
    const [status, setStatus] = useState("idle");

    const sendEmail = (e) => {
        e.preventDefault();
        if (status === "sending") return;

        // honeypot: real visitors never see this field, bots fill it. Pretend it worked and send nothing.
        if (form.current.website.value) {
            setStatus("success");
            form.current.reset();
            return;
        }

        setStatus("sending");
        emailjs
        .sendForm('service_xz6t3ie', 'template_6l5soqa', form.current, 'jgEEv4emIIWqhlLIB')
        .then(() => {
          setStatus("success");
          form.current.reset();
          form.current.message.style.height = "auto";
        })
        .catch((error) => {
          console.error("Error:", error.text);
          setStatus("error");
        });
    };

    return (
        <div className="relative isolate w-full overflow-x-hidden pt-10">
            {/* light pool under the form */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(226,54,127,0.14),transparent)]" />
            </div>
            <div className="w-[92%] desktop:w-[1000px] mx-auto">
                <h2 className="text-xl desktop:text-2xl text-white font-medium font-inter text-center">
                <Trans i18nKey="contact.title" />
                <span className="text-glow font-semibold"> {t("contact.highlight")}</span>
                </h2>

                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="relative mt-5 flex flex-col gap-3
                    desktop:flex-row desktop:items-center desktop:gap-0 desktop:border desktop:border-white/15 desktop:bg-white/[0.04] desktop:backdrop-blur-md desktop:shadow-glass desktop:rounded-full desktop:pl-5 desktop:pr-1.5 desktop:py-1.5
                    desktop:focus-within:border-glow/60 desktop:focus-within:ring-2 desktop:focus-within:ring-glow/20 transition"
                    >
                    {/* honeypot, hidden from people and screen readers */}
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute left-[-9999px] w-px h-px opacity-0"
                    />

                    <div className="flex items-center gap-3 border border-white/15 bg-white/[0.04] rounded-2xl px-4
                    desktop:border-0 desktop:border-r desktop:border-white/15 desktop:bg-transparent desktop:rounded-none desktop:px-0 desktop:pr-4 desktop:w-[360px] desktop:shrink-0">
                        <MdEmail className="text-glow text-2xl shrink-0" aria-hidden="true" />
                        <input
                            type="email"
                            name="email"
                            placeholder={t("contact.emailPlaceholder")}
                            aria-label={t("contact.emailPlaceholder")}
                            className="flex-1 min-w-0 py-3 bg-transparent text-white placeholder-white/50 outline-none"
                            required
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder={t("contact.placeholder")}
                        aria-label={t("contact.placeholder")}
                        rows="4"
                        className="w-full border border-white/15 bg-white/[0.04] desktop:bg-transparent rounded-2xl px-4 py-3 text-white placeholder-white/50 outline-none resize-none
                        desktop:flex-1 desktop:border-0 desktop:rounded-none desktop:h-11 desktop:py-2.5 desktop:px-4"
                        required
                    />

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="self-end bg-mainPurple text-white font-semibold px-8 py-3 rounded-full
                        desktop:py-2.5 desktop:shrink-0 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-wait"
                    >
                        {status === "sending" ? t("contact.sending") : t("contact.button")}
                    </button>
                </form>

                <p role="status" aria-live="polite" className={`min-h-[1.5rem] mt-3 text-sm text-center ${status === "error" ? "text-red-400" : "text-green-400"}`}>
                    {status === "success" && t("contact.success")}
                    {status === "error" && t("contact.error")}
                </p>
                <p className="text-white/60 text-sm text-center mt-1">
                    {t("contact.orEmail")}{" "}
                    <a href={`mailto:${EMAIL}`} className="text-white font-medium underline hover:text-glow">{EMAIL}</a>
                </p>
            </div>
            <div className="mt-8 mx-3">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-2" />
                <p className="text-center text-white/60 font-light text-xs">Copyright © 2026  Lucas Reis. All Rights Reserved.</p>
                <div className="h-3" />
            </div>

        </div>
    );

}
