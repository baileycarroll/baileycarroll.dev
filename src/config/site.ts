export const SITE_CONFIG = {
    title: "Bailey Carroll",
    description: "Making My Mark - One Line of Code at a Time",
    url: "https://baileycarroll.com",
    analytics: {
        google: process.env.GOOGLE_ANALYTICS_ID,
        vercel: true
    },
    content: {
        articlesDirectory: "src/content/articles",
        poemsDirectory: "src/content/poems",
    }
} as const;