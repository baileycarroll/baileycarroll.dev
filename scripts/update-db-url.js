import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

try {
  // Read the current .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if DATABASE_URL already has connection pooling parameters
  if (envContent.includes('connection_limit=')) {
    console.log('✅ DATABASE_URL already has connection pooling parameters');
    process.exit(0);
  }
  
  // Update DATABASE_URL with connection pooling parameters
  const updatedContent = envContent.replace(
    /DATABASE_URL="([^"]+)"/,
    'DATABASE_URL="$1&connection_limit=5&pool_timeout=20"'
  );
  
  // Write the updated content back
  fs.writeFileSync(envPath, updatedContent);
  
  console.log('✅ Updated DATABASE_URL with connection pooling parameters:');
  console.log('   - connection_limit=5 (max 5 connections per client)');
  console.log('   - pool_timeout=20 (20 second timeout for connection pool)');
  console.log('');
  console.log('🔄 Please restart your development server and Prisma Studio for changes to take effect.');
  
} catch (error) {
  console.error('❌ Error updating DATABASE_URL:', error.message);
  process.exit(1);
}
