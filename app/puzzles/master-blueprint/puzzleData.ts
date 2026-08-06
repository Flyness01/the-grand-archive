export type SafeguardId = "idempotency" | "timeout-fallback" | "durable-retry";
export type BoundaryId = "api-write" | "data-call" | "worker-recovery";

export const architectureSolution: Record<BoundaryId, SafeguardId> = {
  "api-write": "idempotency",
  "data-call": "timeout-fallback",
  "worker-recovery": "durable-retry",
};

export const architectureSafeguards: { id: SafeguardId; name: string; detail: string }[] = [
  { id: "idempotency", name: "Repeat protection", detail: "Technical name: idempotency. If the same save request arrives twice, complete it only once." },
  { id: "timeout-fallback", name: "Waiting limit + safe fallback", detail: "Technical name: timeout. Stop waiting on a slow service and return a safe response." },
  { id: "durable-retry", name: "Preserve and retry failed work", detail: "Technical name: durable retry + DLQ. Keep unfinished jobs so they can run again or be reviewed." },
];

export const architectureTests = [
  {
    id: "duplicate" as const,
    name: "Send duplicate request",
    evidence: "req-284 created records #91 and #92",
    plainEvidence: "One Save action created the same record twice.",
    boundary: "api-write" as BoundaryId,
  },
  {
    id: "latency" as const,
    name: "Add dependency latency",
    evidence: "data-service waited 2.8s; response SLO is 500ms",
    plainEvidence: "The API waited too long for the Data Service, so the user waited too long too.",
    boundary: "data-call" as BoundaryId,
  },
  {
    id: "worker" as const,
    name: "Stop background worker",
    evidence: "4 accepted jobs were neither completed nor preserved",
    plainEvidence: "When the Worker stopped, four accepted jobs disappeared instead of waiting safely.",
    boundary: "worker-recovery" as BoundaryId,
  },
] as const;

export const masterBlueprintHints = [
  "Run each failure test and restate it plainly: did something happen twice, wait too long, or disappear?",
  "Match that failure to the plain-language sentence on a safeguard, then attach it where the failure occurs in the diagram.",
  "Put Repeat Protection on API Write, Waiting Limit + Safe Fallback on Data Service Call, and Preserve + Retry on Queue / Worker Recovery.",
];

export const masterBlueprintMosaicTiles = Array.from({ length: 562 }, (_, index) => index);
