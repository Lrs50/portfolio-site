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
        <div className="w-full bg-offBlack overflow-x-hidden bg-center">
            <div className="flex flex-wrap items-center gap-1 justify-center mt-10">
                <h2 className="text-xl desktop:text-3xl text-white font-medium font-inter text-center mx-8">
                <Trans i18nKey="contact.title" />
                <span className="text-[#f2789f] font-semibold"> {t("contact.highlight")}</span>
                </h2>

                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="relative w-[90%] desktop:w-[600px] my-5 mx-auto flex flex-col border border-white shadow-md rounded-3xl bg-offBlack"
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

                    <div className="flex items-center border-b border-white/30 mx-4 mt-3">
                        <MdEmail className="text-mainPurple text-2xl shrink-0" aria-hidden="true" />
                        <input
                            type="email"
                            name="email"
                            placeholder={t("contact.emailPlaceholder")}
                            aria-label={t("contact.emailPlaceholder")}
                            className="flex-1 ml-3 py-2 bg-transparent text-white placeholder-gray-400 outline-none"
                            required
                        />
                    </div>

                    <div className="relative flex">
                        <textarea
                            name="message"
                            placeholder={t("contact.placeholder")}
                            aria-label={t("contact.placeholder")}
                            rows="1"
                            className="flex-1 mt-4 mb-3 ml-5 mr-[90px] bg-transparent text-white placeholder-gray-400 outline-none resize-none overflow-hidden"
                            required
                            onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        />

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="absolute right-1 bottom-2 bg-mainPurple text-white text-sm px-4 py-2
                            rounded-3xl hover:scale-110 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-wait"
                        >
                            {status === "sending" ? t("contact.sending") : t("contact.button")}
                        </button>
                    </div>
                </form>

                <div className="w-full text-center">
                    <p role="status" aria-live="polite" className={`min-h-[1.5rem] text-sm ${status === "error" ? "text-red-400" : "text-green-400"}`}>
                        {status === "success" && t("contact.success")}
                        {status === "error" && t("contact.error")}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                        {t("contact.orEmail")}{" "}
                        <a href={`mailto:${EMAIL}`} className="text-white underline hover:text-[#f2789f]">{EMAIL}</a>
                    </p>
                </div>
            </div>
            <div className="mt-5 mx-3">
                <hr className="w-full border-t border-darkBlue/50 mb-1" />
                <p className="text-center text-white font-light text-xs">Copyright © 2026  Lucas Reis. All Rights Reserved.</p>
                <hr className="w-full border-t border-darkBlue/50 mb-3 mt-1" />
            </div>

        </div>
    );

}
