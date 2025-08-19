// Next Imports
import Link from "next/link";
import React from "react";
// Icons
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedin, FaSpotify } from "react-icons/fa";
// Clsx for conditional classes
import clsx from "clsx";
// Custom Components
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import Button from "@/components/buttons/Button";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 text-primary hover:text-primary-light transition-colors p-4 rounded-lg hover:bg-primary/5",
        className
      )}
      target="_blank"
    >
      <Icon className="w-6 h-6" />
      <span className="text-lg">{children}</span>
    </Link>
  );
}

export default function About() {
  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {/* Story Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">My Story</Heading>
          <div className="max-w-4xl mx-auto space-y-6">
            <Paragraph size="lg">
            I’ve spent more than twelve years building and refining software. At eleven, I wrote my first Perl script for a family friend in Reno who ran our valley’s ISP—a small tool that let them manage customer networking gear from a local server. That early taste of utility never left.
            </Paragraph>
            <Paragraph size="lg">
            At nineteen, while recovering from corrective leg surgeries, a friend asked if I could deliver video to a community gathering. That spark became Acolyte, my longest and most devoted project. Since then I’ve chased the same feeling: making products that remove friction and make life better for the people around me.
            </Paragraph>
            <Paragraph size="lg">
            I’m a gamer at heart and drawn to worlds with deep lore. Elder Scrolls sits near the center, with Pokémon, Final Fantasy, The Legend of Zelda, and the Soulsborne series close behind. Those worlds remind me that systems can be both elegant and vast.
            </Paragraph>
            <Paragraph size="lg">
            Today I serve as a <span className="text-primary font-semibold">Senior Computer Specialist (Atlassian Platform Engineer)</span> at the University of Washington, focusing on platform reliability, identity, and migrations. Recent work includes restoring secure SSO for thousands of users, modernizing stacks across Java, Ubuntu, and Postgres, and making indexing dramatically faster. Evenings are for quiet joys with my house tiger, Leo—coding, reading, playing games—or wandering the city I now call home.
            </Paragraph>
          </div>
        </Card>
      </section>

      {/* Connect Section */}
      <section className="py-16">
        <Card variant="elevated" className="p-8">
          <Heading Level={3} className="mb-8 text-center">Let's Connect</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Heading Level={4} className="mb-6">Follow Me</Heading>
              <div className="space-y-2">
                <SocialLink href="https://github.com/baileycarroll" icon={FaGithub}>
                  Follow on GitHub
                </SocialLink>
                <SocialLink href="https://open.spotify.com/user/21fwvqec332fp7apchtqe2z7y" icon={FaSpotify}>
                  Follow on Spotify
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/baileycarroll/" icon={FaLinkedin}>
                  Connect on LinkedIn
                </SocialLink>
                <SocialLink href="mailto:baileyrcarroll@gmail.com" icon={EnvelopeIcon}>
                  baileyrcarroll@gmail.com
                </SocialLink>
              </div>
            </div>
            <div>
              <Heading Level={4} className="mb-6">I Wrote A Book!</Heading>
              <Paragraph size="base" className="mb-6">
                <em className="font-bold text-primary">A Warrior's Journey:</em> A retelling of my life 
                from the early years until the Spring of 2024, using freestyle poetry. Discussing the 
                battles I faced and my hope for the future.
              </Paragraph>
              <Link href="/books">
                <Button size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
