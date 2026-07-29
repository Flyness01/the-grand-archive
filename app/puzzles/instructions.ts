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
  "The Unclassified Trace": {
    objective: "Regroup noisy production events until a recurring engineering pattern becomes visible.",
    steps: [
      "Compare the unclassified telemetry with known healthy patterns.",
      "Change the service handoff without changing the recorded events.",
      "Identify the behavior once the events form a reproducible trace.",
    ],
    tip: "Use the Flow Trace from Puzzle 2 to choose the most meaningful system boundary.",
  },
  "The Unclear Handoff": {
    objective: "Decode a transformed message and complete an actionable engineering handoff.",
    steps: [
      "Compare the sample inputs with their resulting outputs.",
      "Infer the consistent row-by-row transformation.",
      "Enter the inputs that produce the missing word in the handoff.",
    ],
    tip: "Treat surprising output as data: a consistent error is a pattern you can explain.",
  },
  "The Meaningful Difference": {
    objective: "Compare a reference interface with the current build and report only meaningful defects.",
    steps: [
      "Compare corresponding interface elements systematically.",
      "Separate expected layout changes from differences in behavior, meaning, or access.",
      "Submit the five actionable findings as a QA report.",
    ],
    tip: "Pixel difference is evidence, not automatically a defect.",
  },
  "The Architecture Decision": {
    objective: "Align user experience, service architecture, and reliability around fixed system constraints.",
    steps: [
      "Review each system perspective and the constraints it must satisfy.",
      "Rotate each plan toward its corresponding fixed boundary.",
      "Approve the design only when all three perspectives agree.",
    ],
    tip: "A locally elegant plan can still fail when combined with the rest of the system.",
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
