export interface TechStackItem {
  name: string;
}

export interface TechSection {
  title: string;
  items: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  url: string;
  href: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  href: string;
  code?: string;
  tag?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  year: string;
  isCurrent?: boolean;
  description?: string;
  yearNode?: string;
}

export interface RecommendationItem {
  id?: string;
  quote: string;
  author: string;
  title?: string;
  role?: string;
  organization?: string;
  relationship?: string;
  profileUrl?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
}

export type ProjectStatus =
  | "live"
  | "active"
  | "wip"
  | "school-project"
  | "archived";

export interface TechnicalDecision {
  title: string;
  description: string;
}

export interface ProjectLearning {
  title: string;
  description: string;
}

export interface CurrentBuild {
  title: string;
  description: string;
  projectSlug?: string;
  href?: string;
  status?: "building" | "improving" | "experimenting";
  updatedAt?: string;
  technologies?: string[];
}

export interface FullProjectItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  color?: string;
  role?: string;
  client?: string;
  tags: string[];
  overview: string;
  fullDescription?: string;
  designScreens?: string[];
  gallery?: string[];
  techStack: string[];
  features?: string[];
  status?: ProjectStatus;
  technicalDecisions?: TechnicalDecision[];
  learnings?: ProjectLearning[];
  highlights?: string[];
  buildNotes?: string;
  lessons?: string;
  live?: string;
  github?: string;
  featured?: boolean;
}

export const projectStatusConfig: Record<
  ProjectStatus,
  { label: string; dotClass: string; badgeClass: string }
