"use client";

import type { ReactNode } from "react";

export function PuzzleModal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="puzzle-backdrop" onMouseDown={onClose}>
      <section
        className="puzzle-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="puzzle-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="puzzle-modal__header">
          <div>
            <p>{subtitle}</p>
            <h2 id="puzzle-title">{title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close puzzle">
            ×
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
