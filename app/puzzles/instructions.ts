export type PuzzleInstructions = {
  objective: string;
  steps: string[];
  tip: string;
};

export const puzzleInstructions: Record<string, PuzzleInstructions> = {
  "The Librarian’s Shelf": {
    objective: "Inspect the shelf, uncover three fixed letters, then complete the hidden instruction.",
    steps: [
      "Open books and examine their full pages.",
      "Record the three letters marked in gold.",
      "Type the missing letters into the empty boxes and test the completed word.",
    ],
    tip: "The gold letters are fixed in place; the remaining letters are yours to infer.",
  },
  "The Cartographer’s Missing Route": {
    objective: "Reconstruct the two-stage route by reading the map’s landmarks and constraints.",
    steps: [
      "Study the legend and every numbered landmark.",
      "Build the first path before beginning the second.",
      "Check the completed route only when both paths obey the margin notes.",
    ],
    tip: "A valid path is not necessarily the intended path—order matters.",
  },
  "The Lantern Wall": {
    objective: "Rotate the lanterns until their four shadows combine into the required figure.",
    steps: [
      "Inspect the target silhouette.",
      "Rotate each lantern independently.",
      "Test the alignment when the overlapping shadows form one clean shape.",
    ],
    tip: "Watch the negative space between shadows, not only their outer edges.",
  },
  "The Stopped Clock": {
    objective: "Use the maintenance records to restore the clock’s missing sequence.",
    steps: [
      "Read the failure log and movement notes.",
      "Set each mechanism in the order supported by the evidence.",
      "Run the clock to test the full sequence.",
    ],
    tip: "Every failed repair eliminates one tempting arrangement.",
  },
  "The Sleeping Conservatory": {
    objective: "Wake every plant by matching its moisture needs to the correct phase of the day.",
    steps: [
      "Read each specimen note.",
      "Change the time phase and water only when the conditions match.",
      "Bring all six plants into bloom.",
    ],
    tip: "Some plants react to timing first and water second.",
  },
  "The Constellation That Should Not Exist": {
    objective: "Rotate and compare the star fragments until the impossible constellation appears.",
    steps: [
      "Inspect the recorded star groups.",
      "Rotate fragments without changing their internal shape.",
      "Confirm the arrangement when every shared star aligns.",
    ],
    tip: "Ignore the drawing’s orientation; preserve the distances between stars.",
  },
  "The Mirrored Typewriter": {
    objective: "Decode the mistyped message by mapping each printed key to its mirrored counterpart.",
    steps: [
      "Compare the physical keyboard with the printed output.",
      "Infer the substitution pattern from repeated letters.",
      "Type the corrected message.",
    ],
    tip: "The machine is consistent—even when it is wrong.",
  },
  "The Hall of Reflections": {
    objective: "Find the meaningful differences between the room and its reflection.",
    steps: [
      "Compare paired objects rather than scanning randomly.",
      "Select only differences that change identity or meaning.",
      "Submit the marked reflection when the set is complete.",
    ],
    tip: "Lighting and perspective can distract you from structural differences.",
  },
  "The Master Blueprint": {
    objective: "Align the transparent plans to reveal the shared construction.",
    steps: [
      "Inspect each layer separately.",
      "Rotate and position the plans over the drafting surface.",
      "Lock the arrangement when all reference points coincide.",
    ],
    tip: "Use the smallest repeated marks as anchors.",
  },
  "Return What Was Borrowed": {
    objective: "Return every collected object to the pedestal that matches its hidden symbol.",
    steps: [
      "Review the objects and the clues gathered in earlier rooms.",
      "Match each artifact to a pedestal by meaning, shape, and color.",
      "Confirm the full arrangement to complete the restoration.",
    ],
    tip: "The final puzzle remembers what the earlier puzzles taught you.",
  },
};
