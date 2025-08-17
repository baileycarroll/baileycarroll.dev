# Database Setup & Seeding

This directory contains the Prisma schema and seed file for the portfolio database.

## Schema

The database schema includes the following models:

- **Article** - Blog articles with tags and categories
- **Poem** - Poetry with tags and categories  
- **Project** - Portfolio projects with skills and categories
- **Skill** - Technical skills and competencies

## Seeding

The seed file (`seed.ts`) populates the database with:

### Skills (18 total)
- Laravel, Vue.js, TailwindCSS, MySQL, Redis
- Flutter, SQLite, Dart, Mobile UI/UX
- MDBootstrap, PHP
- Creative Writing, Project Management, Self-Publishing
- Next.js, React, TypeScript, Framer Motion

### Projects (5 total)
1. **Acolyte v5** - Featured Web Application (In Development)
2. **Corpus Vitae** - Featured Mobile Application (In Development)
3. **Acolyte v4** - Legacy Web Application (Completed)
4. **A Warrior's Journey** - Creative Publication (Published)
5. **Portfolio & Developer Portal** - Tools Web Application (Active)

## Commands

### Run Migration
```bash
pnpm prisma migrate dev --name <migration-name>
```

### Seed Database
```bash
pnpm db:seed
```

### Reset Database (Dangerous!)
```bash
pnpm prisma migrate reset
```

### View Database
```bash
pnpm prisma studio
```

## Adding New Data

To add new projects or skills:

1. **Skills**: Use the `skillService.createSkill()` method
2. **Projects**: Use the `projectService.createProject()` method
3. **Articles**: Use the `articleService.createArticle()` method
4. **Poems**: Use the `poemService.createPoem()` method

## Seed File Structure

The seed file creates data in the correct order:
1. Skills (required for project relationships)
2. Projects with their associated skills and categories

Each project includes:
- Basic info (name, description, type, status)
- Featured flag for homepage display
- Date ranges (start/end dates)
- URLs and link text
- Associated skills and categories
