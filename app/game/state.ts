import type {
  GameAction,
  GameSettings,
  GameState,
  RestorationStage,
  RoomId,
} from "./types";

export const SAVE_KEY = "grand-archive-save";
export const SAVE_VERSION = 1;

const roomIds: RoomId[] = [
  "grand-hall",
  "library",
  "map-room",
  "workshop",
  "conservatory",
  "observatory",
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
    return saved.version === SAVE_VERSION ? saved.state : null;
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
