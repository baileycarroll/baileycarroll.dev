import { PrismaClient } from '../generated/prisma/client';

async function disconnectAll() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Disconnecting all database connections...');
    await prisma.$disconnect();
    console.log('✅ Database connections disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting database:', error);
  }
}

disconnectAll();
