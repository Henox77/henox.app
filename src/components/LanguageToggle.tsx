"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useUISound } from "@/context/SoundContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const { playClick } = useUISound();

  const handleClick = () => {
    playClick();
    toggleLang();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="tactile-btn gap-1.5 px-2.5 py-1 text-xs font-mono border-purple-500/20 text-purple-200 hover:text-purple-100 hover:border-purple-400/40 bg-purple-950/30 cursor-pointer"
      title="Dil Değiştir / Switch Language"
    >
      <Globe className="w-3.5 h-3.5 text-purple-400 opacity-80" />
      <span className="font-semibold uppercase tracking-wider">{lang.toUpperCase()}</span>
    </button>
  );
}

export default LanguageToggle;
