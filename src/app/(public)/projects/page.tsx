import Heading from "@/components/typography/Headings";
import Card from "@/components/cards/Card";
import Link from "next/link";
import { FaDesktop, FaGithub, FaBook, FaMobile } from "react-icons/fa";
import Image from "next/image";
import Corpus from "@/assets/CV.png";
import Acolyte from "@/assets/Acolyte Logo - Icon.png";
import RoseShield from "@/assets/rose_shield.svg";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";
import { projectService } from "@/services";

// Icon mapping for project types
const getProjectIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'web application':
      return FaDesktop;
    case 'mobile application':
      return FaMobile;
    case 'publication':
      return FaBook;
    default:
      return FaGithub;
  }
};

// Logo mapping for projects
const getProjectLogo = (name: string) => {
  if (name.toLowerCase().includes('acolyte')) {
    return Acolyte;
  }
  if (name.toLowerCase().includes('corpus')) {
    return Corpus;
  }
  return RoseShield;
};

export default async function Projects() {
  const projectsResult = await projectService.getAllProjects();
  
  if (!projectsResult.success) {
    return (
      <div className="max-w-[1400px] mx-auto px-6">
        <section className="py-16">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">My Projects</Heading>
          <Paragraph className="text-neutral-300">
            Unable to load projects at the moment. Please try again later.
          </Paragraph>
        </Card>
        </section>
      </div>
    );
  }

  const featuredProjects = projectsResult.data.filter(project => project.featured);
  const otherProjects = projectsResult.data.filter(project => !project.featured);

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Hero Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8 text-center">
          <Heading Level={3} className="mb-6">My Projects</Heading>
          <Paragraph size="lg" className="mb-8 max-w-3xl mx-auto">
            A collection of projects that showcase my growth as a developer, from early experiments 
            to current work. Each project represents different challenges, technologies, and learning experiences.
          </Paragraph>
        </Card>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16">
          <Heading Level={3} className="mb-8 text-center">Featured Projects</Heading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => {
              const ProjectIcon = getProjectIcon(project.type);
              const projectLogo = getProjectLogo(project.name);
              
              return (
                <Card key={project.id} variant="elevated" interactive className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <Image 
                        src={projectLogo} 
                        alt={`${project.name} logo`} 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Heading Level={4} className="text-primary mb-1">{project.name}</Heading>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-neutral-400 text-sm">{project.type}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-400 text-sm">{project.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Paragraph className="mb-4 text-neutral-200 leading-relaxed flex-1">
                    {project.description}
                  </Paragraph>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.slice(0, 5).map((skillItem) => (
                      <span 
                        key={skillItem.skill.id}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
                      >
                        {skillItem.skill.name}
                      </span>
                    ))}
                    {project.skills.length > 5 && (
                      <span className="text-primary/60 text-sm px-3 py-1">
                        +{project.skills.length - 5} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-neutral-400 font-medium">
                      {project.categories[0]?.category || 'Uncategorized'}
                    </span>
                    {project.url && (
                      <Link href={project.url} target="_blank">
                        <Button size="sm" variant="outline" className="flex items-center">
                          <ProjectIcon className="w-4 h-4 mr-2" />
                          {project.urlText}
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-16">
          <Heading Level={3} className="mb-8 text-center">Other Projects</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => {
              const ProjectIcon = getProjectIcon(project.type);
              const projectLogo = getProjectLogo(project.name);
              
              return (
                <Card key={project.id} variant="default" interactive className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <Image 
                      src={projectLogo} 
                      alt={`${project.name} logo`} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <Heading Level={5} className="text-primary mb-1">{project.name}</Heading>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400 text-xs">{project.type}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-400 text-xs">{project.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Paragraph size="sm" className="mb-4 text-neutral-200 leading-relaxed flex-1">
                    {project.description}
                  </Paragraph>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.skills.slice(0, 3).map((skillItem) => (
                      <span 
                        key={skillItem.skill.id}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs border border-primary/20"
                      >
                        {skillItem.skill.name}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="text-primary/60 text-xs px-2 py-1">
                        +{project.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-neutral-400 font-medium">
                      {project.categories[0]?.category || 'Uncategorized'}
                    </span>
                    {project.url && (
                      <Link href={project.url} target="_blank">
                        <Button size="sm" variant="outline" className="flex items-center">
                          <ProjectIcon className="w-3 h-3 mr-1" />
                          {project.urlText}
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* No Projects State */}
      {projectsResult.data.length === 0 && (
        <section className="py-16">
          <Card variant="elevated" className="p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Heading Level={4} className="mb-4 text-primary">No projects yet!</Heading>
              <Paragraph className="mb-6 text-neutral-300">
                I'm working on some projects that will be showcased here soon. Check back later for 
                web applications, mobile apps, and other creative projects.
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
