import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Skill Categories (or get existing ones)
  console.log('Creating skill categories...');
  const categories = await Promise.all([
    prisma.skillCategory.upsert({ 
      where: { name: 'Frontend' },
      update: {},
      create: { name: 'Frontend', description: 'Frontend development technologies', display: true }
    }),
    prisma.skillCategory.upsert({ 
      where: { name: 'Backend' },
      update: {},
      create: { name: 'Backend', description: 'Backend development technologies', display: true }
    }),
    prisma.skillCategory.upsert({ 
      where: { name: 'Mobile' },
      update: {},
      create: { name: 'Mobile', description: 'Mobile development technologies', display: true }
    }),
    prisma.skillCategory.upsert({ 
      where: { name: 'Tools & Other' },
      update: {},
      create: { name: 'Tools & Other', description: 'Development tools and other skills', display: true }
    }),
  ]);

  console.log(`Created ${categories.length} skill categories`);

  // Create Skills (or get existing ones)
  console.log('Creating skills...');
  const skills = await Promise.all([
    prisma.skill.upsert({ 
      where: { name: 'Laravel' },
      update: {},
      create: { name: 'Laravel', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Vue.js' },
      update: {},
      create: { name: 'Vue.js', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'TailwindCSS' },
      update: {},
      create: { name: 'TailwindCSS', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'MySQL' },
      update: {},
      create: { name: 'MySQL', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Redis' },
      update: {},
      create: { name: 'Redis', years: 2, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Flutter' },
      update: {},
      create: { name: 'Flutter', years: 2, categoryId: categories.find(c => c.name === 'Mobile')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'SQLite' },
      update: {},
      create: { name: 'SQLite', years: 2, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Dart' },
      update: {},
      create: { name: 'Dart', years: 2, categoryId: categories.find(c => c.name === 'Mobile')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Mobile UI/UX' },
      update: {},
      create: { name: 'Mobile UI/UX', years: 2, categoryId: categories.find(c => c.name === 'Mobile')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'MDBootstrap' },
      update: {},
      create: { name: 'MDBootstrap', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'PHP' },
      update: {},
      create: { name: 'PHP', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Creative Writing' },
      update: {},
      create: { name: 'Creative Writing', years: 5, categoryId: categories.find(c => c.name === 'Tools & Other')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Project Management' },
      update: {},
      create: { name: 'Project Management', years: 3, categoryId: categories.find(c => c.name === 'Tools & Other')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Self-Publishing' },
      update: {},
      create: { name: 'Self-Publishing', years: 2, categoryId: categories.find(c => c.name === 'Tools & Other')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Next.js' },
      update: {},
      create: { name: 'Next.js', years: 2, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'React' },
      update: {},
      create: { name: 'React', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'TypeScript' },
      update: {},
      create: { name: 'TypeScript', years: 2, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Framer Motion' },
      update: {},
      create: { name: 'Framer Motion', years: 1, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Java' },
      update: {},
      create: { name: 'Java', years: 3, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'PostgreSQL' },
      update: {},
      create: { name: 'PostgreSQL', years: 3, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Python' },
      update: {},
      create: { name: 'Python', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'Ruby on Rails' },
      update: {},
      create: { name: 'Ruby on Rails', years: 2, categoryId: categories.find(c => c.name === 'Backend')!.id }
    }),
    prisma.skill.upsert({ 
      where: { name: 'JavaScript' },
      update: {},
      create: { name: 'JavaScript', years: 5, categoryId: categories.find(c => c.name === 'Frontend')!.id }
    }),
  ]);

  console.log(`Created ${skills.length} skills`);

  // Create Projects
  console.log('Creating projects...');

  // Acolyte v5
  const acolyteV5 = await prisma.project.create({
    data: {
      name: "Acolyte v5",
      description: "The newest version of Acolyte, a comprehensive Remote Engagement and Learning Management System. This version showcases significant growth in design and user experience over the past three years. Built with modern technologies and focused on enhanced user engagement in remote learning environments.",
      type: "Web Application",
      status: "In Development",
      featured: true,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      url: "#",
      urlText: "Demo Coming Soon",
      logoUrl: null,
      categories: {
        create: [{ category: "Featured" }]
      },
      skills: {
        create: [
          { skillId: skills.find(s => s.name === 'Laravel')!.id },
          { skillId: skills.find(s => s.name === 'Vue.js')!.id },
          { skillId: skills.find(s => s.name === 'TailwindCSS')!.id },
          { skillId: skills.find(s => s.name === 'MySQL')!.id },
          { skillId: skills.find(s => s.name === 'Redis')!.id },
        ]
      }
    }
  });

  // Corpus Vitae
  const corpusVitae = await prisma.project.create({
    data: {
      name: "Corpus Vitae",
      description: "A comprehensive fitness, meal, and life-tracking mobile application built with Flutter. Features local SQLite storage with cloud MySQL synchronization, iOS-inspired UI design, and holistic habit tracking capabilities. Created to provide a better alternative to expensive subscription-based fitness apps.",
      type: "Mobile Application",
      status: "In Development",
      featured: true,
      startDate: "2023-06-01",
      endDate: "2024-12-31",
      url: "https://github.com/baileycarroll/CorpusVitae",
      urlText: "View on GitHub",
      logoUrl: null,
      categories: {
        create: [{ category: "Featured" }]
      },
      skills: {
        create: [
          { skillId: skills.find(s => s.name === 'Flutter')!.id },
          { skillId: skills.find(s => s.name === 'SQLite')!.id },
          { skillId: skills.find(s => s.name === 'MySQL')!.id },
          { skillId: skills.find(s => s.name === 'Dart')!.id },
          { skillId: skills.find(s => s.name === 'Mobile UI/UX')!.id },
        ]
      }
    }
  });

  // Acolyte v4
  const acolyteV4 = await prisma.project.create({
    data: {
      name: "Acolyte v4",
      description: "Version 4 of Acolyte, a Content Management System (CMS) that was actively used by a client to track 40+ users for over 3 years. While no longer in active development, it serves as a showcase of technical growth and learning over time.",
      type: "Web Application",
      status: "Completed",
      featured: false,
      startDate: "2020-01-01",
      endDate: "2023-12-31",
      url: "https://github.com/baileycarroll/Acolyte-v4",
      urlText: "View on GitHub",
      logoUrl: null,
      categories: {
        create: [{ category: "Legacy" }]
      },
      skills: {
        create: [
          { skillId: skills.find(s => s.name === 'Laravel')!.id },
          { skillId: skills.find(s => s.name === 'MDBootstrap')!.id },
          { skillId: skills.find(s => s.name === 'MySQL')!.id },
          { skillId: skills.find(s => s.name === 'PHP')!.id },
        ]
      }
    }
  });

  // A Warrior's Journey
  const warriorsJourney = await prisma.project.create({
    data: {
      name: "A Warrior's Journey",
      description: "A self-published freestyle poetry book that demonstrates strong communication skills and creative expression. The project showcases project management abilities, from initial concept to publication, while highlighting resilience and creativity in tackling challenging subjects.",
      type: "Publication",
      status: "Published",
      featured: false,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      url: "https://www.barnesandnoble.com/w/a-warriors-journey-hunter-bailey/1146141656",
      urlText: "View on Barnes & Noble",
      logoUrl: null,
      categories: {
        create: [{ category: "Creative" }]
      },
      skills: {
        create: [
          { skillId: skills.find(s => s.name === 'Creative Writing')!.id },
          { skillId: skills.find(s => s.name === 'Project Management')!.id },
          { skillId: skills.find(s => s.name === 'Self-Publishing')!.id },
        ]
      }
    }
  });

  // Portfolio & Developer Portal
  const portfolio = await prisma.project.create({
    data: {
      name: "Portfolio & Developer Portal",
      description: "This website serves as both a portfolio and a comprehensive developer portal. It includes project tracking, tooling, and resource organization features that make it easier to manage and interact with various development resources and projects.",
      type: "Web Application",
      status: "Active",
      featured: false,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      url: "https://github.com/baileycarroll/baileycarroll.dev",
      urlText: "View on GitHub",
      logoUrl: null,
      categories: {
        create: [{ category: "Tools" }]
      },
      skills: {
        create: [
          { skillId: skills.find(s => s.name === 'Next.js')!.id },
          { skillId: skills.find(s => s.name === 'React')!.id },
          { skillId: skills.find(s => s.name === 'TypeScript')!.id },
          { skillId: skills.find(s => s.name === 'TailwindCSS')!.id },
          { skillId: skills.find(s => s.name === 'Framer Motion')!.id },
        ]
      }
    }
  });

  console.log(`Created ${5} projects`);

  // Create Experiences
  console.log('Creating experiences...');
  const experiences = await Promise.all([
    prisma.experience.create({
      data: {
        title: "Sr. Computer Specialist",
        employer: "University of Washington",
        startDate: "2024-04-01",
        endDate: "Current",
        details: "As the Sr. Computer Specialist, I spearheaded a major upgrade to our Java-based systems, transitioning from Java 8 to Java 11 while integrating robust X.509 certificate authentication. This ensured secure communication between Jira, Confluence, and our custom LDAP service. I didn't just update libraries—I re-envisioned the entire server architecture, reducing the server footprint from 7 to 5 by migrating from CentOS 7/Postgres 13 to Ubuntu 22.04/Postgres 16, which significantly reduced technical debt and streamlined system performance. Alongside these technical improvements, I created a comprehensive Atlassian guidebook, simplifying complex system administration tasks and user workflows. My cleanup of unused assets led to over a 200% improvement in system indexing speeds. I also introduced change management protocols that reduced untested code deployment in production, greatly minimizing errors.",
        link: "https://uw.edu",
        order: 1,
        skills: {
          create: [
            { skillId: skills.find(s => s.name === 'Java')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'MySQL')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'PostgreSQL')?.id || skills[0].id },
          ]
        }
      }
    }),
    prisma.experience.create({
      data: {
        title: "Senior Technical Support Engineer",
        employer: "Carbon Robotics",
        startDate: "2022-06-01",
        endDate: "2024-04-01",
        details: "During my tenure at Carbon Robotics, I was instrumental in transforming the company's technical infrastructure. I spearheaded the rollout of Jira Software and Confluence across the entire organization, driving 100% user adoption through meticulous planning and execution. I also developed an internal Python/Flask web application with Redis to manage our support accounts, improving team efficiency by 10%. Beyond development, I worked directly with Product and Engineering teams to help shape the company's technical future, collaborating on an MVP written in TypeScript and Go. One of my key initiatives was automating the generation of weekly custom performance reports, reducing a 16-hour manual process to just 2 hours. My leadership extended to team growth, where I helped scale support operations from a small 6x16 to a robust 7x24 schedule, growing the team from 2 to 10 engineers. I created onboarding programs that seamlessly integrated 7 new engineers in just 4 weeks, and I was the primary escalation point during crucial support hours, ensuring high customer satisfaction.",
        link: "https://carbonrobotics.com",
        order: 2,
        skills: {
          create: [
            { skillId: skills.find(s => s.name === 'Python')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'Redis')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'TypeScript')?.id || skills[0].id },
          ]
        }
      }
    }),
    prisma.experience.create({
      data: {
        title: "L3 Advanced Support Engineer",
        employer: "Coupa Software",
        startDate: "2020-03-01",
        endDate: "2022-06-01",
        details: "At Coupa Software, I took a proactive role in redefining the global training processes, leading to a 45% increase in positive feedback from new hires. My efforts focused on creating a more effective and comprehensive onboarding experience for senior engineers. In addition to training, I conducted in-depth root cause analyses of complex product issues, providing critical solutions that leveraged MySQL and Ruby on Rails. I also played an active role in the company's testing cycles, supporting unit, integration, and smoke testing during software releases. To further support our teams, I led the reimplementation of our internal knowledge base in Confluence and Salesforce, making key documentation 15% more accessible to engineers and support staff. I also performed system monitoring and analysis using Kibana, Grafana, and MySQL, ensuring the health of our systems and preventing outages.",
        link: "https://coupa.com",
        order: 3,
        skills: {
          create: [
            { skillId: skills.find(s => s.name === 'MySQL')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'Ruby on Rails')?.id || skills[0].id },
          ]
        }
      }
    }),
    prisma.experience.create({
      data: {
        title: "Lead Developer",
        employer: "Acolyte R.E.A.L.M.S.",
        startDate: "2021-01-01",
        endDate: "Ongoing",
        details: "As the Lead Developer of Acolyte R.E.A.L.M.S., I designed and built a custom Remote Engagement and Learning Management System from the ground up. The platform has continuously evolved, and I am currently working on the development of version 5.0, which is focused on enhancing user engagement in remote learning environments. Each version is crafted to provide rich, interactive experiences tailored to educators and learners alike. Over the past 3 years, version 4 has been successfully deployed for clients, including 'un-Traditional Magick,' serving as the backbone of their learning platform. The system's architecture leverages Laravel, MySQL, JavaScript, and Python, ensuring it remains scalable and adaptable to the growing needs of educators worldwide.",
        link: "https://github.com/baileycarroll/Acolyte-v4",
        order: 4,
        skills: {
          create: [
            { skillId: skills.find(s => s.name === 'Laravel')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'MySQL')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'JavaScript')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'Python')?.id || skills[0].id },
          ]
        }
      }
    }),
    prisma.experience.create({
      data: {
        title: "Developer",
        employer: "Corpus Vitae",
        startDate: "2023-06-01",
        endDate: "Ongoing",
        details: "Corpus Vitae (Core-Poos We-tay) is an ambitious project aimed at developing a holistic fitness, meal, and life-tracking app. I am leading the development of this cross-platform mobile application using Flutter, with the backend powered by MySQL for cloud storage. The app is designed to track workouts, meals, and various life activities, giving users a comprehensive tool to manage their daily habits. The front-end utilizes the Cupertino package for a sleek, iOS-inspired design, ensuring the app feels both modern and intuitive. Starting with SQLite for local storage, I am now expanding the app's capabilities to support seamless cloud synchronization, making the user experience more dynamic and flexible.",
        link: "https://github.com/baileycarroll/CorpusVitae",
        order: 5,
        skills: {
          create: [
            { skillId: skills.find(s => s.name === 'Flutter')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'SQLite')?.id || skills[0].id },
            { skillId: skills.find(s => s.name === 'MySQL')?.id || skills[0].id },
          ]
        }
      }
    }),
  ]);

  console.log(`Created ${experiences.length} experiences`);
  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
