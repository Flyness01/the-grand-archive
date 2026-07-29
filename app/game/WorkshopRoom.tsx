"use client";

import { useState } from "react";
import { stoppedClockMosaicTiles } from "../puzzles/stopped-clock/puzzleData";
import { StoppedClock } from "../puzzles/stopped-clock/StoppedClock";
import { MasterBlueprint } from "../puzzles/master-blueprint/MasterBlueprint";
import { masterBlueprintMosaicTiles } from "../puzzles/master-blueprint/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function WorkshopRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueToConservatory,
  blueprintUnlocked,
  blueprintSolved,
  blueprintHintCount,
  onUseBlueprintHint,
  onSolveBlueprint,
  onContinueToGrandHall,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToConservatory: () => void;
  blueprintUnlocked: boolean;
  blueprintSolved: boolean;
  blueprintHintCount: number;
  onUseBlueprintHint: () => void;
  onSolveBlueprint: (mosaicTileIds: number[]) => void;
  onContinueToGrandHall: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [blueprintRewardMoment, setBlueprintRewardMoment] = useState(false);

  function collectReward() {
    onSolve(stoppedClockMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToConservatory();
    }, 5200);
  }

  function collectBlueprintReward() {
    onSolveBlueprint(masterBlueprintMosaicTiles);
    setBlueprintRewardMoment(true);
    window.setTimeout(() => {
      setBlueprintRewardMoment(false);
      setBlueprintOpen(false);
      onContinueToGrandHall();
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
        <p>Recover a failing system</p>
        <h1 id="workshop-title">Build Lab</h1>
        <small>{restored ? "The incident is resolved and documented" : "Production is down, but the timeline tells the story"}</small>
      </header>

      <Hotspot
        className="clock-hotspot"
        label={solved ? "Inspect the resolved incident" : "Inspect the active production incident"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="master-clock" aria-hidden="true"><i /><b /></span>
        <span>{solved ? "Incident resolved" : "Recover the services"}</span>
      </Hotspot>

      {blueprintUnlocked && (
        <Hotspot
          className="drafting-hotspot"
          label={blueprintSolved ? "Inspect the completed Master Blueprint" : "Inspect the transparent drafting plans"}
          onActivate={() => setBlueprintOpen(true)}
        >
          <span className="drafting-table" aria-hidden="true"><i /><i /><i /></span>
          <span>{blueprintSolved ? "The instruction remains visible" : "Three plans share one set of pins"}</span>
        </Hotspot>
      )}

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Team Hub
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="Incident 14"
          subtitle="Build Lab · Debugging a dependency cascade"
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
          <div className="incident-review-icon incident-review-icon--large" aria-hidden="true">✓</div>
          <p>Incident Review</p>
          <blockquote>“The timeline turned a production failure into a lesson the team could reuse.”</blockquote>
          <small>The recovery becomes a runbook. Release Cycle unlocks.</small>
        </div>
      )}

      {blueprintOpen && (
        <PuzzleModal
          title="The Master Blueprint"
          subtitle="Workshop Drafting Chamber · Transparent-layer alignment"
          onClose={() => setBlueprintOpen(false)}
        >
          <MasterBlueprint
            hintCount={blueprintHintCount}
            onUseHint={onUseBlueprintHint}
            onCollectReward={collectBlueprintReward}
            alreadySolved={blueprintSolved}
          />
        </PuzzleModal>
      )}

      {blueprintRewardMoment && (
        <div className="reward-moment reward-moment--blueprint" role="status">
          <div className="blueprint-icon blueprint-icon--large" aria-hidden="true"><i /><i /><i /></div>
          <p>Master Blueprint</p>
          <blockquote>“The building knew the answer.”</blockquote>
          <small>Every pedestal rises. Their base shapes wait for the borrowed objects.</small>
        </div>
      )}
    </section>
  );
}
