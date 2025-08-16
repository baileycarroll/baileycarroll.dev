export interface SiteConfig {
    title: string;
    description: string;
    url: string;
    analytics: {
        google: string;
        vercel: boolean;
    };
    content: {
        articlesDirectory: string;
        poemsDirectory: string;
    };
}