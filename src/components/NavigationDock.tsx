"use client";

import React from "react";
import Link from "next/link";
import { Home, User, FolderGit2, Cpu, MessageSquare, Globe } from "lucide-react";
import { useUISound } from "@/context/SoundContext";
import { useLanguage } from "@/context/LanguageContext";

export function NavigationDock() {
  const { playHover, playClick } = useUISound();
  const { lang, toggleLang } = useLanguage();

  const handleLangToggle = () => {
    playClick();
    toggleLang();
  };

  const navItems = [
    {
      name: lang === "tr" ? "Anasayfa" : "Home",
      href: "/#top",
      icon: <Home className="w-4 h-4 text-purple-400" />,
    },
    {
      name: lang === "tr" ? "Hakkımda" : "About",
      href: "/#about",
      icon: <User className="w-4 h-4 text-purple-400" />,
    },
    {
      name: lang === "tr" ? "Projeler" : "Projects",
      href: "/#projects",
      icon: <FolderGit2 className="w-4 h-4 text-purple-400" />,
    },
    {
      name: lang === "tr" ? "Teknoloji" : "Tech",
      href: "/#tech-stack",
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
    },
    {
      name: lang === "tr" ? "İletişim" : "Links",
      href: "/#contact",
      icon: <MessageSquare className="w-4 h-4 text-purple-400" />,
    },
  ];

  return (
    <nav
      className="nav-dock max-w-sm sm:max-w-md mx-auto px-3.5 py-2 flex items-center justify-around gap-1.5 bg-purple-950/80 backdrop-blur-xl border border-purple-500/30 rounded-full shadow-2xl shadow-purple-950/60"
      aria-label="Bottom Navigation Dock"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={playHover}
          onClick={playClick}
          className="flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-xl text-[10.5px] font-mono text-purple-300/80 hover:text-white hover:bg-purple-900/40 transition-all cursor-pointer group"
        >
          <div className="group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <span className="leading-none">{item.name}</span>
        </Link>
      ))}

      {/* Language Toggle Button inside Dock */}
      <button
        onClick={handleLangToggle}
        type="button"
        className="flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-xl bg-purple-900/50 border border-purple-500/30 text-[10.5px] font-mono text-purple-200 hover:text-white hover:bg-purple-900/70 transition-all cursor-pointer group"
        title="TR / EN"
      >
        <Globe className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
        <span className="font-bold leading-none">{lang.toUpperCase()}</span>
      </button>
    </nav>
  );
}

export default NavigationDock;
