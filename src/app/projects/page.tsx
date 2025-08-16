import Heading from "@/components/typography/Headings";
import Card from "@/components/cards/Card";
import Link from "next/link";
import { FaDesktop, FaGlobe, FaGithub, FaBook, FaMobile } from "react-icons/fa";
import Image from "next/image";
import Corpus from "@/assets/CV.png";
import Acolyte from "@/assets/Acolyte Logo - Icon.png";
import RoseShield from "@/assets/rose_shield.svg";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";

const projects = [
  {
    name: "Acolyte v5",
    type: "Web Application",
    category: "Featured",
    description:
      "The newest version of Acolyte, a comprehensive Remote Engagement and Learning Management System. This version showcases significant growth in design and user experience over the past three years. Built with modern technologies and focused on enhanced user engagement in remote learning environments.",
    techStack: ["Laravel", "Vue.js", "TailwindCSS", "MySQL", "Redis"],
    status: "In Development",
    link: {
      href: "#",
      label: "Demo Coming Soon",
    },
    icon: FaDesktop,
    logo: Acolyte,
    featured: true,
  },
  {
    name: "Corpus Vitae",
    type: "Mobile Application",
    category: "Featured",
    description:
      "A comprehensive fitness, meal, and life-tracking mobile application built with Flutter. Features local SQLite storage with cloud MySQL synchronization, iOS-inspired UI design, and holistic habit tracking capabilities. Created to provide a better alternative to expensive subscription-based fitness apps.",
    techStack: ["Flutter", "SQLite", "MySQL", "Dart", "Mobile UI/UX"],
    status: "In Development",
    link: {
      href: "https://github.com/baileycarroll/CorpusVitae",
      label: "View on GitHub",
    },
    icon: FaMobile,
    logo: Corpus,
    featured: true,
  },
  {
    name: "Acolyte v4",
    type: "Web Application",
    category: "Legacy",
    description:
      "Version 4 of Acolyte, a Content Management System (CMS) that was actively used by a client to track 40+ users for over 3 years. While no longer in active development, it serves as a showcase of technical growth and learning over time.",
    techStack: ["Laravel", "MDBootstrap", "MySQL", "PHP"],
    status: "Completed",
    link: {
      href: "https://github.com/baileycarroll/Acolyte-v4",
      label: "View on GitHub",
    },
    icon: FaGithub,
    logo: Acolyte,
    featured: false,
  },
  {
    name: "A Warrior's Journey",
    type: "Publication",
    category: "Creative",
    description:
      "A self-published freestyle poetry book that demonstrates strong communication skills and creative expression. The project showcases project management abilities, from initial concept to publication, while highlighting resilience and creativity in tackling challenging subjects.",
    techStack: ["Creative Writing", "Project Management", "Self-Publishing"],
    status: "Published",
    link: {
      href: "https://www.barnesandnoble.com/w/a-warriors-journey-hunter-bailey/1146141656",
      label: "View on Barnes & Noble",
    },
    icon: FaBook,
    logo: RoseShield,
    featured: false,
  },
  {
    name: "Portfolio & Developer Portal",
    type: "Web Application",
    category: "Tools",
    description:
      "This website serves as both a portfolio and a comprehensive developer portal. It includes project tracking, tooling, and resource organization features that make it easier to manage and interact with various development resources and projects.",
    techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    status: "Active",
    link: {
      href: "https://github.com/baileycarroll/baileycarroll.dev",
      label: "View on GitHub",
    },
    icon: FaGithub,
    logo: RoseShield,
    featured: false,
  },
];

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
      <section className="py-16">
        <Heading Level={3} className="mb-8 text-center">Featured Projects</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.name} variant="elevated" interactive className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Image 
                    src={project.logo} 
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
                {project.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm text-neutral-400 font-medium">{project.category}</span>
                <Link href={project.link.href} target="_blank">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <project.icon className="w-4 h-4 mr-2" />
                    {project.link.label}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16">
        <Heading Level={3} className="mb-8 text-center">Other Projects</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <Card key={project.name} variant="default" interactive className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-3">
                <Image 
                  src={project.logo} 
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
                {project.techStack.slice(0, 3).map((tech) => (
                  <span 
                    key={tech}
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-xs border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-primary/60 text-xs px-2 py-1">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-neutral-400 font-medium">{project.category}</span>
                <Link href={project.link.href} target="_blank">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <project.icon className="w-3 h-3 mr-1" />
                    {project.link.label}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
