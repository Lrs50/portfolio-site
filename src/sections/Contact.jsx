import React,{ useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { EMAIL } from "../contact";
import Reveal from "../components/Reveal";

// EmailJS ids come from env variables (.env.local on this machine, Cloudflare variables when deployed),
// so they are not committed. They still end up in the built site, because the browser needs them to send.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

        // The template only needs {{message}}. The optional email goes at the end of the text Lucas receives.
        // This label is read by Lucas in his inbox, not shown on the site, so it is not translated.
        const message = form.current.message.value.trim();
        const reply = form.current.email.value.trim();
        const text = reply ? message + "\n\nReply to: " + reply : message;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error("EmailJS is not configured: set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY");
            setStatus("error");
            return;
        }

        setStatus("sending");
        emailjs
        .send(SERVICE_ID, TEMPLATE_ID, { message: text }, { publicKey: PUBLIC_KEY })
        .then(
          () => true,
          (error) => {
            console.error("EmailJS error", error?.status, error?.text);
            return false;
          }
        )
        .then((delivered) => {
          setStatus(delivered ? "success" : "error");
          // clear the fields only after a delivered message, so a failed send keeps what was typed
          if (delivered && form.current) {
            form.current.reset();
          }
        });
    };

    return (
        <div className="relative isolate w-full overflow-x-hidden pt-6 desktop:pt-8">
            {/* light pool under the form */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(112,20,56,0.22),transparent)]" />
            </div>
            <div className="mx-auto w-full max-w-[1400px] min-[1920px]:max-w-[1680px] px-4 desktop:px-8">
            <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-md p-6 desktop:p-10
                grid gap-8 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] desktop:gap-12 desktop:items-start">
                <div>
                    <h2 className="font-display-sm font-bold text-bone text-[clamp(1.4rem,3.2vw,1.9rem)] leading-tight max-w-[18ch] [text-wrap:balance]">
                        {t("contact.title")}
                    </h2>
                    <p className="mt-3 text-base text-mist">{t("contact.highlight")}</p>
                    <p className="mt-6 text-sm text-mist">
                        {t("contact.orEmail")}{" "}
                        <a href={`mailto:${EMAIL}`} className="text-bone font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white">{EMAIL}</a>
                    </p>
                </div>

                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="relative rounded-2xl border border-white/15 bg-white/[0.04] focus-within:border-rose/60 transition-colors"
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

                    <div className="flex items-center gap-3 px-4 border-b border-white/10">
                        <MdEmail className="text-mist text-xl shrink-0" aria-hidden="true" />
                        <input
                            type="email"
                            name="email"
                            placeholder={t("contact.emailPlaceholder")}
                            aria-label={t("contact.emailPlaceholder")}
                            className="flex-1 min-w-0 py-3 bg-transparent text-white placeholder-white/50 outline-none"
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder={t("contact.placeholder")}
                        aria-label={t("contact.placeholder")}
                        rows="4"
                        className="block w-full bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none resize-none"
                        required
                    />

                    <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-1">
                        <p role="status" aria-live="polite" className={`min-h-[1.25rem] text-sm ${status === "error" ? "text-red-300" : "text-green-300"}`}>
                            {status === "success" && t("contact.success")}
                            {status === "error" && t("contact.error")}
                        </p>
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="shrink-0 bg-wine hover:bg-wineHover text-white font-semibold px-6 py-2 rounded-full transition-colors disabled:opacity-60 disabled:cursor-wait"
                        >
                            {status === "sending" ? t("contact.sending") : t("contact.button")}
                        </button>
                    </div>
                </form>
            </div>
            </Reveal>
            </div>
            <div className="mt-10 mx-3">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-2" />
                <p className="text-center text-mist text-xs">Copyright © 2026  Lucas Reis. All Rights Reserved.</p>
                <div className="h-3" />
            </div>

        </div>
    );

}
