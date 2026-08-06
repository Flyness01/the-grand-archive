"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import { qaFindings, qaReviewSolution, reflectionHints, type ReviewDisposition } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

const dispositions: { value: ReviewDisposition; label: string }[] = [
  { value: "blocker", label: "Block release" },
  { value: "follow-up", label: "Track follow-up" },
  { value: "expected", label: "Expected change" },
];

export function HallOfReflectionsPuzzle({
  hintCount,
  onUseHint,
  onCollectReward,
  alreadySolved,
}: {
  hintCount: number;
  onUseHint: () => void;
  onCollectReward: () => void;
  alreadySolved: boolean;
}) {
  const [review, setReview] = useState<Record<string, ReviewDisposition>>(
    alreadySolved ? { ...qaReviewSolution } : {},
  );
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The release readiness decision remains documented." : "",
  );

  function classify(id: string, disposition: ReviewDisposition) {
    if (solved) return;
    setReview((current) => ({ ...current, [id]: disposition }));
    setFeedback("");
  }

  function submitReview() {
    if (validateHallOfReflections(review)) {
      setSolved(true);
      setFeedback("Review complete: five blockers stop the release, two polish items become follow-ups, and one approved change is accepted.");
      return;
    }
    setFeedback("At least one disposition does not match its acceptance criterion. Prioritize user access, required behavior, privacy, and integration contracts.");
  }

  const completed = Object.keys(review).length;

  return (
    <div className="reflections-puzzle qa-review-puzzle">
      <div className="reflections-puzzle__workspace qa-review-workspace">
        <header className="qa-review-header">
          <p>PR #284 · release candidate 2.7</p>
          <strong>Classify every finding by release impact.</strong>
          <small>{completed} / {qaFindings.length} dispositions recorded</small>
        </header>

        <div className="qa-findings" role="list" aria-label="QA findings">
          {qaFindings.map((finding, index) => (
            <article key={finding.id} role="listitem" className={review[finding.id] ? "is-reviewed" : ""}>
              <div className="qa-finding-copy">
                <span>{String(index + 1).padStart(2, "0")} · {finding.area}</span>
                <b>{finding.criterion}</b>
                <p>{finding.observed}</p>
              </div>
              <div className="qa-dispositions" aria-label={`Disposition for ${finding.area}`}>
                {dispositions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={review[finding.id] === option.value ? `is-selected is-${option.value}` : ""}
                    aria-pressed={review[finding.id] === option.value}
                    onClick={() => classify(finding.id, option.value)}
                    disabled={solved}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="reflection-actions">
          <p aria-live="polite">{feedback || "Use the requirement and observed evidence—not visual difference alone—to decide release impact."}</p>
          {!solved ? (
            <button onClick={submitReview} disabled={completed !== qaFindings.length}>Submit release review</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Save readiness report</button>
          ) : (
            <small>The readiness report has been saved.</small>
          )}
        </div>
      </div>

      <HintPanel hints={reflectionHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
