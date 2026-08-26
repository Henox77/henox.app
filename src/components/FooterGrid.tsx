"use client";

import React from "react";
import { memberOf } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

export function FooterGrid() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="w-full space-y-10 select-none mb-10 pt-6 border-t border-purple-500/20 scroll-mt-20" aria-label="Connect and Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
        {/* Column 1: Projects & Organizations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-purple-500/20">
            <h3 className="font-caps text-xs text-purple-300/80 uppercase tracking-wider font-mono font-semibold">
              {t("projects_and_affiliations")}
            </h3>
          </div>

          <div className="space-y-2">
            {memberOf.map((member) => (
              <a
                key={member.name}
                href={member.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 px-1 rounded hover:bg-purple-950/30 hover:text-ink transition-colors group cursor-pointer border-b border-purple-500/10 last:border-b-0"
              >
                <span className="font-sans text-xs sm:text-[13px] text-purple-200/70 group-hover:text-purple-100 transition-colors line-clamp-1">
                  {member.name}
                </span>
                <svg className="w-3.5 h-3.5 text-purple-400/40 group-hover:text-purple-300 flex-shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Social Channels */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-purple-500/20">
            <h3 className="font-caps text-xs text-purple-300/80 uppercase tracking-wider font-mono font-semibold">
              {t("social_channels")}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a
              href="https://github.com/Henox77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-900/30 hover:text-ink transition-all group cursor-pointer text-center"
            >
              <svg className="w-4 h-4 fill-current text-purple-400 group-hover:text-purple-200 mb-1.5" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-mono text-[11px] text-purple-300 group-hover:text-purple-100">
                @Henox77
              </span>
            </a>

            <a
              href="https://github.com/hypercordapp/hypercord"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-900/30 hover:text-ink transition-all group cursor-pointer text-center"
            >
              <svg className="w-4 h-4 fill-current text-purple-400 group-hover:text-purple-200 mb-1.5" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-mono text-[11px] text-purple-300 group-hover:text-purple-100">
                Hypercord
              </span>
            </a>

            <a
              href="https://discord.com/users/1462496241693753558"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-900/30 hover:text-ink transition-all group cursor-pointer text-center"
            >
              <svg className="w-4 h-4 fill-current text-purple-400 group-hover:text-purple-200 mb-1.5" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a74.53,74.53,0,0,0,64.3,0c.87.69,1.76,1.37,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.88-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.92,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.06-12.74,11.44-12.74S96.23,45.92,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span className="font-mono text-[11px] text-purple-300 group-hover:text-purple-100">
                Discord Profile
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterGrid;
