import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Skill Categories
  console.log('Creating skill categories...');
  const categories = await Promise.all([
    prisma.skillCategory.create({ data: { name: 'Frontend', description: 'Frontend development technologies', display: true } }),
    prisma.skillCategory.create({ data: { name: 'Backend', description: 'Backend development technologies', display: true } }),
    prisma.skillCategory.create({ data: { name: 'Mobile', description: 'Mobile development technologies', display: true } }),
    prisma.skillCategory.create({ data: { name: 'Tools & Other', description: 'Development tools and other skills', display: true } }),
  ]);

  console.log(`Created ${categories.length} skill categories`);

  // Create Skills
  console.log('Creating skills...');
  const skills = await Promise.all([
    prisma.skill.create({ data: { name: 'Laravel', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id } }),
    prisma.skill.create({ data: { name: 'Vue.js', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
    prisma.skill.create({ data: { name: 'TailwindCSS', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
    prisma.skill.create({ data: { name: 'MySQL', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id } }),
    prisma.skill.create({ data: { name: 'Redis', years: 2, categoryId: categories.find(c => c.name === 'Backend')!.id } }),
    prisma.skill.create({ data: { name: 'Flutter', years: 2, categoryId: categories.find(c => c.name === 'Mobile')!.id } }),
    prisma.skill.create({ data: { name: 'SQLite', years: 2, categoryId: categories.find(c => c.name === 'Backend')!.id } }),
    prisma.skill.create({ data: { name: 'Dart', years: 2, categoryId: categories.find(c => c.name === 'Mobile')!.id } }),
    prisma.skill.create({ data: { name: 'Mobile UI/UX', years: 2, categoryId: categories.find(c => c.name === 'Mobile')!.id } }),
    prisma.skill.create({ data: { name: 'MDBootstrap', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
    prisma.skill.create({ data: { name: 'PHP', years: 4, categoryId: categories.find(c => c.name === 'Backend')!.id } }),
    prisma.skill.create({ data: { name: 'Creative Writing', years: 5, categoryId: categories.find(c => c.name === 'Tools & Other')!.id } }),
    prisma.skill.create({ data: { name: 'Project Management', years: 3, categoryId: categories.find(c => c.name === 'Tools & Other')!.id } }),
    prisma.skill.create({ data: { name: 'Self-Publishing', years: 2, categoryId: categories.find(c => c.name === 'Tools & Other')!.id } }),
    prisma.skill.create({ data: { name: 'Next.js', years: 2, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
    prisma.skill.create({ data: { name: 'React', years: 3, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
    prisma.skill.create({ data: { name: 'TypeScript', years: 2, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
    prisma.skill.create({ data: { name: 'Framer Motion', years: 1, categoryId: categories.find(c => c.name === 'Frontend')!.id } }),
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
