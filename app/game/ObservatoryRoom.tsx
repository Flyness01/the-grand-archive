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
        <p>The highest chamber</p>
        <h1 id="observatory-title">Observatory</h1>
        <small>{restored ? "The dome stands open to an impossible sky" : "One cluster belongs to no recorded heaven"}</small>
      </header>

      <Hotspot
        className="telescope-hotspot"
        label={solved ? "Inspect the aligned star dome" : "Inspect the unfiled constellation"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="telescope" aria-hidden="true"><i /></span>
        <span>{solved ? "The quill remains above" : "Rotate the star dome"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Grand Hall
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Constellation That Should Not Exist"
          subtitle="Observatory · Rotation and abstraction"
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
          <div className="star-chart-icon star-chart-icon--large" aria-hidden="true"><i /><i /><i /></div>
          <p>Star Chart</p>
          <blockquote>“The sky kept its records.”</blockquote>
          <small>The Observatory dome opens. Stars appear above the Grand Hall.</small>
        </div>
      )}
    </section>
  );
}
