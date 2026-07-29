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
      <div className="observatory-room__dome" aria-hidden="true"><i /><i /><i /></div>
      <div className="observatory-room__stars" aria-hidden="true" />
      <div className="observatory-room__platform" aria-hidden="true" />
      <header className="library-room__title">
        <p>Find signal inside noise</p>
        <h1 id="observatory-title">Pattern Review</h1>
        <small>{restored ? "The recurring behavior is now reproducible" : "One production trace matches no known healthy pattern"}</small>
      </header>

      <Hotspot
        className="telescope-hotspot"
        label={solved ? "Inspect the documented production pattern" : "Inspect the unclassified telemetry"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="telescope" aria-hidden="true"><i /></span>
        <span>{solved ? "Pattern documented" : "Group the telemetry"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Team Hub
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Unclassified Trace"
          subtitle="Pattern Review · Rotation and abstraction"
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
          <p>Pattern Report</p>
          <blockquote>“Noise became useful when the right context made it repeatable.”</blockquote>
          <small>The finding needs a clear handoff. Team Lead’s Office unlocks.</small>
        </div>
      )}
    </section>
  );
}
