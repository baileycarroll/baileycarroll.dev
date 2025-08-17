import Link from "next/link";
import Card from "@/components/cards/Card";
import { ChevronRightIcon, CalendarIcon } from "@heroicons/react/24/solid";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";
import { formatDate } from "@/lib/formatDate";
import { Article, contentService } from "@/services";

function ArticleItem({ article }: { article: Article }) {
  return (
    <Card variant="default" interactive className="p-6 hover:bg-neutral-900/40 transition-all duration-300 group">
      <div className="space-y-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-neutral-400">
          <CalendarIcon className="w-4 h-4" />
          <time dateTime={formatDate(article.date)} className="text-sm font-medium">
            {formatDate(article.date)}
          </time>
        </div>
        
        {/* Title */}
        <Heading Level={4} className="text-primary group-hover:text-primary-light transition-colors duration-300">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary-light transition-colors duration-300">
            {article.title}
          </Link>
        </Heading>
        
        {/* Description */}
        <Paragraph className="text-neutral-200 leading-relaxed">
          {article.description}
        </Paragraph>
        
        {/* Read More Link */}
        <div className="flex items-center justify-between pt-2">
          <Link href={`/articles/${article.slug}`}>
            <Button size="sm" variant="outline" className="flex items-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300">
              Read Article
              <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default async function ArticlesPage() {
  const articlesResult = await contentService.getAllArticles();

  if (!articlesResult.success) {
    return (
      <div className="max-w-[1400px] mx-auto px-6">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">Articles & Thoughts</Heading>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">Articles & Thoughts</Heading>
          <Paragraph size="lg" className="mb-8 max-w-3xl mx-auto">
            Writing on software development, gaming, and anything else that strikes my mind. 
            Over the years I've been told many times to start content creation, so here are my thoughts 
            on various topics that I'm passionate about.
          </Paragraph>
        </Card>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        {articlesResult.data.length > 0 ? (
          <div className="space-y-8">
            {articlesResult.data.map((article) => (
              <ArticleItem article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <Card variant="elevated" className="p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Heading Level={4} className="mb-4 text-primary">Nothing here yet!</Heading>
              <Paragraph className="mb-6 text-neutral-300">
                I'm working on some articles that will be published soon. Check back later for insights on 
                software development, gaming, and other topics I'm passionate about.
              </Paragraph>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
