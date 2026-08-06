export type RoomId =
  | "grand-hall"
  | "library"
  | "map-room"
  | "workshop"
  | "conservatory"
  | "observatory"
  | "archivists-outer-office"
  | "hall-of-reflections"
  | "archivists-study";

export type RestorationStage = 0 | 1 | 2 | 3 | 4;

export interface GameSettings {
  muted: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  textScale: "default" | "large";
}

export interface GameState {
  currentRoom: RoomId;
  visitedRooms: RoomId[];
  solvedPuzzleIds: string[];
  unlockedPuzzleIds: string[];
  collectedArtifactIds: string[];
  placedArtifactIds: string[];
  discoveredClueIds: string[];
  restorationStages: Record<RoomId, RestorationStage>;
  revealedMosaicTiles: number[];
  usedHints: Record<string, number>;
  settings: GameSettings;
  introComplete: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface RoomDefinition {
  id: RoomId;
  name: string;
  eyebrow: string;
  connections: RoomId[];
  initiallyUnlocked: boolean;
}

export type GameAction =
  | { type: "HYDRATE"; state: GameState }
  | { type: "ENTER_ROOM"; roomId: RoomId }
  | { type: "COMPLETE_INTRO" }
  | { type: "REPLAY_INTRO" }
  | { type: "USE_HINT"; puzzleId: string }
  | { type: "RESET_HINTS"; puzzleId: string }
  | {
      type: "SOLVE_PUZZLE";
      puzzleId: string;
      artifactId: string;
      mosaicTileIds: number[];
      restoreRoom: RoomId;
      unlockPuzzleId?: string;
      clueId?: string;
    }
  | { type: "UPDATE_SETTINGS"; settings: Partial<GameSettings> }
  | { type: "RESET_GAME" };
