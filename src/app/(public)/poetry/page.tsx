import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaFeather, FaArrowRight, FaBook } from "react-icons/fa";
import { contentService } from "@/services";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';

export default async function Poetry() {
  const poemsResult = await contentService.getAllPoems();
  if (!poemsResult.success) {
    return (
      <div className="max-w-[1400px] mx-auto px-6">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">Poetry</Heading>
        </Card>
      </div>
    )
  }

  // Filter to only show published poems
  const publishedPoems = poemsResult.data.filter(poem => poem.status === "published");
  
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
        {publishedPoems.length > 0 ? (
          <>
            <Heading Level={3} className="mb-8 text-center">Poems</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPoems.map((poem) => (
                <Card key={poem.title} variant="default" interactive className="p-6 flex flex-col h-full hover:bg-neutral-900/40 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FaFeather className="w-5 h-5 text-primary" />
                      <Heading Level={5} className="text-primary group-hover:text-primary-light transition-colors duration-300">
                        {poem.title}
                      </Heading>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30">
                      <FaBook className="w-3 h-3" />
                      Published
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    {(() => {
                      // Combine tags and categories, extract their names
                      const allItems = [
                        ...(poem.tags || []).map((tag: any) => ({
                          name: typeof tag === 'string' ? tag : tag.tag,
                          type: 'tag'
                        })),
                        ...(poem.categories || []).map((category: any) => ({
                          name: typeof category === 'string' ? category : category.category,
                          type: 'category'
                        }))
                      ];
                      
                      // Shuffle and take up to 3 items
                      const shuffled = allItems.sort(() => Math.random() - 0.5).slice(0, 3);
                      
                      return (
                        <div className="flex flex-wrap gap-2">
                          {shuffled.map((item, index) => (
                            <span 
                              key={index} 
                              className={`px-3 py-1 rounded-full text-xs border ${
                                item.type === 'tag' 
                                  ? 'bg-primary/10 text-primary border-primary/20' 
                                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              }`}
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      );
                    })()}
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
          </>
        ) : (
          <Card variant="elevated" className="p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Heading Level={4} className="mb-4 text-primary">No poems yet!</Heading>
              <Paragraph className="mb-6 text-neutral-300">
                I'm working on some poetry that will be published soon. Check back later for personal expressions, 
                creative writing, and poetic reflections on life and experiences.
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
