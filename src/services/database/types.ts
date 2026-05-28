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
