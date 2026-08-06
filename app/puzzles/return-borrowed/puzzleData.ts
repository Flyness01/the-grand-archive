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
  path: "navigators-compass",
  bowl: "brass-lantern",
  "toothed-circle": "clockwork-gear",
  teardrop: "botanical-specimen",
  loop: "star-chart",
  triangle: "prism-lens",
  square: "master-blueprint",
} as const;

export const finaleHints = [
  "The Handoff Note completes the center only after the other eight project records have been connected to their lessons.",
  "Match each record’s symbol to a review position, then confirm that its lesson describes the work represented there.",
  "Crescent Context Card, connected-path Flow Trace, bowl Alignment Note, toothed Incident Review, teardrop Release Record, loop Pattern Report, triangle Defect Report, and square Architecture Decision. The Handoff Note finishes the center.",
];

export const finalMosaicTiles = Array.from({ length: 625 }, (_, index) => index);
