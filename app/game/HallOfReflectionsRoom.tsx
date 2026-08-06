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
        <p>Turn a noisy test run into a visible pattern</p>
        <h1 id="reflections-title">CI Test Lab</h1>
        <small>{restored ? "The shared failure pattern is documented" : "Twenty-five results are hidden behind row and column clues"}</small>
      </header>

      <Hotspot
        className="central-mirror-hotspot qa-console-hotspot"
        label={solved ? "Inspect the completed CI pattern report" : "Reconstruct the hidden CI failures"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="qa-review-console" aria-hidden="true"><i /><i /><i /></span>
        <span>{solved ? "Pattern found" : "Open the test grid"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Project Room</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The CI Failure Pattern"
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
          <p>CI Pattern Report</p>
          <blockquote>“A confusing test run became useful once the pattern was visible.”</blockquote>
          <small>The shared failure is isolated. Release Cycle unlocks.</small>
        </div>
      )}
    </section>
  );
}
