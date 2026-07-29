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
  onContinueToWorkshop,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToWorkshop: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(reflectionMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToWorkshop();
    }, 5200);
  }

  return (
    <section className={`reflections-room ${restored ? "is-restored" : ""}`} aria-labelledby="reflections-title">
      <div className="reflections-room__floor" aria-hidden="true" />
      <div className="reflections-room__mirrors" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="library-room__title">
        <p>Test what meaningfully changed</p>
        <h1 id="reflections-title">QA Review</h1>
        <small>{restored ? "Five actionable defects remain after the noise is removed" : "Not every visual difference is a product defect"}</small>
      </header>

      <Hotspot
        className="central-mirror-hotspot"
        label={solved ? "Inspect the completed defect report" : "Compare the reference with the current build"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="central-mirror" aria-hidden="true"><i /></span>
        <span>{solved ? "Review complete" : "Compare the interfaces"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Team Hub</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Meaningful Difference"
          subtitle="QA Review · Behavioral and visual comparison"
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
          <p>Defect Report</p>
          <blockquote>“Good QA protects meaning, not pixel sameness.”</blockquote>
          <small>The findings expose three system constraints. System Design unlocks.</small>
        </div>
      )}
    </section>
  );
}
