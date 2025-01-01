import fs from "fs";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaArrowCircleLeft } from "react-icons/fa";

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
    <section id="Poem" className="p-5 flex flex-row items-center mt-6">
      <Card className="w-full min-h-[80dvh]">
        <Link href={"/poetry"}>
          <Button className="mb-4 flex flex-row items-center gap-5 cursor-pointer">
            <FaArrowCircleLeft />
            Back to Poetry
          </Button>
        </Link>
        <Heading Level={4}>{poem.title}</Heading>
        <hr className="my-2" />
        <pre>{poem.content}</pre>
      </Card>
    </section>
  );
}
