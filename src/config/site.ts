export const SITE_CONFIG = {
    title: "Bailey Carroll",
    description: "Platform and software engineer focused on identity, infrastructure, migrations, and developer experience.",
    url: "https://baileycarroll.com",
    analytics: {
        google: process.env.GOOGLE_ANALYTICS_ID,
        vercel: true
    }
} as const;
