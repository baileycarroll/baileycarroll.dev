import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { ReactNode } from "react";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { TimelineHome } from "@/components/timeline/Timeline";
import SkillsMarquee from "@/components/marquee/SkillsMarquee";
import { projectService } from "@/services";
import type { DatabaseProject } from "@/services";

const ResumePdf = "/Bailey Carroll - Full Resume.pdf";

export const dynamic = "force-dynamic";

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
      {children}
    </span>
  );
}

function ProjectShowcase({
  project,
}: {
  project: DatabaseProject;
}) {
  return (
    <Card
      variant="elevated"
      interactive
      className="flex h-full flex-col justify-between overflow-hidden"
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
            <span>{project.type}</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            <span>{project.status}</span>
          </div>
          <Heading Level={3} className="max-w-2xl text-white">
            {project.name}
          </Heading>
          <Paragraph size="lg" className="max-w-2xl text-neutral-300">
            {project.description}
          </Paragraph>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.skills.slice(0, 4).map((skillItem) => (
            <span
              key={skillItem.skill.id}
              className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-sm text-primary"
            >
              {skillItem.skill.name}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="px-1 py-1 text-sm text-neutral-400">
              +{project.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-neutral-400">
          {project.categories[0]?.category || "Selected Work"}
        </span>
        {project.url && (
          <Link href={project.url} target="_blank">
            <Button size="default">Visit Project</Button>
          </Link>
        )}
      </div>
    </Card>
  );
}

function ProjectListItem({
  project,
}: {
  project: DatabaseProject;
}) {
  return (
    <Card variant="default" interactive className="flex h-full flex-col">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-400">
          <span>{project.type}</span>
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          <span>{project.status}</span>
        </div>
        <Heading Level={5} className="text-white">
          {project.name}
        </Heading>
        <Paragraph size="sm" className="text-neutral-300">
          {project.description}
        </Paragraph>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm text-neutral-400">
          {project.categories[0]?.category || "Project"}
        </span>
        {project.url && (
          <Link href={project.url} target="_blank" className="text-sm text-primary transition-colors hover:text-primary-light">
            Visit
          </Link>
        )}
      </div>
    </Card>
  );
}

export default async function Home() {
  const projectsResult = await projectService.getAllProjects();
  const featuredProjects = projectsResult.success
    ? projectsResult.data.filter((project) => project.featured).slice(0, 3)
    : [];

  const leadProject = featuredProjects[0];
  const supportingProjects = featuredProjects.slice(1);

  return (
    <div className="mx-auto max-w-[1400px] px-6">
      <section className="grid min-h-[72vh] items-center py-14 sm:py-18 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-16 lg:py-24">
        <div className="space-y-8">
          <SectionEyebrow>Platform engineering, identity, migrations</SectionEyebrow>
          <div className="space-y-5">
            <Heading Level={1} className="max-w-4xl">
              Bailey Carroll
            </Heading>
            <Paragraph size="lg" className="max-w-3xl text-primary">
              Platform & Software Engineer | Seattle, WA
            </Paragraph>
            <Paragraph size="lg" className="max-w-2xl text-neutral-300">
              I work where identity, infrastructure, and developer experience
              meet. Give me a messy migration or a brittle pipeline and I will
              turn it into a calm, repeatable path. Quiet platforms make loud
              results.
            </Paragraph>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/projects">
              <Button size="lg">View My Work</Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-14 lg:mt-0 lg:flex lg:justify-end">
          <Card
            variant="subtle"
            className="space-y-6 rounded-[28px] border-primary/14 bg-neutral-950/24 p-8 lg:w-full lg:max-w-[26rem]"
          >
            <div className="space-y-2">
              <Paragraph size="sm" className="uppercase tracking-wide text-neutral-400">
                Current focus
              </Paragraph>
              <Heading Level={5} className="text-white">
                Calm systems, durable migrations, cleaner developer paths
              </Heading>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <Paragraph size="sm" className="text-neutral-400">
                  Role
                </Paragraph>
                <Paragraph className="mt-2 text-neutral-100">
                  Senior Computer Specialist, Atlassian Platform Engineer
                </Paragraph>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <Paragraph size="sm" className="text-neutral-400">
                  Work
                </Paragraph>
                <Paragraph className="mt-2 text-neutral-100">
                  SSO recovery, stack modernization, infrastructure stability
                </Paragraph>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <Paragraph size="sm" className="text-neutral-400">
                  Approach
                </Paragraph>
                <Paragraph className="mt-2 text-neutral-100">
                  Clear systems, lower friction, strong operator empathy
                </Paragraph>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <SectionEyebrow>Selected work</SectionEyebrow>
            <Heading Level={3} className="max-w-2xl">
              Projects that made me sharper, calmer, and harder to surprise
            </Heading>
          </div>
          <Link href="/projects" className="text-sm font-medium text-primary transition-colors hover:text-primary-light">
            Explore all projects
          </Link>
        </div>

        {leadProject ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <ProjectShowcase project={leadProject} />
            <div className="grid gap-6">
              {supportingProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
              {supportingProjects.length === 0 && (
                <Card variant="subtle" className="flex h-full items-center justify-center rounded-[24px] border-dashed">
                  <Paragraph className="text-neutral-400">
                    More selected work is on the way.
                  </Paragraph>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <Card variant="subtle" className="rounded-[28px] p-10 text-center">
            <Paragraph className="mb-6 text-neutral-400">
              No featured projects available right now.
            </Paragraph>
            <Link href="/projects">
              <Button size="lg">View All Projects</Button>
            </Link>
          </Card>
        )}
      </section>

      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
        <div className="space-y-6">
          <SectionEyebrow>Experience</SectionEyebrow>
          <div className="space-y-3">
            <Heading Level={3}>A few stops along the way</Heading>
            <Paragraph size="lg" className="max-w-2xl text-neutral-300">
              The throughline has been the same: cleaner systems, steadier
              operations, and better experiences for the people depending on
              them.
            </Paragraph>
          </div>
          <TimelineHome />
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/resume">
              <Button variant="outline">View Full Resume</Button>
            </Link>
            <Link href={ResumePdf} target="_blank">
              <Button variant="outline">Download PDF</Button>
            </Link>
          </div>
        </div>

        <Card variant="elevated" className="rounded-[30px]">
          <div className="space-y-5">
            <SectionEyebrow>Technical range</SectionEyebrow>
            <div className="space-y-3">
              <Heading Level={4}>Built across product, platform, and systems work</Heading>
              <Paragraph className="max-w-2xl text-neutral-300">
                Full-stack development, mobile work, infrastructure
                modernization, and the sort of migration work that is only fun
                if you like puzzles.
              </Paragraph>
            </div>
            <SkillsMarquee />
          </div>
        </Card>
      </section>

      <section id="contact" className="py-12 sm:py-16">
        <div className="grid gap-8 border-t border-white/8 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
          <div className="space-y-3">
            <SectionEyebrow>Contact</SectionEyebrow>
            <Heading Level={3}>Let&apos;s build something clearer together</Heading>
            <Paragraph size="lg" className="max-w-2xl text-neutral-300">
              I&apos;m always interested in thoughtful teams, difficult systems,
              and conversations with people who care about getting the details
              right.
            </Paragraph>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="mailto:baileyrcarroll@gmail.com"
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-neutral-200 transition-colors hover:border-primary/22 hover:text-white"
            >
              <EnvelopeIcon className="mb-4 h-5 w-5 text-primary" />
              <Paragraph size="sm" className="text-neutral-400">
                Email
              </Paragraph>
              <Paragraph className="mt-2 text-neutral-100">
                baileyrcarroll@gmail.com
              </Paragraph>
            </Link>
            <Link
              href="https://www.linkedin.com/in/baileycarroll/"
              target="_blank"
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-neutral-200 transition-colors hover:border-primary/22 hover:text-white"
            >
              <FaLinkedin className="mb-4 h-5 w-5 text-primary" />
              <Paragraph size="sm" className="text-neutral-400">
                LinkedIn
              </Paragraph>
              <Paragraph className="mt-2 text-neutral-100">
                Connect professionally
              </Paragraph>
            </Link>
            <Link
              href="https://github.com/baileycarroll"
              target="_blank"
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-neutral-200 transition-colors hover:border-primary/22 hover:text-white sm:col-span-2"
            >
              <FaGithub className="mb-4 h-5 w-5 text-primary" />
              <Paragraph size="sm" className="text-neutral-400">
                GitHub
              </Paragraph>
              <Paragraph className="mt-2 text-neutral-100">
                Browse the public side of the work
              </Paragraph>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
