"use client";
import Marquee from "react-fast-marquee";
import {
  FaLaravel,
  FaReact,
  FaPhp,
  FaHtml5,
  FaCss3,
  FaJava,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiSass,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiPython,
  SiRuby,
  SiRubyonrails,
} from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import Heading from "../typography/Headings";

const SkillsList = [
  {
    name: "Laravel",
    icon: <FaLaravel />,
  },
  {
    name: "React",
    icon: <FaReact />,
  },
  {
    name: "PHP",
    icon: <FaPhp />,
  },
  {
    name: "HTML5",
    icon: <FaHtml5 />,
  },
  {
    name: "CSS3",
    icon: <FaCss3 />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
  },
  {
    name: "Sass",
    icon: <SiSass />,
  },
  {
    name: "MySQL",
    icon: <SiMysql />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
  },
  {
    name: "Next.js",
    icon: <RiNextjsLine />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
  },
  {
    name: "Java",
    icon: <FaJava />,
  },
  {
    name: "Python",
    icon: <SiPython />,
  },
  {
    name: "Ruby",
    icon: <SiRuby />,
  },
  {
    name: "Ruby on Rails",
    icon: <SiRubyonrails />,
  },
];

export default function SkillsMarquee() {
  return (
    <div className="w-full mb-2">
      <Heading Level={6}>Skills</Heading>
      <Marquee speed={50} className="py-2">
        {SkillsList.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center rounded-lg bg-slate-950/50 backdrop-blur border border-cyan-800 shadow-md shadow-cyan-800 p-3 mx-3 w-32 transition hover:scale-105"
          >
            <span className="text-3xl">{skill.icon}</span>
            <span className="mt-2">{skill.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
