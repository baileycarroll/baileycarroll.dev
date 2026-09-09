import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { PageIntro, SectionEyebrow } from "@/components/public/PageIntro";
import { ListDisc } from "@/components/lists/UnorderedLists";
import type { ReactNode } from "react";

function StyleSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/8 py-12 sm:py-16">
      <div className="mb-8 space-y-3">
        <SectionEyebrow>{title}</SectionEyebrow>
        {description && (
          <Paragraph size="lg" className="max-w-3xl text-neutral-300">
            {description}
          </Paragraph>
        )}
      </div>
      {children}
    </section>
  );
}

function SpecimenLabel({ children }: { children: ReactNode }) {
  return (
    <Paragraph size="sm" variant="muted" className="mb-3 uppercase tracking-wide">
      {children}
    </Paragraph>
  );
}

function ColorSwatch({
  name,
  className,
  hex,
}: {
  name: string;
  className: string;
  hex?: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-2xl border border-white/10 ${className}`} />
      <Paragraph size="sm" className="text-neutral-200">
        {name}
      </Paragraph>
      {hex && (
        <Paragraph size="sm" variant="muted">
          {hex}
        </Paragraph>
      )}
    </div>
  );
}

function CodeHint({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-primary">
      {children}
    </code>
  );
}

const NAV_ITEMS = [
  { href: "#colors", label: "Colors" },
  { href: "#typography", label: "Typography" },
  { href: "#buttons", label: "Buttons" },
  { href: "#cards", label: "Cards" },
  { href: "#labels", label: "Labels & Tags" },
  { href: "#layouts", label: "Layouts" },
  { href: "#patterns", label: "Page Patterns" },
  { href: "#lists", label: "Lists" },
  { href: "#background", label: "Background" },
];

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6">
      <PageIntro
        eyebrow="Style Guide"
        title="Design system reference for this site"
        description="Every visual pattern on the public site is built from a small set of tokens, components, and layout recipes. Use this page while learning the UI or making changes."
      />

      <Card variant="subtle" className="rounded-[24px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Heading Level={5}>Quick navigation</Heading>
            <Paragraph size="sm" variant="muted">
              Jump to a section below. Source files live in{" "}
              <CodeHint>src/styles/globals.css</CodeHint> and{" "}
              <CodeHint>src/components/</CodeHint>.
            </Paragraph>
          </div>
          <div className="flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:border-primary/24 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <StyleSection
        id="colors"
        title="Colors"
        description="The palette is defined as CSS custom properties in globals.css and exposed through Tailwind utilities like text-primary and bg-neutral-950."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ColorSwatch name="Primary" className="bg-primary" hex="#06b6d4" />
          <ColorSwatch name="Primary Light" className="bg-primary-light" hex="#22d3ee" />
          <ColorSwatch name="Primary Dark" className="bg-primary-dark" hex="#0891b2" />
          <ColorSwatch name="White / Text" className="bg-white" hex="#f8fafc" />
          <ColorSwatch name="Neutral 300" className="bg-neutral-300" hex="#cbd5e1" />
          <ColorSwatch name="Neutral 400" className="bg-neutral-400" hex="#64748b" />
          <ColorSwatch name="Neutral 800" className="bg-neutral-800" hex="#1e293b" />
          <ColorSwatch name="Neutral 950" className="bg-neutral-950" hex="#020617" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card variant="default">
            <SpecimenLabel>Gradient background</SpecimenLabel>
            <div className="h-32 rounded-2xl bg-enhanced border border-white/8" />
            <Paragraph size="sm" variant="muted" className="mt-3">
              Applied via <CodeHint>bg-enhanced</CodeHint> on the fixed background layer.
            </Paragraph>
          </Card>
          <Card variant="default">
            <SpecimenLabel>Text hierarchy</SpecimenLabel>
            <div className="space-y-2">
              <Paragraph className="text-white">Primary text — headings, emphasis</Paragraph>
              <Paragraph className="text-neutral-200">Body text — default paragraphs</Paragraph>
              <Paragraph className="text-neutral-300">Secondary body — section intros</Paragraph>
              <Paragraph className="text-neutral-400">Muted text — metadata, labels</Paragraph>
              <Paragraph className="text-primary">Accent text — links, eyebrows, tags</Paragraph>
            </div>
          </Card>
        </div>
      </StyleSection>

      <StyleSection
        id="typography"
        title="Typography"
        description="Headings and paragraphs are components, not raw HTML tags. This keeps size, weight, and color consistent across pages."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="default">
            <SpecimenLabel>Heading levels</SpecimenLabel>
            <div className="space-y-6">
              <Heading Level={1}>Heading Level 1</Heading>
              <Heading Level={2}>Heading Level 2</Heading>
              <Heading Level={3}>Heading Level 3</Heading>
              <Heading Level={4}>Heading Level 4</Heading>
              <Heading Level={5}>Heading Level 5</Heading>
              <Heading Level={6}>Heading Level 6</Heading>
            </div>
            <Paragraph size="sm" variant="muted" className="mt-6">
              Import from <CodeHint>@/components/typography/Headings</CodeHint>
            </Paragraph>
          </Card>

          <Card variant="default">
            <SpecimenLabel>Paragraph sizes & variants</SpecimenLabel>
            <div className="space-y-4">
              <Paragraph size="lg">
                Large paragraph — used for hero copy and section intros.
              </Paragraph>
              <Paragraph size="base">
                Base paragraph — standard body text across the site.
              </Paragraph>
              <Paragraph size="sm">
                Small paragraph — cards, metadata, compact UI.
              </Paragraph>
              <Paragraph size="base" variant="muted">
                Muted variant — secondary information and helper text.
              </Paragraph>
            </div>
            <Paragraph size="sm" variant="muted" className="mt-6">
              Import from <CodeHint>@/components/typography/Paragraphs</CodeHint>
            </Paragraph>
          </Card>
        </div>
      </StyleSection>

      <StyleSection
        id="buttons"
        title="Buttons"
        description="Pill-shaped buttons with a soft cyan glow. Use default for primary actions and outline for secondary actions."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="default">
            <SpecimenLabel>Variants</SpecimenLabel>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </Card>

          <Card variant="default">
            <SpecimenLabel>Sizes</SpecimenLabel>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>
        </div>
      </StyleSection>

      <StyleSection
        id="cards"
        title="Cards"
        description="Cards create the glass-panel look: semi-transparent backgrounds, backdrop blur, thin borders, and deep shadows. Most page content lives inside cards."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="default">
            <SpecimenLabel>Default</SpecimenLabel>
            <Heading Level={5}>Default card</Heading>
            <Paragraph size="sm" className="mt-3 text-neutral-300">
              Standard panel with blur and a soft white border. Good for supporting content.
            </Paragraph>
          </Card>

          <Card variant="elevated">
            <SpecimenLabel>Elevated</SpecimenLabel>
            <Heading Level={5}>Elevated card</Heading>
            <Paragraph size="sm" className="mt-3 text-neutral-300">
              Stronger contrast, cyan-tinted border, deeper shadow. Use for hero or featured content.
            </Paragraph>
          </Card>

          <Card variant="subtle">
            <SpecimenLabel>Subtle</SpecimenLabel>
            <Heading Level={5}>Subtle card</Heading>
            <Paragraph size="sm" className="mt-3 text-neutral-300">
              Minimal fill and border. Good for placeholders, empty states, and secondary panels.
            </Paragraph>
          </Card>
        </div>

        <div className="mt-6 w-full">
          <Card variant="elevated" interactive className="w-full max-w-[36rem]">
            <SpecimenLabel>Interactive</SpecimenLabel>
            <Heading Level={5}>Interactive card</Heading>
            <Paragraph size="sm" className="mt-3 max-w-prose text-neutral-300">
              Pass <CodeHint>interactive</CodeHint> to add hover lift, brighter border, and pointer
              cursor.
            </Paragraph>
            <Paragraph size="sm" className="mt-2 max-w-prose text-neutral-300">
              Used for project cards and clickable panels.
            </Paragraph>
          </Card>
        </div>
      </StyleSection>

      <StyleSection
        id="labels"
        title="Labels & Tags"
        description="Small UI accents used for section labels, skill chips, and metadata pills."
      >
        <Card variant="default">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SpecimenLabel>Section eyebrow</SpecimenLabel>
              <SectionEyebrow>Platform engineering</SectionEyebrow>
              <Paragraph size="sm" variant="muted" className="mt-3">
                From <CodeHint>PageIntro</CodeHint> — uppercase pill label above section titles.
              </Paragraph>
            </div>

            <div>
              <SpecimenLabel>Skill / tag pill</SpecimenLabel>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Prisma", "Tailwind"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-sm text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Paragraph size="sm" variant="muted" className="mt-3">
                Inline pattern from project cards — not a separate component yet.
              </Paragraph>
            </div>
          </div>
        </Card>
      </StyleSection>

      <StyleSection
        id="layouts"
        title="Layouts"
        description="Pages share the same container width and grid recipes. Copy these structures when adding new sections."
      >
        <Card variant="default" className="space-y-8">
          <div>
            <SpecimenLabel>Page container</SpecimenLabel>
            <code className="block rounded-xl border border-white/8 bg-neutral-950/40 p-4 text-sm text-neutral-300">
              {"<div className=\"mx-auto max-w-[1400px] px-6\">...</div>"}
            </code>
          </div>

          <div>
            <SpecimenLabel>Hero grid (home page)</SpecimenLabel>
            <div className="grid gap-4 rounded-2xl border border-dashed border-white/10 p-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
              <div className="rounded-xl bg-white/[0.03] p-6 text-sm text-neutral-400">
                Main column — headline, intro, CTAs
              </div>
              <div className="rounded-xl bg-white/[0.03] p-6 text-sm text-neutral-400">
                Side card — focus summary, stats, highlights
              </div>
            </div>
          </div>

          <div>
            <SpecimenLabel>Featured + supporting grid</SpecimenLabel>
            <div className="grid gap-4 rounded-2xl border border-dashed border-white/10 p-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
              <div className="min-h-32 rounded-xl bg-primary/8 p-6 text-sm text-primary">
                Lead project — elevated card
              </div>
              <div className="grid gap-4">
                <div className="rounded-xl bg-white/[0.03] p-4 text-sm text-neutral-400">
                  Supporting card
                </div>
                <div className="rounded-xl bg-white/[0.03] p-4 text-sm text-neutral-400">
                  Supporting card
                </div>
              </div>
            </div>
          </div>

          <div>
            <SpecimenLabel>Three-column archive grid</SpecimenLabel>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-neutral-400"
                >
                  Compact card {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </StyleSection>

      <StyleSection
        id="patterns"
        title="Page Patterns"
        description="Higher-level compositions used repeatedly across Home, About, Projects, and Resume."
      >
        <div className="space-y-6">
          <Card variant="default">
            <SpecimenLabel>Page intro block</SpecimenLabel>
            <div className="rounded-[24px] border border-white/8 bg-neutral-950/20 p-8">
              <PageIntro
                eyebrow="Example"
                title="A reusable page header pattern"
                description="PageIntro combines SectionEyebrow, Heading Level 2, and a large muted paragraph."
              />
            </div>
          </Card>

          <Card variant="default">
            <SpecimenLabel>Story break (about page)</SpecimenLabel>
            <div className="grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8">
              <Paragraph size="sm" className="uppercase tracking-wide text-neutral-500">
                Chapter
              </Paragraph>
              <Paragraph size="lg" className="max-w-3xl text-neutral-200">
                A two-column editorial layout: narrow label on the left, wider story text on the right.
              </Paragraph>
            </div>
          </Card>

          <Card variant="default">
            <SpecimenLabel>Contact / social link tile</SpecimenLabel>
            <Link
              href="mailto:baileyrcarroll@gmail.com"
              className="inline-flex w-full max-w-[24rem] items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-neutral-200 transition-colors hover:border-primary/22 hover:text-white"
            >
              <EnvelopeIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <Paragraph size="sm" variant="muted">
                  Email
                </Paragraph>
                <Paragraph className="mt-2 text-neutral-100">
                  baileyrcarroll@gmail.com
                </Paragraph>
              </div>
            </Link>
          </Card>
        </div>
      </StyleSection>

      <StyleSection
        id="lists"
        title="Lists"
        description="List components wrap standard HTML lists with shared spacing and font treatment."
      >
        <Card variant="default">
          <SpecimenLabel>Disc list</SpecimenLabel>
          <ListDisc className="space-y-2 text-neutral-200">
            <li>Design tokens in globals.css</li>
            <li>Reusable components in src/components</li>
            <li>Page-level composition in src/app/(public)</li>
          </ListDisc>
        </Card>
      </StyleSection>

      <StyleSection
        id="background"
        title="Background & Motion"
        description="Visual atmosphere comes from the fixed gradient background, floating particles, and Framer Motion transitions. These sit behind the content layer."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="default">
            <SpecimenLabel>Layer stack</SpecimenLabel>
            <ol className="space-y-3 text-sm text-neutral-300">
              <li>
                <span className="text-primary">1.</span> Fixed{" "}
                <CodeHint>bg-enhanced</CodeHint> gradient —{" "}
                <CodeHint>src/app/(public)/layout.tsx</CodeHint>
              </li>
              <li>
                <span className="text-primary">2.</span> Floating particles —{" "}
                <CodeHint>FloatingElements.tsx</CodeHint>
              </li>
              <li>
                <span className="text-primary">3.</span> Sticky blurred header —{" "}
                <CodeHint>header.tsx</CodeHint>
              </li>
              <li>
                <span className="text-primary">4.</span> Page content inside{" "}
                <CodeHint>max-w-[1400px]</CodeHint> container
              </li>
            </ol>
          </Card>

          <Card variant="default">
            <SpecimenLabel>Motion utilities (globals.css)</SpecimenLabel>
            <div className="flex flex-wrap gap-3">
              {["floating-element", "pulse-glow", "breathe", "drift"].map((animation) => (
                <span
                  key={animation}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-neutral-300"
                >
                  {animation}
                </span>
              ))}
            </div>
            <Paragraph size="sm" variant="muted" className="mt-4">
              Framer Motion is used in the header, splash screen, and mobile menu — see{" "}
              <CodeHint>SplashWrapper.tsx</CodeHint> and <CodeHint>header.tsx</CodeHint>.
            </Paragraph>
          </Card>
        </div>
      </StyleSection>

      <section className="border-t border-white/8 py-12 sm:py-16">
        <Card variant="subtle" className="rounded-[28px] text-center">
          <Heading Level={4} className="mb-4">
            Ready to experiment?
          </Heading>
          <Paragraph className="mx-auto mb-6 max-w-2xl text-neutral-300">
            Pick one component, change a single prop or class, refresh the browser, and compare
            against this page. That is the fastest way to internalize the system.
          </Paragraph>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Link href="/projects">
              <Button>See components in context</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
