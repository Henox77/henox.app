import type { Metadata } from "next";
import { WorkClient } from "./WorkClient";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Work & Experience",
  description:
    "Explore henox's developer background, technical journey, projects, and engineering capabilities in full-stack web and systems development.",
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    title: "Work & Experience | henox",
    description:
      "Explore henox's developer background, technical journey, projects, and engineering capabilities in full-stack web and systems development.",
    url: `${SITE_URL}/work`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Experience | henox",
    description:
      "Explore henox's developer background, technical journey, and engineering capabilities.",
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
