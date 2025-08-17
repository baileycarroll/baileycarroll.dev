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
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                'Failed to fetch articles',
                'ARTICLES_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLES_FETCH_ERROR')
            );
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
            return { success: true, data: result };
        } catch (err) {
            return this.failure(
                `Failed to fetch article: ${slug}`,
                'ARTICLE_FETCH_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_FETCH_ERROR')
            );
        }
    }

    async createArticle(articleData: Omit<DatabaseArticle, 'id'>, tags: string[], categories: string[]): Promise<ServiceResult<DatabaseArticle>> {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                // Create the Article then the Tags and Categories
                const article = await tx.article.create({
                    data: {
                        title: articleData.title,
                        description: articleData.description,
                        date: articleData.date,
                        author: articleData.author,
                        content: articleData.content,
                        slug: articleData.slug,
                    }
                });

                if (tags.length > 0) {
                    await tx.articleTags.createMany({
                        data: tags.map(tag => ({
                            articleId: article.id,
                            tag,
                        })),
                    });
                }

                if (categories.length > 0) {
                    await tx.articleCategories.createMany({
                        data: categories.map(category => ({
                            articleId: article.id,
                            category,
                        })),
                    });
                }

                return await tx.article.findUnique({
                    where: { id: article.id },
                    include: {
                        tags: true,
                        categories: true,
                    }
                });
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
            return this.failure(
                'Failed to create article',
                'ARTICLE_CREATION_ERROR',
                500,
                err instanceof Error ? err : new Error('ARTICLE_CREATION_ERROR')
            );
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
        }
    }
}
