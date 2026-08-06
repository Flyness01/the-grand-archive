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
  onContinueToGrandHall,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToGrandHall: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(cartographersRouteMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToGrandHall();
    }, 5200);
  }

  return (
    <section
      className={`map-room ${restored ? "is-restored" : ""}`}
      aria-labelledby="map-room-title"
    >
      <div className="map-room__walls" aria-hidden="true" />
      <div className="map-room__network" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="map-room__table" aria-hidden="true" />
      <header className="library-room__title">
        <p>Trace an unfamiliar system</p>
        <h1 id="map-room-title">System Map</h1>
        <small>{restored ? "The request path is documented" : "A shortcut is not useful until you understand its boundaries"}</small>
      </header>

      <Hotspot
        className="map-hotspot"
        label={solved ? "Inspect the documented request flow" : "Inspect the incomplete system diagram"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="map-hotspot__paper" aria-hidden="true" />
        <span>{solved ? "Documented flow" : "Trace the request"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Project Room
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Missing Request Path"
          subtitle="Chapter 2 of 5 · Trace the system"
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
          <div className="flow-trace-icon flow-trace-icon--large" aria-hidden="true"><i /></div>
          <p>Flow Trace</p>
          <blockquote>“A working route is useful. An understood route is reusable.”</blockquote>
          <small>The trace reveals four conflicting signals. Signal Alignment unlocks.</small>
        </div>
      )}
    </section>
  );
}
