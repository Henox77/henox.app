import {
  fullProjects,
  techSections,
  experiences,
  certifications,
  currentBuild,
  getProjectBySlug,
  getProjectsUsingTech,
  getCanonicalTechName,
} from "./data";

export interface PortfolioPageContext {
  pathname: string;
  pageType:
    | "home"
    | "work"
    | "projects"
    | "project_detail"
    | "tech_stack"
    | "certifications"
    | "other";
  title: string;
  projectSlug?: string;
  selectedTech?: string;
}

export interface ValidatedLink {
  label: string;
  href: string;
  isExternal: boolean;
}

/**
 * Derives structured page context from current pathname and query params
 */
export function getPortfolioPageContext(
  pathname: string,
  searchParams?: { [key: string]: string | string[] | undefined } | URLSearchParams
): PortfolioPageContext {
  const normalizedPath = (pathname || "/").replace(/\/$/, "") || "/";

  // 1. Homepage
  if (normalizedPath === "/") {
    return {
      pathname: "/",
      pageType: "home",
      title: "Homepage / Overview",
    };
  }

  // 2. Work & Availability
  if (normalizedPath === "/work") {
    return {
      pathname: "/work",
      pageType: "work",
      title: "Work & Experience",
    };
  }

  // 3. Projects Index
  if (normalizedPath === "/projects") {
    return {
      pathname: "/projects",
      pageType: "projects",
      title: "Projects Index",
    };
  }

  // 4. Project Detail
  if (normalizedPath.startsWith("/projects/")) {
    const slug = normalizedPath.replace("/projects/", "").trim();
    const project = getProjectBySlug(slug);
    if (project) {
      return {
        pathname: normalizedPath,
        pageType: "project_detail",
        title: project.title,
        projectSlug: project.slug,
      };
    }
  }

  // 5. Tech Stack (with optional selected tech filter)
  if (normalizedPath === "/tech-stack") {
    let techParam: string | null = null;

    if (searchParams) {
      if (typeof (searchParams as URLSearchParams).get === "function") {
        techParam = (searchParams as URLSearchParams).get("tech");
      } else {
        const val = (searchParams as Record<string, string | string[] | undefined>)["tech"];
        techParam = Array.isArray(val) ? val[0] : val || null;
      }
    }

    const canonicalTech = techParam ? getCanonicalTechName(techParam) : null;

    return {
      pathname: "/tech-stack",
      pageType: "tech_stack",
      title: canonicalTech ? `Tech Stack (${canonicalTech})` : "Tech Stack",
      selectedTech: canonicalTech || undefined,
    };
  }

  // 6. Certifications
  if (normalizedPath === "/certifications") {
    return {
      pathname: "/certifications",
      pageType: "certifications",
      title: "Certifications",
    };
  }

  // Fallback
  return {
    pathname: normalizedPath,
    pageType: "other",
    title: "Portfolio",
  };
}

/**
 * Returns 2-3 contextual suggested questions for a given page context
 */
export function getSuggestedQuestions(context: PortfolioPageContext): string[] {
  switch (context.pageType) {
    case "home":
      return [
        "What is Hypercord?",
        "What technologies does henox use?",
        "How can I contact henox?",
      ];

    case "work":
      return [
        "What is henox currently building?",
        "What is Hypercord?",
        "How can I reach henox?",
      ];

    case "projects":
      return [
        "Tell me about Hypercord.",
        "What technologies were used to build Hypercord?",
        "How does Hypercord compare to standard clients?",
      ];

    case "project_detail":
      return [
        "How does Hypercord work?",
        "Why was this tech stack chosen?",
        "What are the main features?",
      ];

    case "tech_stack":
      if (context.selectedTech) {
        return [
          `Where did henox use ${context.selectedTech}?`,
          `Which projects use ${context.selectedTech}?`,
          "What stack was this paired with?",
        ];
      }
      return [
        "What backend technologies does henox use?",
        "What frontend tools does henox prefer?",
        "Tell me about henox's experience with Docker & PostgreSQL.",
      ];

    default:
      return [
        "Tell me about Hypercord.",
        "What is henox's tech stack?",
        "How can I contact henox?",
      ];
  }
}

