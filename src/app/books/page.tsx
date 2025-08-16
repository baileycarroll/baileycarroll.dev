import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { FaBook, FaExternalLinkAlt, FaPen } from "react-icons/fa";

const books = [
  {
    title: "A Warrior's Journey",
    subtitle: "A retelling of my story through freestyle poetry",
    published: "August 9th, 2024",
    status: "Published",
    description: "My first book published under my old legal name of Hunter Bailey. It was my last act as that person before I took my current name. A deeply personal collection of freestyle poetry that tells my story.",
    links: [
      {
        href: "https://www.barnesandnoble.com/w/a-warriors-journey-hunter-bailey/1146141656",
        label: "Barnes & Noble",
        available: true
      },
      {
        href: "#",
        label: "Amazon",
        available: false
      }
    ]
  },
  {
    title: "A Warrior's Journey: A Requiem of Echoes",
    subtitle: "The definitive edition with new poetry and personal thoughts",
    published: "Coming Soon",
    status: "In Progress",
    description: "The definitive edition of the first book, written through the lens of the person I am now. This version contains new poetry, the originals re-written, as well as my own personal thoughts on each poem and more.",
    links: []
  }
];

export default function Books() {
  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">My Books</Heading>
          <Paragraph size="lg" className="mb-8 max-w-3xl mx-auto">
            The time has come, I now need a separate page to showcase the books I have published, 
            and the ones I am working on. Writing has always been my creative outlet alongside programming.
          </Paragraph>
        </Card>
      </section>

      {/* Writing Background */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FaPen className="w-6 h-6 text-primary" />
              <Heading Level={4} className="text-primary">What do I Write About?</Heading>
            </div>
            
            <div className="space-y-6 text-neutral-200 leading-relaxed">
              <Paragraph>
                For as long as I can remember I have written short stories and poetry as an outlet. 
                None of them held strong enough for me to desire to publish them except for a spare few. 
                One thing I wanted above others was to leave my mark on the world in one way or another. 
                So while I program and that is my passion, I can also be found writing poetry or short 
                stories based in fantastical worlds.
              </Paragraph>
              
              <Paragraph>
                My first book <em className="text-primary font-semibold">A Warrior's Journey</em> was published under 
                my old legal name of Hunter Bailey and was my last act as that person before I took my current name. 
                It is a re-telling of my story through freestyle poetry.
              </Paragraph>
              
              <Paragraph>
                My second book <em className="text-primary font-semibold">A Warrior's Journey: A Requiem of Echoes</em> is 
                the "definitive edition" of the first book, and is written through the lens of the person I am now, 
                having done the healing and work to overcome and grow from the events of the past. This version contains 
                new poetry, the originals re-written, as well as my own personal thoughts on each poem and more.
              </Paragraph>
              
              <Paragraph>
                In addition to working on <em className="text-primary font-semibold">A Requiem of Echoes</em> I will be 
                publishing some of the poems to this website, however they will not contain my personal thoughts, analysis, etc. 
                You can find these poems in{" "}
                <Link href="/poetry" className="text-primary hover:text-primary-light underline transition-colors duration-300">
                  Poetry
                </Link>.
              </Paragraph>
              
              <Paragraph>
                To nobody's surprise, I am also working on a fantasy novel. As I have more information to share I will provide updates.
              </Paragraph>
            </div>
          </div>
        </Card>
      </section>

      {/* Books Section */}
      <section className="py-16">
        <Heading Level={3} className="mb-8 text-center">Published Works</Heading>
        <div className="space-y-8">
          {books.map((book, index) => (
            <Card key={index} variant="default" className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <FaBook className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <Heading Level={4} className="text-primary mb-1">{book.title}</Heading>
                    <Paragraph className="text-neutral-300 mb-2">{book.subtitle}</Paragraph>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-neutral-400">
                        <strong>Published:</strong> {book.published}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        book.status === "Published" 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}>
                        {book.status}
                      </span>
                    </div>
                  </div>
                  
                  <Paragraph className="text-neutral-200 leading-relaxed">
                    {book.description}
                  </Paragraph>
                  
                  {book.links.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {book.links.map((link, linkIndex) => (
                        <Link key={linkIndex} href={link.href} target="_blank">
                          <Button 
                            size="sm" 
                            variant={link.available ? "outline" : "default"}
                            className={`flex items-center gap-2 ${!link.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!link.available}
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            {link.label}
                            {!link.available && " (Coming Soon)"}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
