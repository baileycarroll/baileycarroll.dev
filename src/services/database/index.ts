import { ExperienceService } from "./ExperienceService";
import { ProjectService } from "./ProjectService";
import { SkillService } from "./SkillService";
import { prisma } from "@/lib/database";

// Create service instances
export const experienceService = new ExperienceService(prisma);
export const projectService = new ProjectService(prisma);
export const skillService = new SkillService(prisma);

// Re-export disconnect function from lib/database
export { disconnectDatabase } from "@/lib/database";

// Export types
export type {
    DatabaseExperience,
    DatabaseProject,
    DatabaseSkill,
    PrismaExperienceWithRelations,
    PrismaProjectWithRelations,
    PrismaSkill
} from "./types";

// Export base class for potential extension
export { DatabaseService } from "./DatabaseService";

export { ExperienceService } from "./ExperienceService";
export { ProjectService } from "./ProjectService";
export { SkillService } from "./SkillService";
