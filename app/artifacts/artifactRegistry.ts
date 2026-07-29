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
    name: "Incident Review",
    shortDescription: "A clear timeline transformed failure into shared knowledge.",
    roomOfOrigin: "workshop",
    symbol: "Toothed circle",
    glowGroup: "Copper",
    pedestalShape: "toothed-circle",
  },
  "botanical-specimen": {
    id: "botanical-specimen",
    name: "Release Record",
    shortDescription: "The work was not finished until users and metrics were healthy.",
    roomOfOrigin: "conservatory",
    symbol: "Teardrop",
    glowGroup: "Green",
    pedestalShape: "teardrop",
  },
  "star-chart": {
    id: "star-chart",
    name: "Pattern Report",
    shortDescription: "The right context turned noisy events into reproducible behavior.",
    roomOfOrigin: "observatory",
    symbol: "Five-point star",
    glowGroup: "Blue",
    pedestalShape: "five-point-star",
  },
  "leather-journal": {
    id: "leather-journal",
    name: "Handoff Note",
    shortDescription: "Clarity made the technical finding useful to the whole team.",
    roomOfOrigin: "archivists-outer-office",
    symbol: "Angled stand",
    glowGroup: "Red",
    pedestalShape: "angled-stand",
  },
  "prism-lens": {
    id: "prism-lens",
    name: "Defect Report",
    shortDescription: "Careful comparison separated actionable problems from harmless noise.",
    roomOfOrigin: "hall-of-reflections",
    symbol: "Triangle",
    glowGroup: "Violet",
    pedestalShape: "triangle",
  },
  "master-blueprint": {
    id: "master-blueprint",
    name: "Architecture Decision",
    shortDescription: "Experience, services, and reliability became one coherent design.",
    roomOfOrigin: "workshop",
    symbol: "Square",
    glowGroup: "Blue",
    pedestalShape: "square",
  },
  "final-manuscript": {
    id: "final-manuscript",
    name: "Project Retrospective",
    shortDescription: "Nine lessons became one story of thoughtful engineering and growth.",
    roomOfOrigin: "archivists-study",
    symbol: "Manuscript",
    glowGroup: "White-gold",
    pedestalShape: "manuscript-stand",
  },
};
