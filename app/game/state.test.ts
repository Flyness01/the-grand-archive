import { describe, expect, it } from "vitest";
import { librariansShelfMosaicTiles } from "../puzzles/librarians-shelf/puzzleData";
import { cartographersRouteMosaicTiles } from "../puzzles/cartographers-route/puzzleData";
import { stoppedClockMosaicTiles } from "../puzzles/stopped-clock/puzzleData";
import { sleepingConservatoryMosaicTiles } from "../puzzles/sleeping-conservatory/puzzleData";
import { impossibleConstellationMosaicTiles } from "../puzzles/impossible-constellation/puzzleData";
import { mirroredTypewriterMosaicTiles } from "../puzzles/mirrored-typewriter/puzzleData";
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

  it("restores the Workshop and unlocks the Conservatory puzzle", () => {
    const state = gameReducer(createInitialState(), {
      type: "SOLVE_PUZZLE",
      puzzleId: "stopped-clock",
      artifactId: "clockwork-gear",
      mosaicTileIds: stoppedClockMosaicTiles,
      restoreRoom: "workshop",
      unlockPuzzleId: "sleeping-conservatory",
      clueId: "archive-irrigation-active",
    });

    expect(state.solvedPuzzleIds).toContain("stopped-clock");
    expect(state.collectedArtifactIds).toContain("clockwork-gear");
    expect(state.restorationStages.workshop).toBe(1);
    expect(state.unlockedPuzzleIds).toContain("sleeping-conservatory");
    expect(state.discoveredClueIds).toContain("archive-irrigation-active");
  });

  it("restores the Conservatory and uncovers the Observatory puzzle", () => {
    const state = gameReducer(createInitialState(), {
      type: "SOLVE_PUZZLE",
      puzzleId: "sleeping-conservatory",
      artifactId: "botanical-specimen",
      mosaicTileIds: sleepingConservatoryMosaicTiles,
      restoreRoom: "conservatory",
      unlockPuzzleId: "constellation-that-should-not-exist",
      clueId: "observatory-stair-uncovered",
    });

    expect(state.solvedPuzzleIds).toContain("sleeping-conservatory");
    expect(state.collectedArtifactIds).toContain("botanical-specimen");
    expect(state.restorationStages.conservatory).toBe(1);
    expect(state.unlockedPuzzleIds).toContain("constellation-that-should-not-exist");
    expect(state.discoveredClueIds).toContain("observatory-stair-uncovered");
  });

  it("restores the Observatory and unlocks the mirrored typewriter", () => {
    const state = gameReducer(createInitialState(), {
      type: "SOLVE_PUZZLE",
      puzzleId: "constellation-that-should-not-exist",
      artifactId: "star-chart",
      mosaicTileIds: impossibleConstellationMosaicTiles,
      restoreRoom: "observatory",
      unlockPuzzleId: "mirrored-typewriter",
      clueId: "artifact-color-resonance",
    });

    expect(state.solvedPuzzleIds).toContain("constellation-that-should-not-exist");
    expect(state.collectedArtifactIds).toContain("star-chart");
    expect(state.restorationStages.observatory).toBe(1);
    expect(state.unlockedPuzzleIds).toContain("mirrored-typewriter");
    expect(state.discoveredClueIds).toContain("artifact-color-resonance");
  });

  it("restores the Outer Office and unlocks the Hall of Reflections", () => {
    const state = gameReducer(createInitialState(), {
      type: "SOLVE_PUZZLE",
      puzzleId: "mirrored-typewriter",
      artifactId: "leather-journal",
      mosaicTileIds: mirroredTypewriterMosaicTiles,
      restoreRoom: "archivists-outer-office",
      unlockPuzzleId: "hall-of-reflections",
      clueId: "journal-clues-organized",
    });

    expect(state.solvedPuzzleIds).toContain("mirrored-typewriter");
    expect(state.collectedArtifactIds).toContain("leather-journal");
    expect(state.restorationStages["archivists-outer-office"]).toBe(1);
    expect(state.unlockedPuzzleIds).toContain("hall-of-reflections");
    expect(state.discoveredClueIds).toContain("journal-clues-organized");
  });
});
