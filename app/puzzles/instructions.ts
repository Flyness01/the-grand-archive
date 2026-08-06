export type PuzzleInstructions = {
  objective: string;
  steps: string[];
  tip: string;
};

export const puzzleInstructions: Record<string, PuzzleInstructions> = {
  "The Documentation Shelf": {
    objective: "Review the onboarding documents, uncover three fixed letters, then complete the seven-letter lesson they share.",
    steps: [
      "Open documents and read the team’s notes.",
      "Record the three fixed letters, then reread the highlighted notes for the shared lesson that completes the word.",
      "Type the missing letters into the empty boxes and test the completed word.",
    ],
    tip: "The gold letters fix three positions. The highlighted notes also describe the word you need.",
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
    objective: "The Project Board represents a dependency cascade as clockwork. Recover production by reversing the failure timeline.",
    steps: [
      "Read the incident timeline and identify which services actually failed.",
      "Arrange the recovery steps by unwinding the dependency cascade.",
      "Run the recovery and verify that the entire system becomes healthy.",
    ],
    tip: "Do not restart a healthy service just because it appears in the dashboard.",
  },
  "The Release Runbook": {
    objective: "The Project Board represents a healthy release as a growing system. Move one candidate through every gate in order.",
    steps: [
      "Read each check’s required release stage and dependency mode.",
      "Advance the stage and toggle dependencies to satisfy each requirement.",
      "Complete all six checks from initial scope through live monitoring.",
    ],
    tip: "Deploy is not the end of the release; observation is part of shipping.",
  },
  "The Shared Timeline": {
    objective: "Align three viewpoints on the same sequence, then add your name to the completed team story.",
    steps: [
      "Use the left and right arrows to move each strip.",
      "Place matching moment labels in vertical columns across all three strips.",
      "Put Last day in the shaded center window, inspect the completed journey, and add your name below.",
    ],
    tip: "The center should read Reflect, Thank you, and Together. Your name is a signature, not another answer to guess.",
  },
  "The Word-Ends Handoff": {
    objective: "Decode a transformed message and complete an actionable engineering handoff.",
    steps: [
      "Compare the sample inputs with their resulting outputs.",
      "Infer the consistent row-by-row transformation.",
      "Enter the inputs that produce the missing word in the handoff.",
    ],
    tip: "Treat surprising output as data: a consistent error is a pattern you can explain.",
  },
  "The CI Failure Pattern": {
    objective: "Reconstruct the hidden failed tests using only the number clues beside each row and column.",
    steps: [
      "A single number means one unbroken group: 3 means three neighboring failed cells.",
      "Two numbers mean separate groups with at least one empty cell between them: 1 1 means fail, gap, fail.",
      "Mark cells until every row and every column matches its clue, then check the pattern.",
    ],
    tip: "No software knowledge is needed. Treat it like a small picture-logic puzzle; every mark must satisfy two clues.",
  },
  "The Architecture Resilience Review": {
    objective: "Study three abnormal system streams, recognize what repeats, spikes, or disappears, and repair each pattern at its source.",
    steps: [
      "Compare the repeated write, response-time sequence, and accepted-versus-completed job stream.",
      "Select a repair module and attach it to the boundary where its abnormal pattern begins.",
      "Rerun the simulation; any unresolved stream remains visibly failed.",
    ],
    tip: "Place protection at the boundary where a guarantee can actually be enforced.",
  },
  "The Final Handoff": {
    objective: "Connect every project record to the lesson it represents, then complete the retrospective.",
    steps: [
      "Review the records earned from the previous nine challenges.",
      "Match the first eight records to their lessons using symbol and meaning.",
      "Place the Handoff Note at the center to turn the evidence into one project story.",
    ],
    tip: "This is not a memory test alone—each record’s description explains why it belongs.",
  },
};
