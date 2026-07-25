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
  crescent: "Crescent · Amber · patience",
  star: "Four-point star · Green · home",
  bowl: "Bowl · Amber · light",
  "toothed-circle": "Toothed circle · Copper · time",
  teardrop: "Teardrop · Green · growth",
  "five-point-star": "Five-point star · Blue · sky",
  triangle: "Triangle · Violet · truth",
  square: "Square · Blue · structure",
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
    alreadySolved ? "The completed emblem holds every borrowed object in its remembered place." : "",
  );

  function selectArtifact(artifactId: string) {
    if (outerAligned) return;
    setSelectedArtifact(artifactId);
    setFeedback(`${artifacts[artifactId].name} glows ${artifacts[artifactId].glowGroup.toLowerCase()} in your hand.`);
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
    setFeedback(`${artifacts[selectedArtifact].name} settles onto the ${shape.replaceAll("-", " ")} pedestal.`);
  }

  function testRing() {
    if (validateOuterPedestals(placements)) {
      setOuterAligned(true);
      setFeedback("Eight lines of light join around the ring. The central manuscript stand unfolds.");
    } else {
      setFeedback("Several lights cross or fade. Check shape first, then confirm the glow and engraved relationship.");
    }
  }

  function placeJournal() {
    if (!outerAligned || journalOnStand) return;
    const complete = validateReturnBorrowed({ placements, journalOnStand: true });
    if (!complete) return;
    setJournalOnStand(true);
    setFeedback("The Journal opens to its empty page. White-gold ink writes the journey back into the Archive.");
  }

  return (
    <div className="finale-puzzle">
      <div className="finale-puzzle__workspace">
        <div className="finale-ledger">
          <p>The Prism’s hidden catalog</p>
          <span>Shape chooses the place.</span>
          <span>Glow confirms its family.</span>
          <span>The engraving confirms its story.</span>
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
            {journalOnStand ? "Final Manuscript" : outerAligned ? "Place the Leather Journal" : "Manuscript stand sealed"}
          </button>
          <div className="archive-emblem" aria-hidden="true">✦</div>
        </div>

        {!outerAligned && (
          <div className="finale-artifact-tray" aria-label="Artifacts awaiting placement">
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
          <p aria-live="polite">{feedback || "Nine objects wait where the blueprint said the pedestals would rise."}</p>
          {!outerAligned && <button onClick={testRing}>Test the pedestal ring</button>}
          {journalOnStand && !alreadySolved && <button onClick={onComplete}>Enter the living mosaic</button>}
          {journalOnStand && alreadySolved && <button onClick={onEnterStudy}>Enter the Archivist’s Study</button>}
        </div>
      </div>

      <HintPanel hints={finaleHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
