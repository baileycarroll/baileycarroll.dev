import { ContentService } from "./contentService";
import {
    articleService,
    poemService,
} from "./database";

export interface PoemMetadata {
    title?: string;
    summary?: string;
    status?: string;
    excerpt?: string;
    category?: string;
}

export class ServiceError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500,
        public originalError?: Error
    ) {
        super(message);
        this.name = "ServiceError";
    }
}

export type ServiceResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: ServiceError;
}

// Create single instances with dependency injection
export const contentService = new ContentService(articleService, poemService);

// Export database services
export {
    articleService,
    poemService,
} from "./database";

// Re-export other services directly
export { experienceService, projectService, skillService, disconnectDatabase } from "./database";

// Export Types
export type { Article, Poem } from "./contentService";
export type { 
    DatabaseArticle,
    DatabaseExperience,
    DatabasePoem, 
    DatabaseSkill, 
    DatabaseProject 
} from "./database";
