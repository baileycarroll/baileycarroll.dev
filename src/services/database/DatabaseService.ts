import { PrismaClient } from "../../../generated/prisma/client";
import { ServiceError, ServiceResult } from "../types";

// Cache Interfaces w/ Type Safety
interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

// Base Database Service Class
export abstract class DatabaseService {
    protected prisma: PrismaClient;
    protected cache: Map<string, CacheEntry<unknown>>;
    protected readonly DEFAULT_TTL = 30 * 1000; // 30 seconds (reduced for more responsive updates)
    protected readonly CACHE_CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
        this.cache = new Map();
        this.startCacheCleanup();
    }

    // DB Connection Management
    async connect(): Promise<ServiceResult<void>> {
        try {
            await this.prisma.$connect();
            this.log('connect', 'Database connection established');
            return { success: true, data: undefined };
        } catch (err) {
            return this.failure(
                'Failed to establish database connection',
                'DB_CONNECTION_ERROR',
                500,
                err instanceof Error ? err : new Error('DB_CONNECTION_ERROR')
            );
        }
    }

    async disconnect(): Promise<ServiceResult<void>> {
        try {
            await this.prisma.$disconnect();
            this.log('disconnect', 'Database connection closed.');
            return { success: true, data: undefined };
        } catch (err) {
            return this.failure(
                'Failed to close database connection',
                'DB_DISCONNECTION_ERROR',
                500,
                err instanceof Error ? err : new Error('DB_DISCONNECTION_ERROR')
            );
        }
    }

    // DB Health Check
    async healthCheck(): Promise<ServiceResult<boolean>> {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            return { success: true, data: true };
        } catch (err) {
            return this.failure(
                'Database health check failed',
                'DB_HEALTH_CHECK_ERROR',
                500,
                err instanceof Error ? err : new Error('DB_HEALTH_CHECK_ERROR')
            );
        }
    }

    // Cache Management Functions
    protected getCacheKey(operation: string, params: Record<string, unknown>): string {
        return `${operation}:${JSON.stringify(params)}`
    }

    protected getFromCache<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return null;
        }
        return entry.data as T;
    }

    protected setCache<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
        this.cache.set(key, {
            data: data as unknown,
            timestamp: Date.now(),
            ttl,
        });
    }

    protected invalidateCache(pattern: string): void {
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key)
            }
        }
    }

    private startCacheCleanup(): void {
        setInterval(() => {
            const now = Date.now();
            for (const [key, entry] of this.cache.entries()) {
                if (now - entry.timestamp > entry.ttl) {
                    this.cache.delete(key);
                }
            }
        }, this.CACHE_CLEANUP_INTERVAL);
    }

    // Utility methods
    protected log(method: string, message: string, data?: unknown): void {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[${this.constructor.name}.${method}] ${message}`, data || '');
        }
    }

    protected failure(
        message: string,
        code: string,
        statusCode: number = 500,
        originalError?: Error
    ): ServiceResult<never> {
        return {
            success: false,
            error: new ServiceError(message, code, statusCode, originalError)
        };
    }
}
