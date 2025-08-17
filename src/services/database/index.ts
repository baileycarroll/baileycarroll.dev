import { PrismaClient } from "../../../generated/prisma/client";
import { ArticleService } from "./ArticleService";
import { ExperienceService } from "./ExperienceService";
import { PoemService } from "./PoemService";
import { ProjectService } from "./ProjectService";
import { SkillService } from "./SkillService";

// Prisma Client Singleton with proper connection management
class PrismaClientSingleton {
    private static instance: PrismaClient | null = null;

    static getInstance(): PrismaClient {
        if (!PrismaClientSingleton.instance) {
            PrismaClientSingleton.instance = new PrismaClient({
                log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL
                    }
                }
            });

            // Handle graceful shutdown
            if (typeof window === 'undefined') { // Server-side only
                process.on('beforeExit', async () => {
                    await PrismaClientSingleton.instance?.$disconnect();
                });

                process.on('SIGINT', async () => {
                    await PrismaClientSingleton.instance?.$disconnect();
                    process.exit(0);
                });

                process.on('SIGTERM', async () => {
                    await PrismaClientSingleton.instance?.$disconnect();
                    process.exit(0);
                });
            }
        }
        return PrismaClientSingleton.instance;
    }

    static async disconnect(): Promise<void> {
        if (PrismaClientSingleton.instance) {
            await PrismaClientSingleton.instance.$disconnect();
            PrismaClientSingleton.instance = null;
        }
    }
}

// Get the singleton instance
const prisma = PrismaClientSingleton.getInstance();

// Create service instances
export const articleService = new ArticleService(prisma);
export const experienceService = new ExperienceService(prisma);
export const poemService = new PoemService(prisma);
export const projectService = new ProjectService(prisma);
export const skillService = new SkillService(prisma);

// Export disconnect function for cleanup
export const disconnectDatabase = () => PrismaClientSingleton.disconnect();

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
