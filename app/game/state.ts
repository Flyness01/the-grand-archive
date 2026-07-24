import type {
  GameAction,
  GameSettings,
  GameState,
  RestorationStage,
  RoomId,
} from "./types";

export const SAVE_KEY = "grand-archive-save";
export const SAVE_VERSION = 2;

const roomIds: RoomId[] = [
  "grand-hall",
  "library",
  "map-room",
  "workshop",
  "conservatory",
  "observatory",
  "archivists-outer-office",
  "hall-of-reflections",
  "archivists-study",
];

const restorationStages = Object.fromEntries(
  roomIds.map((id) => [id, 0]),
) as Record<RoomId, RestorationStage>;

export const defaultSettings: GameSettings = {
  muted: true,
  reducedMotion: false,
  highContrast: false,
  textScale: "default",
};

export function createInitialState(): GameState {
  return {
    currentRoom: "grand-hall",
    visitedRooms: ["grand-hall"],
    solvedPuzzleIds: [],
    unlockedPuzzleIds: ["librarians-shelf"],
    collectedArtifactIds: [],
    placedArtifactIds: [],
    discoveredClueIds: [],
    restorationStages: { ...restorationStages },
    revealedMosaicTiles: [],
    usedHints: {},
    settings: { ...defaultSettings },
    introComplete: false,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ENTER_ROOM":
      return {
        ...state,
        currentRoom: action.roomId,
        visitedRooms: state.visitedRooms.includes(action.roomId)
          ? state.visitedRooms
          : [...state.visitedRooms, action.roomId],
        startedAt: state.startedAt ?? new Date().toISOString(),
      };
    case "COMPLETE_INTRO":
      return {
        ...state,
        introComplete: true,
        startedAt: state.startedAt ?? new Date().toISOString(),
      };
    case "USE_HINT":
      return {
        ...state,
        usedHints: {
          ...state.usedHints,
          [action.puzzleId]: Math.min(
            3,
            (state.usedHints[action.puzzleId] ?? 0) + 1,
          ),
        },
      };
    case "SOLVE_PUZZLE":
      if (state.solvedPuzzleIds.includes(action.puzzleId)) return state;
      return {
        ...state,
        solvedPuzzleIds: [...state.solvedPuzzleIds, action.puzzleId],
        collectedArtifactIds: [
          ...state.collectedArtifactIds,
          action.artifactId,
        ],
        revealedMosaicTiles: Array.from(
          new Set([...state.revealedMosaicTiles, ...action.mosaicTileIds]),
        ),
        restorationStages: {
          ...state.restorationStages,
          [action.restoreRoom]: 1,
          "grand-hall": Math.max(
            1,
            state.restorationStages["grand-hall"],
          ) as RestorationStage,
        },
        unlockedPuzzleIds: action.unlockPuzzleId
          ? Array.from(
              new Set([...state.unlockedPuzzleIds, action.unlockPuzzleId]),
            )
          : state.unlockedPuzzleIds,
        discoveredClueIds: action.clueId
          ? Array.from(new Set([...state.discoveredClueIds, action.clueId]))
          : state.discoveredClueIds,
      };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.settings },
      };
    case "RESET_GAME":
      return createInitialState();
    default:
      return state;
  }
}

export function readSave(): GameState | null {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { version: number; state: GameState };
    if (saved.version === SAVE_VERSION) return saved.state;
    if (saved.version === 1) {
      return {
        ...saved.state,
        restorationStages: {
          ...saved.state.restorationStages,
          "archivists-outer-office": 0,
        },
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeSave(state: GameState) {
  window.localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({ version: SAVE_VERSION, state }),
  );
}
