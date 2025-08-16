
import Link from "next/link";
import Paragraph from "@/components/typography/Paragraphs";
import Heading from "@/components/typography/Headings";
import Card from "@/components/cards/Card";

const events = [
  {
    dates: "April 2024 - Current",
    title: "Sr. Computer Specialist",
    employer: "University of Washington",
    details:
      "As the Sr. Computer Specialist, I spearheaded a major upgrade to our Java-based systems, transitioning from Java 8 to Java 11 while integrating robust X.509 certificate authentication. This ensured secure communication between Jira, Confluence, and our custom LDAP service. I didn't just update libraries—I re-envisioned the entire server architecture, reducing the server footprint from 7 to 5 by migrating from CentOS 7/Postgres 13 to Ubuntu 22.04/Postgres 16, which significantly reduced technical debt and streamlined system performance. Alongside these technical improvements, I created a comprehensive Atlassian guidebook, simplifying complex system administration tasks and user workflows. My cleanup of unused assets led to over a 200% improvement in system indexing speeds. I also introduced change management protocols that reduced untested code deployment in production, greatly minimizing errors.",
    skills: [
      "Java 8 & 11",
      "PostgreSQL",
      "Linux (CentOS/Ubuntu)",
      "Confluence & Jira",
      "Technical Documentation",
      "System Architecture",
      "X.509 Certificates",
      "Change Management",
    ],
    link: "https://uw.edu",
  },
  {
    dates: "June 2022 - April 2024",
    title: "Senior Technical Support Engineer",
    employer: "Carbon Robotics",
    details:
      "During my tenure at Carbon Robotics, I was instrumental in transforming the company's technical infrastructure. I spearheaded the rollout of Jira Software and Confluence across the entire organization, driving 100% user adoption through meticulous planning and execution. I also developed an internal Python/Flask web application with Redis to manage our support accounts, improving team efficiency by 10%. Beyond development, I worked directly with Product and Engineering teams to help shape the company's technical future, collaborating on an MVP written in TypeScript and Go. One of my key initiatives was automating the generation of weekly custom performance reports, reducing a 16-hour manual process to just 2 hours. My leadership extended to team growth, where I helped scale support operations from a small 6x16 to a robust 7x24 schedule, growing the team from 2 to 10 engineers. I created onboarding programs that seamlessly integrated 7 new engineers in just 4 weeks, and I was the primary escalation point during crucial support hours, ensuring high customer satisfaction.",
    skills: [
      "Technical Support",
      "Python/Flask",
      "Redis",
      "TypeScript",
      "Go",
      "Project Management",
      "Leadership & Team Growth",
      "Escalation Management",
      "Automation",
    ],
    link: "https://carbonrobotics.com",
  },
  {
    dates: "March 2020 - June 2022",
    title: "L3 Advanced Support Engineer",
    employer: "Coupa Software",
    details:
      "At Coupa Software, I took a proactive role in redefining the global training processes, leading to a 45% increase in positive feedback from new hires. My efforts focused on creating a more effective and comprehensive onboarding experience for senior engineers. In addition to training, I conducted in-depth root cause analyses of complex product issues, providing critical solutions that leveraged MySQL and Ruby on Rails. I also played an active role in the company's testing cycles, supporting unit, integration, and smoke testing during software releases. To further support our teams, I led the reimplementation of our internal knowledge base in Confluence and Salesforce, making key documentation 15% more accessible to engineers and support staff. I also performed system monitoring and analysis using Kibana, Grafana, and MySQL, ensuring the health of our systems and preventing outages.",
    skills: [
      "Ruby on Rails",
      "Kibana",
      "Grafana",
      "MySQL",
      "Unit/Integration Testing",
      "Technical Training",
      "Root Cause Analysis",
    ],
    link: "https://coupa.com",
  },
  {
    dates: "Ongoing Project",
    title: "Lead Developer",
    employer: "Acolyte R.E.A.L.M.S.",
    details:
      "As the Lead Developer of Acolyte R.E.A.L.M.S., I designed and built a custom Remote Engagement and Learning Management System from the ground up. The platform has continuously evolved, and I am currently working on the development of version 5.0, which is focused on enhancing user engagement in remote learning environments. Each version is crafted to provide rich, interactive experiences tailored to educators and learners alike. Over the past 3 years, version 4 has been successfully deployed for clients, including 'un-Traditional Magick,' serving as the backbone of their learning platform. The system's architecture leverages Laravel, MySQL, JavaScript, and Python, ensuring it remains scalable and adaptable to the growing needs of educators worldwide.",
    skills: [
      "Full-Stack Development",
      "Laravel",
      "MySQL",
      "JavaScript",
      "Python",
      "SASS",
      "MDBootstrap",
      "Remote Engagement Systems",
    ],
    link: "https://github.com/baileycarroll/Acolyte-v4",
  },
  {
    dates: "Ongoing Project",
    title: "Developer",
    employer: "Corpus Vitae",
    details:
      "Corpus Vitae (Core-Poos We-tay) is an ambitious project aimed at developing a holistic fitness, meal, and life-tracking app. I am leading the development of this cross-platform mobile application using Flutter, with the backend powered by MySQL for cloud storage. The app is designed to track workouts, meals, and various life activities, giving users a comprehensive tool to manage their daily habits. The front-end utilizes the Cupertino package for a sleek, iOS-inspired design, ensuring the app feels both modern and intuitive. Starting with SQLite for local storage, I am now expanding the app's capabilities to support seamless cloud synchronization, making the user experience more dynamic and flexible.",
    skills: [
      "Flutter",
      "SQLite",
      "MySQL",
      "Mobile Development",
      "UI/UX Design",
      "Cloud Integration",
    ],
    link: "https://github.com/baileycarroll/CorpusVitae",
  },
];

