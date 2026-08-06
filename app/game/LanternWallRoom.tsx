"use client";

import { useState } from "react";
import { LanternWall } from "../puzzles/lantern-wall/LanternWall";
import { lanternWallMosaicTiles } from "../puzzles/lantern-wall/puzzleData";
import { PuzzleModal } from "./PuzzleModal";

export function LanternWallRoom({
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onClose,
  onContinueToWorkshop,
}: {
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onClose: () => void;
  onContinueToWorkshop: () => void;
}) {
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(lanternWallMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      onClose();
      onContinueToWorkshop();
    }, 5200);
  }

  return (
    <>
      <PuzzleModal
        title="Signal Alignment"
        subtitle="Chapter 3 of 5 · Align the team"
        onClose={onClose}
      >
        <LanternWall
          hintCount={hintCount}
          onUseHint={onUseHint}
          onCollectReward={collectReward}
          alreadySolved={solved}
        />
      </PuzzleModal>
      {rewardMoment && (
        <div className="reward-moment reward-moment--lantern" role="status">
          <div className="alignment-note-icon alignment-note-icon--large" aria-hidden="true"><i /></div>
          <p>Alignment Note</p>
          <blockquote>“Alignment begins when everyone can describe the same outcome.”</blockquote>
          <small>The decision is clear. Build Lab unlocks.</small>
        </div>
      )}
    </>
  );
}
