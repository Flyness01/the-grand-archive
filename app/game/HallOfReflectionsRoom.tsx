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
        <p>The hidden layer</p>
        <h1 id="reflections-title">Hall of Reflections</h1>
        <small>{restored ? "Five silver fractures remain visible in the glass" : "Not every reversal belongs to the mirror"}</small>
      </header>

      <Hotspot
        className="central-mirror-hotspot"
        label={solved ? "Inspect the opened central mirror" : "Inspect the altered reflections"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="central-mirror" aria-hidden="true"><i /></span>
        <span>{solved ? "The silver recess is open" : "Compare the hall with its reflection"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Grand Hall</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Hall of Reflections"
          subtitle="Hall of Reflections · Difference and perspective"
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
          <div className="prism-icon prism-icon--large" aria-hidden="true"><i /></div>
          <p>Prism Lens</p>
          <blockquote>“Truth changes with the angle.”</blockquote>
          <small>Hidden markings appear on the artifacts. A drafting chamber wakes below.</small>
        </div>
      )}
    </section>
  );
}
