"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { GrandHall } from "./GrandHall";
import { IntroSequence } from "./IntroSequence";
import { InventoryCabinet } from "./InventoryCabinet";
import { LibraryRoom } from "./LibraryRoom";
import { createInitialState, gameReducer, readSave, writeSave } from "./state";

export function GameShell() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);

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
              onEnterLibrary={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "library" })
              }
            />
          ) : (
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
              onReturn={() =>
                dispatch({ type: "ENTER_ROOM", roomId: "grand-hall" })
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
