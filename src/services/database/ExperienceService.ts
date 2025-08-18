import { DatabaseService } from "./DatabaseService";
import { ServiceResult } from "../types";
import { DatabaseExperience, PrismaExperienceWithRelations } from "./types";

export class ExperienceService extends DatabaseService {
    // Experience CRUD Operations
    async getAllExperiences(): Promise<ServiceResult<DatabaseExperience[]>> {
        const cacheKey = this.getCacheKey('getAllExperiences', {});
        const cached = this.getFromCache<DatabaseExperience[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const experiences = await this.prisma.experience.findMany({
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                }
                            }
                        }
                    }
                },
                orderBy: { order: 'asc' },
            });

            const result = experiences.map(experience => ({
                ...experience,
                skills: (experience as PrismaExperienceWithRelations).skills.map(es => ({ 
                    skill: es.skill 
                })),
            }));

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                'Failed to fetch experiences',
                'EXPERIENCES_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('EXPERIENCES_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getExperienceById(id: string): Promise<ServiceResult<DatabaseExperience>> {
        const cacheKey = this.getCacheKey('getExperienceById', { id });
        const cached = this.getFromCache<DatabaseExperience>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const experience = await this.prisma.experience.findUnique({
                where: { id },
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                }
                            }
                        }
                    }
                },
            });

            if (!experience) {
                return this.failure(
                    `Experience not found: ${id}`,
                    'EXPERIENCE_NOT_FOUND',
                    404,
                );
            }

            const result = {
                ...experience,
                skills: (experience as PrismaExperienceWithRelations).skills.map(es => ({ 
                    skill: es.skill 
                })),
            };

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch experience: ${id}`,
                'EXPERIENCE_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('EXPERIENCE_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async createExperience(experienceData: Omit<DatabaseExperience, 'id'>, skillIds: string[]): Promise<ServiceResult<DatabaseExperience>> {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const experience = await tx.experience.create({
                    data: {
                        title: experienceData.title,
                        employer: experienceData.employer,
                        startDate: experienceData.startDate,
                        endDate: experienceData.endDate,
                        details: experienceData.details,
                        link: experienceData.link,
                        order: experienceData.order,
                    }
                });

                if (skillIds.length > 0) {
                    await tx.experienceSkill.createMany({
                        data: skillIds.map(skillId => ({
                            experienceId: experience.id,
                            skillId,
                        })),
                    });
                }

                return await tx.experience.findUnique({
                    where: { id: experience.id },
                    include: {
                        skills: {
                            include: {
                                skill: {
                                    include: {
                                        category: true,
                                    }
                                }
                            }
                        }
                    }
                });
            });

            if (!result) {
                throw new Error('Failed to create experience');
            }

            const databaseExperience = {
                ...result,
                skills: (result as PrismaExperienceWithRelations).skills.map(es => ({ 
                    skill: es.skill 
                })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllExperiences');
            this.invalidateCache('getExperienceById');

            return { success: true, data: databaseExperience };
        } catch (err) {
            return this.failure(
                'Failed to create experience',
                'EXPERIENCE_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('EXPERIENCE_CREATION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async updateExperience(id: string, experienceData: Partial<DatabaseExperience>, skillIds?: string[]): Promise<ServiceResult<DatabaseExperience>> {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const experience = await tx.experience.update({
                    where: { id },
                    data: {
                        title: experienceData.title,
                        employer: experienceData.employer,
                        startDate: experienceData.startDate,
                        endDate: experienceData.endDate,
                        details: experienceData.details,
                        link: experienceData.link,
                        order: experienceData.order,
                    }
                });

                // Update skills if provided
                if (skillIds !== undefined) {
                    // Delete existing skills
                    await tx.experienceSkill.deleteMany({
                        where: { experienceId: id }
                    });

                    // Add new skills
                    if (skillIds.length > 0) {
                        await tx.experienceSkill.createMany({
                            data: skillIds.map(skillId => ({
                                experienceId: id,
                                skillId,
                            })),
                        });
                    }
                }

                return await tx.experience.findUnique({
                    where: { id },
                    include: {
                        skills: {
                            include: {
                                skill: {
                                    include: {
                                        category: true,
                                    }
                                }
                            }
                        }
                    }
                });
            });

            if (!result) {
                throw new Error('Failed to update experience');
            }

            const databaseExperience = {
                ...result,
                skills: (result as PrismaExperienceWithRelations).skills.map(es => ({ 
                    skill: es.skill 
                })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllExperiences');
            this.invalidateCache('getExperienceById');

            return { success: true, data: databaseExperience };
        } catch (err) {
            return this.failure(
                `Failed to update experience: ${id}`,
                'EXPERIENCE_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('EXPERIENCE_UPDATE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async deleteExperience(id: string): Promise<ServiceResult<void>> {
        try {
            await this.prisma.$transaction(async (tx) => {
                // Delete associated skills first
                await tx.experienceSkill.deleteMany({
                    where: { experienceId: id }
                });

                // Delete the experience
                await tx.experience.delete({
                    where: { id }
                });
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllExperiences');
            this.invalidateCache('getExperienceById');

            return { success: true, data: undefined };
        } catch (err) {
            return this.failure(
                `Failed to delete experience: ${id}`,
                'EXPERIENCE_DELETE_ERROR',
                500,
                err instanceof Error ? err : new Error('EXPERIENCE_DELETE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async updateExperienceOrder(id: string, order: number): Promise<ServiceResult<DatabaseExperience>> {
        try {
            const experience = await this.prisma.experience.update({
                where: { id },
                data: { order },
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                }
                            }
                        }
                    }
                }
            });

            const result = {
                ...experience,
                skills: (experience as PrismaExperienceWithRelations).skills.map(es => ({ 
                    skill: es.skill 
                })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllExperiences');
            this.invalidateCache('getExperienceById');

            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to update experience order: ${id}`,
                'EXPERIENCE_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('EXPERIENCE_UPDATE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }
}
