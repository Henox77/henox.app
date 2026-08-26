"use client";

import React from "react";
import { techSections } from "@/lib/data";
import { TechIcon } from "./TechIcon";
import { SectionHeader } from "./SectionHeader";
import { useUISound } from "@/context/SoundContext";
import { useLanguage } from "@/context/LanguageContext";

export function TechStack() {
  const { playHover } = useUISound();
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="w-full space-y-5 select-none mb-12 sm:mb-16 scroll-mt-20" aria-label="Tech Stack">
      {/* Consistent Section Header */}
      <SectionHeader
        label={t("tech_stack_header")}
        className="mb-4 pb-2 border-b border-purple-500/20"
      />

      {/* Core Categories with Vector-Icon Pills */}
      <div className="space-y-5">
        {techSections.map((section) => {
          const syntaxTag = `<${section.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}/>`;

          return (
            <div key={section.title} className="space-y-2.5">
              {/* Category Code Header */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-purple-300/80 lowercase">
                  {syntaxTag}
                </span>
                <div className="h-[1px] flex-1 bg-purple-500/15" />
              </div>

              {/* Vector Icon Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {section.items.map((tech) => (
                  <div
                    key={tech}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/30 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-900/30 text-purple-100 text-xs font-sans transition-all shadow-sm group"
                  >
                    <TechIcon
                      name={tech}
                      className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-200 transition-colors flex-shrink-0"
                    />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TechStack;
