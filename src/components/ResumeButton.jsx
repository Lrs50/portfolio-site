import React from "react";
import { useTranslation } from "react-i18next";
import { TbFileCv } from "react-icons/tb";

// Opens the resume page (URL from .env) in a new tab. English by default, Portuguese when the site is in Portuguese.
// Change VITE_RESUME_URL_EN / VITE_RESUME_URL_PT in .env to point somewhere else.
export default function ResumeButton({ className = "" }) {
  const { t, i18n } = useTranslation();
  const href = i18n.language === "pt" ? import.meta.env.VITE_RESUME_URL_PT : import.meta.env.VITE_RESUME_URL_EN;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-mainPurple text-white font-semibold whitespace-nowrap transition hover:brightness-110 ${className}`}
    >
      <TbFileCv aria-hidden="true" />
      {t("nav.resume")}
    </a>
  );
}
