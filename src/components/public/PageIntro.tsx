"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
      {children}
    </span>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <section
      className={clsx(
        "py-14 sm:py-18",
        centered && "text-center",
        className
      )}
    >
      <div
        className={clsx(
          "space-y-5",
          centered ? "mx-auto max-w-4xl" : "max-w-4xl"
        )}
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <div className="space-y-4">
          <Heading Level={2} className={clsx(centered && "mx-auto max-w-3xl")}>
            {title}
          </Heading>
          {description && (
            <Paragraph
              size="lg"
              className={clsx(
                "text-neutral-300",
                centered ? "mx-auto max-w-3xl" : "max-w-2xl"
              )}
            >
              {description}
            </Paragraph>
          )}
        </div>
      </div>
    </section>
  );
}
