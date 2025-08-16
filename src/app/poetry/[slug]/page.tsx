import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaArrowLeft, FaFeather } from "react-icons/fa";
import { contentService } from "@/services";

export default async function Poetry(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const poem = await contentService.getPoem(slug);
  
  if (!poem.success) {
    return (
      <div className="max-w-[1400px] mx-auto px-6">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">
            Poem Not Found
          </Heading>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Back Navigation */}
      <section className="py-8">
        <Link href="/poetry">
          <Button variant="outline" className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
            <FaArrowLeft className="w-4 h-4" />
            Back to Poetry
          </Button>
        </Link>
      </section>

      {/* Poem Content */}
      <section className="py-8">
        <Card variant="elevated" className="p-8">
          <div className="max-w-2xl mx-auto">
            {/* Poem Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaFeather className="w-6 h-6 text-primary" />
                <Heading Level={2} className="text-primary">
                  {poem.data.title}
                </Heading>
              </div>
            </div>
            
            {/* Poem Text */}
            <div className="text-neutral-200 leading-relaxed whitespace-pre-line text-xl font-serif text-center">
              {poem.data.content}
            </div>
          </div>
        </Card>
      </section>

      {/* Back to Poetry Footer */}
      <section className="py-8">
        <div className="text-center">
          <Link href="/poetry">
            <Button variant="outline" className="flex items-center gap-2 mx-auto hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
              <FaArrowLeft className="w-4 h-4" />
              Back to Poetry
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
