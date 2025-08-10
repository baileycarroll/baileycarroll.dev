import fs from "fs";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import Link from "next/link";

const POEMS_DIRECTORY = path.join(process.cwd(), "src/app/content/poems");

async function getPoems() {
  const fileNames = fs.readdirSync(POEMS_DIRECTORY);
  const poems = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(POEMS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      let title = fileName.replace(/\.mdx$/, "");
      const { content } = await compileMDX({ source: fileContents });
      title = title.replace(/-/g, " ");
      title = title.replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        title: title,
        content: content,
      };
    })
  );
  return poems;
}

export default async function Poetry() {
  const poems = await getPoems();
  return (
    <section id="Books" className="p-5 flex flex-row items-center mt-6">
      <Card className="w-full overflow-scroll">
        <Heading Level={4}>My Poetry</Heading>
        <Heading Level={6} className="my-4 text-md">
          Below you can find various poems I have written over time and have
          decided to post here for all to read and enjoy.
        </Heading>
        <hr className="my-2" />
        <div className="flex flex-row flex-wrap my-2 pt-2 w-full text-ellipsis overflow-hidden gap-4 justify-center h-full">
          {poems.map((poem) => (
            <div key={poem.title}>
              <Card className="p-2 rounded-lg w-prose flex flex-col">
                <Heading Level={6}>{poem.title}</Heading>
                <hr className="py-2 mt-2" />
                <pre className="line-clamp-8">{poem.content}</pre>
                <Link
                  href={`/poetry/${poem.title
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="self-end mt-auto font-semibold mix-blend-normal float-end text-cyan-400"
                >
                  Read More
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
