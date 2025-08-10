// Project Transformer for Phase 2.3
// Converts existing project data to guild contract format

import { GuildContract } from "./guildContracts";
import {
  calculateDifficulty,
  mapCategory,
  generateContractValue,
  enhanceWithGamingTheme,
  mapTechStack,
  generateRewards,
} from "./guildContracts";

// Interface for existing project data structure
export interface ExistingProject {
  name: string;
  type: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
  icon: unknown;
  logo: unknown;
  id?: string;
  company?: string;
  complexity?: number;
  techStack?: string[];
  achievements?: string[];
  status?: "active" | "completed";
  startDate?: string;
  endDate?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  impact?: string;
  learnings?: string[];
  caseStudyUrl?: string;
  screenshots?: string[];
}

export function transformProjectToContract(
  project: ExistingProject
): GuildContract {
  // Extract tech stack from project description and type
  const techStack = extractTechStack(project.description, project.type);

  // Calculate complexity based on tech stack and description
  const complexity = calculateComplexity(project.description, techStack);

  // Determine status based on project type and description
  const status = determineStatus(project.description);

  // Extract URLs from project link
  const { liveUrl, githubUrl } = extractUrls(project.link);

  return {
    id: project.id || project.name.toLowerCase().replace(/\s+/g, "-"),
    title: project.name,
    client: project.company || "Personal Project",
    description: enhanceWithGamingTheme(
      project.description,
      project.id || project.name.toLowerCase().replace(/\s+/g, "-")
    ),
    difficulty: calculateDifficulty(complexity, techStack),
    requiredSkills: mapTechStack(techStack),
    rewards: generateRewards(project.achievements),
    status: status === "completed" ? "Completed" : "Active",
    contractValue: generateContractValue(project.impact),
    startDate: project.startDate || "2023-01-01", // Default date
    completionDate: project.endDate,
    techStack: techStack,
    liveUrl: project.liveUrl || liveUrl,
    githubUrl: project.githubUrl || githubUrl,
    caseStudyUrl: project.caseStudyUrl,
    screenshots: project.screenshots,
    featured: project.featured || false,
    category: mapCategory(project.type),
    complexity: complexity,
    businessImpact:
      project.impact || "Enhanced user experience and learning outcomes",
    learningOutcomes: project.learnings || generateLearningOutcomes(techStack),
  };
}

function extractTechStack(description: string, type: string): string[] {
  const techStack: string[] = [];

  // Extract technologies from description
  const techKeywords = [
    "Laravel",
    "Vue",
    "React",
    "Flutter",
    "TypeScript",
    "JavaScript",
    "PHP",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
    "TailwindCSS",
    "Next.js",
    "Node.js",
    "Python",
    "MongoDB",
    "MDBootstrap",
  ];

  techKeywords.forEach((tech) => {
    if (description.toLowerCase().includes(tech.toLowerCase())) {
      techStack.push(tech);
    }
  });

  // Add technologies based on project type
  if (type.toLowerCase().includes("website")) {
    if (!techStack.includes("Laravel")) techStack.push("Laravel");
    if (!techStack.includes("PHP")) techStack.push("PHP");
  }

  if (
    type.toLowerCase().includes("mobile") ||
    type.toLowerCase().includes("app")
  ) {
    if (!techStack.includes("Flutter")) techStack.push("Flutter");
  }

  if (type.toLowerCase().includes("github")) {
    if (!techStack.includes("Git")) techStack.push("Git");
  }

  // Ensure we have at least some basic tech stack
  if (techStack.length === 0) {
    techStack.push("JavaScript", "Git");
  }

  return techStack;
}

function calculateComplexity(description: string, techStack: string[]): number {
  let complexity = 3; // Base complexity

  // Increase complexity based on tech stack size
  complexity += Math.min(techStack.length * 0.5, 3);

  // Increase complexity based on description length and keywords
  if (description.length > 200) complexity += 1;
  if (description.toLowerCase().includes("cms")) complexity += 1;
  if (description.toLowerCase().includes("tracking")) complexity += 1;
  if (description.toLowerCase().includes("management")) complexity += 1;
  if (description.toLowerCase().includes("portal")) complexity += 1;

  // Cap complexity at 10
  return Math.min(complexity, 10);
}

function determineStatus(description: string): "active" | "completed" {
  if (description.toLowerCase().includes("no longer in active development")) {
    return "completed";
  }

  if (
    description.toLowerCase().includes("developing") ||
    description.toLowerCase().includes("in progress")
  ) {
    return "active";
  }

  // Default to completed for most projects
  return "completed";
}

function extractUrls(link: { href: string; label: string }): {
  liveUrl?: string;
  githubUrl?: string;
} {
  const urls: { liveUrl?: string; githubUrl?: string } = {};

  if (link.href.includes("github.com")) {
    urls.githubUrl = link.href;
  } else if (
    link.href.includes("barnesandnoble.com") ||
    link.href.includes("demo") ||
    link.href.includes("live")
  ) {
    urls.liveUrl = link.href;
  }

  return urls;
}

function generateLearningOutcomes(techStack: string[]): string[] {
  const outcomes: string[] = [];

  if (techStack.includes("Laravel")) {
    outcomes.push("Mastered Laravel framework and PHP development");
  }

  if (techStack.includes("Vue")) {
    outcomes.push("Gained expertise in Vue.js frontend development");
  }

  if (techStack.includes("Flutter")) {
    outcomes.push("Learned cross-platform mobile development with Flutter");
  }

  if (techStack.includes("React")) {
    outcomes.push("Developed React.js skills and modern frontend practices");
  }

  if (techStack.includes("TypeScript")) {
    outcomes.push("Enhanced type safety and code quality with TypeScript");
  }

  if (techStack.includes("Next.js")) {
    outcomes.push("Mastered Next.js for full-stack React applications");
  }

  if (techStack.includes("TailwindCSS")) {
    outcomes.push("Improved UI development with Tailwind CSS");
  }

  if (techStack.includes("MySQL") || techStack.includes("PostgreSQL")) {
    outcomes.push("Gained database design and management experience");
  }

  if (techStack.includes("Docker")) {
    outcomes.push("Learned containerization and deployment practices");
  }

  if (outcomes.length === 0) {
    outcomes.push("Enhanced problem-solving and development skills");
  }

  return outcomes;
}
