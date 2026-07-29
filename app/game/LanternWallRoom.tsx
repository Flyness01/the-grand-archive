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
        title="The Lantern Wall"
        subtitle="Team Hub · Light and shadow"
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
          <div className="brass-lantern-icon brass-lantern-icon--large" aria-hidden="true"><i /></div>
          <p>Brass Lantern</p>
          <blockquote>“Light remembers every hand.”</blockquote>
          <small>The Team Hub brightens. The Workshop door unlocks.</small>
        </div>
      )}
    </>
  );
}
