// Guild Contract Data Structures for Phase 2.3

import { Achievement } from "./character";

export interface GuildContract {
  id: string;
  title: string;
  client: string; // Company or personal project
  description: string;
  difficulty: "Novice" | "Apprentice" | "Expert" | "Master";
  requiredSkills: TechStack[];
  rewards: Achievement[];
  status: "Active" | "Completed" | "Legendary";
  contractValue: string; // Business impact or learning outcome
  startDate: string;
  completionDate?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  screenshots?: string[];
  featured: boolean; // For larger cards in hybrid grid
  category: "web" | "mobile" | "backend" | "fullstack" | "design" | "other";
  complexity: number; // 1-10 for sorting and filtering
  businessImpact: string;
  learningOutcomes: string[];
}

export interface TechStack {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  category: "frontend" | "backend" | "database" | "devops" | "design";
}

export interface DifficultyRating {
  level: "Novice" | "Apprentice" | "Expert" | "Master";
  gem: "Amethyst" | "Sapphire" | "Ruby" | "Diamond";
  color: string;
  description: string;
  requirements: string[];
}

// Difficulty rating system based on Elder Scrolls gems
export const difficultyRatings: DifficultyRating[] = [
  {
    level: "Novice",
    gem: "Amethyst",
    color: "purple",
    description: "Suitable for beginners",
    requirements: ["Basic programming knowledge"],
  },
  {
    level: "Apprentice",
    gem: "Sapphire",
    color: "blue",
    description: "Requires some experience",
    requirements: ["1-2 years experience", "Basic framework knowledge"],
  },
  {
    level: "Expert",
    gem: "Ruby",
    color: "red",
    description: "Advanced complexity",
    requirements: ["3+ years experience", "Advanced concepts"],
  },
  {
    level: "Master",
    gem: "Diamond",
    color: "white",
    description: "Legendary difficulty",
    requirements: ["5+ years experience", "Architecture expertise"],
  },
];

// Helper functions
export function getDifficultyRating(
  level: string
): DifficultyRating | undefined {
  return difficultyRatings.find((r) => r.level === level);
}

export function calculateDifficulty(
  complexity: number,
  techStack: string[]
): "Novice" | "Apprentice" | "Expert" | "Master" {
  if (complexity >= 8 || techStack.length >= 8) return "Master";
  if (complexity >= 6 || techStack.length >= 6) return "Expert";
  if (complexity >= 4 || techStack.length >= 4) return "Apprentice";
  return "Novice";
}

export function mapCategory(
  type: string
): "web" | "mobile" | "backend" | "fullstack" | "design" | "other" {
  const typeLower = type.toLowerCase();
  if (typeLower.includes("website") || typeLower.includes("web")) return "web";
  if (typeLower.includes("mobile") || typeLower.includes("app"))
    return "mobile";
  if (typeLower.includes("backend") || typeLower.includes("api"))
    return "backend";
  if (typeLower.includes("fullstack") || typeLower.includes("full-stack"))
    return "fullstack";
  if (typeLower.includes("design") || typeLower.includes("ui")) return "design";
  return "other";
}

export function generateContractValue(impact?: string): string {
  if (!impact) return "Enhanced user experience and learning outcomes";
  return impact;
}

export function enhanceWithGamingTheme(
  description: string,
  contractId?: string
): string {
  // Add gaming-themed enhancements to descriptions
  const gamingEnhancements = [
    "This quest required mastery of ancient technologies",
    "A legendary challenge that tested all skills",
    "A guild contract that pushed the boundaries of creation",
    "An epic journey through the realms of code",
  ];

  // Use contract ID to deterministically select enhancement
  const hash = contractId
    ? contractId.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
    : 0;

  const enhancementIndex = Math.abs(hash) % gamingEnhancements.length;
  const enhancement = gamingEnhancements[enhancementIndex];

  return `${description} ${enhancement}.`;
}

export function mapTechStack(techStack: string[]): TechStack[] {
  return techStack.map((tech) => ({
    name: tech,
    icon: getTechIcon(tech),
    proficiency: getDeterministicProficiency(tech), // Deterministic based on skill name
    category: getTechCategory(tech),
  }));
}

function getDeterministicProficiency(tech: string): number {
  // Create a deterministic hash from the tech name
  const hash = tech.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  // Use the hash to generate a proficiency between 60-100
  const proficiency = 60 + (Math.abs(hash) % 41);
  return proficiency;
}

function getTechIcon(tech: string): string {
  const iconMap: Record<string, string> = {
    Laravel: "laravel-icon",
    Vue: "vue-icon",
    React: "react-icon",
    Flutter: "flutter-icon",
    TypeScript: "typescript-icon",
    JavaScript: "javascript-icon",
    PHP: "php-icon",
    MySQL: "mysql-icon",
    PostgreSQL: "postgresql-icon",
    Docker: "docker-icon",
    AWS: "aws-icon",
    Git: "git-icon",
    TailwindCSS: "tailwind-icon",
    "Next.js": "nextjs-icon",
    "Node.js": "nodejs-icon",
    Python: "python-icon",
    MongoDB: "mongodb-icon",
  };

  return iconMap[tech] || "code-icon";
}

function getTechCategory(
  tech: string
): "frontend" | "backend" | "database" | "devops" | "design" {
  const frontendTechs = [
    "React",
    "Vue",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "Next.js",
  ];
  const backendTechs = ["Laravel", "PHP", "Node.js", "Python"];
  const databaseTechs = ["MySQL", "PostgreSQL", "MongoDB"];
  const devopsTechs = ["Docker", "AWS", "Git"];
  const designTechs = ["Figma", "Adobe", "Sketch"];

  if (frontendTechs.includes(tech)) return "frontend";
  if (backendTechs.includes(tech)) return "backend";
  if (databaseTechs.includes(tech)) return "database";
  if (devopsTechs.includes(tech)) return "devops";
  if (designTechs.includes(tech)) return "design";

  return "backend"; // Default
}

export function generateRewards(achievements?: string[]): Achievement[] {
  if (!achievements) {
    return [
      {
        id: "experience-gained",
        title: "Experience Gained",
        description: "Valuable experience in modern development practices",
        tier: "Bronze" as const,
        icon: "experience-icon",
        category: "milestone" as const,
        rarity: "common" as const,
      },
    ];
  }

  return achievements.map((achievement) => ({
    id: achievement.toLowerCase().replace(/\s+/g, "-"),
    title: achievement,
    description: `Achievement unlocked: ${achievement}`,
    tier: "Silver" as const,
    icon: "achievement-icon",
    category: "milestone" as const,
    rarity: "rare" as const,
  }));
}
