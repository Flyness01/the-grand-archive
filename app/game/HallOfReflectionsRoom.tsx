"use client";

import { useState } from "react";
import { HallOfReflectionsPuzzle } from "../puzzles/hall-of-reflections/HallOfReflectionsPuzzle";
import { reflectionMosaicTiles } from "../puzzles/hall-of-reflections/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function HallOfReflectionsRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueToRelease,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToRelease: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(reflectionMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToRelease();
    }, 5200);
  }

  return (
    <section className={`reflections-room ${restored ? "is-restored" : ""}`} aria-labelledby="reflections-title">
      <div className="qa-room__grid" aria-hidden="true" />
      <div className="qa-room__panels" aria-hidden="true"><i /><i /><i /></div>
      <header className="library-room__title">
        <p>Decide whether the release candidate is ready</p>
        <h1 id="reflections-title">QA Review</h1>
        <small>{restored ? "The blockers and follow-ups are documented" : "Not every finding has the same release impact"}</small>
      </header>

      <Hotspot
        className="central-mirror-hotspot qa-console-hotspot"
        label={solved ? "Inspect the completed readiness report" : "Review the release candidate findings"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="qa-review-console" aria-hidden="true"><i /><i /><i /></span>
        <span>{solved ? "Review complete" : "Classify the findings"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Project Room</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Release Readiness Review"
          subtitle="Chapter 5 of 10 · Protect quality"
          onClose={() => setPuzzleOpen(false)}
        >
          <HallOfReflectionsPuzzle
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment reward-moment--prism" role="status">
          <div className="defect-report-icon defect-report-icon--large" aria-hidden="true"><i /></div>
          <p>Readiness Report</p>
          <blockquote>“Good QA turns evidence into a release decision.”</blockquote>
          <small>The meaningful defects are resolved. Release Cycle unlocks.</small>
        </div>
      )}
    </section>
  );
}
