"use client";

import { useState } from "react";
import { MirroredTypewriter } from "../puzzles/mirrored-typewriter/MirroredTypewriter";
import { mirroredTypewriterMosaicTiles } from "../puzzles/mirrored-typewriter/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function ArchivistsOuterOffice({
  restored,
  solved,
  hintCount,
  onUseHint,
  onSolve,
  onReturn,
  onContinueToReflections,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToReflections: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(mirroredTypewriterMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToReflections();
    }, 5200);
  }

  return (
    <section className={`outer-office ${restored ? "is-restored" : ""}`} aria-labelledby="outer-office-title">
      <div className="outer-office__window" aria-hidden="true" />
      <div className="outer-office__desk" aria-hidden="true"><i /><i /></div>
      <div className="outer-office__files" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="library-room__title">
        <p>Turn a finding into shared context</p>
        <h1 id="outer-office-title">Team Lead’s Office</h1>
        <small>{restored ? "The handoff is concise, clear, and actionable" : "A correct finding is useful only when someone else can act on it"}</small>
      </header>

      <Hotspot
        className="typewriter-hotspot"
        label={solved ? "Inspect the completed engineering handoff" : "Inspect the encoded handoff"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="room-typewriter" aria-hidden="true"><i /></span>
        <span>{solved ? "Handoff saved" : "Decode the message"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Team Hub</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Unclear Handoff"
          subtitle="Team Lead’s Office · Technical communication"
          onClose={() => setPuzzleOpen(false)}
        >
          <MirroredTypewriter
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment reward-moment--journal" role="status">
          <div className="handoff-note-icon handoff-note-icon--large" aria-hidden="true"><i /></div>
          <p>Handoff Note</p>
          <blockquote>“Clarity is part of the implementation.”</blockquote>
          <small>The next review can begin with shared context. QA Review unlocks.</small>
        </div>
      )}
    </section>
  );
}
