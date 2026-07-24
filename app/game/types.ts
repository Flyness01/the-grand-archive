export type RoomId =
  | "grand-hall"
  | "library"
  | "map-room"
  | "workshop"
  | "conservatory"
  | "observatory"
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
  | { type: "UPDATE_SETTINGS"; settings: Partial<GameSettings> }
  | { type: "RESET_GAME" };
