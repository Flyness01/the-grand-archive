"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import { reflectionDifferences, reflectionHints } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

const observations = [
  { id: "backward-clock", label: "Progress indicator runs backward", className: "reflection-clock" },
  { id: "wrong-pedestal", label: "Action appears in the wrong container", className: "reflection-pedestal" },
  { id: "phantom-door", label: "Navigation control exists only in the build", className: "reflection-door" },
  { id: "seven-point-star", label: "Status icon has the wrong number of points", className: "reflection-star" },
  { id: "unmirrored-label", label: "Encoded label is unexpectedly readable", className: "reflection-label" },
  { id: "reversed-book", label: "Content shifts to the corresponding side", className: "reflection-book" },
  { id: "reversed-candle", label: "Decoration shifts to the corresponding side", className: "reflection-candle" },
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
  const [selected, setSelected] = useState<string[]>(alreadySolved ? [...reflectionDifferences] : []);
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The review preserves the five meaningful defects you found." : "",
  );

  function toggleObservation(id: string) {
    if (solved) return;
    if (selected.includes(id)) {
      setSelected((current) => current.filter((item) => item !== id));
      setFeedback("");
      return;
    }
    if (selected.length >= 5) {
      setFeedback("The report can contain only five defects. Remove one selection before adding another.");
      return;
    }
    setSelected((current) => [...current, id]);
    setFeedback("");
  }

  function compareReflections() {
    if (validateHallOfReflections(selected)) {
      setSolved(true);
      setFeedback("Five meaningful defects remain after visual noise is removed. The QA review is ready.");
      return;
    }
    const falseMarks = selected.filter((id) => !reflectionDifferences.includes(id as typeof reflectionDifferences[number]));
    setFeedback(
      falseMarks.length
        ? "At least one selection is expected responsive behavior. A position change alone is not a defect."
        : `${selected.length} meaningful ${selected.length === 1 ? "difference has" : "differences have"} been marked. The review contains five defects.`,
    );
  }

  return (
    <div className="reflections-puzzle">
      <div className="reflections-puzzle__workspace">
        <div className="reflection-instruction">
          <p>QA comparison</p>
          <strong>Mark only differences that change behavior, meaning, or available actions.</strong>
          <small>{selected.length} / 5 suspected defects</small>
        </div>

        <div className="paired-halls">
          <section className="comparison-hall comparison-hall--real" aria-label="Approved interface reference">
            <h3>Reference</h3>
            <div className="comparison-clock"><i /></div>
            <div className="comparison-pedestal"><i className="mini-compass" /></div>
            <div className="comparison-symbol">★</div>
            <div className="comparison-label">STATUS</div>
            <div className="comparison-book">CARD</div>
            <div className="comparison-candle" />
          </section>

          <section className="comparison-hall comparison-hall--mirror" aria-label="Current implementation build">
            <h3>Current Build</h3>
            {observations.map((observation) => (
              <button
                key={observation.id}
                className={`${observation.className} ${selected.includes(observation.id) ? "is-marked" : ""}`}
                aria-label={observation.label}
                aria-pressed={selected.includes(observation.id)}
                onClick={() => toggleObservation(observation.id)}
                disabled={solved || (selected.length >= 5 && !selected.includes(observation.id))}
              >
                {observation.id === "seven-point-star" ? "✷" :
                  observation.id === "unmirrored-label" ? "STATUS" :
                  observation.id === "reversed-book" ? "DRAC" : ""}
              </button>
            ))}
          </section>
        </div>

        <div className="reflection-actions">
          <p aria-live="polite">{feedback || "The reference and current build are close. Separate real defects from expected layout changes."}</p>
          {!solved ? <button onClick={compareReflections}>Run QA review</button> :
            !alreadySolved ? <button onClick={onCollectReward}>Save defect report</button> :
              <small>The defect report has been saved.</small>}
        </div>
      </div>

      <HintPanel hints={reflectionHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
