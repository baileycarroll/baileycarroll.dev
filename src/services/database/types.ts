// Database Interfaces Matching the Types from the Prisma Schema
export interface DatabaseArticle {
    id: string;
    title: string;
    description: string;
    date: Date;
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
    category: DatabaseSkillCategory | null;
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
  endDate?: string | null;
  url?: string | null;
  urlText?: string | null;
  logoUrl?: string | null;
  skills: { skill: DatabaseSkill }[];
  categories: { category: string }[];
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
  skills: { skill: DatabaseSkill }[];
}

// Internal types for Prisma query results (with full relation data)
export interface PrismaArticleWithRelations {
    id: string;
    title: string;
    description: string;
    date: Date;
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
    endDate?: string | null;
    url?: string | null;
    urlText?: string | null;
    logoUrl?: string | null;
    skills: { id: string; projectId: string; skillId: string; skill: { id: string; name: string; years: number; category: { id: string; name: string; description: string | null; display: boolean } } }[];
    categories: { id: string; projectId: string; category: string }[];
}

export interface PrismaExperienceWithRelations {
    id: string;
    title: string;
    employer: string;
    startDate: string;
    endDate?: string | null;
    details: string;
    link?: string | null;
    order: number;
    skills: { id: string; experienceId: string; skillId: string; skill: { id: string; name: string; years: number; category: { id: string; name: string; description: string | null; display: boolean } } }[];
}

export interface PrismaSkill {
    id: string;
    name: string;
    years: number;
    categoryId: string | null;
    category: {
        id: string;
        name: string;
        description: string | null;
        display: boolean;
    };
}
