"use client";

import { useState } from "react";
import { artifacts } from "../artifacts/artifactRegistry";
import type { RoomId } from "./types";

const levels: { puzzleId: string; title: string; lesson: string; roomId: RoomId }[] = [
  { puzzleId: "librarians-shelf", title: "Documentation Shelf", lesson: "Learn the context", roomId: "library" },
  { puzzleId: "cartographers-missing-route", title: "Missing Request Path", lesson: "Trace the system", roomId: "map-room" },
  { puzzleId: "lantern-wall", title: "Signal Alignment", lesson: "Align the team", roomId: "grand-hall" },
  { puzzleId: "master-blueprint", title: "Architecture Resilience Review", lesson: "Design for failure", roomId: "workshop" },
  { puzzleId: "hall-of-reflections", title: "CI Failure Pattern", lesson: "Find the shared failure", roomId: "hall-of-reflections" },
  { puzzleId: "sleeping-conservatory", title: "Release Runbook", lesson: "Ship responsibly", roomId: "conservatory" },
  { puzzleId: "constellation-that-should-not-exist", title: "Post-Release Check", lesson: "Observe production", roomId: "observatory" },
  { puzzleId: "stopped-clock", title: "Incident 14", lesson: "Respond to failure", roomId: "workshop" },
  { puzzleId: "mirrored-typewriter", title: "Unclear Handoff", lesson: "Communicate clearly", roomId: "archivists-outer-office" },
  { puzzleId: "return-what-was-borrowed", title: "Final Handoff", lesson: "Tell the project story", roomId: "grand-hall" },
];

export function InventoryCabinet({
  artifactIds,
  solvedPuzzleIds,
  unlockedPuzzleIds,
  onSelectLevel,
  onClose,
}: {
  artifactIds: string[];
  solvedPuzzleIds: string[];
  unlockedPuzzleIds: string[];
  onSelectLevel: (roomId: RoomId, levelNumber: number) => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"wins" | "levels">("levels");

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="inventory"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="settings-panel__close"
          onClick={onClose}
          aria-label="Close inventory"
        >
          ×
        </button>
        <p className="settings-panel__eyebrow">Milestones you earned</p>
        <h2 id="inventory-title">Wins & Lessons</h2>
        <div className="inventory__tabs" role="tablist" aria-label="Wins and levels">
          <button role="tab" aria-selected={activeTab === "wins"} onClick={() => setActiveTab("wins")}>
            Wins <small>{artifactIds.length}/10</small>
          </button>
          <button role="tab" aria-selected={activeTab === "levels"} onClick={() => setActiveTab("levels")}>
            Levels <small>{solvedPuzzleIds.length}/10</small>
          </button>
        </div>
        {activeTab === "wins" ? <div className="inventory__shelves">
          {Array.from({ length: 10 }, (_, index) => {
            const artifact = artifactIds[index]
              ? artifacts[artifactIds[index]]
              : undefined;
            return (
              <article
                className={artifact ? "inventory__slot is-filled" : "inventory__slot"}
                key={index}
              >
                {artifact ? (
                  <>
                    {artifact.id === "navigators-compass" ? (
                      <div className="flow-trace-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "brass-lantern" ? (
                      <div className="alignment-note-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "clockwork-gear" ? (
                      <div className="incident-review-icon" aria-hidden="true">✓</div>
                    ) : artifact.id === "botanical-specimen" ? (
                      <div className="release-record-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "star-chart" ? (
                      <div className="pattern-report-icon" aria-hidden="true"><i /><i /><i /></div>
                    ) : artifact.id === "leather-journal" ? (
                      <div className="handoff-note-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "prism-lens" ? (
                      <div className="defect-report-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "master-blueprint" ? (
                      <div className="architecture-decision-icon" aria-hidden="true"><i /><i /><i /></div>
                    ) : artifact.id === "final-manuscript" ? (
                      <div className="retrospective-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "feather-bookmark" ? (
                      <div className="context-card-icon" aria-hidden="true"><i /></div>
                    ) : (
                      <div className="feather-icon" aria-hidden="true"><i /></div>
                    )}
                    <h3>{artifact.name}</h3>
                    <p>“{artifact.shortDescription}”</p>
                    <small>{artifact.roomOfOrigin === "library" ? "docs room" : artifact.roomOfOrigin.replaceAll("-", " ")}</small>
                  </>
                ) : (
                  <span aria-label="Empty artifact position">{index + 1}</span>
                )}
              </article>
            );
          })}
        </div> : (
          <div className="level-tab" role="tabpanel" aria-label="Level navigator">
            {levels.map((level, index) => ({ level, index })).filter(({ level, index }) =>
              index < 8 ||
              solvedPuzzleIds.includes(level.puzzleId) ||
              unlockedPuzzleIds.includes(level.puzzleId),
            ).map(({ level, index }) => {
              const completed = solvedPuzzleIds.includes(level.puzzleId);
              const unlocked = completed || unlockedPuzzleIds.includes(level.puzzleId) || index === 0;
              return (
                <button
                  key={level.puzzleId}
                  className={`${completed ? "is-completed" : ""} ${unlocked ? "is-unlocked" : "is-locked"}`}
                  disabled={!unlocked}
                  onClick={() => onSelectLevel(level.roomId, index + 1)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{level.title}</b>
                    <small>{level.lesson}</small>
                  </div>
                  <em>{completed ? "Replay →" : unlocked ? "Continue →" : `Complete level ${index}`}</em>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