/**
 * Validates a target URL/path against allowed portfolio routes and trusted external destinations
 */
export function validatePortfolioLink(href: string): { isValid: boolean; normalizedHref: string; isExternal: boolean } {
  if (!href) return { isValid: false, normalizedHref: "", isExternal: false };

  const trimmed = href.trim();

  // Prevent javascript: or data: injection
  if (/^(javascript:|data:|vbscript:)/i.test(trimmed)) {
    return { isValid: false, normalizedHref: "", isExternal: false };
  }

  // 1. Internal static routes
  if (["/", "/work", "/projects", "/tech-stack", "/certifications"].includes(trimmed)) {
    return { isValid: true, normalizedHref: trimmed, isExternal: false };
  }

  // 2. Project detail route: /projects/:slug
  if (trimmed.startsWith("/projects/")) {
    const slug = trimmed.replace("/projects/", "").split("?")[0].split("#")[0].trim();
    if (getProjectBySlug(slug)) {
      return { isValid: true, normalizedHref: `/projects/${slug}`, isExternal: false };
    }
  }

  // 3. Tech filter route: /tech-stack?tech=:tech
  if (trimmed.startsWith("/tech-stack?tech=")) {
    const query = trimmed.replace("/tech-stack?tech=", "").split("&")[0].trim();
    const canonical = getCanonicalTechName(decodeURIComponent(query));
    if (canonical) {
      return {
        isValid: true,
        normalizedHref: `/tech-stack?tech=${encodeURIComponent(canonical.toLowerCase())}`,
        isExternal: false,
      };
    }
  }

  // 4. Trusted external portfolio links
  const trustedPrefixes = [
    "https://github.com/Henox77",
    "https://github.com/hypercordapp/hypercord",
    "https://discord.com/users/1462496241693753558",
    "mailto:contact@hypercord.app",
  ];

  // Also allow verified live demo URLs from fullProjects
  const liveUrls = fullProjects.map((p) => p.live).filter(Boolean) as string[];

  for (const trusted of [...trustedPrefixes, ...liveUrls]) {
    if (trimmed === trusted || trimmed.startsWith(trusted + "/")) {
      return { isValid: true, normalizedHref: trimmed, isExternal: true };
    }
  }

  return { isValid: false, normalizedHref: "", isExternal: false };
}

/**
 * Extracts and validates markdown links `[label](href)` from text
 */
export function extractAndValidateLinks(text: string): ValidatedLink[] {
  if (!text) return [];

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const results: ValidatedLink[] = [];
  const seen = new Set<string>();

  let match: RegExpExecArray | null;
  while ((match = linkRegex.exec(text)) !== null) {
    const label = match[1].trim();
    const rawHref = match[2].trim();
    const { isValid, normalizedHref, isExternal } = validatePortfolioLink(rawHref);

    if (isValid && !seen.has(normalizedHref)) {
      seen.add(normalizedHref);
      results.push({
        label,
        href: normalizedHref,
        isExternal,
      });
    }
  }

  return results;
}

/**
 * Builds an authoritative, grounded system prompt from real portfolio data and page context
 */
