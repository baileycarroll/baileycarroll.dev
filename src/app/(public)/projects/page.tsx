import Image from "next/image";
import Link from "next/link";
import { FaBook, FaDesktop, FaGithub, FaMobile } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import { PageIntro, SectionEyebrow } from "@/components/public/PageIntro";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { projectService } from "@/services";
import type { DatabaseProject } from "@/services";
import Corpus from "@/assets/CV.png";
import Acolyte from "@/assets/Acolyte Logo - Icon.png";
import RoseShield from "@/assets/rose_shield.svg";

const getProjectIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "web application":
      return FaDesktop;
    case "mobile application":
      return FaMobile;
    case "publication":
      return FaBook;
    default:
      return FaGithub;
  }
};

const getProjectLogo = (name: string) => {
  if (name.toLowerCase().includes("acolyte")) {
    return Acolyte;
  }
  if (name.toLowerCase().includes("corpus")) {
    return Corpus;
  }
  return RoseShield;
};

export const dynamic = "force-dynamic";

function LeadProject({ project }: { project: DatabaseProject }) {
  const ProjectIcon = getProjectIcon(project.type);

  return (
    <Card
      variant="elevated"
      interactive
      className="flex h-full flex-col justify-between overflow-hidden rounded-[30px]"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-5">
          <Image
            src={getProjectLogo(project.name)}
            alt={`${project.name} logo`}
            className="h-16 w-16 rounded-2xl object-cover"
          />
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>{project.type}</span>
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              <span>{project.status}</span>
            </div>
            <Heading Level={3}>{project.name}</Heading>
          </div>
        </div>

        <Paragraph size="lg" className="max-w-2xl text-neutral-300">
          {project.description}
        </Paragraph>

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
            <span className="px-2 py-1 text-sm text-neutral-400">
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
            <Button className="gap-2">
              <ProjectIcon className="h-4 w-4" />
              {project.urlText || "Visit Project"}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}

function SupportingProject({ project }: { project: DatabaseProject }) {
  return (
    <Card variant="default" interactive className="flex h-full flex-col rounded-[26px]">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-400">
          <span>{project.type}</span>
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          <span>{project.status}</span>
        </div>
        <Heading Level={5}>{project.name}</Heading>
        <Paragraph size="sm" className="text-neutral-300">
          {project.description}
        </Paragraph>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm text-neutral-400">
          {project.categories[0]?.category || "Project"}
        </span>
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
          >
            Visit
          </Link>
        )}
      </div>
    </Card>
  );
}

function CompactProject({ project }: { project: DatabaseProject }) {
  const ProjectIcon = getProjectIcon(project.type);

  return (
    <Card variant="default" interactive className="flex h-full flex-col rounded-[24px]">
      <div className="mb-4 flex items-start gap-4">
        <Image
          src={getProjectLogo(project.name)}
          alt={`${project.name} logo`}
          className="h-12 w-12 rounded-xl object-cover"
        />
        <div className="space-y-2">
          <Heading Level={5} className="text-white">
            {project.name}
          </Heading>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span>{project.type}</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            <span>{project.status}</span>
          </div>
        </div>
      </div>

      <Paragraph size="sm" className="flex-1 text-neutral-300">
        {project.description}
      </Paragraph>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-neutral-400">
          {project.categories[0]?.category || "Project"}
        </span>
        {project.url && (
          <Link href={project.url} target="_blank">
            <Button size="sm" variant="outline" className="gap-2">
              <ProjectIcon className="h-3.5 w-3.5" />
              {project.urlText || "Visit"}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}

export default async function Projects() {
  const projectsResult = await projectService.getAllProjects();

  if (!projectsResult.success) {
    return (
      <div className="mx-auto max-w-[1400px] px-6">
        <PageIntro
          eyebrow="Projects"
          title="Work that grew out of curiosity and kept getting more serious"
        />
        <Card variant="subtle" className="rounded-[28px] p-10 text-center">
          <Paragraph className="text-neutral-400">
            Unable to load projects at the moment. Please try again later.
          </Paragraph>
        </Card>
      </div>
    );
  }

  const featuredProjects = projectsResult.data.filter((project) => project.featured);
  const otherProjects = projectsResult.data.filter((project) => !project.featured);
  const leadProject = featuredProjects[0];
  const supportingProjects = featuredProjects.slice(1);

  return (
    <div className="mx-auto max-w-[1400px] px-6">
      <PageIntro
        eyebrow="Projects"
        title="A body of work shaped by systems thinking, product instincts, and stubborn curiosity"
        description="Some projects were experiments, some became real tools, and some taught me the lessons I still use every day. Together they show the range of problems I like to solve."
      />

      {leadProject && (
        <section className="py-10 sm:py-14">
          <div className="mb-8 space-y-3">
            <SectionEyebrow>Featured work</SectionEyebrow>
            <Heading Level={3} className="max-w-2xl">
              The projects I want people to meet first
            </Heading>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
            <LeadProject project={leadProject} />
            <div className="grid gap-6">
              {supportingProjects.map((project) => (
                <SupportingProject key={project.id} project={project} />
              ))}
              {supportingProjects.length === 0 && (
                <Card
                  variant="subtle"
                  className="flex h-full items-center justify-center rounded-[24px] border-dashed"
                >
                  <Paragraph className="text-neutral-400">
                    More featured work is on the way.
                  </Paragraph>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section className="py-10 sm:py-14">
          <div className="mb-8 space-y-3">
            <SectionEyebrow>Broader archive</SectionEyebrow>
            <Heading Level={4}>Other projects and experiments</Heading>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((project) => (
              <CompactProject key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {projectsResult.data.length === 0 && (
        <section className="py-10 sm:py-14">
          <Card variant="subtle" className="rounded-[28px] p-12 text-center">
            <div className="mx-auto max-w-3xl">
              <Heading Level={4} className="mb-4 text-primary">
                No projects yet
              </Heading>
              <Paragraph className="mb-6 text-neutral-300">
                I&apos;m working on projects that will be showcased here soon.
                Check back later for web applications, mobile work, and other
                experiments.
              </Paragraph>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
