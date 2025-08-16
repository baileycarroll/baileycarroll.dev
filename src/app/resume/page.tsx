import Card from "@/components/cards/Card";
import { TimelineFull } from "@/components/timeline/Timeline";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { ListNone } from "@/components/lists/UnorderedLists";
import Button from "@/components/buttons/Button";
import Link from "next/link";
export default function Resume() {
  return (
    <section id="resume" className="p-5 flex flex-col items-center mt-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-3 lg:col-span-2">
          <Heading Level={4}>Resume</Heading>
          <Heading
            Level={6}
            className="mt-2 text-primary text-md font-semibold"
          >
            With some fun style to it.
          </Heading>
          <TimelineFull />
        </Card>
        <Card className="col-span-3 lg:col-span-1">
          <Heading Level={4}>Testemonials</Heading>
          <Heading
            Level={6}
            className="mt-2 text-primary text-md font-semibold"
          >
            Letters of Reference
          </Heading>
          <ListNone className="mt-2 space-y-3">
            <li>
              <Card className="flex flex-col items-start">
                <Heading Level={6}>Jake Wagner</Heading>
                <Heading
                  Level={6}
                  className="text-primary text-base border-b border-primary/40 pb-2 mb-2"
                >
                  Internal Manufacturing Manager | Carbon Robotics
                </Heading>
                <Paragraph>
                  {`"`}I have always known Bailey to be of sound character,
                  being conscientious, creative,disciplined, persistent,
                  resilient in times of adversity, and has a great sense of
                  ambition. Over the Course of 2 years I have witnessed
                  tremendous growth in Bailey{`'`}s communication, leadership,
                  organization, teamwork, and problem solving.{`"`}
                </Paragraph>
                <Button className="mt-2 self-end">
                  <Link
                    href={
                      "https://drive.google.com/file/d/1gAIttlURtqPk83mODbgH9S-xvYvxPmi-/view?usp=sharing"
                    }
                    target="_blank"
                  >
                    Read Full Letter
                  </Link>
                </Button>
              </Card>
            </li>
            <li>
              <Card className="flex flex-col items-start">
                <Heading Level={6}>Jaime Eltit</Heading>
                <Heading
                  Level={6}
                  className="text-primary text-base border-b border-primary/40 pb-2 mb-2"
                >
                  VP Field Operations | Carbon Robotics
                </Heading>
                <Paragraph>
                  {`"`}As an employee, Bailey exceeded expectations by being one
                  of the first members of what is now a world class
                  organization. Bailey was, and continues to be a foundational
                  piece of our team. <br /> <br />
                  Bailey approaches his works in a conscientious and
                  professional manner, they also take extreme ownership in
                  projects they{`’`}re involved with as well the customer
                  experience they are responsible for delivering.{`"`}
                </Paragraph>
                <Button className="mt-2 self-end">
                  <Link
                    href={
                      "https://drive.google.com/file/d/14RjYC5o836EQqmxoY6Y8MraFQnBRO-Vw/view?usp=sharing"
                    }
                    target="_blank"
                  >
                    Read Full Letter
                  </Link>
                </Button>
              </Card>
            </li>
          </ListNone>
        </Card>
      </div>
    </section>
  );
}
