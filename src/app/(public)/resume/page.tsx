import Card from "@/components/cards/Card";
import { TimelineFull } from "@/components/timeline/Timeline";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import type { ReactNode } from "react";
import { skillService } from "@/services";

const ResumePdf = "/Bailey Carroll - Full Resume.pdf";

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
      {children}
    </span>
  );
}

function SkillCard({ name, years }: { name: string; years: number }) {
  const getExperienceLevel = (value: number) => {
    if (value >= 5) return "Expert";
    if (value >= 3) return "Advanced";
    if (value >= 2) return "Intermediate";
    return "Growing";
  };

  const getLevelColor = (value: number) => {
    if (value >= 5) return "text-primary";
    if (value >= 3) return "text-cyan-300";
    if (value >= 2) return "text-sky-300";
    return "text-neutral-400";
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="font-medium text-neutral-100">{name}</span>
        <span className={`text-xs font-medium uppercase tracking-wide ${getLevelColor(years)}`}>
          {getExperienceLevel(years)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-white/8">
          <div
            className="h-1.5 rounded-full bg-primary/80"
            style={{ width: `${Math.min((years / 5) * 100, 100)}%` }}
          />
        </div>
        <span className="min-w-[2.5rem] text-right text-xs font-medium text-neutral-400">
          {years}y
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  href,
}: {
  name: string;
  role: string;
  quote: string;
  href: string;
}) {
  return (
    <Card variant="subtle" className="flex h-full flex-col rounded-[26px]">
      <div className="flex-1 space-y-5">
        <div className="space-y-1">
          <Heading Level={5}>{name}</Heading>
          <Paragraph className="text-primary">{role}</Paragraph>
        </div>
        <Paragraph className="italic text-neutral-300">{quote}</Paragraph>
      </div>
      <div className="mt-6">
        <Link
          href={href}
          target="_blank"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
        >
          Read full letter
        </Link>
      </div>
    </Card>
  );
}

export const dynamic = "force-dynamic";

export default async function Resume() {
  const skillsResult = await skillService.getAllSkills();

  if (!skillsResult.success) {
    console.error("Failed to fetch skills:", skillsResult.error);
  }

  const groupedSkills = skillsResult.success
    ? skillsResult.data
        .filter((skill) => skill.category?.display)
        .reduce((acc, skill) => {
          const categoryName = skill.category?.name || "Uncategorized";
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(skill);
          return acc;
        }, {} as Record<string, typeof skillsResult.data>)
    : {};

  const skillColumns = Object.entries(groupedSkills);

  return (
    <div className="mx-auto max-w-[1400px] px-6">
      <section className="grid gap-10 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
        <div className="space-y-6">
          <SectionEyebrow>Resume</SectionEyebrow>
          <div className="space-y-4">
            <Heading Level={2}>A record of systems work, platform care, and steady technical ownership</Heading>
            <Paragraph size="lg" className="max-w-3xl text-neutral-300">
              My experience spans software development, infrastructure,
              migrations, and the sort of cross-functional problem solving that
              makes systems easier to trust.
            </Paragraph>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={ResumePdf} target="_blank">
              <Button size="lg">View PDF</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More About Me
              </Button>
            </Link>
          </div>
        </div>

        <Card variant="subtle" className="rounded-[28px]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <Paragraph size="sm" className="uppercase tracking-wide text-neutral-500">
                Focus
              </Paragraph>
              <Paragraph className="mt-2 text-neutral-100">
                Identity, reliability, migrations, developer experience
              </Paragraph>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <Paragraph size="sm" className="uppercase tracking-wide text-neutral-500">
                Pattern
              </Paragraph>
              <Paragraph className="mt-2 text-neutral-100">
                Reduce friction, clarify ownership, stabilize the path forward
              </Paragraph>
            </div>
          </div>
        </Card>
      </section>

      <section className="py-10 sm:py-14">
        <Card variant="elevated" className="rounded-[30px]">
          <div className="mb-8 flex flex-col gap-3">
            <SectionEyebrow>Experience timeline</SectionEyebrow>
            <Heading Level={3}>Professional experience</Heading>
          </div>
          <TimelineFull />
        </Card>
      </section>

      <section className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionEyebrow>Endorsements</SectionEyebrow>
            <Heading Level={4}>How colleagues describe the work</Heading>
          </div>
          <div className="grid gap-6">
            <TestimonialCard
              name="Jake Wagner"
              role="Internal Manufacturing Manager | Carbon Robotics"
              quote="I have always known Bailey to be of sound character, being conscientious, creative, disciplined, persistent, resilient in times of adversity, and has a great sense of ambition. Over the Course of 2 years I have witnessed tremendous growth in Bailey's communication, leadership, organization, teamwork, and problem solving."
              href="/Jake-Wagner-Redacted.pdf"
            />
            <TestimonialCard
              name="Jaime Eltit"
              role="VP Field Operations | Carbon Robotics"
              quote="As an employee, Bailey exceeded expectations by being one of the first members of what is now a world class organization. Bailey was, and continues to be a foundational piece of our team. Bailey approaches his work in a conscientious and professional manner, they also take extreme ownership in projects they're involved with as well the customer experience they are responsible for delivering."
              href="/Jaime-Eltit-Redacted.pdf"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <SectionEyebrow>Capabilities</SectionEyebrow>
            <Heading Level={4}>Technical skills</Heading>
          </div>
          {skillColumns.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {skillColumns.map(([categoryName, skills]) => (
                <Card key={categoryName} variant="default" className="rounded-[26px]">
                  <div className="space-y-4">
                    <Heading Level={5} className="text-primary">
                      {categoryName}
                    </Heading>
                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <SkillCard key={skill.id} name={skill.name} years={skill.years} />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="subtle" className="rounded-[26px]">
              <Paragraph className="text-neutral-400">
                No skills available to display.
              </Paragraph>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
