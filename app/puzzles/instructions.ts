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
  "The Post-Release Check": {
    objective: "Review the first fifteen minutes after a release and build one production finding supported by the timeline, metrics, and logs.",
    steps: [
      "Determine when behavior changed by comparing the baseline with the deployment marker.",
      "Identify the unhealthy component from its service metrics.",
      "Use the correlated log sample to diagnose what the component is doing.",
    ],
    tip: "A strong finding explains every signal without contradicting the healthy ones.",
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
  "The Release Readiness Review": {
    objective: "Review eight release-candidate findings and classify each as a release blocker, tracked follow-up, or expected change.",
    steps: [
      "Read the acceptance criterion and observed evidence for every finding.",
      "Block issues that break required behavior, access, privacy, or integration contracts.",
      "Track safe polish separately and accept changes already approved by Product.",
    ],
    tip: "Severity follows user and system impact—not how visually noticeable a finding appears.",
  },
  "The Architecture Resilience Review": {
    objective: "Inject three realistic failures, read the resulting evidence, and place safeguards where they protect the broken guarantees.",
    steps: [
      "Run the duplicate-request, slow-dependency, and worker-failure tests.",
      "Select each safeguard and attach it to a system boundary.",
      "Rerun the complete resilience suite and approve only when every guarantee passes.",
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
