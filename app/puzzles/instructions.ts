export type PuzzleInstructions = {
  objective: string;
  steps: string[];
  tip: string;
};

export const puzzleInstructions: Record<string, PuzzleInstructions> = {
  "The Documentation Shelf": {
    objective: "Review the onboarding documents, uncover three fixed letters, then complete the engineering instruction.",
    steps: [
      "Open documents and read the team’s notes.",
      "Record the three letters attached to highlighted lessons.",
      "Type the missing letters into the empty boxes and test the completed word.",
    ],
    tip: "The highlighted letters are fixed in place; the remaining letters are yours to infer.",
  },
  "The Missing Request Path": {
    objective: "Trace a user request through an unfamiliar system without crossing architectural boundaries.",
    steps: [
      "Inspect each component and the documented connections.",
      "Trace the client-side flow before continuing through the service layer.",
      "Validate the request only when every architecture note is satisfied.",
    ],
    tip: "A connection can exist without belonging in this request path—follow responsibilities, not proximity.",
  },
  "Signal Alignment": {
    objective: "Reconcile four team perspectives into one shared implementation plan.",
    steps: [
      "Review the signals from Design, Frontend, API, and Product.",
      "Adjust each team’s direction and priority independently.",
      "Check alignment when the four fragments describe one coherent outcome.",
    ],
    tip: "Local certainty is not shared alignment; judge every decision by the combined plan.",
  },
  "Incident 14": {
    objective: "Recover a production system by reconstructing and reversing its dependency failure.",
    steps: [
      "Read the incident timeline and identify which services actually failed.",
      "Arrange the recovery steps by unwinding the dependency cascade.",
      "Run the recovery and verify that the entire system becomes healthy.",
    ],
    tip: "Do not restart a healthy service just because it appears in the dashboard.",
  },
  "The Release Runbook": {
    objective: "Move one release candidate through every validation and delivery gate in the correct order.",
    steps: [
      "Read each check’s required release stage and dependency mode.",
      "Advance the stage and toggle dependencies to satisfy each requirement.",
      "Complete all six checks from initial scope through live monitoring.",
    ],
    tip: "Deploy is not the end of the release; observation is part of shipping.",
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
