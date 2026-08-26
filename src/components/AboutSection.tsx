"use client";

import React from "react";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full space-y-3.5 select-none mb-12 sm:mb-16 scroll-mt-20" aria-label="About">
      <SectionHeader label={t("about_title")} className="mb-3" />

      <div className="font-sans text-[14px] sm:text-[15px] text-purple-200/80 leading-[24px] sm:leading-[26px] space-y-3.5">
        <p>{t("about_p1")}</p>
        <p>{t("about_p2")}</p>
      </div>
    </section>
  );
}

export default AboutSection;
