// Database Interfaces Matching the Types from the Prisma Schema
export interface DatabaseArticle {
    id: string;
    title: string;
    description: string;
    date: string;
    author: string;
    content: string;
    slug: string;
    tags: { tag: string }[];
    categories: { category: string }[];
}

export interface DatabasePoem {
    id: string;
    title: string;
    status: string;
    excerpt: string;
    summary: string;
    content: string;
    slug: string;
    tags: { tag: string }[];
    categories: { category: string }[];
}

export interface DatabaseSkill {
    id: string;
    name: string;
    years: number;
    category: DatabaseSkillCategory;
}

export interface DatabaseSkillCategory {
    id: string;
    name: string;
    description: string | null;
    display: boolean;
}

export interface DatabaseProject {
    id: string;
    name: string;
    description: string;
    type: string;
    status: string;
    featured: boolean;
    startDate: string;
    endDate: string;
    url: string;
    urlText: string;
    logoUrl?: string;
    skills: { skill: DatabaseSkill }[];
    categories: { category: string }[];
}

// Internal types for Prisma query results (with full relation data)
export interface PrismaArticleWithRelations {
    id: string;
    title: string;
    description: string;
    date: string;
    author: string;
    content: string;
    slug: string;
    tags: { id: string; articleId: string; tag: string }[];
    categories: { id: string; articleId: string; category: string }[];
}

export interface PrismaPoemWithRelations {
    id: string;
    title: string;
    status: string;
    excerpt: string;
    summary: string;
    content: string;
    slug: string;
    tags: { id: string; poemId: string; tag: string }[];
    categories: { id: string; poemId: string; category: string }[];
}

export interface PrismaProjectWithRelations {
    id: string;
    name: string;
    description: string;
    type: string;
    status: string;
    featured: boolean;
    startDate: string;
    endDate: string;
    url: string;
    urlText: string;
    logoUrl?: string;
    skills: { id: string; projectId: string; skillId: string; skill: { id: string; name: string; years: number } }[];
    categories: { id: string; projectId: string; category: string }[];
}

export interface PrismaSkill {
    id: string;
    name: string;
    years: number;
    categoryId: string;
    category: {
        id: string;
        name: string;
        description: string | null;
        display: boolean;
    };
}
