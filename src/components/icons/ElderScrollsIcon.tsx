"use client";

import { useState } from "react";
import Image from "next/image";
import { elderScrollsIcons, fallbackIcons } from "@/lib/icons";

interface ElderScrollsIconProps {
  name: keyof typeof elderScrollsIcons | string;
  className?: string;
  fallback?: string;
  size?: number;
}

export function ElderScrollsIcon({
  name,
  className,
  fallback,
  size = 24,
}: ElderScrollsIconProps) {
  const [error, setError] = useState(false);

  // Check if the name exists in our icon mappings
  const isValidIcon = name in elderScrollsIcons;
  const fallbackIcon =
    fallback ||
    (isValidIcon ? fallbackIcons[name as keyof typeof fallbackIcons] : "📖") ||
    "📖";

  // If it's not a valid icon or there's an error, show fallback
  if (!isValidIcon || error) {
    return (
      <span
        className={className}
        style={{ fontSize: `${size}px`, lineHeight: 1 }}
        role="img"
        aria-label={`${name} icon`}
      >
        {fallbackIcon}
      </span>
    );
  }

  return (
    <Image
      src={elderScrollsIcons[name as keyof typeof elderScrollsIcons]}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      onError={() => setError(true)}
    />
  );
}
