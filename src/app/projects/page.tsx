import type { Metadata } from "next";
import { ProjectsPageClient } from "@/app/projects/ProjectsPageClient";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore a curated showcase of full-stack web applications, frontend architectures, open-source tools, and projects built by henox.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Projects | henox",
    description:
      "Explore a curated showcase of full-stack web applications, frontend architectures, open-source tools, and projects built by henox.",
    url: `${SITE_URL}/projects`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | henox",
    description:
      "Explore a curated showcase of full-stack web applications and tools built by henox.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
