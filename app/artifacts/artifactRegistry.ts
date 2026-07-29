import type { RoomId } from "../game/types";

export interface Artifact {
  id: string;
  name: string;
  shortDescription: string;
  roomOfOrigin: RoomId;
  symbol: string;
  glowGroup: string;
  pedestalShape: string;
}

export const artifacts: Record<string, Artifact> = {
  "feather-bookmark": {
    id: "feather-bookmark",
    name: "Context Card",
    shortDescription: "Understanding the system was the first contribution.",
    roomOfOrigin: "library",
    symbol: "Crescent",
    glowGroup: "Amber",
    pedestalShape: "crescent",
  },
  "navigators-compass": {
    id: "navigators-compass",
    name: "Flow Trace",
    shortDescription: "Understanding a request path turns a fix into reusable knowledge.",
    roomOfOrigin: "map-room",
    symbol: "Star",
    glowGroup: "Green",
    pedestalShape: "star",
  },
  "brass-lantern": {
    id: "brass-lantern",
    name: "Alignment Note",
    shortDescription: "Shared understanding made four perspectives actionable.",
    roomOfOrigin: "grand-hall",
    symbol: "Bowl",
    glowGroup: "Amber",
    pedestalShape: "bowl",
  },
  "clockwork-gear": {
    id: "clockwork-gear",
    name: "Clockwork Gear",
    shortDescription: "Someone stopped time.",
    roomOfOrigin: "workshop",
    symbol: "Toothed circle",
    glowGroup: "Copper",
    pedestalShape: "toothed-circle",
  },
  "botanical-specimen": {
    id: "botanical-specimen",
    name: "Botanical Specimen",
    shortDescription: "Even forgotten things grow.",
    roomOfOrigin: "conservatory",
    symbol: "Teardrop",
    glowGroup: "Green",
    pedestalShape: "teardrop",
  },
  "star-chart": {
    id: "star-chart",
    name: "Star Chart",
    shortDescription: "The sky kept its records.",
    roomOfOrigin: "observatory",
    symbol: "Five-point star",
    glowGroup: "Blue",
    pedestalShape: "five-point-star",
  },
  "leather-journal": {
    id: "leather-journal",
    name: "Leather Journal",
    shortDescription: "Every page was filled. Except one.",
    roomOfOrigin: "archivists-outer-office",
    symbol: "Angled stand",
    glowGroup: "Red",
    pedestalShape: "angled-stand",
  },
  "prism-lens": {
    id: "prism-lens",
    name: "Prism Lens",
    shortDescription: "Truth changes with the angle.",
    roomOfOrigin: "hall-of-reflections",
    symbol: "Triangle",
    glowGroup: "Violet",
    pedestalShape: "triangle",
  },
  "master-blueprint": {
    id: "master-blueprint",
    name: "Master Blueprint",
    shortDescription: "The building knew the answer.",
    roomOfOrigin: "workshop",
    symbol: "Square",
    glowGroup: "Blue",
    pedestalShape: "square",
  },
  "final-manuscript": {
    id: "final-manuscript",
    name: "Final Manuscript",
    shortDescription: "The final record was the journey itself.",
    roomOfOrigin: "archivists-study",
    symbol: "Manuscript",
    glowGroup: "White-gold",
    pedestalShape: "manuscript-stand",
  },
};
