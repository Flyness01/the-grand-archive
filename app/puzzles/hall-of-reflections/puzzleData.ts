export type ReviewDisposition = "blocker" | "follow-up" | "expected";

export const qaFindings = [
  {
    id: "keyboard-submit",
    area: "Accessibility",
    criterion: "Submit must work with pointer and keyboard.",
    observed: "Click works; Enter and Space do nothing when the button is focused.",
  },
  {
    id: "mobile-save",
    area: "Responsive behavior",
    criterion: "Save remains available at every supported width.",
    observed: "At 390px, the Save action is clipped outside the viewport.",
  },
  {
    id: "card-spacing",
    area: "Visual polish",
    criterion: "Cards use 24px internal spacing.",
    observed: "One secondary card measures 22px. Content and interaction are unaffected.",
  },
  {
    id: "error-details",
    area: "Error handling",
    criterion: "Users receive a useful message; internal details stay private.",
    observed: "The error state renders the raw service name and stack trace.",
  },
  {
    id: "approved-copy",
    area: "Content",
    criterion: "Use the wording approved in the latest product review.",
    observed: "The build says “Project workspace,” matching the approved copy update.",
  },
  {
    id: "toast-duration",
    area: "Feedback",
    criterion: "Success confirmation remains available long enough to perceive.",
    observed: "The success toast disappears after 200ms with no persistent confirmation.",
  },
  {
    id: "skeleton-color",
    area: "Loading state",
    criterion: "Loading skeleton uses the neutral surface token.",
    observed: "The rendered token is one shade warmer; layout and contrast still pass.",
  },
  {
    id: "analytics-contract",
    area: "Integration",
    criterion: "The existing dashboard continues receiving save-complete events.",
    observed: "The event was renamed, but the analytics consumer was not updated.",
  },
] as const;

export const qaReviewSolution: Record<(typeof qaFindings)[number]["id"], ReviewDisposition> = {
  "keyboard-submit": "blocker",
  "mobile-save": "blocker",
  "card-spacing": "follow-up",
  "error-details": "blocker",
  "approved-copy": "expected",
  "toast-duration": "blocker",
  "skeleton-color": "follow-up",
  "analytics-contract": "blocker",
};

export const reflectionHints = [
  "A release blocker violates a requirement in a way that prevents use, access, privacy, or a required integration.",
  "Small token or spacing drift can be tracked without stopping a safe release. An approved product change is expected behavior, not a defect.",
  "Block keyboard submission, missing mobile Save, exposed internals, imperceptible confirmation, and the broken analytics contract. Follow up on spacing and skeleton color; accept the approved copy.",
];

export const reflectionMosaicTiles = [
  276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286,
  301, 311, 326, 336, 351, 361, 376, 386, 401, 411, 426, 436,
  451, 461, 476, 486, 501, 511, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536,
];
