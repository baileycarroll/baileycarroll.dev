import Card from "@/components/cards/Card";
import { TimelineFull } from "@/components/timeline/Timeline";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import { skillService } from "@/services";

// Local Resume PDF
const ResumePdf = "/Bailey Carroll - Full Resume.pdf";



function SkillCard({ name, years }: { name: string; years: number }) {
  const getExperienceLevel = (years: number) => {
    if (years >= 5) return "Expert";
    if (years >= 3) return "Advanced";
    if (years >= 2) return "Intermediate";
    return "Beginner";
  };

  const getLevelColor = (years: number) => {
    if (years >= 5) return "text-emerald-400";
    if (years >= 3) return "text-blue-400";
    if (years >= 2) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-neutral-200 font-medium">{name}</span>
        <span className={`text-xs font-semibold ${getLevelColor(years)}`}>
          {getExperienceLevel(years)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-neutral-700 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
            style={{width: `${Math.min((years / 5) * 100, 100)}%`}}
          />
        </div>
        <span className="text-neutral-400 text-xs font-medium min-w-[3rem] text-right">
          {years}y
        </span>
      </div>
    </div>
  );
}

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';

export default async function Resume() {
  // Fetch skills from database
  const skillsResult = await skillService.getAllSkills();
  
  if (!skillsResult.success) {
    console.error('Failed to fetch skills:', skillsResult.error);
  }

  // Group skills by category (only display categories that are enabled)
  const groupedSkills = skillsResult.success 
    ? skillsResult.data
        .filter(skill => skill.category?.display)
        .reduce((acc, skill) => {
          const categoryName = skill.category?.name || 'Uncategorized';
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(skill);
          return acc;
        }, {} as Record<string, typeof skillsResult.data>)
    : {};

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
            <Card variant="default" className="p-6 flex flex-col h-full">
              <div className="flex-1">
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
              </div>
              <Link
                href="/Jake-Wagner-Redacted.pdf"
                target="_blank"
              >
                <Button size="sm" variant="outline">Read Full Letter</Button>
              </Link>
            </Card>

            <Card variant="default" className="p-6 flex flex-col h-full">
              <div className="flex-1">
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
              </div>
              <Link
                href="/Jaime-Eltit-Redacted.pdf"
                target="_blank"
              >
                <Button size="sm" variant="outline">Read Full Letter</Button>
              </Link>
            </Card>
          </div>
        </Card>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">Technical Skills</Heading>
          {Object.keys(groupedSkills).length > 0 ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(Object.keys(groupedSkills).length, 4)} gap-8`}>
              {Object.entries(groupedSkills).map(([categoryName, skills]) => (
                <div key={categoryName}>
                  <Heading Level={4} className="mb-6 text-primary">{categoryName}</Heading>
                  <div className="space-y-3">
                    {skills.map(skill => (
                      <SkillCard key={skill.id} name={skill.name} years={skill.years} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-neutral-400">
              <Paragraph>No skills available to display.</Paragraph>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
