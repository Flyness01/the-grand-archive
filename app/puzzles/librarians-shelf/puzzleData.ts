export interface ShelfBook {
  id: string;
  title: string;
  color: string;
  passage: string;
  highlightedLine?: string;
  goldLetter?: string;
  orderMark?: string;
}

export const shelfBooks: ShelfBook[] = [
  {
    id: "atlas-forgotten",
    title: "README — Start Here",
    color: "emerald",
    passage:
      "The repository was unfamiliar, but the team had left a path through it for anyone willing to slow down and read.",
    highlightedLine: "Read the system before you rush to change it.",
    goldLetter: "T",
    orderMark: "Position 4",
  },
  {
    id: "last-cartographer",
    title: "Service Overview",
    color: "umber",
    passage:
      "A short explanation of what the service owns, who depends on it, and why the boundaries matter.",
  },
  {
    id: "constellations-above",
    title: "Frontend Architecture",
    color: "midnight",
    passage:
      "Components become a product only when their states, data, and user needs are understood together.",
  },
  {
    id: "history-lanterns",
    title: "Pull Request Guide",
    color: "wine",
    passage:
      "A good pull request makes the change understandable, gives reviewers context, and welcomes better ideas.",
    highlightedLine: "Every good first contribution begins with context.",
    goldLetter: "C",
    orderMark: "Position 1",
  },
  {
    id: "botanical-sketches",
    title: "Design System Notes",
    color: "moss",
    passage:
      "Consistency is care made visible: each shared pattern saves the next person from solving the same problem again.",
  },
  {
    id: "mechanical-wonders",
    title: "API Contracts",
    color: "copper",
    passage:
      "An interface is a promise between systems. Clear promises make dependable software.",
  },
  {
    id: "silent-valley",
    title: "Known Issues",
    color: "slate",
    passage:
      "The team records unfinished work without shame so the next investigation begins with evidence instead of guesswork.",
  },
  {
    id: "journeys-east",
    title: "Release Checklist",
    color: "ochre",
    passage:
      "Shipping is not a final leap. It is a sequence of small checks performed with attention.",
  },
  {
    id: "rivers-roads",
    title: "Testing Strategy",
    color: "blue",
    passage:
      "Tests preserve the decisions a team cannot afford to rediscover after every change.",
  },
  {
    id: "astronomers-almanac",
    title: "Observability Runbook",
    color: "indigo",
    passage:
      "When production behaves differently from expectation, traces and logs turn uncertainty into a question that can be answered.",
  },
  {
    id: "keepers-ledger",
    title: "Team Working Agreement",
    color: "chestnut",
    passage:
      "Ask early. Share context. Review generously. Leave the code and the conversation clearer than you found them.",
    highlightedLine: "Take what you learned and leave the path clearer.",
    goldLetter: "T",
    orderMark: "Position 7",
  },
  {
    id: "songs-empty-hall",
    title: "Lessons from Last Sprint",
    color: "plum",
    passage:
      "The strongest retrospective note simply says: someone made space for me to learn, so I will make space for the next person.",
  },
];

export const librariansShelfSolution = "CONTEXT";

export const librariansShelfHints = [
  "You gain this by reading code, reading documentation, and asking questions.",
  "Three documents carry highlighted lines.",
  "Their gold letters belong to fixed places in a seven-letter engineering instruction.",
  "Complete C _ _ T _ _ T. It is what you need before changing an unfamiliar system.",
];

export const librariansShelfMosaicTiles = [
  35, 36, 37, 38, 39, 60, 61, 62, 63, 64, 85, 86, 87, 88, 89, 110, 111,
  112, 113, 114, 135, 136, 137, 138, 139, 160, 161, 162, 163, 164, 185,
  186, 187, 188, 189, 210, 211, 212, 213, 214,
];
