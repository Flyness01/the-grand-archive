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
  onContinueToFinale,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onReturn: () => void;
  onContinueToFinale: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(mirroredTypewriterMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToFinale();
    }, 5200);
  }

  return (
    <section className={`outer-office ${restored ? "is-restored" : ""}`} aria-labelledby="outer-office-title">
      <div className="outer-office__window" aria-hidden="true" />
      <div className="outer-office__desk" aria-hidden="true"><i /><i /></div>
      <div className="outer-office__files" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="library-room__title">
        <p>Recognize the pattern hidden inside a message</p>
        <h1 id="outer-office-title">Handoff Desk</h1>
        <small>{restored ? "The word pattern has been decoded" : "Examples reveal how the beginning and ending of each word change"}</small>
      </header>

      <Hotspot
        className="typewriter-hotspot"
        label={solved ? "Inspect the completed engineering handoff" : "Inspect the encoded handoff"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="room-typewriter" aria-hidden="true"><i /></span>
        <span>{solved ? "Handoff saved" : "Decode the message"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Project Room</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Word-Ends Handoff"
          subtitle="Chapter 4 of 5 · Communicate clearly"
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
          <small>The message is understood. The Shared Timeline unlocks.</small>
        </div>
      )}
    </section>
  );
}
