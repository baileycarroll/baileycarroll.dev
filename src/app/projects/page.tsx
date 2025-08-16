import Heading from "@/components/typography/Headings";
import Card from "@/components/cards/Card";
import Link from "next/link";
import { FaDesktop, FaGlobe, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Corpus from "@/assets/CV.png";
import Acolyte from "@/assets/Acolyte Logo - Icon.png";
import RoseShield from "@/assets/rose_shield.svg";
import Paragraph from "@/components/typography/Paragraphs";

const projects = [
  {
    name: "A Warrior's Journey",
    type: "Book",
    description:
      "Authored and self-published a freestyle poetry book, demonstrating strong communication skills. Applied project management techniques to take the book from initial concept to publication, while showcasing resilience, creativity, and an aptitude for tackling challenging subjects–qualities that complement the essential skill of problem solving.",
    link: {
      href: "https://www.barnesandnoble.com/w/a-warriors-journey-hunter-bailey/1146141656%3Bjsessionid=F3C2747E76FFF63C84E6CBB211E48FE3.prodny_store02-atgap08?ean=9798218480882",
      label: "Barnes & Nobel Listing",
    },
    icon: FaGlobe,
    logo: RoseShield,
  },
  {
    name: "Acolyte v4",
    type: "Website",
    description:
      "Version 4 of Acolyte. This version is a basic Content Management System (CMS). And was used by a client to track 40 plus users for over 3 years. This version is no longer in active development, and is kept up only as a showcase of where I was 3 years ago. The system does function, but it's not as smooth as I would like. Written in Laravel and MDBoostrap.",
    link: {
      href: "https://github.com/baileycarroll/Acolyte-v4",
      label: "GitHub Repo",
    },
    icon: FaGithub,
    logo: Acolyte,
  },
  {
    name: "Acolyte v5",
    type: "Website",
    description:
      "This is the newest version of Acolyte, while I do keep the source code private I am willing to expose some of the design as a demo so you can see the progress and the stark difference in design and experience. I've grown alot in the past three years and this new version of Acolyte will help showcase that beautifully. Written in Laravel, Vue, and TailwindCSS.",
    link: {
      href: "#",
      label: "No Demo Just Yet",
    },
    icon: FaDesktop,
    logo: Acolyte,
  },
  {
    name: "Corpus Vitae",
    type: "GitHub Repo",
    description:
      "This is a fitness, meal, and overall life tracking app that I'm developing for Android and iOS using Flutter. I wanted something more for my portfolio, and was tired of paying $30-$40 per month for basic exercise and macro tracking. So I figured I would make one for myself.",
    link: {
      href: "https://github.com/baileycarroll/CorpusVitae",
      label: "GitHub Repo",
    },
    icon: FaGithub,
    logo: Corpus,
  },
  {
    name: "My Portfolio / Developer Portal",
    type: "GitHub Repo",
    description:
      "I'm including this website in this list because it has another function well beyond that of just a portfolio site. It actually houses my developer portal which has project tracking, tooling, and more that makes it easier for me to organize what resources I have, and interact with them.",
    link: {
      href: "https://github.com/baileycarroll/baileycarroll.dev",
      label: "GitHub Repo",
    },
    icon: FaGithub,
    logo: RoseShield,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="p-5 flex flex-col items-end mix-blend-normal mt-6"
    >
      <Card>
        <div className="max-w-7xl">
          <Heading Level={3}>Some of the things I{`'`}ve worked on.</Heading>
          <Paragraph className="mt-2">
            I{`'`}ve had many ideas and most do not see the light of day, as is
            with many developers/engineers. However the below are the ones that
            I am the most proud of. I{`'`}ve made some of the repos public and
            most importantly for two of the projects there is an active Demo
            version available.
          </Paragraph>
        </div>
        <div className="mt-2">
          <ul
            role={"list"}
            className={
              "grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 p-5"
            }
          >
            {projects.map((project) => (
              <li
                key={project.name}
                className={
                  "group relative flex flex-col items-start rounded-2xl p-4 transition ease-in hover:bg-neutral-800/40 hover:border hover:border-primary/50"
                }
              >
                                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-secondary border border-primary/20">
                  <Image
                    src={project.logo}
                    alt={project.name + " Logo"}
                    className={"h-10 w-10 rounded-full"}
                  />
                </div>
                <Heading Level={6} className="mt-2">
                  <span className="absolute -inset-x-4 -inset-y-6 sm:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative z-10 text-white">
                    {project.name}
                  </span>
                </Heading>
                <Paragraph
                  className="relative leading-normal"
                  style={{ fontSize: "16px" }}
                >
                  {project.description}
                </Paragraph>
                <Paragraph className="relative mt-6 text-md text-slate-50 transition flex flex-row space-x-3">
                  <Link
                    href={project.link.href}
                    className={"flex items-center hover:text-primary"}
                    target={"_blank"}
                  >
                    <project.icon />
                    <span className="ml-2">{project.link.label}</span>
                  </Link>
                </Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </section>
  );
}
