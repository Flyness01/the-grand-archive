"use client";

import { useState } from "react";
import { FinalLanternScene } from "./FinalLanternScene";

const pedestals = Array.from({ length: 5 }, (_, index) => index + 1);
const tiles = Array.from({ length: 625 }, (_, index) => index);

export function GrandHall({
  onEnterLibrary,
  onEnterMapRoom,
  revealedTiles,
  restored,
  mapRoomUnlocked,
  floorMechanismActive,
  lanternWallUnlocked,
  lanternWallSolved,
  onInspectLanternWall,
  onEnterOuterOffice,
  typewriterSolved,
  handoffUnlocked,
  finaleUnlocked,
  onEnterObservatory,
  finaleSolved,
  onEnterDebrief,
}: {
  onEnterLibrary: () => void;
  onEnterMapRoom: () => void;
  revealedTiles: number[];
  restored: boolean;
  mapRoomUnlocked: boolean;
  floorMechanismActive: boolean;
  lanternWallUnlocked: boolean;
  lanternWallSolved: boolean;
  onInspectLanternWall: () => void;
  onEnterOuterOffice: () => void;
  typewriterSolved: boolean;
  handoffUnlocked: boolean;
  finaleUnlocked: boolean;
  onEnterObservatory: () => void;
  finaleSolved: boolean;
  onEnterDebrief: () => void;
}) {
  const [replayingLanterns, setReplayingLanterns] = useState(false);

  function replayLanternScene() {
    setReplayingLanterns(true);
    window.setTimeout(() => setReplayingLanterns(false), 10200);
  }

  return (
    <section className={`hall five-puzzle-hall ${restored ? "is-restored" : ""} ${lanternWallSolved ? "is-lantern-restored" : ""} ${finaleSolved ? "is-fully-restored" : ""}`} aria-labelledby="room-title">
      <div className="hall__rain" aria-hidden="true" />
      <div className="hall__architecture" aria-hidden="true">
        <div className="hall__arch hall__arch--left" /><div className="hall__arch hall__arch--right" />
        <div className="hall__ceiling" /><div className="hall__chandelier"><i /><i /><i /></div>
      </div>

      <header className="room-title"><p>The Work We Shared</p><h1 id="room-title">Project Room</h1></header>

      <div className="mosaic">
        <div className="mosaic__plaque">Two Summers · Five connected moments</div>
        <div className="mosaic__grid" aria-label={`${revealedTiles.length} project board pieces revealed`}>
          {tiles.map((tile) => <span className={revealedTiles.includes(tile) ? "is-revealed" : ""} key={tile} />)}
        </div>
      </div>

      <button className="door door--library" onClick={onEnterLibrary} aria-label="Enter Level 1, Hidden Instruction">
        <span className="door__glow" /><span className="door__frame"><span className="door__panel" /><span className="door__handle" /></span>
        <span className="door__label"><small>Level 01 · Discover</small>Docs Room</span>
      </button>

      <button className={`door ${mapRoomUnlocked ? "door--map" : "door--locked"}`} aria-label={mapRoomUnlocked ? "Enter Level 2, Missing Request Path" : "Level 2 is locked"} disabled={!mapRoomUnlocked} onClick={onEnterMapRoom}>
        {mapRoomUnlocked && <span className="door__glow door__glow--green" />}
        <span className="door__frame"><span className="door__panel" />{mapRoomUnlocked && <span className="door__handle" />}</span>
        <span className="door__label"><small>{mapRoomUnlocked ? "Level 02 · Trace" : "Waiting for Level 01"}</small>System Map</span>
      </button>

      <div className={`hall-floor-mechanism ${floorMechanismActive ? "is-active" : ""}`} aria-label={floorMechanismActive ? "The project workflow is active" : "The workflow is waiting for context"}><i /><i /><i /></div>

      <button className={`lantern-wall-hotspot ${lanternWallUnlocked ? "is-unlocked" : ""} ${lanternWallSolved ? "is-solved" : ""}`} disabled={!lanternWallUnlocked} onClick={onInspectLanternWall} aria-label={lanternWallUnlocked ? "Enter Level 3, Signal Alignment" : "Level 3 is locked"}>
        {[0, 1, 2, 3].map((lantern) => <span key={lantern}><i /></span>)}
        <b>{lanternWallSolved ? "Level 03 · Signals aligned" : lanternWallUnlocked ? "Level 03 · Align the signals" : "Waiting for Level 02"}</b>
      </button>

      {handoffUnlocked && <nav className="late-level-shortcuts five-level-shortcuts" aria-label="Final project levels">
        <button className="is-unlocked project-stairway" onClick={onEnterOuterOffice} aria-label="Climb the stairs to Puzzle 4, Word-Ends Handoff">
          <span className="project-stairway__steps" aria-hidden="true"><i /><i /><i /><i /></span>
          <small>Climb to the handoff</small><b>Word-Ends</b><span>{typewriterSolved ? "Message decoded" : "A pattern is waiting upstairs"}</span>
        </button>
        {finaleUnlocked && <button className="is-unlocked reflection-platform" onClick={onEnterObservatory} aria-label="Step onto the reflection platform for Puzzle 5, Shared Timeline">
          <span className="reflection-platform__dais" aria-hidden="true"><i /></span>
          <small>Step onto the platform</small><b>Shared Timeline</b><span>{finaleSolved ? "Team story complete" : "The final reflection is ready"}</span>
        </button>}
      </nav>}

      {finaleSolved && <div className="finale-actions">
        <button className="open-thank-you" onClick={onEnterDebrief}><span aria-hidden="true">✦</span> Open thank-you note</button>
        <button className="replay-lanterns" onClick={replayLanternScene}><span aria-hidden="true">◌</span> Replay lantern finale</button>
      </div>}

      <div className="pedestals" aria-label="Five project record positions">{pedestals.map((pedestal) => <span key={pedestal} aria-hidden="true" />)}</div>
      <div className="hall__dust" aria-hidden="true" />
      <p className="hall__invitation">
        {finaleSolved ? "Five moments now tell one complete story." : typewriterSolved ? "A clear handoff unlocks the shared timeline." : lanternWallSolved ? "Aligned perspectives make a clear handoff possible." : floorMechanismActive ? "The traced system reveals the signals the team must align." : restored ? "Context makes the system possible to trace." : "Every project begins with context."}
        <span>{finaleSolved ? "The lanterns carry the story into the Debrief Room." : "Complete each visible level; the next one opens automatically."}</span>
      </p>
      {replayingLanterns && <FinalLanternScene replay />}
    </section>
  );
}