export function TimelineFull() {
  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <Card 
          key={index} 
          variant="default" 
          className="p-6 hover:bg-neutral-900/40 transition-all duration-300 group"
        >
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-primary/30 group-hover:border-primary/50 transition-colors duration-300" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <Heading Level={4} className="text-primary mb-1 group-hover:text-primary-light transition-colors duration-300">
                  {event.title}
                </Heading>
                <div className="flex items-center gap-2 mb-2">
                  {event.link !== "" ? (
                    <Link
                      href={event.link}
                      target="_blank"
                      className="text-neutral-300 hover:text-primary transition-colors duration-300 font-medium"
                    >
                      {event.employer}
                    </Link>
                  ) : (
                    <span className="text-neutral-300 font-medium">{event.employer}</span>
                  )}
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400 text-sm">{event.dates}</span>
                </div>
              </div>
              <Paragraph size="base" className="text-neutral-200 leading-relaxed">
                {event.details}
              </Paragraph>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Smaller more condensed timeline for the home page, better sizing.
export function TimelineHome() {
  return (
    <div className="space-y-6">
      {events.slice(0, 3).map((event, index) => (
        <Card 
          key={index} 
          variant="default" 
          className="p-4 hover:bg-neutral-900/40 transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-primary rounded-full border-2 border-primary/30 group-hover:border-primary/50 transition-colors duration-300" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <Heading Level={5} className="text-primary mb-1 group-hover:text-primary-light transition-colors duration-300">
                  {event.title}
                </Heading>
                <div className="flex items-center gap-2 mb-1">
                  {event.link !== "" ? (
                    <Link
                      href={event.link}
                      target="_blank"
                      className="text-neutral-300 hover:text-primary transition-colors duration-300 text-sm font-medium"
                    >
                      {event.employer}
                    </Link>
                  ) : (
                    <span className="text-neutral-300 text-sm font-medium">{event.employer}</span>
                  )}
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400 text-xs">{event.dates}</span>
                </div>
              </div>
              <Paragraph size="sm" className="text-neutral-200 leading-relaxed">
                {event.details.length > 120 
                  ? `${event.details.substring(0, 120)}...` 
                  : event.details
                }
              </Paragraph>
              <div className="flex flex-wrap gap-1">
                {event.skills.slice(0, 4).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-full text-xs hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
                {event.skills.length > 4 && (
                  <span className="text-primary/60 text-xs px-2 py-1">
                    +{event.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
