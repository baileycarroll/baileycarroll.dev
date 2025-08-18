import { compileMDX } from "next-mdx-remote/rsc";
import { ServiceError, ServiceResult} from "./index";
import { ReactElement } from "react";
import { ArticleService, PoemService } from "./database";

// Content Types
export interface Article {
    title: string;
    description: string;
    date: string;
    author: string;
    content: ReactElement; // ReactElement from MDX compilation
    slug: string;
    tags: string[];
    categories: string[];
};

export interface Poem {
    title: string;
    content: ReactElement;
    slug: string;
    status: string;
    excerpt: string;
    category: string;
    summary: string;
    tags: string[];
    categories: string[];
};

export class ContentService {
    private articleService: ArticleService;
    private poemService: PoemService;

    constructor(articleService: ArticleService, poemService: PoemService) {
        this.articleService = articleService;
        this.poemService = poemService;
    }

    // Get All Articles from Database
    async getAllArticles(): Promise<ServiceResult<Article[]>> {
        try {
            const result = await this.articleService.getAllArticles();
            if (!result.success) {
                return result;
            }
            const articles = await Promise.all(
                result.data.map(async (dbArticle) => {
                    const compiledResult = await this.compileMDXContent(dbArticle.content);
                    if(!compiledResult.success) {
                        this.logError('getAllArticles', compiledResult.error);
                        return null;
                    }
                    return {
                        title: dbArticle.title,
                        description: dbArticle.description,
                        date: dbArticle.date,
                        author: dbArticle.author,
                        content: compiledResult.data,
                        slug: dbArticle.slug,
                        tags: dbArticle.tags.map((t: { tag: string }) => t.tag),
                        categories: dbArticle.categories.map((c: { category: string }) => c.category),
                    }
                })
            );
            const validArticles = articles.filter(Boolean) as Article[];
            return { success: true, data: validArticles };
        } catch (err) {
            return {
                success: false,
                error: new ServiceError(
                    'Failed to fetch articles',
                    'ARTICLES_FETCH_ERROR',
                    500,
                    err instanceof Error ? err : new Error('ARTICLES_FETCH_ERROR')
                )
            }
        }
    }

    // Get Article by Slug from Database
    async getArticle(slug: string): Promise<ServiceResult<Article>> {
        if(!slug || typeof slug !== 'string') {
            return {
                success: false,
                error: new ServiceError (
                    'Invalid slug provided',
                    'INVALID_INPUT',
                    400
                )
            };
        }
        const sanitizedSlug = slug.trim().toLowerCase();
        this.log('getArticle', `Fetching article: ${sanitizedSlug}`);

        try {
            const result = await this.articleService.getArticleBySlug(sanitizedSlug);
            if(!result.success) {
                return result;
            }
            const compiledResult = await this.compileMDXContent(result.data.content);
            if(!compiledResult.success) {
                return compiledResult;
            }
            const article: Article = {
                title: result.data.title,
                description: result.data.description,
                date: result.data.date,
                author: result.data.author,
                content: compiledResult.data,
                slug: result.data.slug,
                tags: result.data.tags.map((t: { tag: string }) => t.tag),
                categories: result.data.categories.map((c: { category: string }) => c.category),
            };
            this.log('getArticle', `Successfull fetched article: ${sanitizedSlug}`);
            return {success: true, data: article};
        } catch (error) {
            this.logError('getArticle', error instanceof Error ? error : new Error(String(error)));
            return {
                success: false,
                error: new ServiceError(
                    `Failed to fetch article: ${slug}`,
                    'ARTICLE_FETCH_ERROR',
                    500,
                    error instanceof Error ? error : undefined
                )
            };
        }
    }
     // Get All Poems from Database
     async getAllPoems(): Promise<ServiceResult<Poem[]>> {
        try {
            const result = await this.poemService.getAllPoems();
            if (!result.success) {
                return result;
            }

            const poems = await Promise.all(
                result.data.map(async (dbPoem) => {
                    const compiledResult = await this.compileMDXContent(dbPoem.content);
                    if (!compiledResult.success) {
                        this.logError('getAllPoems', compiledResult.error);
                        return null;
                    }

                    return {
                        title: dbPoem.title,
                        content: compiledResult.data,
                        slug: dbPoem.slug,
                        summary: dbPoem.summary,
                        status: dbPoem.status,
                        excerpt: dbPoem.excerpt,
                        category: dbPoem.categories[0]?.category || 'Uncategorized',
                        tags: dbPoem.tags.map(t => t.tag),
                        categories: dbPoem.categories.map(c => c.category),
                    };
                })
            );

            const validPoems = poems.filter(Boolean) as Poem[];
            return { success: true, data: validPoems };
        } catch (error) {
            return {
                success: false,
                error: new ServiceError(
                    'Failed to fetch poems',
                    'POEMS_FETCH_ERROR',
                    500,
                    error instanceof Error ? error : undefined
                )
            };
        }
    }

