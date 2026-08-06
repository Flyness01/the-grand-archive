"use client";

import { useState } from "react";
import { ImpossibleConstellation } from "../puzzles/impossible-constellation/ImpossibleConstellation";
import { impossibleConstellationMosaicTiles } from "../puzzles/impossible-constellation/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function ObservatoryRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueToOffice,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToOffice: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(impossibleConstellationMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToOffice();
    }, 5200);
  }

  return (
    <section className={`observatory-room ${restored ? "is-restored" : ""}`} aria-labelledby="observatory-title">
      <div className="trace-lab-grid" aria-hidden="true" />
      <div className="observatory-room__platform" aria-hidden="true" />
      <header className="library-room__title">
        <p>Observe what happened after shipping</p>
        <h1 id="observatory-title">Production Review</h1>
        <small>{restored ? "The post-release finding is documented" : "The release is live, but one production signal has changed"}</small>
      </header>

      <Hotspot
        className="telescope-hotspot trace-console-hotspot"
        label={solved ? "Inspect the documented production finding" : "Review the post-release dashboard"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="trace-console" aria-hidden="true"><i /><i /><i /></span>
        <span>{solved ? "Finding documented" : "Review production"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Project Room
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Post-Release Check"
          subtitle="Chapter 6 of 10 · Observe production"
          onClose={() => setPuzzleOpen(false)}
        >
          <ImpossibleConstellation
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment reward-moment--stars" role="status">
          <div className="pattern-report-icon pattern-report-icon--large" aria-hidden="true"><i /><i /><i /></div>
          <p>Production Finding</p>
          <blockquote>“Shipping became learning when the team stayed to read the signals.”</blockquote>
          <small>The finding needs a clear handoff. Team Lead’s Office unlocks.</small>
        </div>
      )}
    </section>
  );
}
