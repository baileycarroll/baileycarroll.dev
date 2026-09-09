# Database Setup & Seeding

This directory contains the Prisma schema and seed file for the portfolio database.

## Schema

The database schema includes the following models:

- **Project** - Portfolio projects with skills and categories
- **Skill** - Technical skills and competencies
- **SkillCategory** - Groupings for skills displayed on the resume
- **Experience** - Work history with associated skills
- **User / Session / Account / Verification** - Auth models (used by the planned admin layer)

## Seeding

The seed file (`seed.ts`) populates the database with skill categories, skills, projects, and experience records used by the public site.

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

During development you can use Prisma Studio or the service layer:

1. **Skills**: `skillService.createSkill()`
2. **Projects**: `projectService.createProject()`
3. **Experience**: `experienceService.createExperience()`

Admin UI and Server Actions will wrap these services in a later phase.

## Seed File Structure

The seed file creates data in the correct order:

1. Skill categories
2. Skills
3. Projects with associated skills and categories
4. Experience with associated skills
