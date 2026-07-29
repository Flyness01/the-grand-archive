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
        <p>Beyond the dome</p>
        <h1 id="outer-office-title">Team Lead’s Office</h1>
        <small>{restored ? "A completed sentence waits beneath the ribbon" : "One machine has preserved its peculiar error"}</small>
      </header>

      <Hotspot
        className="typewriter-hotspot"
        label={solved ? "Inspect the completed manuscript" : "Inspect the mirrored typewriter"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="room-typewriter" aria-hidden="true"><i /></span>
        <span>{solved ? "The drawer is open" : "The keys answer from across the row"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Team Hub</button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Mirrored Typewriter"
          subtitle="Team Lead’s Office · Spatial substitution"
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
          <div className="journal-icon journal-icon--large" aria-hidden="true"><i /></div>
          <p>Leather Journal</p>
          <blockquote>“Every page was filled. Except one.”</blockquote>
          <small>The earlier clues arrange themselves. The Hall of Reflections opens.</small>
        </div>
      )}
    </section>
  );
}
