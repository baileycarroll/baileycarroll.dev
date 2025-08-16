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
import { ListNone } from "@/components/lists/UnorderedLists";
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
      className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-5 gap-4 p-5 mt-6"
    >
      <Card className="rounded-lg lg:row-span-4 col-span-4 lg:col-span-1 flex flex-col justify-center items-start">
        <Image
          src={Headshot}
          alt="Profile image of Hunter Bailey."
          className="rounded-full ring-2 ring-primary-light h-48 w-48 shadow-lg shadow-primary object-cover object-top self-center mb-4 -translate-y-14"
        />
        <Heading Level={3} className="mb-4 -translate-y-14">
          Bailey Carroll
        </Heading>
        <Heading Level={6} className="mb-2 -translate-y-12">
          Making My Mark |{" "}
          <span className="text-primary">One Line of Code at a Time</span>
        </Heading>
        <Paragraph className="-translate-y-10">
          A software developer based in Seattle. Working on making my mark on
          the world, one line of code, at a time. When not immersed in a book or
          video game I can be found at the gym, walking a beach, in a cozy cafe,
          or out dancing in the rain. I love what I do and am always looking for
          projects to work on or new things to create.
        </Paragraph>
        <Link
          href={"/about"}
          className="self-end mt-auto font-semibold mix-blend-normal"
        >
          <Button className="text-slate-50 mix-blend-normal">Read More</Button>
        </Link>
      </Card>
      <Card className="rounded-lg col-span-4 lg:col-span-2 lg:row-span-2 flex flex-col justify-center items-start overflow-hidden]">
        <Heading Level={6}>Recent Experience</Heading>
        <TimelineHome />
        <div className="flex flex-row gap-4 self-end mix-blend-normal">
          <Link
            href={"/resume"}
            className="self-end text-primary font-semibold mt-auto mix-blend-normal"
          >
            <Button className="text-slate-50 mix-blend-normal">See More</Button>
          </Link>
          <Link
            href={Resume}
            target="_blank"
            className="self-end text-primary font-semibold"
          >
            <Button className="text-slate-50">Download Resume</Button>
          </Link>
        </div>
      </Card>
      <Card className="rounded-lg col-span-4 lg:row-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3 flex flex-col justify-evenly">
        <Heading Level={6}>Recent Projects</Heading>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Card className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Heading Level={6}>Corpus Vitae</Heading>
            <Paragraph className="leading-tight">
              Building a comprehensive fitness, meal, and life-tracking app
              using Flutter for Android/iOS.
            </Paragraph>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <Heading Level={6}>Acolyte</Heading>
            <Paragraph className="leading-tight">
              Designed and developed a custom Remote Engagement and Learning
              Management System from the ground up.
            </Paragraph>
          </Card>
        </div>
        <Link
          href={"/projects"}
          className="self-end text-primary font-semibold mt-auto"
        >
          <Button className="text-slate-50">Project List</Button>
        </Link>
      </Card>
      <Card className="rounded-lg col-span-4 lg:col-span-1 lg:row-span-4 lg:col-start-4 lg:row-start-1 flex flex-col justify-evenly">
        <Heading Level={5}>Inner Thoughts</Heading>
        <Paragraph className="my-4">
          I know, scary to put inner thoughts onto a public place, but for years
          now I have been told that I need to persue content creation of some
          kind. So here we are, I{`'`}m going to write, and/or record my
          thoughts on topics I have a strong desire to talk about and put them
          here.
        </Paragraph>
        <Paragraph className="my-4">
          If you have a topic you want to read/hear me get on my soapbox about,
          or want to expand on the discussion please feel free to reach out via
          one of the methods below.
        </Paragraph>
        <ListNone className="space-y-3 my-4">
          <li className="text-primary font-semibold">
            <Link
              className="flex flex-row items-center"
              href={"https://www.linkedin.com/in/baileycarroll/"}
              target="_blank"
            >
              <FaLinkedin className="w-5 h-5 mr-4" />
              LinkedIn
            </Link>
          </li>
          <li className="text-primary font-semibold">
            <Link
              href="mailto:baileyrcarroll@gmail.com"
              className="flex flex-row items-center"
            >
              <EnvelopeIcon className="w-5 h-5 mr-4" />
              baileyrcarroll@gmail.com
            </Link>
          </li>
          <li className="text-primary font-semibold">
            <Link
              href={"https://github.com/baileycarroll"}
              target="_blank"
              className="flex flex-row items-center"
            >
              <FaGithub className="w-5 h-5 mr-4" />
              GitHub
            </Link>
          </li>
        </ListNone>
        <Link
          href={"/articles"}
          className="self-end text-primary font-semibold mt-auto"
        >
          <Button className="text-slate-50">See Articles</Button>
        </Link>
      </Card>
      <Card className="rounded-lg col-span-4 lg:row-span-1 lg:col-start-1 flex flex-col justify-center items-start">
        <SkillsMarquee />
      </Card>
    </section>
  );
}
