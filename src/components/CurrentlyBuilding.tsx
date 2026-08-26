"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { currentBuild, getProjectBySlug } from "@/lib/data";
import { TechIcon } from "./TechIcon";
import { useUISound } from "@/context/SoundContext";
import { useLanguage } from "@/context/LanguageContext";

export function CurrentlyBuilding() {
  const { playHover, playClick } = useUISound();
  const { t } = useLanguage();

  if (!currentBuild || !currentBuild.title) return null;

  const referencedProject = currentBuild.projectSlug
    ? getProjectBySlug(currentBuild.projectSlug)
    : undefined;

  return (
    <section
      className="w-full space-y-4 select-none mb-12 sm:mb-16"
      aria-label="Currently Building"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-border-hairline/40">
        <span className="font-caps text-xs text-purple-300/80 uppercase tracking-wider font-mono font-semibold">
          {t("currently_building_header")}
        </span>
        {currentBuild.updatedAt && (
          <span className="font-mono text-[11px] text-purple-400/70">
            {currentBuild.updatedAt}
          </span>
        )}
      </div>

      {/* Live Development Note Container */}
      <div className="p-4 sm:p-5 rounded-xl bg-purple-950/25 border border-purple-500/20 space-y-3.5 transition-colors">
        <div className="flex items-center gap-2">
          {/* Status pulse */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-purple-300 uppercase tracking-wider leading-none">
            {t("building_label")}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-sans text-sm sm:text-base font-semibold text-ink tracking-tight">
            {currentBuild.title}
          </h3>
          <p className="font-sans text-xs sm:text-[13px] text-purple-200/80 leading-relaxed">
            {t("current_build_desc")}
          </p>
        </div>

        {/* Technologies and Action Link */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          {currentBuild.technologies && currentBuild.technologies.length > 0 && (
            <div className="flex items-center flex-wrap gap-1.5">
              {currentBuild.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[11px] font-sans font-medium"
                >
                  <TechIcon
                    name={tech}
                    className="w-3 h-3 flex-shrink-0 text-purple-400"
                  />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          )}

          {(referencedProject || currentBuild.href) && (
            <a
              href={currentBuild.href || "https://hypercord.pro"}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-1 font-mono text-xs text-purple-300 hover:text-purple-100 transition-colors group ml-auto"
            >
              <span>{t("view_details")}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default CurrentlyBuilding;
