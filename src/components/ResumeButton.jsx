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
      className={`inline-flex items-center gap-2 rounded-full bg-wine hover:bg-wineHover text-white font-semibold whitespace-nowrap transition-colors ${className}`}
    >
      <TbFileCv aria-hidden="true" />
      {t("nav.resume")}
    </a>
  );
}
