// Guild Contracts Data for Phase 2.3
// Transformed project data into guild contract format

import { GuildContract } from "@/lib/guildContracts";
import { transformProjectToContract } from "@/lib/projectTransformer";

// Original project data from projects page
const originalProjects = [
  {
    name: "A Warrior's Journey",
    type: "Book",
    description:
      "Authored and self-published a freestyle poetry book, demonstrating strong communication skills. Applied project management techniques to take the book from initial concept to publication, while showcasing resilience, creativity, and an aptitude for tackling challenging subjects–qualities that complement the essential skill of problem solving.",
    link: {
      href: "https://www.barnesandnoble.com/w/a-warriors-journey-hunter-bailey/1146141656%3Bjsessionid=F3C2747E76FFF63C84E6CBB211E48FE3.prodny_store02-atgap08?ean=9798218480882",
      label: "Barnes & Nobel Listing",
    },
    icon: null,
    logo: null,
    featured: true,
    impact: "Demonstrated project management and creative writing skills",
    learnings: [
      "Project management",
      "Creative writing",
      "Self-publishing",
      "Marketing",
    ],
  },
  {
    name: "Acolyte v4",
    type: "Website",
    description:
      "Version 4 of Acolyte. This version is a basic Content Management System (CMS). And was used by a client to track 40 plus users for over 3 years. This version is no longer in active development, and is kept up only as a showcase of where I was 3 years ago. The system does function, but it's not as smooth as I would like. Written in Laravel and MDBoostrap.",
    link: {
      href: "https://github.com/baileycarroll/Acolyte-v4",
      label: "GitHub Repo",
    },
    icon: null,
    logo: null,
    techStack: ["Laravel", "PHP", "MySQL", "MDBootstrap"],
    achievements: ["First CMS", "Client Project", "User Management System"],
    impact: "Managed 40+ users for 3 years with custom CMS solution",
    learnings: [
      "Laravel framework",
      "CMS development",
      "User management",
      "Client relationships",
    ],
  },
  {
    name: "Acolyte v5",
    type: "Website",
    description:
      "This is the newest version of Acolyte, while I do keep the source code private I am willing to expose some of the design as a demo so you can see the progress and the stark difference in design and experience. I've grown alot in the past three years and this new version of Acolyte will help showcase that beautifully. Written in Laravel, Vue, and TailwindCSS.",
    link: {
      href: "#",
      label: "No Demo Just Yet",
    },
    icon: null,
    logo: null,
    techStack: ["Laravel", "Vue", "TailwindCSS", "PHP", "MySQL"],
    achievements: ["Modern UI/UX", "Vue.js Integration", "Tailwind CSS"],
    impact: "Modern web application with improved user experience",
    learnings: [
      "Vue.js",
      "Tailwind CSS",
      "Modern UI/UX design",
      "Component architecture",
    ],
    featured: true,
  },
  {
    name: "Corpus Vitae",
    type: "GitHub Repo",
    description:
      "This is a fitness, meal, and overall life tracking app that I'm developing for Android and iOS using Flutter. I wanted something more for my portfolio, and was tired of paying $30-$40 per month for basic exercise and macro tracking. So I figured I would make one for myself.",
    link: {
      href: "https://github.com/baileycarroll/CorpusVitae",
      label: "GitHub Repo",
    },
    icon: null,
    logo: null,
    techStack: ["Flutter", "Dart", "SQLite", "Mobile Development"],
    achievements: [
      "Cross-platform mobile app",
      "Fitness tracking",
      "Meal planning",
    ],
    impact: "Personal fitness and meal tracking solution",
    learnings: [
      "Flutter",
      "Dart",
      "Mobile development",
      "Cross-platform development",
    ],
    status: "active" as const,
  },
  {
    name: "My Portfolio / Developer Portal",
    type: "GitHub Repo",
    description:
      "I'm including this website in this list because it has another function well beyond that of just a portfolio site. It actually houses my developer portal which has project tracking, tooling, and more that makes it easier for me to organize what resources I have, and interact with them.",
    link: {
      href: "https://github.com/baileycarroll/baileycarroll.dev",
      label: "GitHub Repo",
    },
    icon: null,
    logo: null,
    techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js"],
    achievements: [
      "Developer portal",
      "Project tracking",
      "Tooling integration",
    ],
    impact: "Comprehensive developer portal and portfolio system",
    learnings: [
      "Next.js",
      "React",
      "TypeScript",
      "Modern web development",
      "Developer tooling",
    ],
    featured: true,
  },
];

