import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";
import { formatDate } from "@/lib/formatDate";
import { contentService } from "@/services";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';

// The dynamic article page component
export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const articleData = await contentService.getArticle(slug);

  if (!articleData.success) {
    return (
      <div className="max-w-[1400px] mx-auto px-6">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">
            Article Not Found
          </Heading>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Back Navigation */}
      <section className="py-8">
        <Link href="/articles">
          <Button variant="outline" className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
            <FaArrowLeft className="w-4 h-4" />
            Back to Articles
          </Button>
        </Link>
      </section>

      {/* Article Header */}
      <section className="py-8">
        <Card variant="elevated" className="p-8">
          <div className="max-w-4xl mx-auto">
            <Heading Level={2} className="mb-6 text-center">
              {articleData.data.title}
            </Heading>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-neutral-400">
              <div className="flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                <span className="text-sm font-medium">{articleData.data.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="w-4 h-4" />
                <time dateTime={formatDate(articleData.data.date)} className="text-sm font-medium">
                  {formatDate(articleData.data.date)}
                </time>
              </div>
            </div>
            
            <Paragraph size="lg" className="text-center text-neutral-300 leading-relaxed max-w-3xl mx-auto">
              {articleData.data.description}
            </Paragraph>
          </div>
        </Card>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <Card variant="elevated" className="p-8">
          <div className="max-w-4xl mx-auto prose prose-lg prose-invert prose-headings:text-white prose-h1:text-primary prose-h2:text-primary prose-h3:text-primary prose-h4:text-primary prose-p:text-neutral-200 prose-strong:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:text-neutral-300 prose-code:text-primary prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-primary/20">
            {articleData.data.content}
          </div>
        </Card>
      </section>

      {/* Back to Articles Footer */}
      <section className="py-8">
        <div className="text-center">
          <Link href="/articles">
            <Button variant="outline" className="flex items-center gap-2 mx-auto hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
              <FaArrowLeft className="w-4 h-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
