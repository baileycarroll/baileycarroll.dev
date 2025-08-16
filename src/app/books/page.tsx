import Card from "@/components/cards/Card";
import { ListNoneHorizontal } from "@/components/lists/UnorderedLists";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Link from "next/link";

export default function Books() {
  return (
    <section id="Books" className="p-6 flex flex-col items-center mt-6">
      <Card className="grid grid-cols-1 gap-y-16 xl:grid-cols-2 xl:grid-rows-[auto_1fr] xl:gap-y-4">
        <div className="flex flex-col lg:order-first lg:row-span-2">
          <Heading Level={3}>My Books</Heading>
          <Heading Level={6} className="my-4">
            The time has come, I now need a separate page to showcase the books
            I have published, and the ones I am working on.
          </Heading>
          <hr />
          <Heading Level={6} className="text-primary-light my-4">
            What do I Write About?
          </Heading>
          <Paragraph className="my-2">
            For as long as I can remember I have written short stories and
            poetry as an outlet. None of them held strong enough for me to
            desire to publish them except for a spare few. One thing I wanted
            above others was to leave my mark on the world in one way or
            another. So while I program and that is my passion, I can also be
            found writing poetry or short stories based in fantastical worlds.
          </Paragraph>
          <Paragraph className="my-2">
            My first book <em>A Warrior{"'"}s Journey</em> was published under
            my old legal name of Hunter Bailey and was my last act as that
            person before I took my current name. It is a re-telling of my story
            through freestyle poetry.
          </Paragraph>
          <Paragraph className="my-2">
            My second book <em>A Warrior{"'"}s Journey: A Requiem of Echoes</em>{" "}
            is the {'"'}definitive edition{'"'} of the first book, and is
            written through the lense of the person I am now, having done the
            healing and work to overcome and group from the events of the past.
            This version contains new poetry, the originals re-written, as well
            as my own personal thoughts on each poem and more. Additionally the
            original poems will be available in the back of the book for those
            who wish to read them.
          </Paragraph>
          <Paragraph className="my-2">
            In addition to working on <em>A Requiem of Echoes</em> I will be
            publishing some of the poems to this website, however they will not
            contain my personal thoughts, analysis, etc of them. You can find
            these poems in{" "}
            <Link href="/poetry" className="font-bold text-primary-light underline">
              Poetry
            </Link>
            .
          </Paragraph>
          <Paragraph className="mt-2">
            To nobodies surprise, I am also working on a fantasy novel. As I
            have more information to share I will provide updates.
          </Paragraph>
        </div>
        <div className="xl:pl-10">
          <Card>
            <Heading Level={6} className="my-4">
              A Warrior{"'"}s Journey
            </Heading>
            <Paragraph className="my-2">
              <strong>Published:</strong> August 9th, 2024
            </Paragraph>
            <ListNoneHorizontal className="my-2">
              <li>
                <Link
                  href={
                    "https://www.barnesandnoble.com/w/a-warriors-journey-hunter-bailey/1146141656%3Bjsessionid=F3C2747E76FFF63C84E6CBB211E48FE3.prodny_store02-atgap08?ean=9798218480882"
                  }
                  className="text-primary-light underline mr-4"
                >
                  Barnes & Nobel
                </Link>
              </li>
              <li>Amazon Coming Soon!</li>
            </ListNoneHorizontal>
          </Card>
          <Card className="mt-4">
            <Heading Level={6} className="my-4">
              A Warrior{"'"}s Journey: A Requiem of Echoes
            </Heading>
            <Paragraph className="my-2">
              <strong>Published:</strong> Coming Soon!
            </Paragraph>
          </Card>
        </div>
      </Card>
    </section>
  );
}
