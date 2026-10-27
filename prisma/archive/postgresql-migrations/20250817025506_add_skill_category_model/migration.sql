/*
  Warnings:

  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE "public"."SkillCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillCategory_name_key" ON "public"."SkillCategory"("name");

-- Insert default categories
INSERT INTO "public"."SkillCategory" ("id", "name", "description") VALUES
    (gen_random_uuid(), 'Frontend', 'Frontend development technologies'),
    (gen_random_uuid(), 'Backend', 'Backend development technologies'),
    (gen_random_uuid(), 'Mobile', 'Mobile development technologies'),
    (gen_random_uuid(), 'Tools & Other', 'Development tools and other skills');

-- Add categoryId column with temporary default
ALTER TABLE "public"."Skill" ADD COLUMN "categoryId" TEXT;

-- Update existing skills with appropriate category IDs
UPDATE "public"."Skill" SET "categoryId" = (SELECT "id" FROM "public"."SkillCategory" WHERE "name" = 'Frontend') WHERE "name" IN ('React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Vue.js', 'Framer Motion', 'MDBootstrap');
UPDATE "public"."Skill" SET "categoryId" = (SELECT "id" FROM "public"."SkillCategory" WHERE "name" = 'Backend') WHERE "name" IN ('Laravel', 'PHP', 'MySQL', 'Redis', 'SQLite');
UPDATE "public"."Skill" SET "categoryId" = (SELECT "id" FROM "public"."SkillCategory" WHERE "name" = 'Mobile') WHERE "name" IN ('Flutter', 'Dart', 'Mobile UI/UX');
UPDATE "public"."Skill" SET "categoryId" = (SELECT "id" FROM "public"."SkillCategory" WHERE "name" = 'Tools & Other') WHERE "name" IN ('Creative Writing', 'Project Management', 'Self-Publishing');

-- Make categoryId NOT NULL
ALTER TABLE "public"."Skill" ALTER COLUMN "categoryId" SET NOT NULL;

-- Drop the old category column
ALTER TABLE "public"."Skill" DROP COLUMN "category";

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."SkillCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
