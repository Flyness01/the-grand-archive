export type SafeguardId = "idempotency" | "timeout-fallback" | "durable-retry";
export type BoundaryId = "api-write" | "data-call" | "worker-recovery";

export const architectureSolution: Record<BoundaryId, SafeguardId> = {
  "api-write": "idempotency",
  "data-call": "timeout-fallback",
  "worker-recovery": "durable-retry",
};

export const architectureSafeguards: { id: SafeguardId; name: string; detail: string }[] = [
  { id: "idempotency", name: "Idempotency protection", detail: "Treat repeated writes with the same request key as one operation." },
  { id: "timeout-fallback", name: "Timeout + fallback", detail: "Stop waiting on a slow dependency and return a safe response." },
  { id: "durable-retry", name: "Durable retry + DLQ", detail: "Preserve failed background work for controlled retry or review." },
];

export const architectureTests = [
  {
    id: "duplicate" as const,
    name: "Send duplicate request",
    evidence: "req-284 created records #91 and #92",
    boundary: "api-write" as BoundaryId,
  },
  {
    id: "latency" as const,
    name: "Add dependency latency",
    evidence: "data-service waited 2.8s; response SLO is 500ms",
    boundary: "data-call" as BoundaryId,
  },
  {
    id: "worker" as const,
    name: "Stop background worker",
    evidence: "4 accepted jobs were neither completed nor preserved",
    boundary: "worker-recovery" as BoundaryId,
  },
] as const;

export const masterBlueprintHints = [
  "Run each failure test before changing the system. The evidence identifies the broken guarantee, not the safeguard by name.",
  "Protect repeated writes at the API boundary, limit the slow synchronous dependency, and preserve work around the queue and worker.",
  "Place Idempotency on API Write, Timeout + Fallback on Data Service Call, and Durable Retry + DLQ on Queue / Worker Recovery.",
];

export const masterBlueprintMosaicTiles = Array.from({ length: 562 }, (_, index) => index);
