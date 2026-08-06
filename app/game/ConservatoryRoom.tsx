"use client";

import { useState } from "react";
import { SleepingConservatory } from "../puzzles/sleeping-conservatory/SleepingConservatory";
import { sleepingConservatoryMosaicTiles } from "../puzzles/sleeping-conservatory/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function ConservatoryRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueToObservatory,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToObservatory: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(sleepingConservatoryMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToObservatory();
    }, 5200);
  }

  return (
    <section className={`conservatory-room ${restored ? "is-restored" : ""}`} aria-labelledby="conservatory-title">
      <div className="conservatory-room__glass" aria-hidden="true" />
      <div className="conservatory-room__vines" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index}><i /></span>)}
      </div>
      <header className="library-room__title">
        <p>Ship with intention</p>
        <h1 id="conservatory-title">Release Cycle</h1>
        <small>{restored ? "The release is healthy in production" : "Six gates stand between a change and its users"}</small>
      </header>

      <Hotspot
        className="garden-hotspot"
        label={solved ? "Inspect the completed release record" : "Inspect the release checklist"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="garden-hotspot__beds" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
        </span>
        <span>{solved ? "Release healthy" : "Run the release"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Project Room
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Release Runbook"
          subtitle="Chapter 5 of 10 · Ship responsibly"
          onClose={() => setPuzzleOpen(false)}
        >
          <SleepingConservatory
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment reward-moment--specimen" role="status">
          <div className="release-record-icon release-record-icon--large" aria-hidden="true"><i /></div>
          <p>Release Record</p>
          <blockquote>“Shipping well means staying present after deploy.”</blockquote>
          <small>The release is live. The Post-Release Check unlocks.</small>
        </div>
      )}
    </section>
  );
}
