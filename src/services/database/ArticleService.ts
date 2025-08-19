import { DatabaseService } from "./DatabaseService";
import { ServiceResult } from "../types";
import { DatabaseArticle, PrismaArticleWithRelations } from "./types";

export class ArticleService extends DatabaseService {
    // Article CRUD Operations
    async getAllArticles(): Promise<ServiceResult<DatabaseArticle[]>> {
        const cacheKey = this.getCacheKey('getAllArticles', {});
        const cached = this.getFromCache<DatabaseArticle[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const articles = await this.prisma.article.findMany({
                include: {
                    tags: true,
                    categories: true,
                },
                orderBy: { date: 'desc' },
            });

            const result = articles.map(article => ({
                ...article,
                tags: (article as PrismaArticleWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (article as PrismaArticleWithRelations).categories.map(c => ({ category: c.category }))
            }));

            this.setCache(cacheKey, result);
            await this.disconnect();
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                'Failed to fetch articles',
                'ARTICLES_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLES_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getArticleBySlug(slug: string): Promise<ServiceResult<DatabaseArticle>> {
        const cacheKey = this.getCacheKey('getArticleBySlug', { slug });
        const cached = this.getFromCache<DatabaseArticle>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const article = await this.prisma.article.findUnique({
                where: { slug },
                include: {
                    tags: true,
                    categories: true,
                },
            });

            if (!article) {
                return this.failure(
                    `Article not found: ${slug}`,
                    'ARTICLE_NOT_FOUND',
                    404,
                );
            }

            const result = {
                ...article,
                tags: (article as PrismaArticleWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (article as PrismaArticleWithRelations).categories.map(c => ({ category: c.category })),
            };

            this.setCache(cacheKey, result);
            await this.disconnect();
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch article: ${slug}`,
                'ARTICLE_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getArticleById(id: string): Promise<ServiceResult<DatabaseArticle>> {
        const cacheKey = this.getCacheKey('getArticleById', { id });
        const cached = this.getFromCache<DatabaseArticle>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const article = await this.prisma.article.findUnique({
                where: { id },
                include: {
                    tags: true,
                    categories: true,
                },
            });

            if (!article) {
                return this.failure(
                    `Article not found: ${id}`,
                    'ARTICLE_NOT_FOUND',
                    404,
                );
            }

            const result = {
                ...article,
                tags: (article as PrismaArticleWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (article as PrismaArticleWithRelations).categories.map(c => ({ category: c.category })),
            };

            this.setCache(cacheKey, result);
            await this.disconnect();
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch article: ${id}`,
                'ARTICLE_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_FETCH_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async createArticle(articleData: Omit<DatabaseArticle, 'id'>, tags: string[], categories: string[]): Promise<ServiceResult<DatabaseArticle>> {
        try {
            console.log('Creating article with data:', { articleData, tags, categories });
            
            // Create the Article first
            const article = await this.prisma.article.create({
                data: {
                    title: articleData.title,
                    description: articleData.description,
                    date: new Date(articleData.date),
                    author: articleData.author,
                    content: articleData.content,
                    slug: articleData.slug,
                }
            });

            console.log('Article created:', article);

            // Create tags if any
            if (tags.length > 0) {
                await this.prisma.articleTags.createMany({
                    data: tags.map(tag => ({
                        articleId: article.id,
                        tag,
                    })),
                });
                console.log('Tags created for article:', tags);
            }

            // Create categories if any
            if (categories.length > 0) {
                await this.prisma.articleCategories.createMany({
                    data: categories.map(category => ({
                        articleId: article.id,
                        category,
                    })),
                });
                console.log('Categories created for article:', categories);
            }

            // Fetch the complete article with relations
            const result = await this.prisma.article.findUnique({
                where: { id: article.id },
                include: {
                    tags: true,
                    categories: true,
                }
            });

            if (!result) {
                throw new Error('Failed to create article');
            }

            const databaseArticle = {
                ...result,
                tags: (result as PrismaArticleWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (result as PrismaArticleWithRelations).categories.map(c => ({ category: c.category })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllArticles');
            this.invalidateCache('getArticleBySlug');

            return { success: true, data: databaseArticle };
        } catch (err) {
            console.error('Article creation error:', err);
            return this.failure(
                `Failed to create article: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'ARTICLE_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_CREATION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async updateArticle(id: string, articleData: Partial<DatabaseArticle>): Promise<ServiceResult<DatabaseArticle>> {
        try {
            console.log('Updating article with data:', { id, articleData });
            
            const result = await this.prisma.article.update({
                where: { id },
                data: {
                    ...(articleData.title && { title: articleData.title }),
                    ...(articleData.description && { description: articleData.description }),
                    ...(articleData.content && { content: articleData.content }),
                    ...(articleData.author && { author: articleData.author }),
                    ...(articleData.slug && { slug: articleData.slug }),
                    ...(articleData.date && { date: new Date(articleData.date) }),
                },
                include: {
                    tags: true,
                    categories: true,
                }
            });

            const databaseArticle = {
                ...result,
                tags: (result as PrismaArticleWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (result as PrismaArticleWithRelations).categories.map(c => ({ category: c.category })),
            };

            // Invalidate relevant caches
            this.invalidateCache('getAllArticles');
            this.invalidateCache('getArticleBySlug');

            return { success: true, data: databaseArticle };
        } catch (err) {
            console.error('Article update error:', err);
            return this.failure(
                `Failed to update article: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'ARTICLE_UPDATE_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_UPDATE_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async deleteArticle(id: string): Promise<ServiceResult<boolean>> {
        try {
            console.log('Deleting article:', id);
            
            await this.prisma.article.delete({
                where: { id }
            });

            // Invalidate relevant caches
            this.invalidateCache('getAllArticles');
            this.invalidateCache('getArticleBySlug');

            return { success: true, data: true };
        } catch (err) {
            console.error('Article deletion error:', err);
            return this.failure(
                `Failed to delete article: ${err instanceof Error ? err.message : 'Unknown error'}`,
                'ARTICLE_DELETION_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_DELETION_ERROR')
            );
        } finally {
            await this.disconnect();
        }
    }

    async getArticlesByCategory(category: string): Promise<ServiceResult<DatabaseArticle[]>> {
        const cacheKey = this.getCacheKey('getArticlesByCategory', { category });
        const cached = this.getFromCache<DatabaseArticle[]>(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }

        try {
            const articles = await this.prisma.article.findMany({
                where: {
                    categories: {
                        some: {
                            category,
                        },
                    },
                },
                include: {
                    tags: true,
                    categories: true,
                },
                orderBy: { date: 'desc' },
            });

            const result = articles.map(article => ({
                ...article,
                tags: (article as PrismaArticleWithRelations).tags.map(t => ({ tag: t.tag })),
                categories: (article as PrismaArticleWithRelations).categories.map(c => ({ category: c.category })),
            }));

            this.setCache(cacheKey, result);
            return { success: true, data: result };
        } catch (error) {
            return this.failure(
                `Failed to fetch articles by category: ${category}`,
                'ARTICLES_BY_CATEGORY_FETCH_ERROR',
                500,
                error instanceof Error ? error : undefined
            );
        } finally {
            await this.disconnect();
        }
    }
}
