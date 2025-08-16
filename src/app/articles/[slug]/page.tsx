import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaArrowCircleLeft } from "react-icons/fa";
import { formatDate } from "@/lib/formatDate";
import * as React from "react";

const articlesDirectory = path.join(process.cwd(), "src/app/content/articles");

// Function to get the content of an article based on slug
async function getArticleData(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Serialize MDX content for server-side rendering
  const { content: compiledContent } = await compileMDX({ source: content });

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    compiledSource: compiledContent,
  };
}

// Define the dynamic paths (slugs) for your articles
export async function generateStaticParams() {
  const fileNames = fs.readdirSync(articlesDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    return { slug };
  });
}

// The dynamic article page component
export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const articleData = await getArticleData(slug);

  return (
    <Card className="max-w-7xl mx-auto mt-12">
      <Link href={"/articles"}>
        <Button className="mb-4 flex flex-row items-center gap-5 cursor-p">
          <FaArrowCircleLeft />
          Back to Articles
        </Button>
      </Link>
      <Heading Level={3}>{articleData.title}</Heading>
                  <Heading Level={5} className="text-primary">
        {articleData.description}
      </Heading>
      <Paragraph className="my-2">{formatDate(articleData.date)}</Paragraph>
                  <div className="my-2 border-t border-primary/20 h-px" />
              <div className="max-w-none prose prose-headings:text-slate-50 prose-p:text-slate-50 prose-lg prose-ul:text-slate-50 prose-li:text-slate-50 prose-a:text-primary">
        {articleData.compiledSource}
      </div>
    </Card>
  );
}
