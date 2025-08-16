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
          <Image
            src={Headshot}
            alt="Profile image of Bailey Carroll."
            className="rounded-full ring ring-primary-light/50 h-32 w-32 object-cover object-top mb-6"
          />
          <Heading Level={2} className="mb-4">
            Bailey Carroll
          </Heading>
          <Heading Level={5} className="mb-4 text-primary">
            Making My Mark | One Line of Code at a Time
          </Heading>
          <Paragraph className="mb-6">
            A software developer based in Seattle. Working on making my mark on
            the world, one line of code, at a time. When not immersed in a book or
            video game I can be found at the gym, walking a beach, in a cozy cafe,
            or out dancing in the rain. I love what I do and am always looking for
            projects to work on or new things to create.
          </Paragraph>
          <Link href="/about">
            <Button>Read More</Button>
          </Link>
        </Card>
        
        {/* Recent Experience */}
        <Card>
          <Heading Level={4} className="mb-6">Recent Experience</Heading>
          <TimelineHome />
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/resume" className="flex-1">
              <Button className="w-full">See More</Button>
            </Link>
            <Link href={Resume} target="_blank" className="flex-1">
              <Button className="w-full">Download Resume</Button>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Right Column */}
      <div className="space-y-8">
        {/* Featured Projects */}
        <Card>
          <Heading Level={4} className="mb-6">Featured Projects</Heading>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Card className="p-4">
              <Heading Level={5} className="mb-3">Corpus Vitae</Heading>
              <Paragraph className="leading-tight">
                Building a comprehensive fitness, meal, and life-tracking app
                using Flutter for Android/iOS.
              </Paragraph>
            </Card>
            <Card className="p-4">
              <Heading Level={5} className="mb-3">Acolyte</Heading>
              <Paragraph className="leading-tight">
                Designed and developed a custom Remote Engagement and Learning
                Management System from the ground up.
              </Paragraph>
            </Card>
          </div>
          <Link href="/projects">
            <Button className="w-full">View All Projects</Button>
          </Link>
        </Card>
        
        {/* Skills */}
        <Card>
          <Heading Level={4} className="mb-4">Skills</Heading>
          <SkillsMarquee />
        </Card>
        
        {/* Contact */}
        <Card>
          <Heading Level={4} className="mb-6">Get In Touch</Heading>
          <div className="space-y-4">
            <Link
              href="mailto:baileyrcarroll@gmail.com"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5" />
              <span>baileyrcarroll@gmail.com</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/baileycarroll/"
              target="_blank"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/baileycarroll"
              target="_blank"
              className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
            >
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
