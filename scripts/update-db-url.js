const fs = require('node:fs');
const path = require('node:path');

const envPath = path.join(__dirname, '..', '.env');

try {
  const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const databaseUrl = 'DATABASE_URL="file:./dev.db"';
  const updatedContent = /^DATABASE_URL=/m.test(envContent)
    ? envContent.replace(/^DATABASE_URL=.*$/m, databaseUrl)
    : `${envContent}${envContent && !envContent.endsWith('\n') ? '\n' : ''}${databaseUrl}\n`;

  fs.writeFileSync(envPath, updatedContent);
  console.log('Configured SQLite at prisma/dev.db.');
  console.log('Run pnpm db:migrate:deploy and pnpm db:seed to initialize it.');
} catch (error) {
  console.error('Error updating DATABASE_URL:', error.message);
  process.exitCode = 1;
}
