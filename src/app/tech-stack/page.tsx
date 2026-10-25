import React, { Suspense } from "react";
import type { Metadata } from "next";
import { TechStackClient } from "./TechStackClient";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "Explore the comprehensive toolchains, frontend frameworks, backend runtimes, databases, and UI motion libraries used by henox.",
  alternates: {
    canonical: `${SITE_URL}/tech-stack`,
  },
  openGraph: {
    title: "Tech Stack | henox",
    description:
      "Explore the comprehensive toolchains, frontend frameworks, backend runtimes, databases, and UI motion libraries used by henox.",
    url: `${SITE_URL}/tech-stack`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Stack | henox",
    description:
      "Explore the frontend, backend, database, and dev tools used by henox.",
  },
};

export default function TechStackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-12 flex justify-center items-center text-muted-foreground font-mono text-xs">
          Loading tech stack...
        </div>
      }
    >
      <TechStackClient />
    </Suspense>
  );
}
