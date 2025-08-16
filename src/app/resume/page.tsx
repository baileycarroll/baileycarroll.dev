import Card from "@/components/cards/Card";
import { TimelineFull } from "@/components/timeline/Timeline";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";
import Link from "next/link";

// Resume Google Drive Link
const ResumeUrl = "https://drive.google.com/file/d/1JHdcZUil-WpfKiG0dedAUAr1fenhkP3Z/view?usp=sharing";

export default function Resume() {
  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">Professional Resume</Heading>
          <Paragraph size="lg" className="mb-8 max-w-2xl mx-auto">
            My complete professional experience, achievements, and the journey that has shaped my career in software development and system architecture.
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ResumeUrl} target="_blank">
              <Button size="lg">Download PDF</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">Learn More About Me</Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">Professional Experience</Heading>
          <TimelineFull />
        </Card>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">Testimonials</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="default" className="p-6">
              <Heading Level={4} className="mb-2">Jake Wagner</Heading>
              <Heading Level={5} className="text-primary mb-4">
                Internal Manufacturing Manager | Carbon Robotics
              </Heading>
              <Paragraph className="mb-6 italic">
                "I have always known Bailey to be of sound character, being conscientious, creative, 
                disciplined, persistent, resilient in times of adversity, and has a great sense of 
                ambition. Over the Course of 2 years I have witnessed tremendous growth in Bailey's 
                communication, leadership, organization, teamwork, and problem solving."
              </Paragraph>
              <Link
                href="https://drive.google.com/file/d/1gAIttlURtqPk83mODbgH9S-xvYvxPmi-/view?usp=sharing"
                target="_blank"
              >
                <Button size="sm" variant="outline">Read Full Letter</Button>
              </Link>
            </Card>

            <Card variant="default" className="p-6">
              <Heading Level={4} className="mb-2">Jaime Eltit</Heading>
              <Heading Level={5} className="text-primary mb-4">
                VP Field Operations | Carbon Robotics
              </Heading>
              <Paragraph className="mb-6 italic">
                "As an employee, Bailey exceeded expectations by being one of the first members of 
                what is now a world class organization. Bailey was, and continues to be a foundational 
                piece of our team. Bailey approaches his work in a conscientious and professional manner, 
                they also take extreme ownership in projects they're involved with as well the customer 
                experience they are responsible for delivering."
              </Paragraph>
              <Link
                href="https://drive.google.com/file/d/14RjYC5o836EQqmxoY6Y8MraFQnBRO-Vw/view?usp=sharing"
                target="_blank"
              >
                <Button size="sm" variant="outline">Read Full Letter</Button>
              </Link>
            </Card>
          </div>
        </Card>
      </section>
    </div>
  );
}
