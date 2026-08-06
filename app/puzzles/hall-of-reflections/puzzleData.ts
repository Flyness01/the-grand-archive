export const qaRows = ["Chrome", "Safari", "Mobile", "Keyboard", "Screen reader"] as const;
export const qaColumns = ["Save", "Error", "Retry", "Confirm", "Navigation"] as const;

// A small nonogram whose failure cells form a recognizable bug-like silhouette.
export const qaFailureSolution = [
  "0:1", "0:2", "0:3",
  "1:0", "1:2", "1:4",
  "2:0", "2:1", "2:2", "2:3", "2:4",
  "3:0", "3:2", "3:4",
  "4:0", "4:2", "4:4",
] as const;

export const qaRowRuns = ["3", "1 1 1", "5", "1 1 1", "1 1 1"] as const;
export const qaColumnRuns = ["4", "1 1", "5", "1 1", "4"] as const;

export const reflectionHints = [
  "A number tells you the length of one unbroken group of failed cells. “1 1” means two single failures with at least one pass between them.",
  "The middle row and middle column each show 5, so every cell in both must fail. Use those fixed cells to separate the smaller groups.",
  "Top row: middle three. Second row: first, middle, last. Middle row: all five. Final two rows: first, middle, last.",
];

export const reflectionMosaicTiles = [
  276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286,
  301, 311, 326, 336, 351, 361, 376, 386, 401, 411, 426, 436,
  451, 461, 476, 486, 501, 511, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536,
];
