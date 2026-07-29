"use client";

import type { ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement, useState } from "react";
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
  const [restartOpen, setRestartOpen] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [replayMode, setReplayMode] = useState(false);
  const instructions = puzzleInstructions[title];
  const puzzle = isValidElement(children)
    ? cloneElement(
        children as ReactElement<{ alreadySolved?: boolean }>,
        {
          key: attempt,
          ...(replayMode ? { alreadySolved: false } : {}),
        },
      )
    : children;

  function restartPuzzle() {
    setReplayMode(true);
    setAttempt((current) => current + 1);
    setInstructionsOpen(true);
    setRestartOpen(false);
  }

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
          <div className="puzzle-modal__tools">
            <button onClick={() => setRestartOpen(true)}>Restart level</button>
            <button onClick={onClose} aria-label="Close puzzle">×</button>
          </div>
        </header>
        {puzzle}
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
        {restartOpen && (
          <div className="puzzle-restart-backdrop">
            <article role="alertdialog" aria-modal="true" aria-labelledby="restart-level-title">
              <small>Only this level</small>
              <h3 id="restart-level-title">Restart this puzzle?</h3>
              <p>Your overall story progress, collected wins, and other completed puzzles will stay exactly as they are.</p>
              <div>
                <button onClick={() => setRestartOpen(false)}>Keep playing</button>
                <button onClick={restartPuzzle}>Restart level</button>
              </div>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}
