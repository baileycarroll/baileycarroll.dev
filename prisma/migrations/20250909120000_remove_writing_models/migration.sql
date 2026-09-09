-- DropForeignKey
ALTER TABLE "public"."ArticleTags" DROP CONSTRAINT IF EXISTS "ArticleTags_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ArticleCategories" DROP CONSTRAINT IF EXISTS "ArticleCategories_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PoemTags" DROP CONSTRAINT IF EXISTS "PoemTags_poemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PoemCategories" DROP CONSTRAINT IF EXISTS "PoemCategories_poemId_fkey";

-- DropTable
DROP TABLE IF EXISTS "public"."ArticleTags";

-- DropTable
DROP TABLE IF EXISTS "public"."ArticleCategories";

-- DropTable
DROP TABLE IF EXISTS "public"."Article";

-- DropTable
DROP TABLE IF EXISTS "public"."PoemTags";

-- DropTable
DROP TABLE IF EXISTS "public"."PoemCategories";

-- DropTable
DROP TABLE IF EXISTS "public"."Poem";
