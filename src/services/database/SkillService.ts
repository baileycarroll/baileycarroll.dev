import { DatabaseService } from "./DatabaseService";
import { ServiceResult } from "../types";
import { DatabaseSkill } from "./types";

export class SkillService extends DatabaseService {
    // Skill CRUD Operations
    async getAllSkills(): Promise<ServiceResult<DatabaseSkill[]>> {
        const cacheKey = this.getCacheKey('getAllSkills', {});
        const cached = this.getFromCache<DatabaseSkill[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const skills = await this.prisma.skill.findMany({
                include: {
                    category: true,
                },
                orderBy: { name: 'asc' },
            });

            this.setCache(cacheKey, skills);
            return { success: true, data: skills };
        } catch (err) {
            return this.failure(
                'Failed to fetch skills',
                'SKILLS_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILLS_FETCH_ERROR')
            );
        }
    }

    async getSkillById(id: string): Promise<ServiceResult<DatabaseSkill>> {
        const cacheKey = this.getCacheKey('getSkillById', { id });
        const cached = this.getFromCache<DatabaseSkill>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const skill = await this.prisma.skill.findUnique({
                where: { id },
                include: {
                    category: true,
                }
            });

            if (!skill) {
                return this.failure(
                    `Skill not found: ${id}`,
                    'SKILL_NOT_FOUND',
                    404,
                );
            }

            this.setCache(cacheKey, skill);
            return { success: true, data: skill };
        } catch (err) {
            return this.failure(
                `Failed to fetch skill: ${id}`,
                'SKILL_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_FETCH_ERROR')
            );
        }
    }

    async createSkill(skillData: Omit<DatabaseSkill, 'id'>): Promise<ServiceResult<DatabaseSkill>> {
        try {
            const skill = await this.prisma.skill.create({
                data: {
                    name: skillData.name,
                    years: skillData.years,
                    categoryId: skillData.category.id,
                },
                include: {
                    category: true,
                }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllSkills');
            this.invalidateCache('getSkillById');

            return { success: true, data: skill };
        } catch (err) {
            return this.failure(
                'Failed to create skill',
                'SKILL_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_CREATION_ERROR')
            );
        }
    }
}
