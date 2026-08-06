export const outerArtifactIds = [
  "feather-bookmark",
  "navigators-compass",
  "brass-lantern",
  "master-blueprint",
  "prism-lens",
  "botanical-specimen",
  "star-chart",
  "clockwork-gear",
] as const;

export const pedestalSolution = {
  crescent: "feather-bookmark",
  path: "navigators-compass",
  bowl: "brass-lantern",
  square: "master-blueprint",
  triangle: "prism-lens",
  teardrop: "botanical-specimen",
  loop: "star-chart",
  "toothed-circle": "clockwork-gear",
} as const;

export const finaleHints = [
  "The Handoff Note completes the center only after the other eight project records have been connected to their lessons.",
  "Match each record’s symbol to a review position, then confirm that its lesson describes the work represented there.",
  "Follow the software journey: crescent Context Card, connected-path Flow Trace, bowl Alignment Note, square Architecture Decision, triangle Defect Report, teardrop Release Record, loop Production Finding, and toothed Incident Review. The Handoff Note finishes the center.",
];

export const finalMosaicTiles = Array.from({ length: 625 }, (_, index) => index);
