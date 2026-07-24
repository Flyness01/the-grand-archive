import type { RoomId } from "../game/types";
import {
  librariansShelfHints,
  librariansShelfMosaicTiles,
} from "./librarians-shelf/puzzleData";
import { validateLibrariansShelf } from "./librarians-shelf/validator";

export interface PuzzleDefinition {
  id: string;
  title: string;
  roomId: RoomId;
  difficulty: number;
  estimatedMinutes: number;
  hints: string[];
  solutionValidator: (input: unknown) => boolean;
  artifactRewardId: string;
  mosaicTileIds: number[];
}

export const puzzleRegistry: Record<string, PuzzleDefinition> = {
  "librarians-shelf": {
    id: "librarians-shelf",
    title: "The Librarian’s Shelf",
    roomId: "library",
    difficulty: 3,
    estimatedMinutes: 8,
    hints: librariansShelfHints,
    solutionValidator: validateLibrariansShelf,
    artifactRewardId: "feather-bookmark",
    mosaicTileIds: librariansShelfMosaicTiles,
  },
};
