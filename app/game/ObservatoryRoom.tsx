"use client";

import { useState } from "react";
import { ImpossibleConstellation } from "../puzzles/impossible-constellation/ImpossibleConstellation";
import { impossibleConstellationMosaicTiles } from "../puzzles/impossible-constellation/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";
import { FinalLanternScene } from "./FinalLanternScene";

export function ObservatoryRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueToIncident,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToIncident: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(impossibleConstellationMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToIncident();
    }, 10200);
  }

  return (
    <section className={`observatory-room ${restored ? "is-restored" : ""}`} aria-labelledby="observatory-title">
      <div className="trace-lab-grid" aria-hidden="true" />
      <div className="observatory-room__platform" aria-hidden="true" />
      <header className="library-room__title">
        <p>Bring five moments into one shared story</p>
        <h1 id="observatory-title">Timeline Room</h1>
        <small>{restored ? "The team story is complete" : "The same journey is recorded from three different viewpoints"}</small>
      </header>

      <Hotspot
        className="telescope-hotspot trace-console-hotspot"
        label={solved ? "Inspect the completed shared timeline" : "Align the shared timeline"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="trace-console" aria-hidden="true"><i /><i /><i /></span>
        <span>{solved ? "Story complete" : "Open the timelines"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Project Room
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Shared Timeline"
          subtitle="Chapter 5 of 5 · Bring the story together"
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

      {rewardMoment && <FinalLanternScene />}
    </section>
  );
}
