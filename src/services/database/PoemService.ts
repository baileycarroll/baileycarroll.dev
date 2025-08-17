import { DatabaseService } from "./DatabaseService";
import { ServiceResult } from "../types";
import { DatabasePoem, PrismaPoemWithRelations } from "./types";

export class PoemService extends DatabaseService {
    // Poem CRUD Operations
    async getAllPoems(): Promise<ServiceResult<DatabasePoem[]>> {
        const cacheKey = this.getCacheKey('getAllPoems', {});
        const cached = this.getFromCache<DatabasePoem[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const poems = await this.prisma.poem.findMany({
                include: {
                    tags: true,
                    categories: true,
                },
                orderBy: { title: 'asc' },
            });

            const result = poems.map(poem => ({
                ...poem,
                tags: (poem as PrismaPoemWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (poem as PrismaPoemWithRelations).categories.map(c => ({ category: c.category })),
            }));

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                'Failed to fetch poems',
                'POEMS_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('POEMS_FETCH_ERROR')
            );
        }
    }

    async getPoemBySlug(slug: string): Promise<ServiceResult<DatabasePoem>> {
        const cacheKey = this.getCacheKey('getPoemBySlug', { slug });
        const cached = this.getFromCache<DatabasePoem>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const poem = await this.prisma.poem.findUnique({
                where: { slug },
                include: {
                    tags: true,
                    categories: true,
                },
            });

            if (!poem) {
                return this.failure(
                    `Poem not found: ${slug}`,
                    'POEM_NOT_FOUND',
                    404,
                );
            }

            const result = {
                ...poem,
                tags: (poem as PrismaPoemWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (poem as PrismaPoemWithRelations).categories.map(c => ({ category: c.category })),
            };

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch poem: ${slug}`,
                'POEM_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('POEM_FETCH_ERROR')
            );
        }
    }

    async createPoem(poemData: Omit<DatabasePoem, 'id'>, tags: string[], categories: string[]): Promise<ServiceResult<DatabasePoem>> {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const poem = await tx.poem.create({
                    data: {
                        title: poemData.title,
                        status: poemData.status,
                        excerpt: poemData.excerpt,
                        summary: poemData.summary,
                        content: poemData.content,
                        slug: poemData.slug,
                    }
                });

                if (tags.length > 0) {
                    await tx.poemTags.createMany({
                        data: tags.map(tag => ({
                            poemId: poem.id,
                            tag,
                        })),
                    });
                }

                if (categories.length > 0) {
                    await tx.poemCategories.createMany({
                        data: categories.map(category => ({
                            poemId: poem.id,
                            category,
                        })),
                    });
                }

                return await tx.poem.findUnique({
                    where: { id: poem.id },
                    include: {
                        tags: true,
                        categories: true,
                    }
                });
            });

            if (!result) {
                throw new Error('Failed to create poem');
            }

            const databasePoem = {
                ...result,
                tags: (result as PrismaPoemWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (result as PrismaPoemWithRelations).categories.map(c => ({ category: c.category })),
            } as DatabasePoem;

            // Invalidate relevant caches
            this.invalidateCache('getAllPoems');
            this.invalidateCache('getPoemBySlug');

            return { success: true, data: databasePoem };
        } catch (err) {
            return this.failure(
                'Failed to create poem',
                'POEM_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('POEM_CREATION_ERROR')
            );
        }
    }

    async getPoemById(id: string): Promise<ServiceResult<DatabasePoem>> {
        const cacheKey = this.getCacheKey('getPoemById', { id });
        const cached = this.getFromCache<DatabasePoem>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const poem = await this.prisma.poem.findUnique({
                where: { id },
                include: {
                    tags: true,
                    categories: true,
                },
            });

            if (!poem) {
                return this.failure(
                    `Poem not found: ${id}`,
                    'POEM_NOT_FOUND',
                    404,
                );
            }

            const result = {
                ...poem,
                tags: (poem as PrismaPoemWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (poem as PrismaPoemWithRelations).categories.map(c => ({ category: c.category })),
            };

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch poem: ${id}`,
                'POEM_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('POEM_FETCH_ERROR')
            );
        }
    }

    async updatePoem(id: string, poemData: Partial<DatabasePoem>, tags?: string[], categories?: string[]): Promise<ServiceResult<DatabasePoem>> {
        try {
            console.log('Updating poem with data:', { id, poemData, tags, categories });
            
            const result = await this.prisma.$transaction(async (tx) => {
                // Update the poem
                const poem = await tx.poem.update({
                    where: { id },
                    data: {
                        title: poemData.title,
                        status: poemData.status,
                        excerpt: poemData.excerpt,
                        summary: poemData.summary,
                        content: poemData.content,
                        slug: poemData.slug,
                    }
                });

                // Update tags if provided
                if (tags !== undefined) {
                    // Delete existing tags
                    await tx.poemTags.deleteMany({
                        where: { poemId: id }
                    });
                    
                    // Create new tags
                    if (tags.length > 0) {
                        await tx.poemTags.createMany({
                            data: tags.map(tag => ({
                                poemId: id,
                                tag,
                            })),
                        });
                    }
                }

                // Update categories if provided
                if (categories !== undefined) {
                    // Delete existing categories
                    await tx.poemCategories.deleteMany({
                        where: { poemId: id }
                    });
                    
                    // Create new categories
                    if (categories.length > 0) {
                        await tx.poemCategories.createMany({
                            data: categories.map(category => ({
                                poemId: id,
                                category,
                            })),
                        });
                    }
                }

                // Fetch the complete poem with relations
                return await tx.poem.findUnique({
                    where: { id },
                    include: {
                        tags: true,
                        categories: true,
                    }
                });
            });

            const databasePoem = {
                ...result,
                tags: (result as PrismaPoemWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (result as PrismaPoemWithRelations).categories.map(c => ({ category: c.category })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllPoems');
            this.invalidateCache('getPoemBySlug');

            return { success: true, data: databasePoem };
        } catch (err) {
            console.error('Poem update error:', err);
            return this.failure(
                `Failed to update poem: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'POEM_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('POEM_UPDATE_ERROR')
            );
        }
    }

    async deletePoem(id: string): Promise<ServiceResult<boolean>> {
        try {
            console.log('Deleting poem:', id);
            
            await this.prisma.poem.delete({
                where: { id }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllPoems');
            this.invalidateCache('getPoemBySlug');

            return { success: true, data: true };
        } catch (err) {
            console.error('Poem deletion error:', err);
            return this.failure(
                `Failed to delete poem: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'POEM_DELETION_ERROR',
                500,
                err instanceof Error ? err : new Error('POEM_DELETION_ERROR')
            );
        }
    }
}