    // Get Poem by Slug from Database
    async getPoem(slug: string): Promise<ServiceResult<Poem>> {
        try {
            const result = await this.poemService.getPoemBySlug(slug);
            if (!result.success) {
                return result;
            }

            const compiledResult = await this.compileMDXContent(result.data.content);
            if (!compiledResult.success) {
                return compiledResult;
            }

            const poem: Poem = {
                title: result.data.title,
                content: compiledResult.data,
                slug: result.data.slug,
                summary: result.data.summary,
                status: result.data.status,
                excerpt: result.data.excerpt,
                category: result.data.categories[0]?.category || 'Uncategorized',
                tags: result.data.tags.map(t => t.tag),
                categories: result.data.categories.map(c => c.category),
            };

            return { success: true, data: poem };
        } catch (error) {
            return {
                success: false,
                error: new ServiceError(
                    `Failed to fetch poem: ${slug}`,
                    'POEM_FETCH_ERROR',
                    500,
                    error instanceof Error ? error : undefined
                )
            };
        }
    }

    // Create Article in Database
    async createArticle(articleData: Omit<Article, 'content'>, mdxContent: string): Promise<ServiceResult<Article>> {
        try {
            const result = await this.articleService.createArticle(
                {
                    title: articleData.title,
                    description: articleData.description,
                    date: articleData.date,
                    author: articleData.author,
                    content: mdxContent, // Store raw MDX content
                    slug: articleData.slug,
                    tags: [],
                    categories: []
                },
                articleData.tags,
                articleData.categories
            );

            if (!result.success) {
                return result;
            }

            // Compile the MDX content for the response
            const compiledResult = await this.compileMDXContent(mdxContent);
            if (!compiledResult.success) {
                return compiledResult;
            }

            const article: Article = {
                ...articleData,
                content: compiledResult.data,
            };

            return { success: true, data: article };
        } catch (error) {
            return {
                success: false,
                error: new ServiceError(
                    'Failed to create article',
                    'ARTICLE_CREATE_ERROR',
                    500,
                    error instanceof Error ? error : undefined
                )
            };
        }
    }

    // Create Poem in Database
    async createPoem(poemData: Omit<Poem, 'content'>, mdxContent: string): Promise<ServiceResult<Poem>> {
        try {
            const result = await this.poemService.createPoem(
                {
                    title: poemData.title,
                    status: poemData.status,
                    excerpt: poemData.excerpt,
                    summary: poemData.summary,
                    content: mdxContent,
                    slug: poemData.slug,
                    tags: [],
                    categories: []
                },
                poemData.tags,
                poemData.categories
            );

            if (!result.success) {
                return result;
            }

            const compiledResult = await this.compileMDXContent(mdxContent);
            if (!compiledResult.success) {
                return compiledResult;
            }

            const poem: Poem = {
                ...poemData,
                content: compiledResult.data,
            };

            return { success: true, data: poem };
        } catch (error) {
            return {
                success: false,
                error: new ServiceError(
                    'Failed to create poem',
                    'POEM_CREATE_ERROR',
                    500,
                    error instanceof Error ? error : undefined
                )
            };
        }
    }

       // Helper method to compile MDX content
    private async compileMDXContent(content: string): Promise<ServiceResult<ReactElement>> {
    try {
        const { content: compiledContent } = await compileMDX({ source: content });
        return { success: true, data: compiledContent };
    } catch (error) {
        return {
            success: false,
            error: new ServiceError(
                'Failed to compile MDX content',
                'MDX_COMPILATION_ERROR',
                500,
                error instanceof Error ? error : undefined
            )
        };
    }
}

    private log(method: string, message: string, data?: unknown): void {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[ContentService.${method}] ${message}`, data || '');
        }
    }

    private logError(method: string, error: Error): void {
        if (process.env.NODE_ENV === 'development') {
            console.error(`[ContentService.${method}] Error:`, error);
        }
    }

    private success<T>(data: T): ServiceResult<T> {
        return { success: true, data };
    }

    private failure(
        message: string, 
        code: string, 
        statusCode: number = 500, 
        originalError?: Error
    ): ServiceResult<never> {
        return {
            success: false,
            error: new ServiceError(message, code, statusCode, originalError)
        };
    }
}