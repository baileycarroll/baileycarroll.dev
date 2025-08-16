import fs from "fs";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaArrowLeft, FaFeather } from "react-icons/fa";

const POEMS_DIRECTORY = path.join(process.cwd(), "src/app/content/poems");

async function getPoem(slug: string) {
  const fullPath = path.join(POEMS_DIRECTORY, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  let title = slug.replace(/\.mdx$/, "");
  const { content } = await compileMDX({ source: fileContents });
  title = title.replace(/-/g, " ");
  title = title.replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: title,
    content: content,
  };
}

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(POEMS_DIRECTORY);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    return { slug };
  });
}

export default async function Poetry(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const poem = await getPoem(slug);
  
  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Back Navigation */}
      <section className="py-8">
        <Link href="/poetry">
          <Button variant="outline" className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
            <FaArrowLeft className="w-4 h-4" />
            Back to Poetry
          </Button>
        </Link>
      </section>

      {/* Poem Header */}
      <section className="py-8">
        <Card variant="elevated" className="p-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaFeather className="w-8 h-8 text-primary" />
              <Heading Level={2} className="text-primary">
                {poem.title}
              </Heading>
            </div>
          </div>
        </Card>
      </section>

      {/* Poem Content */}
      <section className="py-8">
        <Card variant="elevated" className="p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-neutral-200 leading-relaxed whitespace-pre-line text-lg font-serif">
              {poem.content}
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
