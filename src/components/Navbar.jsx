import React, { useEffect, useState, useMemo } from "react";
import Dropdown from "./Dropdown";
import { useTranslation } from "react-i18next";
import { chooseLanguage } from "../i18n";

// Flag emoji do not render on Windows Chrome (they show as letters), so the native name is always shown too.
const languages = [
  { code: "pt", flag: "🇧🇷", name: "Português" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
  { code: "ko", flag: "🇰🇷", name: "한국어" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
];

const optionLabel = (l) => `${l.flag} ${l.name}`;
const labelToCode = Object.fromEntries(languages.map((l) => [optionLabel(l), l.code]));

function NavItem({ text, to, active }) {
  return (
    <div className="relative group p-1 rounded-full w-auto px-5">
      <a
        href={`#${to}`}
        className={`text-white text-center whitespace-nowrap transition-all duration-300 ${
          active ? "font-bold text-lg" : "font-normal text-base"
        }`}
      >
        {text}
      </a>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-0 rounded-full bg-glow shadow-glow transition-all duration-500 group-hover:w-3/4" />
    </div>
  );
}

export default function NavBar({ activeSection }) {
  const { t, i18n } = useTranslation();

  const currentLang = languages.find((l) => l.code === i18n.language) ?? languages[1];
  const [userSession, setUserSession] = useState("Hero");
  const [isScrolled, setIsScrolled] = useState(false);

  // Atualiza userSession com base na seção ativa
  useEffect(() => {
    const to = activeSection === "Hero" ? "Hero" : activeSection;
    setUserSession(to);
  }, [activeSection]);

  // Scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mapeia os IDs reais para os textos traduzidos
  const labelMapping = useMemo(() => ({
    Hero: t("nav.home"),
    Projects: t("nav.projects"),
    About: t("nav.about"),
    Contact: t("nav.contact"),
  }), [t]);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 mx-auto flex items-center 
        font-urbanist justify-between bg-ink/70 backdrop-blur-md border border-white/10 shadow-glass z-[100] transition-all duration-300 ease-in-out
        ${isScrolled ? "w-full top-0 px-2" : "w-[95%] px-3 py-1 top-2 rounded-full"}`}
    >
      {/* Dropdown de idioma */}
      <Dropdown
        label={`🌐 ${currentLang.code.toUpperCase()}`}
        ariaLabel={t("nav.language")}
        options={languages.map(optionLabel)}
        onSelect={(option) => {
          const langCode = labelToCode[option];
          if (langCode) chooseLanguage(langCode);
        }}
      />

      {/* Título central traduzido */}
      <p className="flex-1 min-w-0 truncate text-center text-white text-[clamp(0.95rem,4.2vw,1.25rem)] px-1
        desktop:flex-none desktop:text-left desktop:text-xl desktop:px-6 whitespace-nowrap">
        {t("nav.portfolio")}
      </p>

      {/* Dropdown MOBILE */}
      <Dropdown
        className="block desktop:hidden"
        label={`☰ ${labelMapping[userSession] || t("nav.home")}`}
        options={Object.values(labelMapping)}
        onSelect={(optionLabel) => {
          // encontra o ID correto a partir do label selecionado
          const matchedEntry = Object.entries(labelMapping).find(
            ([_, label]) => label === optionLabel
          );
          const to = matchedEntry?.[0];
          if (to) {
            setUserSession(to);
            const element = document.getElementById(to);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        position="right"
      />

      {/* Nav Desktop */}
      <div className="hidden desktop:flex desktop:flex-wrap desktop:gap-2 desktop:justify-end desktop:w-full">
        <NavItem text={t("nav.home")} to="Hero" active={activeSection === "Hero"} />
        <NavItem text={t("nav.projects")} to="Projects" active={activeSection === "Projects"} />
        <NavItem text={t("nav.about")} to="About" active={activeSection === "About"} />
        <NavItem text={t("nav.contact")} to="Contact" active={activeSection === "Contact"} />
      </div>
    </nav>
  );
}
