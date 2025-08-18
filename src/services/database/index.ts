import { ArticleService } from "./ArticleService";
import { ExperienceService } from "./ExperienceService";
import { PoemService } from "./PoemService";
import { ProjectService } from "./ProjectService";
import { SkillService } from "./SkillService";
import { prisma } from "@/lib/database";

// Create service instances
export const articleService = new ArticleService(prisma);
export const experienceService = new ExperienceService(prisma);
export const poemService = new PoemService(prisma);
export const projectService = new ProjectService(prisma);
export const skillService = new SkillService(prisma);

// Re-export disconnect function from lib/database
export { disconnectDatabase } from "@/lib/database";

// Export types
export type {
    DatabaseArticle,
    DatabaseExperience,
    DatabasePoem,
    DatabaseProject,
    DatabaseSkill,
    PrismaArticleWithRelations,
    PrismaExperienceWithRelations,
    PrismaPoemWithRelations,
    PrismaProjectWithRelations,
    PrismaSkill
} from "./types";

// Export base class for potential extension
export { DatabaseService } from "./DatabaseService";

// Export individual services for direct access
export { ArticleService } from "./ArticleService";
export { ExperienceService } from "./ExperienceService";
export { PoemService } from "./PoemService";
export { ProjectService } from "./ProjectService";
export { SkillService } from "./SkillService";
