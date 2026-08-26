"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SoundToggle } from "./SoundToggle";
import { LanguageToggle } from "./LanguageToggle";
import { DiscordStatus } from "./DiscordStatus";
import { GithubContributions } from "./GithubContributions";
import { ShieldCheck, Sparkles, ExternalLink, Code2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ProfileHeader() {
  const { t } = useLanguage();

  return (
    <section className="w-full select-none mb-12 space-y-6">
      {/* Top Eyebrow, Status & Controls Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-purple-300/80 tracking-tight">
            {t("eyebrow")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Availability Status Indicator */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[11px] font-mono font-medium leading-none">
              {t("building_badge")}
            </span>
          </div>

          <LanguageToggle />
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Main Identity Header */}
      <div className="flex items-start gap-4 sm:gap-5 flex-col sm:flex-row">
        {/* Profile Avatar / Badge */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-purple-950/50 border border-purple-500/40 shadow-xl shadow-purple-950/40 flex items-center justify-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile/avatar.jpg"
            alt="henox"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-1 right-1 p-1 rounded-md bg-purple-950/90 border border-purple-500/40 text-purple-400">
            <Code2 className="w-3 h-3" />
          </div>
        </div>

        {/* Title, Bio & Handle */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
              henox
            </h1>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>{t("role_badge")}</span>
            </div>
            <Sparkles className="w-4 h-4 text-purple-400/70" />
          </div>

          <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1">
            <a
              href="https://github.com/Henox77"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-1"
            >
              <span>@Henox77</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-purple-500/30">•</span>
            <a
              href="https://github.com/hypercordapp/hypercord"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-purple-300/80 hover:text-purple-100 transition-colors flex items-center gap-1"
            >
              <span>hypercordapp/hypercord</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          <p className="font-sans text-xs sm:text-[13px] text-purple-200/80 leading-relaxed pt-0.5">
            {t("hero_bio")}
          </p>
        </div>
      </div>

      {/* Lanyard Real-Time Discord Status Card */}
      <DiscordStatus />

      {/* Action Buttons */}
      <div className="flex items-center flex-wrap gap-2 pt-1">
        <a
          href="https://github.com/Henox77"
          target="_blank"
          rel="noopener noreferrer"
          className="tactile-btn gap-1.5 border-purple-500/30 hover:border-purple-400/50 bg-purple-950/40 text-purple-200 text-xs py-1.5 px-3"
        >
          <svg className="w-3.5 h-3.5 fill-current text-purple-400" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>{t("github_profile_btn")}</span>
        </a>

        <a
          href="https://github.com/hypercordapp/hypercord"
          target="_blank"
          rel="noopener noreferrer"
          className="tactile-btn gap-1.5 border-purple-500/20 text-purple-200 text-xs py-1.5 px-3"
        >
          <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
          <span>{t("hypercord_repo_btn")}</span>
        </a>

        <a
          href="https://discord.com/users/1462496241693753558"
          target="_blank"
          rel="noopener noreferrer"
          className="tactile-btn gap-1.5 border-purple-500/20 text-purple-200 text-xs py-1.5 px-3"
        >
          <svg className="w-3.5 h-3.5 fill-current text-purple-400" viewBox="0 0 127.14 96.36">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a74.53,74.53,0,0,0,64.3,0c.87.69,1.76,1.37,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.88-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.92,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.06-12.74,11.44-12.74S96.23,45.92,96.12,53,91.08,65.69,84.69,65.69Z" />
          </svg>
          <span>{t("discord_profile_btn")}</span>
        </a>
      </div>

      {/* Real GitHub Contribution Graph */}
      <GithubContributions />
    </section>
  );
}

export default ProfileHeader;
