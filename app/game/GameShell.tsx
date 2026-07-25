"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
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
import { createInitialState, gameReducer, readSave, writeSave } from "./state";

export function GameShell() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [lanternWallOpen, setLanternWallOpen] = useState(false);

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

  const completeIntro = useCallback(
    () => dispatch({ type: "COMPLETE_INTRO" }),
    [],
  );

  if (!hydrated) return <div className="loading-screen">Opening the Archive…</div>;

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
              onEnterWorkshop={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "workshop" })
              }
              clockSolved={state.solvedPuzzleIds.includes("stopped-clock")}
              onEnterConservatory={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "conservatory" })
              }
              conservatorySolved={state.solvedPuzzleIds.includes("sleeping-conservatory")}
              blueprintSolved={state.solvedPuzzleIds.includes("master-blueprint")}
              finaleSolved={state.solvedPuzzleIds.includes("return-what-was-borrowed")}
              finaleHintCount={state.usedHints["return-what-was-borrowed"] ?? 0}
              onUseFinaleHint={() =>
                dispatch({ type: "USE_HINT", puzzleId: "return-what-was-borrowed" })
              }
              onSolveFinale={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "return-what-was-borrowed",
                  artifactId: "final-manuscript",
                  mosaicTileIds,
                  restoreRoom: "grand-hall",
                  clueId: "archivists-study-open",
                })
              }
              onEnterStudy={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-study" })
              }
              observatorySolved={state.solvedPuzzleIds.includes("constellation-that-should-not-exist")}
              typewriterSolved={state.solvedPuzzleIds.includes("mirrored-typewriter")}
              onEnterObservatory={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "observatory" })
              }
              onEnterOuterOffice={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-outer-office" })
              }
              onEnterReflections={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "hall-of-reflections" })
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
                  unlockPuzzleId: "sleeping-conservatory",
                  clueId: "archive-irrigation-active",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToConservatory={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "conservatory" })
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
                  unlockPuzzleId: "return-what-was-borrowed",
                  clueId: "pedestal-ring-revealed",
                })
              }
              onContinueToGrandHall={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
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
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "constellation-that-should-not-exist",
                  artifactId: "star-chart",
                  mosaicTileIds,
                  restoreRoom: "observatory",
                  unlockPuzzleId: "mirrored-typewriter",
                  clueId: "artifact-color-resonance",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToOffice={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "archivists-outer-office" })
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
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "mirrored-typewriter",
                  artifactId: "leather-journal",
                  mosaicTileIds,
                  restoreRoom: "archivists-outer-office",
                  unlockPuzzleId: "hall-of-reflections",
                  clueId: "journal-clues-organized",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToReflections={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "hall-of-reflections" })
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
                  unlockPuzzleId: "master-blueprint",
                  clueId: "artifact-pedestal-symbols-visible",
                })
              }
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
              }
              onContinueToWorkshop={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "workshop" })
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
              onSolve={(mosaicTileIds) =>
                dispatch({
                  type: "SOLVE_PUZZLE",
                  puzzleId: "lantern-wall",
                  artifactId: "brass-lantern",
                  mosaicTileIds,
                  restoreRoom: "grand-hall",
                  unlockPuzzleId: "stopped-clock",
                  clueId: "workshop-door-unlocked",
                })
              }
              onClose={() => setLanternWallOpen(false)}
              onContinueToWorkshop={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "workshop" })
              }
            />
          )}

          <div className="utility-bar" aria-label="Game controls">
            <button onClick={() => setInventoryOpen(true)}>
              <span aria-hidden="true">◇</span>
              Collection {state.collectedArtifactIds.length}/10
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE_SETTINGS",
                  settings: { muted: !state.settings.muted },
                })
              }
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
            <span /> Archive saved
          </div>

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
                    if (window.confirm("Reset all progress and replay the opening?")) {
                      dispatch({ type: "RESET_GAME" });
                      setSettingsOpen(false);
                    }
                  }}
                >
                  Reset progress
                </button>
              </section>
            </div>
          )}
          {inventoryOpen && (
            <InventoryCabinet
              artifactIds={state.collectedArtifactIds}
              onClose={() => setInventoryOpen(false)}
            />
          )}
        </>
      )}
    </main>
  );
}
