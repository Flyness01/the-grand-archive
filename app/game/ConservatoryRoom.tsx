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
        <p>The glass wing</p>
        <h1 id="conservatory-title">Conservatory</h1>
        <small>{restored ? "Even the forgotten leaves have turned toward light" : "Six plants sleep beneath clouded glass"}</small>
      </header>

      <Hotspot
        className="garden-hotspot"
        label={solved ? "Inspect the restored garden" : "Inspect the sleeping plant beds"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="garden-hotspot__beds" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
        </span>
        <span>{solved ? "The cycle continues" : "Wake the conservatory"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Team Hub
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Sleeping Conservatory"
          subtitle="Conservatory · Cycles and timing"
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
          <div className="specimen-icon specimen-icon--large" aria-hidden="true"><i /></div>
          <p>Botanical Specimen</p>
          <blockquote>“Even forgotten things grow.”</blockquote>
          <small>Vines uncover the Observatory stair. Rain softens against the glass.</small>
        </div>
      )}
    </section>
  );
}
