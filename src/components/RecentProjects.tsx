"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { fullProjects } from "@/lib/data";
import { TechIcon } from "./TechIcon";
import { SectionHeader } from "./SectionHeader";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { useUISound } from "@/context/SoundContext";
import { useLanguage } from "@/context/LanguageContext";

export function RecentProjects() {
  const featuredProjects = fullProjects.slice(0, 4);
  const { playHover, playClick } = useUISound();
  const { t } = useLanguage();

  return (
    <section id="projects" className="w-full space-y-5 select-none mb-12 sm:mb-16 scroll-mt-20" aria-label="Selected Projects">
      {/* Section Header */}
      <SectionHeader
        label={t("projects_header")}
        description={t("projects_desc")}
        className="mb-4 pb-2 border-b border-purple-500/20"
      />

      {/* Flagship Project Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className="cad-project-card group block rounded-2xl bg-purple-950/30 border border-purple-500/30 p-4 sm:p-5 space-y-4 hover:border-purple-400/50 transition-all shadow-xl shadow-purple-950/30 overflow-hidden"
          >
            {/* Top Banner Cover Image */}
            <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full rounded-xl overflow-hidden bg-purple-950/70 border border-purple-500/30">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
              {project.status && (
                <div className="absolute top-3 left-3 z-10">
                  <ProjectStatusBadge
                    status={project.status}
                    size="sm"
                    className="bg-black/80 backdrop-blur-md border-purple-500/40 shadow-md"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Details Below Banner */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-ink group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-purple-300/80">
                    {project.category} ({project.year})
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="tactile-btn gap-1.5 text-xs px-3 py-1.5 bg-purple-600/30 border-purple-500/40 text-purple-100 hover:text-white hover:bg-purple-600/50"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                      <span>{t("live_demo")}</span>
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="tactile-btn gap-1.5 text-xs px-3 py-1.5 bg-purple-950/60 border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400/50"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-purple-300" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{t("source_code")}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-[13.5px] text-purple-200/85 leading-relaxed pt-1">
                {t("hypercord_overview")}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-950/50 border border-purple-500/25 text-purple-300 text-[11px] font-mono font-medium"
                  >
                    <TechIcon name={tech} className="w-3 h-3 text-purple-400" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentProjects;
