import Link from "next/link";
import Card from "@/components/cards/Card";
import { getSortedArticlesData } from "@/lib/articles";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { formatDate } from "@/lib/formatDate";

interface ArticleProps {
  article: {
    date: string;
    slug: string;
    title: string;
    description: string;
  };
}

function Article({ article }: ArticleProps) {
  return (
    <article className={"md:grid md:grid-cols-4 md:items-baseline"}>
      <div className="hidden md:block md:col-span-1">
        <time
          dateTime={formatDate(article.date)}
          className="relative order-first mb-3 flex items-center text-md text-slate-400"
        >
          <span
            className="absolute inset-y-0 left-0 flex items-center mt-2"
            aria-hidden={true}
          >
            {formatDate(article.date)}
            <span className="h-4 w-0.5 rounded-full" />
          </span>
        </time>
      </div>
      <div className="md:col-span-3">
        <Heading Level={6} className={"tracking-tight"}>
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </Heading>
        <time
          dateTime={formatDate(article.date)}
          className="relative z-10 order-first my-4 flex items-center text-md text-slate-400 pl-3.5 md:hidden"
        >
          <span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden={true}
          >
            {formatDate(article.date)}
            <span className="h-4 w-0.5 rounded-full" />
          </span>
        </time>
        <Paragraph className="relative z-10 mt-2 text-slate-100">
          {article.description}
        </Paragraph>
        <div
          className="relative z-10 mt-4 flex items-center text-sm font-medium text-cyan-500"
          aria-hidden={true}
        >
          <Link
            href={`/articles/${article.slug}`}
            className="font-semibold text-lg"
          >
            Read Article
          </Link>
          <ChevronRightIcon className={"ml-1 h-4 w-4 stroke-current"} />
        </div>
      </div>
    </article>
  );
}

export default async function ArticlesPage() {
  const articles = await getSortedArticlesData();

  return (
    <section className="p-5 mt-6">
      <Card>
        <div className="max-w-5xl">
          <Heading Level={3}>
            Writing on software development, gaming, and anything else that
            strikes my mind.
          </Heading>
          <Paragraph className="my-3">
            Over the years I’ve been told many a time, “You need to start a
            podcast,” “You need to do some content creation,” or other such
            comments. So after some thought on it, I figured it would be nice to
            write down my thoughts on those “Soap Boxes” and finally put them
            out there.
          </Paragraph>
        </div>
        <div className="my-4 border-t border-cyan-800/40 h-px" />
        <div className="">
          <div className="flex flex-col max-w-3xl space-y-12">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Article article={article} key={article.slug} />
              ))
            ) : (
              <h3 className={"text-xl font-semibold mx-auto w-full"}>
                Nothing here yet! Check Back Soon!
              </h3>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
