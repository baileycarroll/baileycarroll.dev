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
              I've been tinkering and working in the technical industry for over 12 years. 
              I wrote my first "program" in Perl at 11 years old for a family friend in Reno, 
              Nevada (who was the ISP for the valley I grew up in) - it was a somewhat simple 
              program that helped them manage each of the customers networking equipment from 
              their local server.
            </Paragraph>
            <Paragraph size="lg">
              When I was 19 I had corrective surgeries to fix the genetic deformities in my legs. 
              During that recovery time a dear friend of mine approached me with an idea to deliver 
              video content to a community gathering. This started what is my largest and most 
              passionate project, Acolyte. Since then I dove further into the idea of making 
              products and things that improve not only my life, but the lives of those I care about.
            </Paragraph>
            <Paragraph size="lg">
              While I have many side hobbies, I am a gamer at heart. I really enjoy video games 
              with a good amount of lore in them. One of my all time favorites being the Elder 
              Scrolls series. (I cannot pick just one of them.) Other franchises such as Pokemon, 
              Final Fantasy, The Legend of Zelda, and the Soulsborne series are close to my heart as well.
            </Paragraph>
            <Paragraph size="lg">
              Today, I work as a <em className="text-primary font-semibold">Senior Computer Specialist</em> for the 
              University of Washington during the day and like to spend my evenings either at home 
              with my house tiger (Leo) programming, reading or playing video games. Or out exploring 
              the beautiful city I have made my home in.
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
