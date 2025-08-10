// Character Sheet Data Structures
export interface CharacterStats {
  yearsExperience: number;
  projectsCompleted: number;
  technologiesMastered: number;
  linesOfCode: number;
  bugsFixed: number;
  deployments: number;
}

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  maxLevel: number;
  description: string;
  icon: string;
  dependencies: string[]; // IDs of prerequisite skills
  position: { x: number; y: number }; // For visual layout
  rewards: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: "main" | "side";
  difficulty: "Novice" | "Apprentice" | "Expert" | "Master";
  status: "active" | "completed" | "legendary";
  progress: number; // 0-100
  rewards: Achievement[];
  requiredSkills: string[]; // Skill IDs
  startDate: string;
  completionDate?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  icon: string;
  unlockedDate?: string;
  category: "project" | "skill" | "milestone" | "community";
  rarity: "common" | "rare" | "epic" | "legendary";
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "mobile"
  | "database"
  | "design"
  | "soft-skills";

// Helper functions
export function groupSkillsByCategory(
  skills: SkillNode[]
): Record<SkillCategory, SkillNode[]> {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, SkillNode[]>);

  // Ensure all categories exist
  const categories: SkillCategory[] = [
    "frontend",
    "backend",
    "devops",
    "mobile",
    "database",
    "design",
    "soft-skills",
  ];
  categories.forEach((category) => {
    if (!grouped[category]) {
      grouped[category] = [];
    }
  });

  return grouped;
}

export function getSkillById(
  skills: SkillNode[],
  id: string
): SkillNode | undefined {
  return skills.find((skill) => skill.id === id);
}

export function getSkillsByCategory(
  skills: SkillNode[],
  category: SkillCategory
): SkillNode[] {
  return skills.filter((skill) => skill.category === category);
}

export function calculateTotalSkillLevel(skills: SkillNode[]): number {
  if (skills.length === 0) return 0;
  const total = skills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(total / skills.length);
}

export function getUnlockedSkills(skills: SkillNode[]): SkillNode[] {
  return skills.filter((skill) => skill.level > 0);
}

export function getLockedSkills(skills: SkillNode[]): SkillNode[] {
  return skills.filter((skill) => skill.level === 0);
}

export function canUnlockSkill(
  skill: SkillNode,
  unlockedSkills: SkillNode[]
): boolean {
  if (skill.dependencies.length === 0) return true;

  const unlockedSkillIds = unlockedSkills.map((s) => s.id);
  return skill.dependencies.every((depId) => unlockedSkillIds.includes(depId));
}

// Quest helper functions
export function getQuestsByType(
  quests: Quest[],
  type: "main" | "side"
): Quest[] {
  return quests.filter((quest) => quest.type === type);
}

export function getQuestsByStatus(
  quests: Quest[],
  status: Quest["status"]
): Quest[] {
  return quests.filter((quest) => quest.status === status);
}

export function getActiveQuests(quests: Quest[]): Quest[] {
  return quests.filter((quest) => quest.status === "active");
}

export function getCompletedQuests(quests: Quest[]): Quest[] {
  return quests.filter((quest) => quest.status === "completed");
}

// Achievement helper functions
export function getAchievementsByTier(
  achievements: Achievement[],
  tier: Achievement["tier"]
): Achievement[] {
  return achievements.filter((achievement) => achievement.tier === tier);
}

export function getUnlockedAchievements(
  achievements: Achievement[]
): Achievement[] {
  return achievements.filter((achievement) => achievement.unlockedDate);
}

export function getRecentAchievements(
  achievements: Achievement[],
  count: number = 5
): Achievement[] {
  return getUnlockedAchievements(achievements)
    .sort(
      (a, b) =>
        new Date(b.unlockedDate!).getTime() -
        new Date(a.unlockedDate!).getTime()
    )
    .slice(0, count);
}

export function getAchievementsByCategory(
  achievements: Achievement[],
  category: Achievement["category"]
): Achievement[] {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
}
