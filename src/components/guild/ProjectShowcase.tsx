"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GuildContract } from "@/lib/guildContracts";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";
import Link from "next/link";

interface ShowcaseLinkProps {
  href: string;
  label: string;
  icon: string;
  variant: "primary" | "secondary" | "tertiary";
  className?: string;
}

function ShowcaseLink({
  href,
  label,
  icon,
  variant,
  className,
}: ShowcaseLinkProps) {
  const variantClasses = {
    primary:
      "bg-septim-600/30 border border-septim-400/50 text-septim-400 hover:bg-septim-600/50",
    secondary:
      "bg-leather-700/50 border border-leather-600 text-leather-300 hover:border-leather-500",
    tertiary:
      "bg-blue-600/30 border border-blue-400/50 text-blue-400 hover:bg-blue-600/50",
  };

  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
        variantClasses[variant],
        className
      )}
    >
      <ElderScrollsIcon name={icon} className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

interface ScreenshotsCarouselProps {
  screenshots: string[];
}

function ScreenshotsCarousel({ screenshots }: ScreenshotsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="screenshots-carousel">
      {/* Main Image */}
      <div className="carousel-main mb-3">
        <motion.img
          key={activeIndex}
          src={screenshots[activeIndex]}
          alt={`Screenshot ${activeIndex + 1}`}
          className="w-full h-48 object-cover rounded-lg cursor-pointer border border-leather-600/50"
          onClick={() => setIsLightboxOpen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Thumbnail Navigation */}
      {screenshots.length > 1 && (
        <div className="carousel-thumbnails flex gap-2">
          {screenshots.map((screenshot, index) => (
            <motion.img
              key={index}
              src={screenshot}
              alt={`Thumbnail ${index + 1}`}
              className={cn(
                "w-12 h-12 object-cover rounded cursor-pointer border border-leather-600/50",
                activeIndex === index && "ring-2 ring-septim-400"
              )}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[activeIndex]}
                alt={`Screenshot ${activeIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-leather-800/80 border border-leather-600 rounded-full flex items-center justify-center text-leather-300 hover:text-leather-100 transition-colors"
              >
                <ElderScrollsIcon name="close" className="w-4 h-4" />
              </button>

              {/* Navigation Arrows */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev > 0 ? prev - 1 : screenshots.length - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-leather-800/80 border border-leather-600 rounded-full flex items-center justify-center text-leather-300 hover:text-leather-100 transition-colors"
                  >
                    <ElderScrollsIcon name="arrow-left" className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev < screenshots.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-leather-800/80 border border-leather-600 rounded-full flex items-center justify-center text-leather-300 hover:text-leather-100 transition-colors"
                  >
                    <ElderScrollsIcon name="arrow-right" className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProjectShowcaseProps {
  contract: GuildContract;
  className?: string;
  isExpanded?: boolean;
}

export function ProjectShowcase({
  contract,
  className,
  isExpanded = false,
}: ProjectShowcaseProps) {
  return (
    <div className={cn("project-showcase space-y-4", className)}>
      {/* Action Links */}
      <div
        className={cn(
          "flex flex-wrap gap-2",
          isExpanded && "lg:grid lg:grid-cols-2 lg:gap-4"
        )}
      >
        {contract.liveUrl && (
          <ShowcaseLink
            href={contract.liveUrl}
            label="Test the Creation"
            icon="play"
            variant="primary"
          />
        )}

        {contract.githubUrl && (
          <ShowcaseLink
            href={contract.githubUrl}
            label="Source Scrolls"
            icon="git-icon"
            variant="secondary"
          />
        )}

        {contract.caseStudyUrl && (
          <ShowcaseLink
            href={contract.caseStudyUrl}
            label="Guild Report"
            icon="scrolls"
            variant="tertiary"
          />
        )}
      </div>

      {/* Screenshots Carousel */}
      {contract.screenshots && contract.screenshots.length > 0 && (
        <ScreenshotsCarousel screenshots={contract.screenshots} />
      )}

      {/* Content Sections - Two columns when expanded */}
      <div
        className={cn(
          "space-y-4",
          isExpanded && "lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0"
        )}
      >
        {/* Learning Outcomes */}
        {contract.learningOutcomes && contract.learningOutcomes.length > 0 && (
          <div className="learning-outcomes p-3 bg-leather-700/30 rounded-lg border border-leather-600/50">
            <h4 className="text-septim-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <ElderScrollsIcon name="skills" className="w-4 h-4" />
              Skills Gained
            </h4>
            <ul className="space-y-1">
              {contract.learningOutcomes.slice(0, 3).map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-leather-300 text-xs"
                >
                  <div className="w-1 h-1 bg-septim-400 rounded-full" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Business Impact */}
        {contract.businessImpact && (
          <div className="business-impact p-3 bg-leather-700/30 rounded-lg border border-leather-600/50">
            <h4 className="text-septim-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <ElderScrollsIcon name="contracts" className="w-4 h-4" />
              Business Impact
            </h4>
            <p className="text-leather-300 text-xs">
              {contract.businessImpact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
