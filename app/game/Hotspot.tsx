"use client";

import type { ReactNode } from "react";

interface HotspotProps {
  label: string;
  className?: string;
  onActivate: () => void;
  children: ReactNode;
}

export function Hotspot({
  label,
  className = "",
  onActivate,
  children,
}: HotspotProps) {
  return (
    <button
      className={`hotspot ${className}`}
      aria-label={label}
      onClick={onActivate}
    >
      {children}
    </button>
  );
}
