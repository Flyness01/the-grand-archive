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
import {
  sleepingConservatoryHints,
  sleepingConservatoryMosaicTiles,
} from "./sleeping-conservatory/puzzleData";
import { validateSleepingConservatory } from "./sleeping-conservatory/validator";
import {
  impossibleConstellationHints,
  impossibleConstellationMosaicTiles,
} from "./impossible-constellation/puzzleData";
import { validateImpossibleConstellation } from "./impossible-constellation/validator";
import {
  mirroredTypewriterHints,
  mirroredTypewriterMosaicTiles,
} from "./mirrored-typewriter/puzzleData";
import { validateMirroredTypewriter } from "./mirrored-typewriter/validator";
import {
  reflectionHints,
  reflectionMosaicTiles,
} from "./hall-of-reflections/puzzleData";
import { validateHallOfReflections } from "./hall-of-reflections/validator";
import {
  masterBlueprintHints,
  masterBlueprintMosaicTiles,
} from "./master-blueprint/puzzleData";
import { validateMasterBlueprint } from "./master-blueprint/validator";
import {
  finaleHints,
  finalMosaicTiles,
} from "./return-borrowed/puzzleData";
import { validateReturnBorrowed } from "./return-borrowed/validator";

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
  "sleeping-conservatory": {
    id: "sleeping-conservatory",
    title: "The Sleeping Conservatory",
    roomId: "conservatory",
    difficulty: 6,
    estimatedMinutes: 11,
    hints: sleepingConservatoryHints,
    solutionValidator: validateSleepingConservatory,
    artifactRewardId: "botanical-specimen",
    mosaicTileIds: sleepingConservatoryMosaicTiles,
  },
  "constellation-that-should-not-exist": {
    id: "constellation-that-should-not-exist",
    title: "The Constellation That Should Not Exist",
    roomId: "observatory",
    difficulty: 6,
    estimatedMinutes: 10,
    hints: impossibleConstellationHints,
    solutionValidator: validateImpossibleConstellation,
    artifactRewardId: "star-chart",
    mosaicTileIds: impossibleConstellationMosaicTiles,
  },
  "mirrored-typewriter": {
    id: "mirrored-typewriter",
    title: "The Mirrored Typewriter",
    roomId: "archivists-outer-office",
    difficulty: 7,
    estimatedMinutes: 10,
    hints: mirroredTypewriterHints,
    solutionValidator: validateMirroredTypewriter,
    artifactRewardId: "leather-journal",
    mosaicTileIds: mirroredTypewriterMosaicTiles,
  },
  "hall-of-reflections": {
    id: "hall-of-reflections",
    title: "The Hall of Reflections",
    roomId: "hall-of-reflections",
    difficulty: 7,
    estimatedMinutes: 11,
    hints: reflectionHints,
    solutionValidator: validateHallOfReflections,
    artifactRewardId: "prism-lens",
    mosaicTileIds: reflectionMosaicTiles,
  },
  "master-blueprint": {
    id: "master-blueprint",
    title: "The Master Blueprint",
    roomId: "workshop",
    difficulty: 8,
    estimatedMinutes: 12,
    hints: masterBlueprintHints,
    solutionValidator: validateMasterBlueprint,
    artifactRewardId: "master-blueprint",
    mosaicTileIds: masterBlueprintMosaicTiles,
  },
  "return-what-was-borrowed": {
    id: "return-what-was-borrowed",
    title: "Return What Was Borrowed",
    roomId: "grand-hall",
    difficulty: 9,
    estimatedMinutes: 12,
    hints: finaleHints,
    solutionValidator: validateReturnBorrowed,
    artifactRewardId: "final-manuscript",
    mosaicTileIds: finalMosaicTiles,
  },
};
