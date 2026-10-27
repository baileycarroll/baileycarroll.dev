/*
  Warnings:

  - Added the required column `category` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Skill" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Tools & Other';

-- Update existing skills with appropriate categories
UPDATE "public"."Skill" SET "category" = 'Frontend' WHERE "name" IN ('React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Vue.js', 'Framer Motion', 'MDBootstrap');
UPDATE "public"."Skill" SET "category" = 'Backend' WHERE "name" IN ('Laravel', 'PHP', 'MySQL', 'Redis', 'SQLite');
UPDATE "public"."Skill" SET "category" = 'Mobile' WHERE "name" IN ('Flutter', 'Dart', 'Mobile UI/UX');
UPDATE "public"."Skill" SET "category" = 'Tools & Other' WHERE "name" IN ('Creative Writing', 'Project Management', 'Self-Publishing');

-- Remove the default constraint after updating all records
ALTER TABLE "public"."Skill" ALTER COLUMN "category" DROP DEFAULT;
