"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { GrandHall } from "./GrandHall";
import { IntroSequence } from "./IntroSequence";
import { InventoryCabinet } from "./InventoryCabinet";
import { LibraryRoom } from "./LibraryRoom";
import { MapRoom } from "./MapRoom";
import { LanternWallRoom } from "./LanternWallRoom";
import { WorkshopRoom } from "./WorkshopRoom";
import { ConservatoryRoom } from "./ConservatoryRoom";
import { ObservatoryRoom } from "./ObservatoryRoom";
import { ArchivistsOuterOffice } from "./ArchivistsOuterOffice";
import { HallOfReflectionsRoom } from "./HallOfReflectionsRoom";
import { ArchivistsStudy } from "./ArchivistsStudy";
import { JourneyThread } from "../story/JourneyThread";
import { createInitialState, gameReducer, readSave, writeSave } from "./state";

const activePuzzleIds = [
  "librarians-shelf",
  "cartographers-missing-route",
  "lantern-wall",
  "mirrored-typewriter",
  "constellation-that-should-not-exist",
];

const activeArtifactIds = [
  "feather-bookmark",
  "navigators-compass",
  "brass-lantern",
  "leather-journal",
  "star-chart",
];

export function GameShell() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [lanternWallOpen, setLanternWallOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playInterfaceSound = useCallback((kind: "click" | "confirm" = "click") => {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;
    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;
    void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(kind === "confirm" ? 620 : 360, now);
    if (kind === "confirm") oscillator.frequency.exponentialRampToValueAtTime(820, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "confirm" ? 0.045 : 0.025, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "confirm" ? 0.16 : 0.08));
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + (kind === "confirm" ? 0.17 : 0.09));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readSave();
      if (saved) dispatch({ type: "HYDRATE", state: saved });
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeSave(state);
    const showTimer = window.setTimeout(() => setSaveVisible(true), 0);
    const hideTimer = window.setTimeout(() => setSaveVisible(false), 1400);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [hydrated, state]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "large-text-mode",
      state.settings.textScale === "large",
    );
    return () => document.documentElement.classList.remove("large-text-mode");
  }, [state.settings.textScale]);

  useEffect(() => {
    if (state.settings.muted) return;
    const playClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("button,input") || target.closest("[data-sound-toggle]")) return;
      playInterfaceSound();
    };
    document.addEventListener("click", playClick);
    return () => document.removeEventListener("click", playClick);
  }, [playInterfaceSound, state.settings.muted]);

  const completeIntro = useCallback(
    () => dispatch({ type: "COMPLETE_INTRO" }),
    [],
  );

  if (!hydrated) return <div className="loading-screen">Opening the workspace…</div>;

  const activeSolvedIds = state.solvedPuzzleIds.filter((id) => activePuzzleIds.includes(id));
  const activeCollectedIds = state.collectedArtifactIds.filter((id) => activeArtifactIds.includes(id));

  const rootClasses = [
    "game",
    state.settings.reducedMotion ? "reduce-motion" : "",
    state.settings.highContrast ? "high-contrast" : "",
    state.settings.textScale === "large" ? "large-text" : "",
  ].join(" ");

  return (
    <main className={rootClasses}>
      {!state.introComplete && <IntroSequence onComplete={completeIntro} />}

      {state.introComplete && (
        <>
          {state.currentRoom === "grand-hall" ? (
            <GrandHall
              revealedTiles={state.revealedMosaicTiles}
              restored={state.restorationStages["grand-hall"] > 0}
              mapRoomUnlocked={state.solvedPuzzleIds.includes("librarians-shelf")}
              floorMechanismActive={state.solvedPuzzleIds.includes("cartographers-missing-route")}
              lanternWallUnlocked={state.unlockedPuzzleIds.includes("lantern-wall")}
              lanternWallSolved={state.solvedPuzzleIds.includes("lantern-wall")}
              onInspectLanternWall={() => setLanternWallOpen(true)}
              finaleSolved={state.solvedPuzzleIds.includes("constellation-that-should-not-exist")}
              typewriterSolved={state.solvedPuzzleIds.includes("mirrored-typewriter")}
              handoffUnlocked={state.unlockedPuzzleIds.includes("mirrored-typewriter")}
              finaleUnlocked={state.unlockedPuzzleIds.includes("constellation-that-should-not-exist")}
              onEnterObservatory={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "observatory" })
              }
              onEnterDebrief={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-study" })
              }
              onEnterOuterOffice={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-outer-office" })
              }
              onEnterLibrary={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "library" })
              }
              onEnterMapRoom={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "map-room" })
              }
            />
          ) : state.currentRoom === "library" ? (
            <LibraryRoom
              restored={state.restorationStages.library > 0}
              solved={state.solvedPuzzleIds.includes("librarians-shelf")}
              hintCount={state.usedHints["librarians-shelf"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "librarians-shelf" })
              }
              onRestartHints={() =>
                dispatch({ type: "RESET_HINTS", puzzleId: "librarians-shelf" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "librarians-shelf",
                  artifactId: "feather-bookmark",
                  mosaicTileIds,
                  restoreRoom: "library",
                  unlockPuzzleId: "cartographers-missing-route",
                  clueId: "atlas-map-clue",
                })
              }
              onContinueToMapRoom={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "map-room" })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
            />
          ) : state.currentRoom === "map-room" ? (
            <MapRoom
              restored={state.restorationStages["map-room"] > 0}
              solved={state.solvedPuzzleIds.includes("cartographers-missing-route")}
              hintCount={state.usedHints["cartographers-missing-route"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "cartographers-missing-route" })
              }
              onRestartHints={() =>
                dispatch({ type: "RESET_HINTS", puzzleId: "cartographers-missing-route" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "cartographers-missing-route",
                  artifactId: "navigators-compass",
                  mosaicTileIds,
                  restoreRoom: "map-room",
                  unlockPuzzleId: "lantern-wall",
                  clueId: "grand-hall-floor-mechanism",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToGrandHall={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
            />
          ) : state.currentRoom === "workshop" ? (
            <WorkshopRoom
              entryTarget={undefined}
              incidentUnlocked={state.unlockedPuzzleIds.includes("stopped-clock")}
              restored={state.restorationStages.workshop > 0}
              solved={state.solvedPuzzleIds.includes("stopped-clock")}
              hintCount={state.usedHints["stopped-clock"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "stopped-clock" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "stopped-clock",
                  artifactId: "clockwork-gear",
                  mosaicTileIds,
                  restoreRoom: "workshop",
                  unlockPuzzleId: "constellation-that-should-not-exist",
                  clueId: "incident-handoff-ready",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueAfterIncident={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-outer-office" })
              }
              blueprintUnlocked={state.unlockedPuzzleIds.includes("master-blueprint")}
              blueprintSolved={state.solvedPuzzleIds.includes("master-blueprint")}
              blueprintHintCount={state.usedHints["master-blueprint"] ?? 0}
              onUseBlueprintHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "master-blueprint" })
              }
              onSolveBlueprint={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "master-blueprint",
                  artifactId: "master-blueprint",
                  mosaicTileIds,
                  restoreRoom: "workshop",
                  unlockPuzzleId: "hall-of-reflections",
                  clueId: "qa-review-ready",
                })
              }
              onContinueAfterBlueprint={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "hall-of-reflections" })
              }
            />
          ) : state.currentRoom === "conservatory" ? (
            <ConservatoryRoom
              restored={state.restorationStages.conservatory > 0}
              solved={state.solvedPuzzleIds.includes("sleeping-conservatory")}
              hintCount={state.usedHints["sleeping-conservatory"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "sleeping-conservatory" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "sleeping-conservatory",
                  artifactId: "botanical-specimen",
                  mosaicTileIds,
                  restoreRoom: "conservatory",
                  unlockPuzzleId: "constellation-that-should-not-exist",
                  clueId: "observatory-stair-uncovered",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToObservatory={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "observatory" })
              }
            />
          ) : state.currentRoom === "observatory" ? (
            <ObservatoryRoom
              restored={state.restorationStages.observatory > 0}
              solved={state.solvedPuzzleIds.includes("constellation-that-should-not-exist")}
              hintCount={state.usedHints["constellation-that-should-not-exist"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "constellation-that-should-not-exist" })
              }
              onRestartHints={() =>
                dispatch({ type: "RESET_HINTS", puzzleId: "constellation-that-should-not-exist" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "constellation-that-should-not-exist",
                  artifactId: "star-chart",
                  mosaicTileIds,
                  restoreRoom: "observatory",
                  clueId: "team-story-complete",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToIncident={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-study" })
              }
            />
          ) : state.currentRoom === "archivists-outer-office" ? (
            <ArchivistsOuterOffice
              restored={state.restorationStages["archivists-outer-office"] > 0}
              solved={state.solvedPuzzleIds.includes("mirrored-typewriter")}
              hintCount={state.usedHints["mirrored-typewriter"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "mirrored-typewriter" })
              }
              onRestartHints={() =>
                dispatch({ type: "RESET_HINTS", puzzleId: "mirrored-typewriter" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "mirrored-typewriter",
                  artifactId: "leather-journal",
                  mosaicTileIds,
                  restoreRoom: "archivists-outer-office",
                  unlockPuzzleId: "constellation-that-should-not-exist",
                  clueId: "final-review-ready",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToFinale={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "observatory" })
              }
            />
          ) : state.currentRoom === "hall-of-reflections" ? (
            <HallOfReflectionsRoom
              restored={state.restorationStages["hall-of-reflections"] > 0}
              solved={state.solvedPuzzleIds.includes("hall-of-reflections")}
              hintCount={state.usedHints["hall-of-reflections"] ?? 0}
              onUseHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "hall-of-reflections" })
              }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "hall-of-reflections",
                  artifactId: "prism-lens",
                  mosaicTileIds,
                  restoreRoom: "hall-of-reflections",
                  unlockPuzzleId: "sleeping-conservatory",
                  clueId: "release-checklist-ready",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToRelease={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "conservatory" })
              }
            />
          ) : (
            <ArchivistsStudy
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
            />
          )}

          {state.currentRoom === "grand-hall" && lanternWallOpen && (
            <LanternWallRoom
              solved={state.solvedPuzzleIds.includes("lantern-wall")}
              hintCount={state.usedHints["lantern-wall"] ?? 0}
                  onUseHint={() =>
                    dispatch({ type: "USE_HINT", puzzleId: "lantern-wall" })
                  }
                  onRestartHints={() =>
                    dispatch({ type: "RESET_HINTS", puzzleId: "lantern-wall" })
                  }
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "lantern-wall",
                  artifactId: "brass-lantern",
                  mosaicTileIds,
                  restoreRoom: "grand-hall",
                  unlockPuzzleId: "mirrored-typewriter",
                  clueId: "handoff-pattern-ready",
                })
              }
              onClose={() => setLanternWallOpen(false)}
              onContinueToWorkshop={() => {
                setLanternWallOpen(false);
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-outer-office" });
              }}
            />
          )}

          <div className="utility-bar" aria-label="Game controls">
            <button onClick={() => setJourneyOpen(true)}>
              <span aria-hidden="true">#</span>
              Story thread {activeSolvedIds.length}/5
            </button>
            <button onClick={() => setInventoryOpen(true)}>
              <span aria-hidden="true">◇</span>
              Wins {activeCollectedIds.length}/5
            </button>
            <button
              data-sound-toggle
              onClick={() => {
                if (state.settings.muted) playInterfaceSound("confirm");
                dispatch({
                  type: "UPDATE_SETTINGS",
                  settings: { muted: !state.settings.muted },
                });
              }}
              aria-pressed={!state.settings.muted}
            >
              <span aria-hidden="true">{state.settings.muted ? "◌" : "◉"}</span>
              {state.settings.muted ? "Sound off" : "Sound on"}
            </button>
            <button onClick={() => setSettingsOpen(true)}>
              <span aria-hidden="true">✦</span>
              Settings
            </button>
          </div>

          <div className={`save-indicator ${saveVisible ? "is-visible" : ""}`}>
            <span /> Progress synced
          </div>

          {journeyOpen && (
            <JourneyThread
              completedMilestones={activeSolvedIds.length}
              onClose={() => setJourneyOpen(false)}
            />
          )}

          {settingsOpen && (
            <div className="modal-backdrop" onMouseDown={() => setSettingsOpen(false)}>
              <section
                className="settings-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-title"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button
                  className="settings-panel__close"
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Close settings"
                >
                  ×
                </button>
                <p className="settings-panel__eyebrow">A quieter way through</p>
                <h2 id="settings-title">Settings</h2>
                <label>
                  <span>
                    Reduce motion
                    <small>Softens transitions and ambient movement</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={state.settings.reducedMotion}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_SETTINGS",
                        settings: { reducedMotion: event.target.checked },
                      })
                    }
                  />
                </label>
                <label>
                  <span>
                    High contrast
                    <small>Strengthens text and interactive edges</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={state.settings.highContrast}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_SETTINGS",
                        settings: { highContrast: event.target.checked },
                      })
                    }
                  />
                </label>
                <label>
                  <span>
                    Larger text
                    <small>Increases narrative and interface copy</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={state.settings.textScale === "large"}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_SETTINGS",
                        settings: {
                          textScale: event.target.checked ? "large" : "default",
                        },
                      })
                    }
                  />
                </label>
                <button
                  className="reset-button"
                  onClick={() => {
                    dispatch({ type: "REPLAY_INTRO" });
                    setSettingsOpen(false);
                  }}
                >
                  Replay opening
                </button>
                <button
                  className="reset-button reset-button--danger"
                  onClick={() => setResetOpen(true)}
                >
                  Start the whole story over
                </button>
                {resetOpen && (
                  <div className="reset-confirmation">
                    <small>Entire game</small>
                    <h3>Start over from the beginning?</h3>
                    <p>This erases every solved puzzle, collected win, hint, and unlocked room. Use “Restart level” inside a puzzle if you only want another attempt there.</p>
                    <div>
                      <button onClick={() => setResetOpen(false)}>Cancel</button>
                      <button
                        onClick={() => {
                          dispatch({ type: "RESET_GAME" });
                          setResetOpen(false);
                          setSettingsOpen(false);
                        }}
                      >
                        Erase progress
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
          {inventoryOpen && (
            <InventoryCabinet
              artifactIds={activeCollectedIds}
              solvedPuzzleIds={activeSolvedIds}
              unlockedPuzzleIds={state.unlockedPuzzleIds}
              onSelectLevel={(roomId, levelNumber) => {
                setInventoryOpen(false);
                dispatch({ type: "ENTER_ROOM", roomId });
                if (levelNumber === 3) setLanternWallOpen(true);
              }}
              onClose={() => setInventoryOpen(false)}
            />
          )}
        </>
      )}
    </main>
  );
}
