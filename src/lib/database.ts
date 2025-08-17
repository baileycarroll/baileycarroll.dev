import { disconnectDatabase } from "@/services";

// Handle graceful shutdown for database connections
if (typeof window === 'undefined') { // Server-side only
  // Handle process termination
  process.on('beforeExit', async () => {
    console.log('🔄 Disconnecting database before exit...');
    await disconnectDatabase();
  });

  process.on('SIGINT', async () => {
    console.log('🔄 Received SIGINT, disconnecting database...');
    await disconnectDatabase();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('🔄 Received SIGTERM, disconnecting database...');
    await disconnectDatabase();
    process.exit(0);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    console.error('❌ Uncaught Exception:', error);
    await disconnectDatabase();
    process.exit(1);
  });

  process.on('unhandledRejection', async (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    await disconnectDatabase();
    process.exit(1);
  });
}

export { disconnectDatabase };