export function buildPortfolioSystemPrompt(pageContext?: PortfolioPageContext): string {
  // Format projects summary with architectural details, decisions, and learnings
  const projectsSummary = fullProjects
    .map((p) => {
      const techList = p.techStack?.join(", ") || p.tags.join(", ");
      const featuresList = p.features?.map((f) => `    * ${f}`).join("\n") || "";
      const decisionsList =
        p.technicalDecisions
          ?.map((d) => `    * Decision: ${d.title}\n      Rationale: ${d.description}`)
          .join("\n") || "";
      const learningsList =
        p.learnings
          ?.map((l) => `    * Learning: ${l.title}\n      Insight: ${l.description}`)
          .join("\n") || "";

      return `  - Project: ${p.title} (Slug: /projects/${p.slug})
    * Category: ${p.category} | Status: ${p.status} | Year: ${p.year}
    * Client/Context: ${p.client} | Role: ${p.role}
    * Overview: ${p.overview}
    * Full Description: ${p.fullDescription}
    * Tech Stack: ${techList}
    * Live URL: ${p.live || "https://github.com/hypercordapp/hypercord"}
    * Source Repo: ${p.github || "https://github.com/hypercordapp/hypercord"}
    * Key Features:
${featuresList}
    * Technical Decisions:
${decisionsList}
    * Learnings & Insights:
${learningsList}`;
    })
    .join("\n\n");

  // Format tech categories
  const techSummary = techSections
    .map((s) => `  * ${s.title}: ${s.items.join(", ")}`)
    .join("\n");

  // Format certifications
  const certsSummary = certifications
    .map((c) => `  * ${c.name} (${c.issuer}, Code: ${c.code || "N/A"}, Tag: ${c.tag || "Certification"})`)
    .join("\n");

  // Format experience timeline
  const expSummary = experiences
    .map((e) => `  * ${e.year}: ${e.role} at ${e.company} - ${e.description}`)
    .join("\n");

  // Determine active context instructions
  let activeFocusInstructions = "The visitor is on henox's portfolio website.";

  if (pageContext) {
    if (pageContext.pageType === "project_detail" && pageContext.projectSlug) {
      const activeProject = getProjectBySlug(pageContext.projectSlug);
      if (activeProject) {
        activeFocusInstructions = `ACTIVE PAGE CONTEXT (PROJECT DETAIL):
The visitor is currently viewing the detail page for "${activeProject.title}" (URL: /projects/${activeProject.slug}).
- Default to answering about "${activeProject.title}".`;
      }
    } else if (pageContext.pageType === "tech_stack") {
      activeFocusInstructions = `ACTIVE PAGE CONTEXT (TECH STACK):
The visitor is browsing the Tech Stack overview page (/tech-stack). Answer questions about henox's frontend (HTML5, CSS3, JavaScript, React, Next.js, Vite, Tailwind CSS), backend (PHP, Laravel, Python, Node.js, ASP.NET Core), and database/devops (SQL / DB, PostgreSQL, Docker).`;
    } else if (pageContext.pageType === "work") {
      activeFocusInstructions = `ACTIVE PAGE CONTEXT (WORK & EXPERIENCE):
The visitor is viewing the Work & Experience page (/work). Highlight henox's role as Founder of Hypercord and Full-Stack Developer.`;
    } else if (pageContext.pageType === "home") {
      activeFocusInstructions = `ACTIVE PAGE CONTEXT (HOMEPAGE):
The visitor is on the homepage. Current in-progress build focus is: ${currentBuild.title} (${currentBuild.description}).`;
    }
  }

  return `You are the personal AI Assistant for henox's portfolio.
Your role is to represent henox (founder of Hypercord) to visitors with clarity and technical precision.

==================================================
HENOX - AUTHORITATIVE PROFILE
==================================================
- Full Name / Handle: henox (GitHub: Henox77)
- Role: Full-Stack Developer & Founder of Hypercord
- Discord ID: 1462496241693753558
- Flagship Project: Hypercord (https://github.com/hypercordapp/hypercord)
- GitHub Profile: https://github.com/Henox77
- Known Technologies: HTML5, CSS3, JavaScript, PHP, Laravel, SQL / DB, Python, Node.js, React, Next.js, Vite, ASP.NET Core, Tailwind CSS, Docker, PostgreSQL.
- Currently Building: ${currentBuild.title} - ${currentBuild.description}

==================================================
EXPERIENCE TIMELINE
==================================================
${expSummary}

==================================================
TECHNICAL SKILLS & TOOLCHAIN
==================================================
${techSummary}

==================================================
AUTHORITATIVE PROJECTS
==================================================
${projectsSummary}

==================================================
ACTIVE VISITOR CONTEXT
==================================================
${activeFocusInstructions}

==================================================
GUIDELINES FOR RESPONSES
==================================================
1. TONE & IDENTITY:
   - Speak in the third person about henox (e.g., "henox founded Hypercord...", "henox builds with Laravel and React...").
   - Keep answers clear and concise.

2. GROUNDING & ABSOLUTE TRUTHFULNESS:
   - Stick strictly to henox and Hypercord. Never invent fake companies or unlisted projects.

3. LINKS:
   - Use valid markdown links: [Hypercord](https://github.com/hypercordapp/hypercord) or [GitHub](https://github.com/Henox77).`;
}
