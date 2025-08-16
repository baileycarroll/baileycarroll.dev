import { ContentService } from "./contentService";

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

// Create single instances
export const contentService = new ContentService();

// Export Types
export type { Article, Poem } from "./contentService";
