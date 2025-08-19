// Next Components
import Link from "next/link";
// Icons
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedin } from "react-icons/fa";
// Custom Components
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { TimelineHome } from "@/components/timeline/Timeline";
import SkillsMarquee from "@/components/marquee/SkillsMarquee";
import { projectService } from "@/services";
// Local Resume PDF
const ResumePdf = "/Bailey Carroll - Full Resume.pdf";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured projects from database
  const projectsResult = await projectService.getAllProjects();
  const featuredProjects = projectsResult.success 
    ? projectsResult.data.filter(project => project.featured).slice(0, 3)
    : [];

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center space-y-8">
          {/* <div className="relative">
            {/* <Image
              src={Headshot}
              alt="Profile image of Bailey Carroll, a software developer based in Seattle."
              className="rounded-full ring-2 ring-primary/30 h-40 w-40 object-cover object-top mx-auto transition-all duration-300"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            /> 
          </div> */}
          <div className="space-y-4">
            <Heading Level={1} className="text-6xl sm:text-7xl">
              Bailey Carroll
            </Heading>
            <Heading Level={2} className="text-2xl sm:text-3xl text-primary">
              Platform & Software Engineer | Seattle, WA
            </Heading>
            <Paragraph size="lg" className="max-w-2xl mx-auto">
            I work at the seams where identity, infrastructure, and developer experience meet. Give me a messy migration or a brittle pipeline and I will turn it into a calm, repeatable path. Quiet platforms make loud results.            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button size="lg">View My Work</Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline">Get In Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">Professional Experience</Heading>
          <div className="mb-8">
            <TimelineHome />
          </div>
          <div className="text-center space-y-4">
            <Paragraph variant="muted" className="text-sm">
              View my complete professional history and detailed experience
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Link href="/resume" className="flex-1 max-w-xs">
                <Button className="w-full">View Full Resume</Button>
              </Link>
              <Link href={ResumePdf} target="_blank" className="flex-1 max-w-xs">
                <Button className="w-full" variant="outline">Download PDF</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <Heading Level={3} className="mb-8 text-center">Featured Projects</Heading>
        {featuredProjects.length > 0 ? (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-${featuredProjects.length} gap-8`}>
              {featuredProjects.map((project) => (
                <Card key={project.id} variant="elevated" interactive className="p-8">
                  <Heading Level={4} className="mb-4">{project.name}</Heading>
                  <Paragraph size="base" className="mb-6">
                    {project.description}
                  </Paragraph>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skillItem) => (
                      <span key={skillItem.skill.id} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {skillItem.skill.name}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <Link href={project.url} target="_blank">
                      <Button size="sm" variant="outline">View Project</Button>
                    </Link>
                  )}
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/projects">
                <Button size="lg">Explore All Projects</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <Paragraph className="mb-6 text-neutral-400">No featured projects available.</Paragraph>
            <Link href="/projects">
              <Button size="lg">View All Projects</Button>
            </Link>
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-6 text-center">Technical Skills</Heading>
          <Paragraph variant="muted" className="mb-8 text-center max-w-2xl mx-auto">
            Full-stack developer with expertise in modern web technologies, 
            mobile development, and system architecture.
          </Paragraph>
          <SkillsMarquee />
        </Card>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-6 text-center">Let's Connect</Heading>
          <Paragraph variant="muted" className="mb-8 text-center max-w-2xl mx-auto">
            I'm always interested in new opportunities, collaborations, or just 
            connecting with fellow developers. Feel free to reach out!
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="mailto:baileyrcarroll@gmail.com"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-4 rounded-lg hover:bg-primary/5"
            >
              <EnvelopeIcon className="w-6 h-6" />
              <span className="text-lg">baileyrcarroll@gmail.com</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/baileycarroll/"
              target="_blank"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-4 rounded-lg hover:bg-primary/5"
            >
              <FaLinkedin className="w-6 h-6" />
              <span className="text-lg">Connect on LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/baileycarroll"
              target="_blank"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-4 rounded-lg hover:bg-primary/5"
            >
              <FaGithub className="w-6 h-6" />
              <span className="text-lg">View on GitHub</span>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
