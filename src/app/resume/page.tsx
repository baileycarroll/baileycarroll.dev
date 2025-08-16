import Card from "@/components/cards/Card";
import { TimelineFull } from "@/components/timeline/Timeline";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";
import Link from "next/link";

// Local Resume PDF
const ResumePdf = "/Bailey Carroll - Full Resume.pdf";

// Skills data
const skillsData = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "HTML/CSS", level: 95 }
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "PHP/Laravel", level: 70 },
    { name: "MySQL", level: 85 },
    { name: "PostgreSQL", level: 80 }
  ],
  mobile: [
    { name: "Flutter", level: 75 },
    { name: "React Native", level: 70 },
    { name: "Mobile UI/UX", level: 80 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 65 },
    { name: "Linux", level: 85 },
    { name: "CI/CD", level: 75 }
  ]
};

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <span className="text-neutral-300 text-sm font-medium">{name}</span>
      <div className="w-24 bg-neutral-800 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
          style={{width: `${level}%`}}
        />
      </div>
    </div>
  );
}

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
            <Link href={ResumePdf} target="_blank">
              <Button size="lg">View PDF</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">Learn More About Me</Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">Technical Skills</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Heading Level={4} className="mb-6 text-primary">Frontend</Heading>
              <div className="space-y-2">
                {skillsData.frontend.map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
            <div>
              <Heading Level={4} className="mb-6 text-primary">Backend</Heading>
              <div className="space-y-2">
                {skillsData.backend.map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
            <div>
              <Heading Level={4} className="mb-6 text-primary">Mobile</Heading>
              <div className="space-y-2">
                {skillsData.mobile.map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
            <div>
              <Heading Level={4} className="mb-6 text-primary">Tools & DevOps</Heading>
              <div className="space-y-2">
                {skillsData.tools.map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
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
