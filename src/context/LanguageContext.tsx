"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "tr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Header & Hero
    eyebrow: "// hypercord kurucusu & full-stack yazılım geliştirici",
    building_badge: "Hypercord Geliştiriliyor",
    role_badge: "Hypercord Kurucusu",
    hero_bio: "Full-stack yazılım geliştiricisi ve Hypercord projesinin kurucusu. Yüksek performanslı masaüstü istemcileri, modüler web uygulamaları, REST API'leri ve veritabanı mimarileri geliştiriyorum.",
    github_profile_btn: "GitHub @Henox77",
    hypercord_repo_btn: "Hypercord Reposu",
    discord_profile_btn: "Discord Profili",
    
    // About
    about_title: "HAKKIMDA",
    about_p1: "Ben henox, modüler ve yüksek performanslı Discord istemci projesi olan Hypercord'un kurucusu ve full-stack yazılım geliştiricisiyim.",
    about_p2: "Masaüstü istemcileri, modern web uygulamaları, ölçeklenebilir REST API'leri ve veritabanı sistemleri üzerine odaklanıyorum. Bildiğim teknolojiler: HTML5, CSS3, JavaScript, PHP, Laravel, SQL / DB, Python, Node.js, React, Next.js, Vite, ASP.NET Core, Tailwind CSS, Docker ve PostgreSQL.",

    // Currently Building
    currently_building_header: "<ŞU-AN-GELİŞTİRİLEN/>",
    building_label: "GELİŞTİRİLİYOR",
    view_details: "Detayları gör",
    current_build_desc: "Hypercord Geliştiriliyor — Yüksek performanslı sohbet işleme, modüler eklenti mimarisi ve özel mor temalara sahip yeni nesil masaüstü Discord istemcisi.",

    // Selected Projects
    projects_header: "<ÖNE-ÇIKAN-PROJE/>",
    projects_desc: "Kurucusu olduğum ve aktif geliştirdiğim masaüstü & web yazılım projesi.",
    all_projects: "tüm projeler",
    live_demo: "Canlı Site",
    source_code: "Kaynak Kodu",
    hypercord_overview: "Hypercord, güç kullanıcıları için geliştirilmiş modern, yüksek performanslı bir Discord istemci projesidir. Özel eklenti desteği, özelleştirilebilir koyu mor temalar, düşük kaynak kullanımı ve düşük gecikmeli gateway iletişimi sunar.",

    // Tech Stack
    tech_stack_header: "<TEKNOLOJİLER-VE-DİLLER/>",
    frontend_title: "Frontend & UI",
    backend_title: "Backend & Sistemler",
    database_title: "Veritabanı & DevOps",

    // Footer & Social
    projects_and_affiliations: "<PROJELER-VE-BAGLANTILAR/>",
    social_channels: "<SOSYAL-MEDYA/>",
    footer_copy: "© 2026 henox. Hypercord Kurucusu. Tutkuyla geliştirildi.",

    // Lanyard Discord Status
    online_discord: "Discord'da Çevrimiçi",
    away_idle: "Boşta / Dışarıda",
    dnd_status: "Rahatsız Etmeyin",
    offline_status: "Çevrimdışı",
    listening_spotify: "Spotify Dinliyor",
    by_artist: "sanatçı:",
    active_activity: "Aktif Aktivite",
    active_dev: "Hypercord Proje Kurucusu • Aktif Geliştirici",

    // Contributions
    total_contributions: "Katkı Toplamı:",
    in_last_year: "son 1 yılda",
    view_contributions_on: "Gerçek katkıları @Henox77 profilinde gör ↗",
  },
  en: {
    // Header & Hero
    eyebrow: "// founder @ hypercord & full-stack developer",
    building_badge: "Building Hypercord",
    role_badge: "Founder of Hypercord",
    hero_bio: "Full-Stack Software Developer & Founder of Hypercord. Building high-performance desktop clients, modular web apps, REST APIs, and database architectures.",
    github_profile_btn: "GitHub @Henox77",
    hypercord_repo_btn: "Hypercord Repo",
    discord_profile_btn: "Discord Profile",

    // About
    about_title: "ABOUT HENOX",
    about_p1: "I'm henox, a full-stack software developer and founder of Hypercord — a high-performance, modular Discord client project.",
    about_p2: "I specialize in building lightweight desktop clients, modern web applications, scalable REST APIs, and database architecture. My stack includes HTML5, CSS3, JavaScript, PHP, Laravel, SQL / DB, Python, Node.js, React, Next.js, Vite, ASP.NET Core, Tailwind CSS, Docker, and PostgreSQL.",

    // Currently Building
    currently_building_header: "<CURRENTLY-BUILDING/>",
    building_label: "BUILDING",
    view_details: "View details",
    current_build_desc: "Building Hypercord — next-generation Discord client project featuring high-performance chat rendering, modular extension architecture, and custom purple themes.",

    // Selected Projects
    projects_header: "<SELECTED-PROJECTS/>",
    projects_desc: "Featured software engineering and client applications.",
    all_projects: "all projects",
    live_demo: "Live Site",
    source_code: "Source Code",
    hypercord_overview: "Hypercord is a modern, high-performance Discord client project built for power users. It features custom plugin support, customizable dark-purple themes, lightweight resource usage, and low-latency gateway communication.",

    // Tech Stack
    tech_stack_header: "<TECH-STACK-AND-LANGUAGES/>",
    frontend_title: "Frontend & UI",
    backend_title: "Backend & Systems",
    database_title: "Database & DevOps",

    // Footer & Social
    projects_and_affiliations: "<PROJECTS-AND-AFFILIATIONS/>",
    social_channels: "<SOCIAL-CHANNELS/>",
    footer_copy: "© 2026 henox. Founder of Hypercord. Built with precision & craft.",

    // Lanyard Discord Status
    online_discord: "Online on Discord",
    away_idle: "Away / Idle",
    dnd_status: "Do Not Disturb",
    offline_status: "Offline",
    listening_spotify: "Listening to Spotify",
    by_artist: "by",
    active_activity: "Active Activity",
    active_dev: "Founder @ Hypercord Project • Active Developer",

    // Contributions
    total_contributions: "Total Contributions:",
    in_last_year: "in the last year",
    view_contributions_on: "View real contributions on @Henox77 ↗",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("tr");

  useEffect(() => {
    const saved = localStorage.getItem("henox_lang") as Language | null;
    if (saved === "tr" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("henox_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "tr" ? "en" : "tr";
    setLang(next);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["tr"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
