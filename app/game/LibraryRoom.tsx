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
    onSolve(librariansShelfMosaicTiles);
    setRewardMoment(true);
    window.setTimeout(() => {
      setRewardMoment(false);
      setPuzzleOpen(false);
    }, 2300);
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
      <div className="library-room__fireplace" aria-label={restored ? "A warm fire is burning" : "The fireplace is cold"}>
        <i aria-hidden="true" />
      </div>
      <div className="library-room__desk" aria-hidden="true">
        <span className={restored ? "atlas is-open" : "atlas"} />
      </div>
      <header className="library-room__title">
        <p>The east wing</p>
        <h1 id="library-title">Library</h1>
        <small>{restored ? "Warmth returns to the shelves" : "The books hold their breath"}</small>
      </header>

      <Hotspot
        className="shelf-hotspot"
        label={solved ? "Inspect the opened Librarian’s Shelf" : "Inspect the unusual bookshelf"}
        onActivate={() => setPuzzleOpen(true)}
      >
        <span className="shelf-hotspot__bracket" aria-hidden="true" />
        <span>{solved ? "Hidden shelf" : "Inspect bookshelf"}</span>
      </Hotspot>

      <button className="return-hall" onClick={onReturn}>
        <span aria-hidden="true">←</span> Grand Hall
      </button>

      {puzzleOpen && (
        <PuzzleModal
          title="The Librarian’s Shelf"
          subtitle="Library · Observation"
          onClose={() => setPuzzleOpen(false)}
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
          <div className="feather-icon feather-icon--large" aria-hidden="true"><i /></div>
          <p>Feather Bookmark</p>
          <blockquote>“It waited patiently.”</blockquote>
          <small>Somewhere in the Grand Hall, stone shifts.</small>
        </div>
      )}
    </section>
  );
}
