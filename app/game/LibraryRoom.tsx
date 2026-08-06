"use client";

import { useState } from "react";
import { LibrariansShelf } from "../puzzles/librarians-shelf/LibrariansShelf";
import { librariansShelfMosaicTiles } from "../puzzles/librarians-shelf/puzzleData";
import { Hotspot } from "./Hotspot";
import { PuzzleModal } from "./PuzzleModal";

export function LibraryRoom({
  restored,
  solved,
  hintCount,
  onUseHint,
  onRestartHints,
  onSolve,
  onContinueToMapRoom,
  onReturn,
}: {
  restored: boolean;
  solved: boolean;
  hintCount: number;
  onUseHint: () => void;
  onRestartHints: () => void;
  onSolve: (mosaicTileIds: number[]) => void;
  onContinueToMapRoom: () => void;
  onReturn: () => void;
}) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [rewardMoment, setRewardMoment] = useState(false);

  function collectReward() {
    onSolve(librariansShelfMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
      onContinueToMapRoom();
    }, 5200);
  }

  return (
    <section
      className={`library-room ${restored ? "is-restored" : ""}`}
      aria-labelledby="library-title"
    >
      <div className="library-room__windows" aria-hidden="true" />
      <div className="library-room__shelves" aria-hidden="true">
        {Array.from({ length: 72 }, (_, index) => <span key={index} />)}
      </div>
      <div className="library-room__fireplace" aria-label={restored ? "The project room is active" : "The project room is quiet"}>
        <i aria-hidden="true" />
      </div>
      <div className="library-room__desk" aria-hidden="true">
        <span className={restored ? "atlas is-open" : "atlas"} />
      </div>
      <header className="library-room__title">
        <p>Your first assignment</p>
        <h1 id="library-title">Docs Room</h1>
        <small>{restored ? "The codebase has begun to make sense" : "Start with what the team has already learned"}</small>
      </header>

      <Hotspot
        className="shelf-hotspot"
        label={solved ? "Review the completed onboarding shelf" : "Review the onboarding shelf"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="shelf-hotspot__bracket" aria-hidden="true" />
        <span>{solved ? "Onboarding complete" : "Review team docs"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Project Room
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Documentation Shelf"
          subtitle="Chapter 1 of 5 · Learn the context"
          onClose={() => setPuzzleOpen(false)}
          onRestart={onRestartHints}
        >
          <LibrariansShelf
            hintCount={hintCount}
            onUseHint={onUseHint}
            onCollectReward={collectReward}
            alreadySolved={solved}
          />
        </PuzzleModal>
      )}

      {rewardMoment && (
        <div className="reward-moment" role="status">
          <div className="context-card-icon context-card-icon--large" aria-hidden="true"><i /></div>
          <p>Context Card</p>
          <blockquote>“Understanding the system was the first contribution.”</blockquote>
          <small>A teammate shares the system map for your next task.</small>
        </div>
      )}
    </section>
  );
}
