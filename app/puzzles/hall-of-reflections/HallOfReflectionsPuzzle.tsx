"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import { reflectionDifferences, reflectionHints } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

const observations = [
  { id: "backward-clock", label: "Clock hands moving backward", className: "reflection-clock" },
  { id: "wrong-pedestal", label: "Lantern on the star pedestal", className: "reflection-pedestal" },
  { id: "phantom-door", label: "Door visible only in reflection", className: "reflection-door" },
  { id: "seven-point-star", label: "Seven-point star symbol", className: "reflection-star" },
  { id: "unmirrored-label", label: "Readable ARCHIVE label", className: "reflection-label" },
  { id: "reversed-book", label: "Book moved to the opposite side", className: "reflection-book" },
  { id: "reversed-candle", label: "Candle moved to the opposite side", className: "reflection-candle" },
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
    alreadySolved ? "The central glass remembers the five fractures you found." : "",
  );

  function toggleObservation(id: string) {
    if (solved) return;
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setFeedback("");
  }

  function compareReflections() {
    if (validateHallOfReflections(selected)) {
      setSolved(true);
      setFeedback("Five false reflections flare silver. The central mirror releases from the wall.");
      return;
    }
    const falseMarks = selected.filter((id) => !reflectionDifferences.includes(id as typeof reflectionDifferences[number]));
    setFeedback(
      falseMarks.length
        ? "At least one mark is an ordinary consequence of reflection. Position alone is not a contradiction."
        : `${selected.length} deliberate ${selected.length === 1 ? "change has" : "changes have"} been marked. Five disturb the glass.`,
    );
  }

  return (
    <div className="reflections-puzzle">
      <div className="reflections-puzzle__workspace">
        <div className="reflection-instruction">
          <p>Reflection ledger</p>
          <strong>Mark only what a faithful mirror could not produce.</strong>
          <small>{selected.length} / 5 suspected inconsistencies</small>
        </div>

        <div className="paired-halls">
          <section className="comparison-hall comparison-hall--real" aria-label="The real Grand Hall">
            <h3>The Hall</h3>
            <div className="comparison-clock"><i /></div>
            <div className="comparison-pedestal"><i className="mini-compass" /></div>
            <div className="comparison-symbol">★</div>
            <div className="comparison-label">ARCHIVE</div>
            <div className="comparison-book">BOOK</div>
            <div className="comparison-candle" />
          </section>

          <section className="comparison-hall comparison-hall--mirror" aria-label="The reflected Grand Hall">
            <h3>The Reflection</h3>
            {observations.map((observation) => (
              <button
                key={observation.id}
                className={`${observation.className} ${selected.includes(observation.id) ? "is-marked" : ""}`}
                aria-label={observation.label}
                aria-pressed={selected.includes(observation.id)}
                onClick={() => toggleObservation(observation.id)}
                disabled={solved}
              >
                {observation.id === "seven-point-star" ? "✷" :
                  observation.id === "unmirrored-label" ? "ARCHIVE" :
                  observation.id === "reversed-book" ? "KOOB" : ""}
              </button>
            ))}
          </section>
        </div>

        <div className="reflection-actions">
          <p aria-live="polite">{feedback || "The two halls appear almost faithful. Study what mirroring should—and should not—change."}</p>
          {!solved ? <button onClick={compareReflections}>Test the five marks</button> :
            !alreadySolved ? <button onClick={onCollectReward}>Open the central mirror</button> :
              <small>The silver recess is empty.</small>}
        </div>
      </div>

      <HintPanel hints={reflectionHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
