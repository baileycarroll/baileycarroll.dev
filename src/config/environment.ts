export const ENV_CONFIG = {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    
    analytics: {
        enabled: process.env.NODE_ENV === "production",
        google: process.env.GOOGLE_ANALYTICS_ID,
    }
} as const;