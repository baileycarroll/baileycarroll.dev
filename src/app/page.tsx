// Next Components
import Image from "next/image";
import Link from "next/link";
// Icons
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedin } from "react-icons/fa";
// Custom Components
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Headshot from "@/assets/Headshot.png";
import Paragraph from "@/components/typography/Paragraphs";
import { TimelineHome } from "@/components/timeline/Timeline";
import SkillsMarquee from "@/components/marquee/SkillsMarquee";
// Resume Google Drive Link -> Imported here to keep HTML Cleaner
const Resume =
  "https://drive.google.com/file/d/1JHdcZUil-WpfKiG0dedAUAr1fenhkP3Z/view?usp=sharing";

export default function Home() {
  return (
    <section
      id="Home"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 mt-6"
    >
      {/* Left Column */}
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <Image
              src={Headshot}
              alt="Profile image of Bailey Carroll, a software developer based in Seattle."
              className="rounded-full ring-2 ring-primary/30 h-32 w-32 object-cover object-top transition-all duration-300 hover:ring-primary/50 hover:scale-105"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <Heading Level={2} className="mb-4">
            Bailey Carroll
          </Heading>
          <Heading Level={5} className="mb-4 text-primary">
            Software Developer & Problem Solver
          </Heading>
          <Paragraph size="lg" className="mb-6">
            Passionate software developer based in Seattle, crafting innovative solutions 
            that make a difference. I specialize in full-stack development, system architecture, 
            and creating user-centric applications. When I'm not coding, you'll find me 
            exploring new technologies, reading, or enjoying the Pacific Northwest outdoors.
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about">
              <Button>Learn More About Me</Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline">View My Work</Button>
            </Link>
          </div>
        </Card>
        
        {/* Recent Experience */}
        <Card>
          <Heading Level={4} className="mb-6">Professional Experience</Heading>
          <TimelineHome />
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/resume" className="flex-1">
              <Button className="w-full">View Full Resume</Button>
            </Link>
            <Link href={Resume} target="_blank" className="flex-1">
              <Button className="w-full" variant="outline">Download PDF</Button>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Right Column */}
      <div className="space-y-8">
        {/* Featured Projects */}
        <Card>
          <Heading Level={4} className="mb-6">Featured Projects</Heading>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card variant="elevated" interactive className="p-6">
              <Heading Level={5} className="mb-3">Corpus Vitae</Heading>
              <Paragraph size="base" className="mb-4 leading-relaxed">
                A comprehensive fitness, meal, and life-tracking mobile application built with Flutter. 
                Features local SQLite storage with cloud MySQL synchronization, iOS-inspired UI design, 
                and holistic habit tracking capabilities.
              </Paragraph>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Flutter</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">SQLite</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">MySQL</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Mobile</span>
              </div>
              <Link href="https://github.com/baileycarroll/CorpusVitae" target="_blank">
                <Button size="sm" variant="outline">View Project</Button>
              </Link>
            </Card>
            <Card variant="elevated" interactive className="p-6">
              <Heading Level={5} className="mb-3">Acolyte R.E.A.L.M.S.</Heading>
              <Paragraph size="base" className="mb-4 leading-relaxed">
                A custom Remote Engagement and Learning Management System designed from the ground up. 
                Currently developing version 5.0 with enhanced user engagement features, serving as 
                the backbone for educational platforms like 'un-Traditional Magick'.
              </Paragraph>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Laravel</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">MySQL</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">JavaScript</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Python</span>
              </div>
              <Link href="https://github.com/baileycarroll/Acolyte-v4" target="_blank">
                <Button size="sm" variant="outline">View Project</Button>
              </Link>
            </Card>
          </div>
          <Link href="/projects">
            <Button className="w-full">Explore All Projects</Button>
          </Link>
        </Card>
        
        {/* Skills */}
        <Card>
          <Heading Level={4} className="mb-6">Technical Skills</Heading>
          <Paragraph variant="muted" className="mb-4">
            Full-stack developer with expertise in modern web technologies, 
            mobile development, and system architecture.
          </Paragraph>
          <SkillsMarquee />
        </Card>
        
        {/* Contact */}
        <Card>
          <Heading Level={4} className="mb-6">Let's Connect</Heading>
          <Paragraph variant="muted" className="mb-6">
            I'm always interested in new opportunities, collaborations, or just 
            connecting with fellow developers. Feel free to reach out!
          </Paragraph>
          <div className="space-y-4">
            <Link
              href="mailto:baileyrcarroll@gmail.com"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-3 rounded-lg hover:bg-card/20"
            >
              <EnvelopeIcon className="w-5 h-5" />
              <span>baileyrcarroll@gmail.com</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/baileycarroll/"
              target="_blank"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-3 rounded-lg hover:bg-card/20"
            >
              <FaLinkedin className="w-5 h-5" />
              <span>Connect on LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/baileycarroll"
              target="_blank"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-3 rounded-lg hover:bg-card/20"
            >
              <FaGithub className="w-5 h-5" />
              <span>View on GitHub</span>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
