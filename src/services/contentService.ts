import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { SITE_CONFIG } from "@/config";
import { ServiceError, ServiceResult, PoemMetadata } from "./index";
import { ReactElement } from "react";

// Content Types
export interface Article {
    title: string;
    description: string;
    date: string;
    author: string;
    content: ReactElement; // ReactElement from MDX compilation
    slug: string;
};

export interface Poem {
    title: string;
    content: ReactElement;
    slug: string;
    status: string;
    excerpt: string;
    category: string;
    summary: string;
};

export class ContentService {
    private articlesDir: string = path.join(process.cwd(), SITE_CONFIG.content.articlesDirectory);
    private poemsDir: string = path.join(process.cwd(), SITE_CONFIG.content.poemsDirectory);

    // Get All Articles
    async getAllArticles(): Promise<ServiceResult<Article[]>> {
        try {
            const fileNames = fs.readdirSync(this.articlesDir);
            const articles = await Promise.all(
                fileNames.map(async (fileName) => {
                    const slug = fileName.replace(/\.mdx?$/, "");
                    const result = await this.getArticle(slug);
                    return result.success ? result.data : null;
                })
            );
            const validArticles = articles.filter(Boolean) as Article[];
            const sortedArticles = validArticles.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            return { success: true, data: sortedArticles}
        } catch (error) {
            return {
                success: false,
                error: new ServiceError(
                    'Failed to fetch articles',
                    'ARTICLES_FETCH_ERROR',
                    500,
                    error instanceof Error ? error : undefined
                )
            };
        }
    }
    // Get Article by Slug
    async getArticle(slug: string): Promise<ServiceResult<Article>> {
        // Add input validation
        if (!slug || typeof slug !== 'string') {
            return {
                success: false,
                error: new ServiceError(
                    'Invalid slug provided',
                    'INVALID_INPUT',
                    400
                )
            };
        }

        // Sanitize the slug
        const sanitizedSlug = slug.trim().toLowerCase();
        this.log('getArticle', `Fetching article: ${sanitizedSlug}`);

        try {
            const fullPath = path.join(this.articlesDir, `${sanitizedSlug}.mdx`);

            if (!fs.existsSync(fullPath)) {
                return {
                    success: false,
                    error: new ServiceError(
                        `Article not found: ${slug}`,
                        'ARTICLE_NOT_FOUND',
                        404,
                    )
                }
            }

            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            const { data, content } = matter(fileContent);
            
            // Validate required fields
            if (!data.title || !data.date) {
                return {
                    success: false,
                    error: new ServiceError(
                        `Invalid article metadata: ${slug}`,
                        'INVALID_ARTICLE_METADATA',
                        400
                    )
                };
            }

            const { content: compiledContent } = await compileMDX({source: content});
            const result = {
                title: data.title,
                description: data.description,
                date: data.date,
                author: data.author || 'Bailey Carroll',
                content: compiledContent,
                slug
            };
            this.log('getArticle', `Successfully fetched article: ${sanitizedSlug}`);
            return this.success(result);
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

    // Get All Poems
    async getAllPoems(): Promise<ServiceResult<Poem[]>> {
        try {
            const fileNames = fs.readdirSync(this.poemsDir);
            const poems = await Promise.all(
                fileNames.map(async (fileName) => {
                    const slug = fileName.replace(/\.mdx?$/, "");
                    const result = await this.getPoem(slug);
                    return result.success ? result.data : null;
                })
            );
            const validPoems = poems.filter(Boolean) as Poem[];
            return { success: true, data: validPoems};
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
    // Get Poem by Slug
    async getPoem(slug: string): Promise<ServiceResult<Poem>> {
        try {
            const fullPath = path.join(this.poemsDir, `${slug}.mdx`);

            if (!fs.existsSync(fullPath)) {
                return this.failure(
                    `Poem not found: ${slug}`,
                    'POEM_NOT_FOUND',
                    404
                );
            }

            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            
            // Try to parse as frontmatter first
            let data: PoemMetadata = {};
            let content = fileContent;
            
            try {
                const parsed = matter(fileContent);
                data = parsed.data as PoemMetadata;
                content = parsed.content;
            } catch {
                // If frontmatter parsing fails, treat entire file as content
                content = fileContent;
            }
            
            // Generate title from slug if not provided
            const title = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            
            // Validate that we have content
            if (!content.trim()) {
                return this.failure(
                    `Poem has no content: ${slug}`,
                    'EMPTY_POEM_CONTENT',
                    400
                );
            }

            const { content: compiledContent } = await compileMDX({source: content});

            return this.success({
                title,
                content: compiledContent,
                slug,
                summary: data.summary || 'No summary available',
                status: data.status || 'Draft',
                excerpt: data.excerpt || content.split('\n')[0] || '',
                category: data.category || 'Uncategorized',
            });
        } catch (error) {
            return this.failure(
                `Failed to fetch poem: ${slug}`,
                'POEM_FETCH_ERROR',
                500,
                error instanceof Error ? error : undefined
            );
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