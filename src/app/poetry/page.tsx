import fs from "fs";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaFeather, FaArrowRight, FaBook, FaGlobe } from "react-icons/fa";

const POEMS_DIRECTORY = path.join(process.cwd(), "src/app/content/poems");

// Poem metadata with summaries and categories
const poemMetadata = {
  "a-nameless-muse": {
    category: "Love & Longing",
    summary: "A reflection on solitude, love, and the creative muse that visits in moments of darkness.",
    status: "Website Exclusive",
    excerpt: "When the sky darkens, the moon luminous and the stars bright, a muse creeps into my heart, telling me to bare my blade once more."
  },
  "no-longer-the-poet": {
    category: "Self-Discovery",
    summary: "A journey from seeking validation to finding inner peace and becoming the poem rather than just writing it.",
    status: "Published",
    excerpt: "Yet, you gaze up at the night sky, not in search of approval or home—but to see your reflection shining high, no longer the poet, but the poem."
  },
  "singing-me-home": {
    category: "Place & Belonging",
    summary: "The story of finding home in Seattle, where the land itself sings and calls the spirit to heal and belong.",
    status: "Website Exclusive",
    excerpt: "Have you ever heard the song of the land? Calling you home from distant places? Breaking chains binding you, its music freeing your spirit to fly away."
  }
};

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
      
      // Get metadata for this poem
      const poemKey = fileName.replace(/\.mdx$/, "") as keyof typeof poemMetadata;
      const metadata = poemMetadata[poemKey] || {
        category: "Poetry",
        summary: "A personal expression of thoughts and experiences.",
        status: "Website Exclusive",
        excerpt: "A poem from the heart."
      };
      
      return {
        title: title,
        content: content,
        slug: fileName.replace(/\.mdx$/, ""),
        ...metadata
      };
    })
  );
  return poems;
}

export default async function Poetry() {
  const poems = await getPoems();
  
  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">My Poetry</Heading>
          <Paragraph size="lg" className="mb-8 max-w-3xl mx-auto">
            Below you can find various poems I have written over time and have decided to post here 
            for all to read and enjoy. These are personal expressions of my thoughts, experiences, and creativity.
          </Paragraph>
        </Card>
      </section>

      {/* Poems Section */}
      <section className="py-16">
        <Heading Level={3} className="mb-8 text-center">Poems</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poems.map((poem) => (
            <Card key={poem.title} variant="default" interactive className="p-6 flex flex-col h-full hover:bg-neutral-900/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FaFeather className="w-5 h-5 text-primary" />
                  <Heading Level={5} className="text-primary group-hover:text-primary-light transition-colors duration-300">
                    {poem.title}
                  </Heading>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  poem.status === "Published" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}>
                  {poem.status === "Published" ? <FaBook className="w-3 h-3" /> : <FaGlobe className="w-3 h-3" />}
                  {poem.status}
                </span>
              </div>
              
              <div className="mb-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs border border-primary/20">
                  {poem.category}
                </span>
              </div>
              
              <Paragraph size="sm" className="text-neutral-300 mb-4 leading-relaxed">
                {poem.summary}
              </Paragraph>
              
              <div className="flex-1 mb-6">
                <div className="text-neutral-200 leading-relaxed whitespace-pre-line text-sm italic border-l-2 border-primary/30 pl-4">
                  "{poem.excerpt}"
                </div>
              </div>
              
              <div className="mt-auto">
                <Link href={`/poetry/${poem.slug}`}>
                  <Button size="sm" variant="outline" className="flex items-center gap-2 w-full group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300">
                    Read Full Poem
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
