"use client";

import { useState, type CSSProperties } from "react";
import { ReturnBorrowed } from "../puzzles/return-borrowed/ReturnBorrowed";
import { finalMosaicTiles } from "../puzzles/return-borrowed/puzzleData";
import { PuzzleModal } from "./PuzzleModal";

const pedestals = Array.from({ length: 10 }, (_, index) => index + 1);
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
  onEnterWorkshop,
  clockSolved,
  onEnterConservatory,
  conservatorySolved,
  onEnterObservatory,
  observatorySolved,
  onEnterOuterOffice,
  typewriterSolved,
  reflectionsSolved,
  handoffUnlocked,
  finaleUnlocked,
  onEnterReflections,
  blueprintSolved,
  finaleSolved,
  finaleHintCount,
  onUseFinaleHint,
  onSolveFinale,
  onEnterStudy,
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
  onEnterWorkshop: () => void;
  clockSolved: boolean;
  onEnterConservatory: () => void;
  conservatorySolved: boolean;
  onEnterObservatory: () => void;
  observatorySolved: boolean;
  onEnterOuterOffice: () => void;
  typewriterSolved: boolean;
  reflectionsSolved: boolean;
  handoffUnlocked: boolean;
  finaleUnlocked: boolean;
  onEnterReflections: () => void;
  blueprintSolved: boolean;
  finaleSolved: boolean;
  finaleHintCount: number;
  onUseFinaleHint: () => void;
  onSolveFinale: (mosaicTileIds: number[]) => void;
  onEnterStudy: () => void;
}) {
  const [finaleOpen, setFinaleOpen] = useState(false);
  const [finalRewardMoment, setFinalRewardMoment] = useState(false);

  function completeFinale() {
    onSolveFinale(finalMosaicTiles);
    setFinalRewardMoment(true);
    window.setTimeout(() => {
      setFinalRewardMoment(false);
      setFinaleOpen(false);
      onEnterStudy();
    }, 10200);
  }

  return (
    <section className={`hall ${restored ? "is-restored" : ""} ${lanternWallSolved ? "is-lantern-restored" : ""} ${blueprintSolved ? "is-blueprint-restored" : ""} ${finaleSolved ? "is-fully-restored" : ""}`} aria-labelledby="room-title">
      <div className="hall__rain" aria-hidden="true" />
      <div className="hall__architecture" aria-hidden="true">
        <div className="hall__arch hall__arch--left" />
        <div className="hall__arch hall__arch--right" />
        <div className="hall__ceiling" />
        <div className="hall__chandelier">
          <i />
          <i />
          <i />
        </div>
      </div>

      <header className="room-title">
        <p>The Work We Shared</p>
        <h1 id="room-title">Project Room</h1>
      </header>

      <div className="mosaic">
        <div className="mosaic__plaque">Two Summers · Ten connected moments</div>
        <div className="mosaic__grid" aria-label={`${revealedTiles.length} project board pieces revealed`}>
          {tiles.map((tile) => (
            <span className={revealedTiles.includes(tile) ? "is-revealed" : ""} key={tile} />
          ))}
        </div>
      </div>

      {handoffUnlocked && <nav className="late-level-shortcuts" aria-label="Final project levels">
        <button
          className="is-unlocked"
          onClick={onEnterOuterOffice}
          aria-label="Enter Level 9, Clear Handoff"
        >
          <small>Level 09</small>
          <b>Clear Handoff</b>
          <span>{typewriterSolved ? "Handoff complete" : "Team update ready"}</span>
        </button>
        {finaleUnlocked && <button
          className="is-unlocked"
          onClick={() => setFinaleOpen(true)}
          aria-label="Enter Level 10, Final Handoff"
        >
          <small>Level 10</small>
          <b>Final Handoff</b>
          <span>{finaleSolved ? "Project story complete" : "Retrospective ready"}</span>
        </button>}
      </nav>}

      <button
        className="door door--library"
        onClick={onEnterLibrary}
        aria-label="Enter the Docs Room"
      >
        <span className="door__glow" />
        <span className="door__frame">
          <span className="door__panel" />
          <span className="door__handle" />
        </span>
        <span className="door__label">
          <small>Your first assignment</small>
          Docs Room
        </span>
      </button>

      <button
        className={`reflections-threshold ${blueprintSolved ? "is-unlocked" : ""}`}
        disabled={!blueprintSolved}
        onClick={onEnterReflections}
        aria-label={blueprintSolved ? "Enter QA Review" : "QA Review is locked"}
      >
        <span><i /></span>
        <b>QA Review</b>
        <small>{blueprintSolved ? "Design ready to test" : "Waiting for the design"}</small>
      </button>

      <button
        className={`observatory-threshold ${conservatorySolved ? "is-unlocked" : ""}`}
        disabled={!conservatorySolved}
        onClick={onEnterObservatory}
        aria-label={
          conservatorySolved
            ? "Enter Production Review"
            : "Production Review is locked"
        }
      >
        <span><i /><i /><i /></span>
        <b>Production Review</b>
        <small>{conservatorySolved ? "Runtime signals available" : "Waiting for release data"}</small>
      </button>

      <button
        className={`office-threshold ${clockSolved ? "is-unlocked" : ""}`}
        disabled={!clockSolved}
        onClick={onEnterOuterOffice}
        aria-label={clockSolved ? "Enter the Team Lead’s Office" : "The Team Lead’s Office is sealed"}
      >
        <span><i /></span>
        <b>Team Lead’s Office</b>
        <small>{clockSolved ? "Incident finding ready to share" : "Waiting for incident response"}</small>
      </button>

      <button
        className={`conservatory-threshold ${reflectionsSolved ? "is-unlocked" : ""}`}
        disabled={!reflectionsSolved}
        onClick={onEnterConservatory}
        aria-label={
          reflectionsSolved
            ? "Enter the Release Cycle"
            : "The Release Cycle is locked"
        }
      >
        <span><i /><i /><i /></span>
        <b>Release Cycle</b>
        <small>{reflectionsSolved ? "QA review complete" : "Waiting for a tested build"}</small>
      </button>

      <button
        className={`door ${mapRoomUnlocked ? "door--map" : "door--locked"}`}
        aria-label={mapRoomUnlocked ? "Enter the System Map" : "System Map, locked"}
        disabled={!mapRoomUnlocked}
        onClick={onEnterMapRoom}
      >
        {mapRoomUnlocked && <span className="door__glow door__glow--green" />}
        <span className="door__frame">
          <span className="door__panel" />
          {mapRoomUnlocked && <span className="door__handle" />}
        </span>
        <span className="door__label">
          <small>{mapRoomUnlocked ? "A teammate shared the system map" : "Waiting for context"}</small>
          System Map
        </span>
      </button>

      <button
        className={`workshop-threshold ${lanternWallSolved ? "is-unlocked" : ""}`}
        disabled={!lanternWallSolved}
        onClick={onEnterWorkshop}
        aria-label={
          lanternWallSolved
            ? "Enter the Build Lab"
            : "The Build Lab is locked"
        }
      >
        <span><i /></span>
        <b>Build Lab</b>
        <small>
          {lanternWallSolved
              ? "Signal alignment complete"
              : "Waiting for aligned signals"}
        </small>
      </button>

      <div
        className={`hall-floor-mechanism ${floorMechanismActive ? "is-active" : ""}`}
        aria-label={floorMechanismActive ? "The project workflow is active" : "The project workflow is waiting for context"}
      >
        <i /><i /><i />
      </div>

      <button
        className={`lantern-wall-hotspot ${
          lanternWallUnlocked ? "is-unlocked" : ""
        } ${lanternWallSolved ? "is-solved" : ""}`}
        disabled={!lanternWallUnlocked}
        onClick={onInspectLanternWall}
        aria-label={
          lanternWallUnlocked
            ? lanternWallSolved
              ? "Review the completed signal alignment"
              : "Open signal alignment"
            : "Signal alignment is locked"
        }
      >
        {[0, 1, 2, 3].map((lantern) => (
          <span key={lantern}><i /></span>
        ))}
        <b>
          {lanternWallSolved
            ? "Signals aligned"
            : lanternWallUnlocked
              ? "Align the four signals"
              : "Waiting for the system map"}
        </b>
      </button>

      <div className="pedestals" aria-label="Ten project record positions">
        {pedestals.map((pedestal) => (
          <span key={pedestal} aria-hidden="true" />
        ))}
      </div>
      <div className="hall__dust" aria-hidden="true" />
      <p className="hall__invitation">
        {finaleSolved
          ? "Every part of the project is finally in place."
          : typewriterSolved
          ? "Nine lessons are ready for the final retrospective."
          : clockSolved
          ? "The incident finding is ready for a clear handoff."
          : observatorySolved
          ? "The production signal now has enough evidence for incident response."
          : conservatorySolved
          ? "Release data is ready for the Post-Release Check."
          : reflectionsSolved
          ? "The tested change is ready for the Release Cycle."
          : blueprintSolved
          ? "The proposed design is ready for QA Review."
          : lanternWallSolved
          ? "Aligned perspectives unlock the design task."
          : lanternWallUnlocked
          ? "The System Map reveals four signals that must agree."
          : restored
            ? "The first piece of the board has returned."
            : "Every project begins with context."}
        <span>
          {finaleSolved
            ? "The completed review opens the Debrief Room."
            : typewriterSolved
            ? "Complete the Final Handoff, then open the team’s note."
            : clockSolved
            ? "Turn the technical finding into context another person can use."
            : observatorySolved
            ? "Use the timeline and dependencies to recover deliberately."
            : conservatorySolved
            ? "Compare the timeline, service health, and production logs."
            : reflectionsSolved
            ? "Move the change through every release gate, including live monitoring."
            : blueprintSolved
            ? "Compare the intended experience with the current build."
            : lanternWallSolved
            ? "Align the experience, services, and reliability constraints."
            : lanternWallUnlocked
            ? "Four independent signals must resolve into one result."
            : restored
              ? "The Project Board records the first breakthrough."
              : "Start in the Docs Room. Each completed lesson will reveal exactly what comes next."}
        </span>
      </p>

      {finaleOpen && (
        <PuzzleModal
          title="The Final Handoff"
          subtitle="Chapter 10 of 10 · Tell the project story"
          onClose={() => setFinaleOpen(false)}
        >
          <ReturnBorrowed
            hintCount={finaleHintCount}
            onUseHint={onUseFinaleHint}
            onComplete={completeFinale}
            onEnterStudy={onEnterStudy}
            alreadySolved={finaleSolved}
          />
        </PuzzleModal>
      )}

      {finalRewardMoment && (
        <div className="reward-moment reward-moment--manuscript" role="status">
          <div className="project-lantern-burst" aria-hidden="true">
            {[
              "Context",
              "Trace",
              "Align",
              "Design",
              "QA",
              "Ship",
              "Observe",
              "Recover",
              "Handoff",
              "Trust",
              "Mentorship",
              "Reviews",
              "1:1s",
              "Kindness",
              "Teamwork",
              "Trails",
              "Pets",
              "Growth",
              "Questions",
              "PRs",
              "Feedback",
              "Laughter",
              "Curiosity",
              "Patience",
              "Support",
              "Ideas",
              "Code",
              "Confidence",
              "Friendship",
              "Enterprise",
              "Summer One",
              "Summer Two",
              "Memories",
              "Gratitude",
              "Care",
              "Heart",
            ].map((lesson, index) => (
              <span style={{ "--card-index": index } as CSSProperties} key={lesson}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <b>{lesson}</b>
              </span>
            ))}
          </div>
          <div className="retrospective-icon retrospective-icon--large" aria-hidden="true"><i /></div>
          <p>Project Retrospective</p>
          <blockquote>“Two summers. Nine lessons. One unforgettable team.”</blockquote>
          <small>The Project Board comes alive. A thank-you note waits in the Debrief Room.</small>
        </div>
      )}
    </section>
  );
}
