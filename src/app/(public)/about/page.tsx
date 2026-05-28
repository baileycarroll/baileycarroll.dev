import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { ComponentType, ReactNode } from "react";
import clsx from "clsx";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
      {children}
    </span>
  );
}

function StoryBreak({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8">
      <Paragraph size="sm" className="uppercase tracking-wide text-neutral-500">
        {title}
      </Paragraph>
      <Paragraph size="lg" className="max-w-3xl text-neutral-200">
        {children}
      </Paragraph>
    </div>
  );
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-neutral-200 transition-colors hover:border-primary/22 hover:text-white",
        className
      )}
      target="_blank"
    >
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-base">{children}</span>
    </Link>
  );
}

export default function About() {
  return (
    <div className="mx-auto max-w-[1400px] px-6">
      <section className="py-14 sm:py-18">
        <div className="space-y-6">
          <SectionEyebrow>About Bailey</SectionEyebrow>
          <div className="max-w-4xl space-y-5">
            <Heading Level={2}>A builder drawn to useful systems and durable technical work</Heading>
            <Paragraph size="lg" className="max-w-2xl text-neutral-300">
              The throughline has always been utility: making systems calmer,
              clearer, and more reliable for the people who depend on them.
            </Paragraph>
          </div>
        </div>
      </section>

      <section className="grid gap-12 py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="max-w-4xl space-y-8">
          <StoryBreak title="Origins">
            I&apos;ve spent more than twelve years building and refining
            software. At eleven, I wrote my first Perl script for a family
            friend in Reno who ran our valley&apos;s ISP, a small tool that let
            them manage customer networking gear from a local server. That
            early taste of utility never left.
          </StoryBreak>

          <StoryBreak title="Becoming">
            At nineteen, while recovering from corrective leg surgeries, a
            friend asked if I could deliver video to a community gathering.
            That spark became Acolyte, my longest and most devoted project.
            Since then I&apos;ve chased the same feeling: making products that
            remove friction and make life better for the people around me.
          </StoryBreak>

          <StoryBreak title="Taste">
            I&apos;m a gamer at heart and drawn to worlds with deep lore. Elder
            Scrolls sits near the center, with Pokemon, Final Fantasy, The
            Legend of Zelda, and the Soulsborne series close behind. Those
            worlds remind me that systems can be both elegant and vast.
          </StoryBreak>

          <StoryBreak title="Now">
            Today I serve as a{" "}
            <span className="font-semibold text-primary">
              Senior Computer Specialist (Atlassian Platform Engineer)
            </span>{" "}
            at the University of Washington, focusing on platform reliability,
            identity, and migrations. Recent work includes restoring secure SSO
            for thousands of users, modernizing stacks across Java, Ubuntu, and
            Postgres, and making indexing dramatically faster. Evenings are for
            quiet joys with my house tiger, Leo, coding, reading, playing
            games, or wandering the city I now call home.
          </StoryBreak>
        </div>

        <div className="space-y-5 lg:sticky lg:top-28">
          <Card variant="subtle" className="rounded-[26px]">
            <div className="space-y-4">
              <SectionEyebrow>Elsewhere</SectionEyebrow>
              <Heading Level={5}>Find me where the work and music live</Heading>
              <div className="space-y-3">
                <SocialLink href="https://github.com/baileycarroll" icon={FaGithub}>
                  Follow on GitHub
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/baileycarroll/"
                  icon={FaLinkedin}
                >
                  Connect on LinkedIn
                </SocialLink>
                <SocialLink href="mailto:baileyrcarroll@gmail.com" icon={EnvelopeIcon}>
                  baileyrcarroll@gmail.com
                </SocialLink>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
