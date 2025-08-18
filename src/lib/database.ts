import { PrismaClient } from "../../generated/prisma/client";

// Prisma Client Singleton for centralized connection management
class PrismaClientSingleton {
    private static instance: PrismaClient | null = null;

    static getInstance(): PrismaClient {
        if (!PrismaClientSingleton.instance) {
            PrismaClientSingleton.instance = new PrismaClient({
                log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL
                    }
                }
            });
        }
        return PrismaClientSingleton.instance;
    }

    static async disconnect(): Promise<void> {
        if (PrismaClientSingleton.instance) {
            await PrismaClientSingleton.instance.$disconnect();
            PrismaClientSingleton.instance = null;
        }
    }
}

// Handle graceful shutdown for database connections
if (typeof window === 'undefined') { // Server-side only
  // Remove existing listeners to prevent duplicates
  process.removeAllListeners('beforeExit');
  process.removeAllListeners('SIGINT');
  process.removeAllListeners('SIGTERM');
  process.removeAllListeners('uncaughtException');
  process.removeAllListeners('unhandledRejection');

  // Handle process termination
  process.on('beforeExit', async () => {
    await PrismaClientSingleton.disconnect();
  });

  process.on('SIGINT', async () => {
    await PrismaClientSingleton.disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await PrismaClientSingleton.disconnect();
    process.exit(0);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    console.error('❌ Uncaught Exception:', error);
    await PrismaClientSingleton.disconnect();
    process.exit(1);
  });

  process.on('unhandledRejection', async (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    await PrismaClientSingleton.disconnect();
    process.exit(1);
  });
}

// Export the singleton instance and disconnect function
export const prisma = PrismaClientSingleton.getInstance();
export const disconnectDatabase = () => PrismaClientSingleton.disconnect();
