export const outerArtifactIds = [
  "feather-bookmark",
  "navigators-compass",
  "brass-lantern",
  "clockwork-gear",
  "botanical-specimen",
  "star-chart",
  "prism-lens",
  "master-blueprint",
] as const;

export const pedestalSolution = {
  crescent: "feather-bookmark",
  star: "navigators-compass",
  bowl: "brass-lantern",
  "toothed-circle": "clockwork-gear",
  teardrop: "botanical-specimen",
  "five-point-star": "star-chart",
  triangle: "prism-lens",
  square: "master-blueprint",
} as const;

export const finaleHints = [
  "The Journal belongs to the central manuscript stand. Arrange the other eight objects around the ring first.",
  "Match each artifact’s hidden base shape to a pedestal, then use glow color and engraved symbol as confirmation.",
  "Crescent Context Card, star Flow Trace, bowl Alignment Note, toothed Incident Review, teardrop Release Record, five-point Pattern Report, angled Handoff Note, triangle Prism, and square Blueprint.",
];

export const finalMosaicTiles = Array.from({ length: 625 }, (_, index) => index);
