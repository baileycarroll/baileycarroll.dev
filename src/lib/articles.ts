import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "src/app/content/articles");

interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export const getSortedArticlesData = () => {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      slug: data.slug,
    } as ArticleMeta;
  });

  // Sort articles by date from newest to oldest
  return allArticlesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getArticleData = (slug: string) => {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    content,
  };
};
