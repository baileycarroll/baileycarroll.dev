export interface BaseService {}

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
};

export type ServiceResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: ServiceError;
};

// Database Types
export interface DatabaseArticle {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    slug: string;
    date: string;
    tags: string[];
    categories: string[];
}

export interface DatabasePoem {
    id: string;
    title: string;
    status: string;
    excerpt: string;
    summary: string;
    content: string;
    slug: string;
    tags: string[];
    categories: string[];
}

export interface DatabaseProject {
    id: string;
    name: string;
    description: string;
    type: string;
    status: string;
    featured: boolean;
    startDate: string;
    endDate?: string | null;
    url?: string | null;
    urlText?: string | null;
    logoUrl?: string | null;
    skills: Array<{
        skill: {
            id: string;
            name: string;
            years: number;
            category: {
                id: string;
                name: string;
            };
        };
    }>;
    categories: Array<{
        category: string;
    }>;
}

export interface DatabaseSkill {
    id: string;
    name: string;
    years: number;
    category: {
        id: string;
        name: string;
        description?: string | null;
        display: boolean;
    };
}

export interface DatabaseSkillCategory {
    id: string;
    name: string;
    description?: string | null;
    display: boolean;
}

export interface DatabaseExperience {
    id: string;
    title: string;
    employer: string;
    startDate: string;
    endDate?: string | null;
    details: string;
    link?: string | null;
    order: number;
    featured: boolean;
    skills: Array<{
        skill: {
            id: string;
            name: string;
            years: number;
        };
    }>;
}