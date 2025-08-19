import { DatabaseService } from "./DatabaseService";
import { ServiceResult } from "../types";
import { DatabaseSkill, DatabaseSkillCategory } from "./types";

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
        } finally {
            await this.disconnect();
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
        } finally {
            await this.disconnect();
        }
    }

    async createSkill(skillData: Omit<DatabaseSkill, 'id'>): Promise<ServiceResult<DatabaseSkill>> {
        try {
            const skill = await this.prisma.skill.create({
                data: {
                    name: skillData.name,
                    years: skillData.years,
                    categoryId: skillData.category?.id,
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
        } finally {
            await this.disconnect();
        }
    }

    async updateSkill(id: string, skillData: Partial<DatabaseSkill>): Promise<ServiceResult<DatabaseSkill>> {
        try {
            const skill = await this.prisma.skill.update({
                where: { id },
                data: {
                    name: skillData.name,
                    years: skillData.years,
                    categoryId: skillData.category?.id,
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
                'Failed to update skill',
                'SKILL_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_UPDATE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async deleteSkill(id: string): Promise<ServiceResult<void>> {
        try {
            await this.prisma.skill.delete({
                where: { id }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllSkills');
            this.invalidateCache('getSkillById');

            return { success: true, data: undefined };
        } catch (err) {
            return this.failure(
                'Failed to delete skill',
                'SKILL_DELETION_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_DELETION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    // Skill Category CRUD Operations
    async getAllSkillCategories(): Promise<ServiceResult<DatabaseSkillCategory[]>> {
        const cacheKey = this.getCacheKey('getAllSkillCategories', {});
        const cached = this.getFromCache<DatabaseSkillCategory[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const categories = await this.prisma.skillCategory.findMany({
                orderBy: { name: 'asc' },
            });

            this.setCache(cacheKey, categories);
            return { success: true, data: categories };
        } catch (err) {
            return this.failure(
                'Failed to fetch skill categories',
                'SKILL_CATEGORIES_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_CATEGORIES_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getSkillCategoryById(id: string): Promise<ServiceResult<DatabaseSkillCategory>> {
        const cacheKey = this.getCacheKey('getSkillCategoryById', { id });
        const cached = this.getFromCache<DatabaseSkillCategory>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const category = await this.prisma.skillCategory.findUnique({
                where: { id }
            });

            if (!category) {
                return this.failure(
                    `Skill category not found: ${id}`,
                    'SKILL_CATEGORY_NOT_FOUND',
                    404,
                );
            }

            this.setCache(cacheKey, category);
            return { success: true, data: category };
        } catch (err) {
            return this.failure(
                `Failed to fetch skill category: ${id}`,
                'SKILL_CATEGORY_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_CATEGORY_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async createSkillCategory(categoryData: Omit<DatabaseSkillCategory, 'id'>): Promise<ServiceResult<DatabaseSkillCategory>> {
        try {
            const category = await this.prisma.skillCategory.create({
                data: {
                    name: categoryData.name,
                    description: categoryData.description,
                    display: categoryData.display,
                }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllSkillCategories');
            this.invalidateCache('getSkillCategoryById');

            return { success: true, data: category };
        } catch (err) {
            return this.failure(
                'Failed to create skill category',
                'SKILL_CATEGORY_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_CATEGORY_CREATION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async updateSkillCategory(id: string, categoryData: Partial<DatabaseSkillCategory>): Promise<ServiceResult<DatabaseSkillCategory>> {
        try {
            const category = await this.prisma.skillCategory.update({
                where: { id },
                data: {
                    name: categoryData.name,
                    description: categoryData.description,
                    display: categoryData.display,
                }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllSkillCategories');
            this.invalidateCache('getSkillCategoryById');

            return { success: true, data: category };
        } catch (err) {
            return this.failure(
                'Failed to update skill category',
                'SKILL_CATEGORY_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_CATEGORY_UPDATE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async deleteSkillCategory(id: string): Promise<ServiceResult<void>> {
        try {
            let skills = await this.prisma.skill.findMany({
                where: {categoryId: id}
            })
            
            // Map through each skill in the list, and update the caetgory id to be null
            skills.forEach(async (skill) => {
                await this.prisma.skill.update({
                    where: { id: skill.id },
                    data: {
                        categoryId: undefined
                    }
                })
                await this.prisma.$disconnect()
            })


            await this.prisma.skillCategory.delete({
                where: { id }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllSkillCategories');
            this.invalidateCache('getSkillCategoryById');

            return { success: true, data: undefined };
        } catch (err) {
            return this.failure(
                'Failed to delete skill category',
                'SKILL_CATEGORY_DELETION_ERROR',
                500,
                err instanceof Error ? err : new Error('SKILL_CATEGORY_DELETION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }
}
