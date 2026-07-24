import { describe, expect, it } from "vitest";
import { librariansShelfMosaicTiles } from "../puzzles/librarians-shelf/puzzleData";
import { cartographersRouteMosaicTiles } from "../puzzles/cartographers-route/puzzleData";
import { createInitialState, gameReducer } from "./state";

describe("game progression", () => {
  it("applies the first puzzle's rewards atomically", () => {
    const state = gameReducer(createInitialState(), {
      type: "SOLVE_PUZZLE",
      puzzleId: "librarians-shelf",
      artifactId: "feather-bookmark",
      mosaicTileIds: librariansShelfMosaicTiles,
      restoreRoom: "library",
      unlockPuzzleId: "cartographers-missing-route",
      clueId: "atlas-map-clue",
    });

    expect(state.solvedPuzzleIds).toContain("librarians-shelf");
    expect(state.collectedArtifactIds).toContain("feather-bookmark");
    expect(state.restorationStages.library).toBe(1);
    expect(state.restorationStages["grand-hall"]).toBe(1);
    expect(state.revealedMosaicTiles).toEqual(librariansShelfMosaicTiles);
    expect(state.unlockedPuzzleIds).toContain(
      "cartographers-missing-route",
    );
    expect(state.discoveredClueIds).toContain("atlas-map-clue");
  });

  it("does not duplicate rewards if solve is dispatched twice", () => {
    const action = {
      type: "SOLVE_PUZZLE" as const,
      puzzleId: "librarians-shelf",
      artifactId: "feather-bookmark",
      mosaicTileIds: librariansShelfMosaicTiles,
      restoreRoom: "library" as const,
    };
    const solved = gameReducer(createInitialState(), action);
    expect(gameReducer(solved, action)).toEqual(solved);
  });

  it("reveals no more than three hints", () => {
    let state = createInitialState();
    for (let index = 0; index < 5; index += 1) {
      state = gameReducer(state, {
        type: "USE_HINT",
        puzzleId: "librarians-shelf",
      });
    }
    expect(state.usedHints["librarians-shelf"]).toBe(3);
  });

  it("unlocks the Lantern Wall after the route puzzle", () => {
    const state = gameReducer(createInitialState(), {
      type: "SOLVE_PUZZLE",
      puzzleId: "cartographers-missing-route",
      artifactId: "navigators-compass",
      mosaicTileIds: cartographersRouteMosaicTiles,
      restoreRoom: "map-room",
      unlockPuzzleId: "lantern-wall",
      clueId: "grand-hall-floor-mechanism",
    });

    expect(state.collectedArtifactIds).toContain("navigators-compass");
    expect(state.restorationStages["map-room"]).toBe(1);
    expect(state.unlockedPuzzleIds).toContain("lantern-wall");
    expect(state.discoveredClueIds).toContain("grand-hall-floor-mechanism");
  });
});
