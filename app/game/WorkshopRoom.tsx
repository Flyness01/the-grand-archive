"use client";

import { useState } from "react";
import { stoppedClockMosaicTiles } from "../puzzles/stopped-clock/puzzleData";
import { StoppedClock } from "../puzzles/stopped-clock/StoppedClock";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function WorkshopRoom({
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
    onSolve(stoppedClockMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
    }, 5200);
  }

  return (
    <section className={`workshop-room ${restored ? "is-restored" : ""}`} aria-labelledby="workshop-title">
      <div className="workshop-room__wall" aria-hidden="true" />
      <div className="workshop-room__clocks" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <span key={index}><i /></span>)}
      </div>
      <div className="workshop-room__bench" aria-hidden="true" />
      <header className="library-room__title">
        <p>The mechanical wing</p>
        <h1 id="workshop-title">Workshop</h1>
        <small>{restored ? "Every measured second has returned" : "The clocks stopped in sympathy"}</small>
      </header>

      <Hotspot
        className="clock-hotspot"
        label={solved ? "Inspect the repaired master clock" : "Inspect the stopped master clock"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="master-clock" aria-hidden="true"><i /><b /></span>
        <span>{solved ? "The movement is running" : "Repair the stopped clock"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Grand Hall
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Stopped Clock"
          subtitle="Workshop · Mechanical sequencing"
          onClose={() => setPuzzleOpen(false)}
        >
          <StoppedClock
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment reward-moment--gear" role="status">
          <div className="clockwork-gear-icon clockwork-gear-icon--large" aria-hidden="true">IV</div>
          <p>Clockwork Gear</p>
          <blockquote>“Someone stopped time.”</blockquote>
          <small>Clocks answer throughout the Archive. The Conservatory stirs.</small>
        </div>
      )}
    </section>
  );
}

