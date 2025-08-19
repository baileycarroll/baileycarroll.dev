import { DatabaseService } from "./DatabaseService";
import { ServiceResult } from "../types";
import { DatabaseProject, PrismaProjectWithRelations } from "./types";

export class ProjectService extends DatabaseService {
    // Project CRUD Operations
    async getAllProjects(): Promise<ServiceResult<DatabaseProject[]>> {
        const cacheKey = this.getCacheKey('getAllProjects', {});
        const cached = this.getFromCache<DatabaseProject[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const projects = await this.prisma.project.findMany({
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    categories: true,
                },
                orderBy: { startDate: 'desc' },
            });

            const result = projects.map(project => ({
                ...project,
                skills: project.skills.map(ps => ({ 
                    skill: ps.skill as any
                })),
                categories: project.categories.map(c => ({ 
                    category: c.category 
                })),
            }));

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                'Failed to fetch projects',
                'PROJECTS_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('PROJECTS_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getProjectById(id: string): Promise<ServiceResult<DatabaseProject>> {
        const cacheKey = this.getCacheKey('getProjectById', { id });
        const cached = this.getFromCache<DatabaseProject>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const project = await this.prisma.project.findUnique({
                where: { id },
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    categories: true,
                },
            });

            if (!project) {
                return this.failure(
                    `Project not found: ${id}`,
                    'PROJECT_NOT_FOUND',
                    404,
                );
            }

            const result = {
                ...project,
                skills: (project as PrismaProjectWithRelations).skills.map(ps => ({ 
                    skill: ps.skill 
                })),
                categories: (project as PrismaProjectWithRelations).categories.map(c => ({ 
                    category: c.category 
                })),
            };

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch project: ${id}`,
                'PROJECT_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('PROJECT_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async createProject(projectData: Omit<DatabaseProject, 'id'>, skillIds: string[], categories: string[]): Promise<ServiceResult<DatabaseProject>> {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const project = await tx.project.create({
                    data: {
                        name: projectData.name,
                        description: projectData.description,
                        type: projectData.type,
                        status: projectData.status,
                        featured: projectData.featured,
                        startDate: projectData.startDate,
                        endDate: projectData.endDate,
                        url: projectData.url,
                        urlText: projectData.urlText,
                        logoUrl: projectData.logoUrl,
                    }
                });

                if (skillIds.length > 0) {
                    await tx.projectSkills.createMany({
                        data: skillIds.map(skillId => ({
                            projectId: project.id,
                            skillId,
                        })),
                    });
                }

                if (categories.length > 0) {
                    await tx.projectCategories.createMany({
                        data: categories.map(category => ({
                            projectId: project.id,
                            category,
                        })),
                    });
                }

                return await tx.project.findUnique({
                    where: { id: project.id },
                    include: {
                        skills: {
                            include: {
                                skill: {
                                    include: {
                                        category: true,
                                    },
                                },
                            },
                        },
                        categories: true,
                    }
                });
            });

            if (!result) {
                throw new Error('Failed to create project');
            }

            const databaseProject = {
                ...result,
                skills: (result as PrismaProjectWithRelations).skills.map(ps => ({ 
                    skill: ps.skill 
                })),
                categories: (result as PrismaProjectWithRelations).categories.map(c => ({ 
                    category: c.category 
                })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllProjects');
            this.invalidateCache('getProjectById');

            return { success: true, data: databaseProject };
        } catch (err) {
            return this.failure(
                'Failed to create project',
                'PROJECT_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('PROJECT_CREATION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getProjectsByCategory(category: string): Promise<ServiceResult<DatabaseProject[]>> {
        const cacheKey = this.getCacheKey('getProjectsByCategory', { category });
        const cached = this.getFromCache<DatabaseProject[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const projects = await this.prisma.project.findMany({
                where: {
                    categories: {
                        some: {
                            category,
                        },
                    },
                },
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    categories: true,
                },
                orderBy: { startDate: 'desc' },
            });

            const result = projects.map(project => ({
                ...project,
                skills: (project as PrismaProjectWithRelations).skills.map(ps => ({ 
                    skill: ps.skill 
                })),
                categories: (project as PrismaProjectWithRelations).categories.map(c => ({ 
                    category: c.category 
                })),
            }));

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (error) {
            return this.failure(
                `Failed to fetch projects by category: ${category}`,
                'PROJECTS_BY_CATEGORY_FETCH_ERROR',
                500,
                error instanceof Error ? error : undefined
            );
        } finally {
            await this.disconnect();
        }
    }

    async getProjectsBySkill(skillId: string): Promise<ServiceResult<DatabaseProject[]>> {
        const cacheKey = this.getCacheKey('getProjectsBySkill', { skillId });
        const cached = this.getFromCache<DatabaseProject[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const projects = await this.prisma.project.findMany({
                where: {
                    skills: {
                        some: {
                            skillId,
                        },
                    },
                },
                include: {
                    skills: {
                        include: {
                            skill: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    categories: true,
                },
                orderBy: { startDate: 'desc' },
            });

            const result = projects.map(project => ({
                ...project,
                skills: (project as PrismaProjectWithRelations).skills.map(ps => ({ 
                    skill: ps.skill 
                })),
                categories: (project as PrismaProjectWithRelations).categories.map(c => ({ 
                    category: c.category 
                })),
            }));

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (error) {
            return this.failure(
                `Failed to fetch projects by skill: ${skillId}`,
                'PROJECTS_BY_SKILL_FETCH_ERROR',
                500,
                error instanceof Error ? error : undefined
            );
        } finally {
            await this.disconnect();
        }
    }

    async updateProject(id: string, projectData: Partial<DatabaseProject>, skillIds?: string[], categories?: string[]): Promise<ServiceResult<DatabaseProject>> {
        try {
            console.log('Updating project with data:', { id, projectData, skillIds, categories });
            
            const result = await this.prisma.$transaction(async (tx) => {
                // Update the project
                await tx.project.update({
                    where: { id },
                    data: {
                        name: projectData.name,
                        description: projectData.description,
                        type: projectData.type,
                        status: projectData.status,
                        featured: projectData.featured,
                        startDate: projectData.startDate,
                        endDate: projectData.endDate,
                        url: projectData.url,
                        urlText: projectData.urlText,
                        logoUrl: projectData.logoUrl,
                    }
                });

                // Update skills if provided
                if (skillIds !== undefined) {
                    // Delete existing skills
                    await tx.projectSkills.deleteMany({
                        where: { projectId: id }
                    });
                    
                    // Create new skills
                    if (skillIds.length > 0) {
                        await tx.projectSkills.createMany({
                            data: skillIds.map(skillId => ({
                                projectId: id,
                                skillId,
                            })),
                        });
                    }
                }

                // Update categories if provided
                if (categories !== undefined) {
                    // Delete existing categories
                    await tx.projectCategories.deleteMany({
                        where: { projectId: id }
                    });
                    
                    // Create new categories
                    if (categories.length > 0) {
                        await tx.projectCategories.createMany({
                            data: categories.map(category => ({
                                projectId: id,
                                category,
                            })),
                        });
                    }
                }

                // Fetch the complete project with relations
                return await tx.project.findUnique({
                    where: { id },
                    include: {
                        skills: {
                            include: {
                                skill: {
                                    include: {
                                        category: true,
                                    },
                                },
                            },
                        },
                        categories: true,
                    }
                });
            });

            if (!result) {
                return this.failure('Project not found after update', 'PROJECT_NOT_FOUND', 404);
            }

            const databaseProject: DatabaseProject = {
                id: result.id,
                name: result.name,
                description: result.description,
                type: result.type,
                status: result.status,
                featured: result.featured,
                startDate: result.startDate,
                endDate: result.endDate,
                url: result.url,
                urlText: result.urlText,
                logoUrl: result.logoUrl,
                skills: (result as PrismaProjectWithRelations).skills.map(ps => ({ 
                    skill: ps.skill 
                })),
                categories: (result as PrismaProjectWithRelations).categories.map(c => ({ 
                    category: c.category 
                })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllProjects');
            this.invalidateCache('getProjectById');

            return { success: true, data: databaseProject };
        } catch (err) {
            console.error('Project update error:', err);
            return this.failure(
                `Failed to update project: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'PROJECT_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('PROJECT_UPDATE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async deleteProject(id: string): Promise<ServiceResult<boolean>> {
        try {
            console.log('Deleting project:', id);
            
            // Delete all skills associated with this project
            await this.prisma.projectSkills.deleteMany({
                where: { projectId: id }
            });

            // Delete all categories associated with this project
            await this.prisma.projectCategories.deleteMany({
                where: { projectId: id }
            });

            // Delete the project   
            await this.prisma.project.delete({
                where: { id }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllProjects');
            this.invalidateCache('getProjectById');

            await this.prisma.$disconnect()
            return { success: true, data: true };
        } catch (err) {
            console.error('Project deletion error:', err);
            return this.failure(
                `Failed to delete project: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'PROJECT_DELETION_ERROR',
                500,
                err instanceof Error ? err : new Error('PROJECT_DELETION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }
}