> = {
  live: {
    label: "LIVE",
    dotClass: "bg-emerald-500",
    badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  active: {
    label: "ACTIVE",
    dotClass: "bg-purple-500",
    badgeClass: "text-purple-300 bg-purple-500/10 border-purple-500/20",
  },
  wip: {
    label: "WIP",
    dotClass: "bg-amber-500",
    badgeClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  "school-project": {
    label: "PROJECT",
    dotClass: "bg-violet-500",
    badgeClass: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  },
  archived: {
    label: "ARCHIVED",
    dotClass: "bg-zinc-500",
    badgeClass: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
  },
};

// Single Source of Truth: Henox Projects
export const fullProjects: FullProjectItem[] = [
  {
    slug: "hypercord",
    title: "Hypercord",
    category: "Discord Client & Desktop Ecosystem",
    year: "2026",
    image: "https://avatars.githubusercontent.com/u/306883584?v=4",
    color: "bg-[#150a29]",
    role: "Founder & Lead Developer",
    client: "Hypercord Project",
    tags: ["React", "Node.js", "Next.js", "Vite", "Tailwind CSS", "TypeScript"],
    overview:
      "Hypercord is a modern, high-performance Discord client project built for power users. It features custom plugin support, customizable dark-purple themes, lightweight resource usage, and low-latency gateway communication.",
    fullDescription:
      "Hypercord is an open-source Discord client application founded and built by henox. Designed to eliminate client memory bloat and offer complete visual and functional freedom, Hypercord includes a modular extension architecture, real-time theme hot-reloading, custom audio/video gateway pipelines, and advanced user customization options.",
    gallery: [],
    designScreens: [],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Node.js",
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Docker",
    ],
    features: [
      "Ultra-fast UI response times with optimized DOM rendering",
      "Modular plugin engine allowing custom extensions and script injectors",
      "Comprehensive purple theme engine with live CSS hot reloading",
      "Discord Gateway WebSocket & REST API integration",
      "Low CPU and RAM footprint compared to standard web client wrapper",
      "Containerized build pipelines with Docker",
    ],
    technicalDecisions: [
      {
        title: "Why build a custom Discord Client architecture?",
        description:
          "Standard web clients often consume gigabytes of memory. Hypercord strips overhead, isolates background tasks, and optimizes asset caches for smooth, instant chat rendering.",
      },
      {
        title: "Why React + Vite & Tailwind CSS?",
        description:
          "Vite provides near-instant HMR during plugin development, while React and Tailwind CSS enable modular, highly responsive component structures.",
      },
    ],
    learnings: [
      {
        title: "Managing high-frequency WebSocket Discord Gateway payloads",
        description:
          "Optimizing state updates for hundreds of guild channels and message events required batching dispatch loops to maintain 60 FPS rendering.",
      },
    ],
    live: "https://hypercord.pro",
    github: "https://github.com/hypercordapp/hypercord",
    status: "active",
    featured: true,
  },
];

export const currentBuild: CurrentBuild = {
  title: "Hypercord",
  description:
    "Building Hypercord — next-generation Discord client project featuring high-performance chat rendering, modular extension architecture, and custom purple themes.",
  projectSlug: "hypercord",
  href: "https://hypercord.pro",
  status: "building",
  updatedAt: "Aug 2026",
  technologies: [
    "React",
    "Next.js",
    "Vite",
    "Node.js",
    "Tailwind CSS",
    "Docker",
    "TypeScript",
  ],
};

export function normalizeTechName(name: string): string {
  if (!name) return "";
  const clean = name.trim().toLowerCase().replace(/[\s._-]+/g, "");
  if (clean === "html" || clean === "html5") return "html5";
  if (clean === "css" || clean === "css3") return "css3";
  if (clean === "js" || clean === "javascript") return "javascript";
  if (clean === "php") return "php";
  if (clean === "laravel") return "laravel";
  if (clean === "sql" || clean === "sqldb" || clean === "database") return "sql / db";
  if (clean === "python") return "python";
  if (clean === "node" || clean === "nodejs" || clean === "nodedotjs") return "node.js";
  if (clean === "react" || clean === "reactjs") return "react";
  if (clean === "next" || clean === "nextjs" || clean === "nextdotjs") return "next.js";
  if (clean === "vite") return "vite";
  if (clean === "aspnet" || clean === "aspnetcore" || clean === "dotnet") return "asp.net core";
  if (clean === "tailwind" || clean === "tailwindcss") return "tailwind css";
  if (clean === "docker") return "docker";
  if (clean === "postgres" || clean === "postgresql") return "postgresql";
  return clean;
}

export function getProjectsUsingTech(tech: string): FullProjectItem[] {
  if (!tech) return [];
  const target = normalizeTechName(tech);
  return fullProjects.filter((p) => {
    const allTech = [...(p.techStack || []), ...(p.tags || [])];
    return allTech.some((t) => normalizeTechName(t) === target);
  });
}

export function getAllTechItems(): string[] {
  const set = new Set<string>();
  techSections.forEach((sec) => {
    sec.items.forEach((item) => set.add(item));
  });
  fullProjects.forEach((p) => {
    (p.techStack || []).forEach((t) => set.add(t));
    (p.tags || []).forEach((t) => set.add(t));
  });
  return Array.from(set);
}

export function getCanonicalTechName(query: string): string | null {
  if (!query) return null;
  const target = normalizeTechName(query);
  const all = getAllTechItems();
  const exact = all.find((item) => normalizeTechName(item) === target);
  return exact || null;
}

export function getProjectBySlug(slug: string): FullProjectItem | undefined {
  return fullProjects.find((p) => p.slug === slug);
}

export const projects: ProjectItem[] = fullProjects
  .filter((p) => p.featured !== false)
  .map((p) => ({
    name: p.title,
    description: p.overview,
    url: (p.live || p.github || "").replace(/^https?:\/\//, ""),
    href: p.live || p.github || "#",
  }));

// Exact Tech Stack specified by Henox
export const techSections: TechSection[] = [
  {
    title: "Frontend & UI",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Systems",
    items: [
      "PHP",
      "Laravel",
      "Python",
      "Node.js",
      "ASP.NET Core",
    ],
  },
  {
    title: "Database & DevOps",
    items: [
      "SQL / DB",
      "PostgreSQL",
      "Docker",
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    name: "Founder & Lead Developer of Hypercord",
    issuer: "Hypercord Open Source Project",
    href: "https://github.com/hypercordapp/hypercord",
    code: "HYPERCORD-01",
    tag: "HYPERCORD",
  },
  {
    name: "Full-Stack Systems & Architecture",
    issuer: "Web & Client Engineering",
    href: "https://github.com/hypercordapp/hypercord",
    code: "FULLSTACK-2026",
    tag: "SYSTEMS",
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Founder & Lead Developer",
    company: "Hypercord (Discord Client Project)",
    year: "2025 - Present",
    yearNode: "PRESENT",
    isCurrent: true,
    description:
      "Creating a high-performance, modular Discord client with custom plugin support, purple theme system, and lightweight resource footprint.",
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance & Open Source",
    year: "2024 - Present",
    yearNode: "2024",
    isCurrent: true,
    description:
      "Architecting web applications, APIs, and client software with Laravel, Next.js, React, Node.js, ASP.NET Core, and Docker.",
  },
  {
    role: "Backend & Systems Developer",
    company: "Personal & Open Source Projects",
    year: "2023 - 2024",
    yearNode: "2023",
    description:
      "Developed backend REST APIs, PostgreSQL databases, Python automation scripts, and server tools.",
  },
];

export const recommendations: RecommendationItem[] = [];

export const galleryImages: string[] = [];

export const memberOf = [
  {
    name: "Hypercord Open Source Project",
    href: "https://github.com/hypercordapp/hypercord",
  },
];
