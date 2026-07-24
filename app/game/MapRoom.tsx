"use client";

import { useState } from "react";
import { CartographersRoute } from "../puzzles/cartographers-route/CartographersRoute";
import { cartographersRouteMosaicTiles } from "../puzzles/cartographers-route/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function MapRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(cartographersRouteMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
    }, 2300);
  }

  return (
    <section
      className={`map-room ${restored ? "is-restored" : ""}`}
      aria-labelledby="map-room-title"
    >
      <div className="map-room__walls" aria-hidden="true" />
      <div className="map-room__globe" aria-hidden="true"><i /></div>
      <div className="map-room__table" aria-hidden="true" />
      <header className="library-room__title">
        <p>The western gallery</p>
        <h1 id="map-room-title">Map Room</h1>
        <small>{restored ? "Forgotten roads return to the parchment" : "The shortest road is not always the right one"}</small>
      </header>

      <Hotspot
        className="map-hotspot"
        label={solved ? "Inspect the restored route map" : "Inspect the unfinished antique map"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="map-hotspot__paper" aria-hidden="true" />
        <span>{solved ? "Restored route" : "Trace the missing route"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Grand Hall
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Cartographer’s Missing Route"
          subtitle="Map Room · Spatial reasoning"
          onClose={() => setPuzzleOpen(false)}
        >
          <CartographersRoute
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment" role="status">
          <div className="compass-icon compass-icon--large" aria-hidden="true"><i /></div>
          <p>Navigator’s Compass</p>
          <blockquote>“It always pointed home.”</blockquote>
          <small>A mechanism turns beneath the Grand Hall floor.</small>
        </div>
      )}
    </section>
  );
}
