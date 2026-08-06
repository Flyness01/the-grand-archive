"use client";

import { useState } from "react";
import { artifacts } from "../../artifacts/artifactRegistry";
import { HintPanel } from "../../game/HintPanel";
import {
  finaleHints,
  outerArtifactIds,
  pedestalSolution,
} from "./puzzleData";
import { validateOuterPedestals, validateReturnBorrowed } from "./validator";

const pedestalLabels: Record<string, string> = {
  crescent: "Crescent · learning the context",
  path: "Connected path · tracing the system",
  bowl: "Bowl · aligning the team",
  "toothed-circle": "Toothed circle · recovering production",
  teardrop: "Teardrop · shipping responsibly",
  loop: "Loop · finding repeated behavior",
  triangle: "Triangle · protecting quality",
  square: "Square · designing the system",
};

export function ReturnBorrowed({
  hintCount,
  onUseHint,
  onComplete,
  onEnterStudy,
  alreadySolved,
}: {
  hintCount: number;
  onUseHint: () => void;
  onComplete: () => void;
  onEnterStudy: () => void;
  alreadySolved: boolean;
}) {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>(
    alreadySolved ? { ...pedestalSolution } : {},
  );
  const [outerAligned, setOuterAligned] = useState(alreadySolved);
  const [journalOnStand, setJournalOnStand] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The final review holds every lesson in its place." : "",
  );

  function selectArtifact(artifactId: string) {
    if (outerAligned) return;
    setSelectedArtifact(artifactId);
    setFeedback(`${artifacts[artifactId].name} is selected for the final review.`);
  }

  function placeOnPedestal(shape: string) {
    if (!selectedArtifact || outerAligned) return;
    const next = { ...placements };
    for (const [placedShape, artifactId] of Object.entries(next)) {
      if (artifactId === selectedArtifact) delete next[placedShape];
    }
    next[shape] = selectedArtifact;
    setPlacements(next);
    setSelectedArtifact(null);
    setFeedback(`${artifacts[selectedArtifact].name} is connected to the ${shape.replaceAll("-", " ")} lesson.`);
  }

  function testRing() {
    if (validateOuterPedestals(placements)) {
      setOuterAligned(true);
      setFeedback("Eight lessons form one coherent body of work. The central handoff is ready.");
    } else {
      setFeedback("Some records do not support the lesson beneath them. Check the symbol, then the relationship each record represents.");
    }
  }

  function placeJournal() {
    if (!outerAligned || journalOnStand) return;
    const complete = validateReturnBorrowed({ placements, journalOnStand: true });
    if (!complete) return;
    setJournalOnStand(true);
    setFeedback("The Handoff Note connects every lesson into one final project story. The review is complete.");
  }

  return (
    <div className="finale-puzzle">
      <div className="finale-puzzle__workspace">
        <div className="finale-ledger">
          <p>Final project review</p>
          <span>Match each record to the lesson it proves.</span>
          <span>Use its symbol as the first clue.</span>
          <span>Use its meaning to confirm the relationship.</span>
        </div>

        <div className={`artifact-ring ${outerAligned ? "is-aligned" : ""} ${journalOnStand ? "is-complete" : ""}`}>
          {Object.keys(pedestalSolution).map((shape, index) => {
            const artifactId = placements[shape];
            return (
              <button
                key={shape}
                className={`final-pedestal final-pedestal--${index + 1} ${artifactId ? "is-filled" : ""}`}
                aria-label={`${pedestalLabels[shape]} pedestal${artifactId ? ` holding ${artifacts[artifactId].name}` : ""}`}
                onClick={() => placeOnPedestal(shape)}
                disabled={outerAligned}
              >
                <i className={`pedestal-shape pedestal-shape--${shape}`} />
                <span>{artifactId ? artifacts[artifactId].name : pedestalLabels[shape]}</span>
              </button>
            );
          })}
          <button
            className={`manuscript-stand ${outerAligned ? "is-open" : ""} ${journalOnStand ? "is-filled" : ""}`}
            onClick={placeJournal}
            disabled={!outerAligned || journalOnStand}
          >
            {journalOnStand ? "Project Retrospective" : outerAligned ? "Complete with the Handoff Note" : "Final handoff locked"}
          </button>
          <div className="archive-emblem" aria-hidden="true">↝</div>
        </div>

        {!outerAligned && (
          <div className="finale-artifact-tray" aria-label="Project records awaiting review">
            {outerArtifactIds.map((artifactId) => {
              const placed = Object.values(placements).includes(artifactId);
              return (
                <button
                  key={artifactId}
                  className={`${selectedArtifact === artifactId ? "is-selected" : ""} ${placed ? "is-placed" : ""}`}
                  onClick={() => selectArtifact(artifactId)}
                >
                  <i className={`artifact-token artifact-token--${artifacts[artifactId].glowGroup.toLowerCase()}`} />
                  {artifacts[artifactId].name}
                  <small>{artifacts[artifactId].pedestalShape.replaceAll("-", " ")}</small>
                </button>
              );
            })}
          </div>
        )}

        <div className="finale-actions">
          <p aria-live="polite">{feedback || "Nine records are ready to become one final project story."}</p>
          {!outerAligned && <button onClick={testRing}>Review the connections</button>}
          {journalOnStand && !alreadySolved && <button onClick={onComplete}>Complete the project story</button>}
          {journalOnStand && alreadySolved && <button onClick={onEnterStudy}>Enter the Debrief Room</button>}
        </div>
      </div>

      <HintPanel hints={finaleHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
