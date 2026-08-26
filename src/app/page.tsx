import React from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/AboutSection";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { RecentProjects } from "@/components/RecentProjects";
import { TechStack } from "@/components/TechStack";
import { FooterGrid } from "@/components/FooterGrid";
import { SITE_URL, SITE_NAME, SITE_DEFAULT_DESCRIPTION, AUTHOR_INFO } from "@/lib/siteConfig";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: SITE_DEFAULT_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: AUTHOR_INFO.name,
        url: `${SITE_URL}/`,
        jobTitle: AUTHOR_INFO.jobTitle,
        sameAs: AUTHOR_INFO.socials,
        knowsAbout: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "PHP",
          "Laravel",
          "SQL / DB",
          "Python",
          "Node.js",
          "React",
          "Next.js",
          "Vite",
          "ASP.NET Core",
          "Tailwind CSS",
          "Docker",
          "PostgreSQL",
          "Hypercord",
        ],
      },
    ],
  };

  return (
    <div className="w-full flex flex-col">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Identity & Hero */}
      <ProfileHeader />

      {/* 2. About Narrative */}
      <AboutSection />

      {/* 3. Currently Building Live Dev Note */}
      <CurrentlyBuilding />

      {/* 4. Selected Projects */}
      <RecentProjects />

      {/* 5. Tech Stack */}
      <TechStack />

      {/* 6. Contact & Social Channels */}
      <FooterGrid />
    </div>
  );
}
