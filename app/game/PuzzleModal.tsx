"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { puzzleInstructions } from "../puzzles/instructions";

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
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const instructions = puzzleInstructions[title];

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
        {instructionsOpen && instructions && (
          <div className="puzzle-guide" role="dialog" aria-modal="true" aria-labelledby="puzzle-guide-title">
            <article>
              <small>Before you begin</small>
              <h3 id="puzzle-guide-title">How this puzzle works</h3>
              <p>{instructions.objective}</p>
              <ol>
                {instructions.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <aside><b>Useful clue</b>{instructions.tip}</aside>
              <button onClick={() => setInstructionsOpen(false)}>Begin puzzle</button>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}