// Transform original projects to guild contracts
export const guildContracts: GuildContract[] = originalProjects.map((project) =>
  transformProjectToContract(project)
);

// Additional guild contracts for demonstration
export const additionalContracts: GuildContract[] = [
  {
    id: "gaming-portfolio",
    title: "Gaming Portfolio Transformation",
    client: "Personal Project",
    description:
      "Transformed a traditional portfolio into an immersive gaming experience with character sheets, guild contracts, and Elder Scrolls-inspired design. This quest required mastery of ancient technologies and modern web development practices.",
    difficulty: "Master",
    requiredSkills: [
      {
        name: "Next.js",
        icon: "nextjs-icon",
        proficiency: 95,
        category: "frontend",
      },
      {
        name: "React",
        icon: "react-icon",
        proficiency: 90,
        category: "frontend",
      },
      {
        name: "TypeScript",
        icon: "typescript-icon",
        proficiency: 85,
        category: "frontend",
      },
      {
        name: "TailwindCSS",
        icon: "tailwind-icon",
        proficiency: 90,
        category: "frontend",
      },
      {
        name: "Framer Motion",
        icon: "animation-icon",
        proficiency: 80,
        category: "frontend",
      },
    ],
    rewards: [
      {
        id: "gaming-portfolio-master",
        title: "Gaming Portfolio Master",
        description: "Successfully created an immersive gaming portfolio",
        tier: "Platinum",
        icon: "portfolio-master-icon",
        category: "project",
        rarity: "legendary",
      },
    ],
    status: "Completed",
    contractValue: "Revolutionary portfolio design with gaming immersion",
    startDate: "2024-01-01",
    completionDate: "2024-12-01",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/baileycarroll/baileycarroll.dev",
    featured: true,
    category: "fullstack",
    complexity: 9,
    businessImpact: "Showcases innovative design and technical expertise",
    learningOutcomes: [
      "Advanced React patterns",
      "Gaming UI/UX design",
      "Animation systems",
      "TypeScript mastery",
      "Performance optimization",
    ],
  },
  {
    id: "character-sheet-system",
    title: "Character Sheet System",
    client: "Portfolio Enhancement",
    description:
      "Developed a comprehensive character sheet system that displays developer skills as RPG character stats, with skill trees, quests, and achievements. A legendary challenge that tested all skills in modern web development.",
    difficulty: "Expert",
    requiredSkills: [
      {
        name: "React",
        icon: "react-icon",
        proficiency: 90,
        category: "frontend",
      },
      {
        name: "TypeScript",
        icon: "typescript-icon",
        proficiency: 85,
        category: "frontend",
      },
      { name: "CSS", icon: "css-icon", proficiency: 88, category: "frontend" },
      {
        name: "Data Design",
        icon: "data-icon",
        proficiency: 82,
        category: "backend",
      },
    ],
    rewards: [
      {
        id: "character-sheet-expert",
        title: "Character Sheet Expert",
        description: "Mastered character sheet system development",
        tier: "Gold",
        icon: "character-expert-icon",
        category: "project",
        rarity: "epic",
      },
    ],
    status: "Completed",
    contractValue: "Innovative skill visualization system",
    startDate: "2024-11-01",
    completionDate: "2024-11-15",
    techStack: ["React", "TypeScript", "CSS", "Data Design"],
    featured: false,
    category: "web",
    complexity: 7,
    businessImpact: "Enhanced portfolio with unique skill visualization",
    learningOutcomes: [
      "Component architecture",
      "Data visualization",
      "Gaming UI design",
      "TypeScript interfaces",
    ],
  },
];

// Combine all contracts
export const allGuildContracts: GuildContract[] = [
  ...guildContracts,
  ...additionalContracts,
];

// Helper function to get contracts by category
export function getContractsByCategory(category: string): GuildContract[] {
  return allGuildContracts.filter((contract) => contract.category === category);
}

// Helper function to get featured contracts
export function getFeaturedContracts(): GuildContract[] {
  return allGuildContracts.filter((contract) => contract.featured);
}

// Helper function to get contracts by difficulty
export function getContractsByDifficulty(difficulty: string): GuildContract[] {
  return allGuildContracts.filter(
    (contract) => contract.difficulty === difficulty
  );
}

// Helper function to get contracts by status
export function getContractsByStatus(status: string): GuildContract[] {
  return allGuildContracts.filter((contract) => contract.status === status);
}
