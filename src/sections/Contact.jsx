import React,{ useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useTranslation, Trans } from "react-i18next";

export default function Contact(){

    const form = useRef();
    const { t } = useTranslation();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
        .sendForm('service_xz6t3ie', 'template_6l5soqa', form.current, 'jgEEv4emIIWqhlLIB')
        .then((result) => {
          console.log("Message Sent!", result.text);
          alert("Message send successfully");
          form.current.reset();
        })
        .catch((error) => {
          console.error("Error:", error.text);
          alert("Error Sending the Message!");
        });
    };

    return (
        <div className="w-full bg-offBlack overflow-x-hidden bg-center">
            <div className="flex flex-wrap items-center gap-1 justify-center mt-10">
                <h1 className="text-xl desktop:text-3xl text-white font-medium font-inter text-center mx-8">
                <Trans i18nKey="contact.title" />
                <span className="text-mainPurple font-semibold"> {t("contact.highlight")}</span>
                </h1>

                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="relative w-[90%] desktop:w-[600px] my-5 mx-auto flex border border-white shadow-md rounded-3xl bg-offBlack"
                    >
                    <div className="absolute left-1 bottom-[3px] bg-pastelOrange rounded-3xl p-2 flex items-center justify-center">
                        <MdEmail className="text-mainPurple text-3xl" />
                    </div>

                    <textarea
                        name="message"
                        placeholder={t("contact.placeholder")}
                        rows="1"
                        className="flex-1 mt-4 mb-3 ml-14 mr-[70px] bg-transparent text-white placeholder-gray-400 outline-none resize-none overflow-hidden"
                        required
                        onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />

                    <button
                        type="submit"
                        className="absolute right-1 bottom-2 bg-mainPurple text-white text-sm px-4 py-2 
                        rounded-3xl hover:scale-110 transition-all duration-300"
                    >
                        {t("contact.button")}
                    </button>
                </form>
            </div>
            <div className="mt-5 mx-3">
                <hr className="w-full border-t border-darkBlue/50 mb-1" />
                <p className="text-center text-white font-light text-xs">Copyright © 2025  Lucas Reis. All Rights Reserved.</p>
                <hr className="w-full border-t border-darkBlue/50 mb-3 mt-1" />
            </div>
            
        </div>
    );

}