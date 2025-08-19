-- DropForeignKey
ALTER TABLE "public"."Skill" DROP CONSTRAINT "Skill_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Skill" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."SkillCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
