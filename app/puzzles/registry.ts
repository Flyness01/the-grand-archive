import type { RoomId } from "../game/types";
import {
  cartographersRouteHints,
  cartographersRouteMosaicTiles,
} from "./cartographers-route/puzzleData";
import { validateCartographersRoute } from "./cartographers-route/validator";
import {
  librariansShelfHints,
  librariansShelfMosaicTiles,
} from "./librarians-shelf/puzzleData";
import { validateLibrariansShelf } from "./librarians-shelf/validator";
import {
  lanternWallHints,
  lanternWallMosaicTiles,
} from "./lantern-wall/puzzleData";
import { validateLanternWall } from "./lantern-wall/validator";
import {
  stoppedClockHints,
  stoppedClockMosaicTiles,
} from "./stopped-clock/puzzleData";
import { validateStoppedClock } from "./stopped-clock/validator";

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
  "cartographers-missing-route": {
    id: "cartographers-missing-route",
    title: "The Cartographer’s Missing Route",
    roomId: "map-room",
    difficulty: 4,
    estimatedMinutes: 10,
    hints: cartographersRouteHints,
    solutionValidator: validateCartographersRoute,
    artifactRewardId: "navigators-compass",
    mosaicTileIds: cartographersRouteMosaicTiles,
  },
  "lantern-wall": {
    id: "lantern-wall",
    title: "The Lantern Wall",
    roomId: "grand-hall",
    difficulty: 5,
    estimatedMinutes: 10,
    hints: lanternWallHints,
    solutionValidator: validateLanternWall,
    artifactRewardId: "brass-lantern",
    mosaicTileIds: lanternWallMosaicTiles,
  },
  "stopped-clock": {
    id: "stopped-clock",
    title: "The Stopped Clock",
    roomId: "workshop",
    difficulty: 5,
    estimatedMinutes: 10,
    hints: stoppedClockHints,
    solutionValidator: validateStoppedClock,
    artifactRewardId: "clockwork-gear",
    mosaicTileIds: stoppedClockMosaicTiles,
  },
};
