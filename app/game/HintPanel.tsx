"use client";

export function HintPanel({
  hints,
  revealedCount,
  onReveal,
}: {
  hints: string[];
  revealedCount: number;
  onReveal: () => void;
}) {
  return (
    <aside className="hint-panel" aria-label="Hints">
      <div className="hint-panel__heading">
        <span>Team notes</span>
        <small>{revealedCount} / {hints.length}</small>
      </div>
      {revealedCount === 0 ? (
        <p className="hint-panel__empty">
          A gentle nudge is available whenever you want it.
        </p>
      ) : (
        <ol>
          {hints.slice(0, revealedCount).map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ol>
      )}
      {revealedCount < hints.length && (
        <button onClick={onReveal}>
          Reveal hint {revealedCount + 1}
        </button>
      )}
    </aside>
  );
}
