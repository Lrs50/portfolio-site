import React from "react";
import { useTranslation } from "react-i18next";
import { TbFileCv } from "react-icons/tb";

// Opens the resume page (URL from .env.production) in a new tab. English by default, Portuguese when the site is in Portuguese.
// While VITE_RESUME_URL_EN / VITE_RESUME_URL_PT are empty, the button just returns to the main page (same tab).
export default function ResumeButton({ className = "" }) {
  const { t, i18n } = useTranslation();
  const url = i18n.language === "pt" ? import.meta.env.VITE_RESUME_URL_PT : import.meta.env.VITE_RESUME_URL_EN;
  const external = Boolean(url);
  return (
    <a
      href={url || "/"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-mainPurple text-white font-semibold whitespace-nowrap transition duration-300 hover:-translate-y-0.5 hover:bg-[#8a1a47] ${className}`}
    >
      {/* light sheen that sweeps across on hover */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/25 -translate-x-full transition-transform duration-700 group-hover:translate-x-[300%]" />
      <TbFileCv aria-hidden="true" />
      {t("nav.resume")}
    </a>
  );
}
