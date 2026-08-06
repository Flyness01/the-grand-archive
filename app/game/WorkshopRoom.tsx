"use client";

import { useState } from "react";
import { stoppedClockMosaicTiles } from "../puzzles/stopped-clock/puzzleData";
import { StoppedClock } from "../puzzles/stopped-clock/StoppedClock";
import { MasterBlueprint } from "../puzzles/master-blueprint/MasterBlueprint";
import { masterBlueprintMosaicTiles } from "../puzzles/master-blueprint/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function WorkshopRoom({
  entryTarget,
  incidentUnlocked,
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueAfterIncident,
  blueprintUnlocked,
  blueprintSolved,
  blueprintHintCount,
  onUseBlueprintHint,
  onSolveBlueprint,
  onContinueAfterBlueprint,
}: {
  entryTarget?: "incident" | "blueprint";
  incidentUnlocked: boolean;
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueAfterIncident: () => void;
  blueprintUnlocked: boolean;
  blueprintSolved: boolean;
  blueprintHintCount: number;
  onUseBlueprintHint: () => void;
  onSolveBlueprint: (mosaicTileIds: number[]) => void;
  onContinueAfterBlueprint: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(entryTarget === "incident");
  const [rewardMoment, setRewardMoment] = useState(false);
  const [blueprintOpen, setBlueprintOpen] = useState(entryTarget === "blueprint");
  const [blueprintRewardMoment, setBlueprintRewardMoment] = useState(false);

  function collectReward() {
    onSolve(stoppedClockMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueAfterIncident();
    }, 5200);
  }

  function collectBlueprintReward() {
    onSolveBlueprint(masterBlueprintMosaicTiles);
    setBlueprintRewardMoment(true);
    window.setTimeout(() => {
      setBlueprintRewardMoment(false);
      setBlueprintOpen(false);
      onContinueAfterBlueprint();
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
        <p>Test the proposed design under failure</p>
        <h1 id="workshop-title">Build Lab</h1>
        <small>{blueprintSolved ? "The resilience suite passes and the decision is documented" : "A design is not ready until its guarantees survive failure"}</small>
      </header>

      {incidentUnlocked && <Hotspot
        className="clock-hotspot"
        label={solved ? "Inspect the resolved incident" : "Inspect the active production incident"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="master-clock" aria-hidden="true"><i /><b /></span>
        <span>{solved ? "Incident resolved" : "Recover the services"}</span>
      </Hotspot>}

      {blueprintUnlocked && (
        <Hotspot
          className="drafting-hotspot"
          label={blueprintSolved ? "Inspect the architecture decision" : "Run the architecture resilience tests"}
          onActivate={() => setBlueprintOpen(true)}
        >
          <span className="drafting-table" aria-hidden="true"><i /><i /><i /></span>
          <span>{blueprintSolved ? "Resilience suite passing" : "Stress-test the design"}</span>
        </Hotspot>
      )}

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Project Room
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="Incident 14"
          subtitle="Chapter 8 of 10 · Respond to failure"
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
          <small>The incident is understood. A clear team handoff is next.</small>
        </div>
      )}

      {blueprintOpen && (
        <PuzzleModal
          title="The Architecture Resilience Review"
          subtitle="Chapter 4 of 10 · Design the change"
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
          <div className="architecture-decision-icon architecture-decision-icon--large" aria-hidden="true"><i /><i /><i /></div>
          <p>Architecture Decision</p>
          <blockquote>“A strong design lets every constraint tell the same story.”</blockquote>
          <small>The design is ready to test. QA Review unlocks.</small>
        </div>
      )}
    </section>
  );
}
