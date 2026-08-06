"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  architectureSafeguards,
  architectureSolution,
  architectureTests,
  masterBlueprintHints,
  type BoundaryId,
  type SafeguardId,
} from "./puzzleData";
import { validateMasterBlueprint } from "./validator";

type TestId = (typeof architectureTests)[number]["id"];
type TestResult = "pass" | "fail";

const boundaryLabels: Record<BoundaryId, string> = {
  "api-write": "API write boundary",
  "data-call": "Data service call",
  "worker-recovery": "Queue / worker recovery",
};

const boundaryExplanations: Record<BoundaryId, string> = {
  "api-write": "Where Save requests enter the API",
  "data-call": "Where the API waits for stored data",
  "worker-recovery": "Where background jobs wait and run",
};

export function MasterBlueprint({
  hintCount,
  onUseHint,
  onCollectReward,
  alreadySolved,
}: {
  hintCount: number;
  onUseHint: () => void;
  onCollectReward: () => void;
  alreadySolved: boolean;
}) {
  const [placements, setPlacements] = useState<Partial<Record<BoundaryId, SafeguardId>>>(
    alreadySolved ? { ...architectureSolution } : {},
  );
  const [selected, setSelected] = useState<SafeguardId | null>(null);
  const [testsRun, setTestsRun] = useState<TestId[]>(alreadySolved ? architectureTests.map((test) => test.id) : []);
  const [results, setResults] = useState<Partial<Record<TestId, TestResult>>>(
    alreadySolved ? { duplicate: "pass", latency: "pass", worker: "pass" } : {},
  );
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(alreadySolved ? "The resilience suite remains green." : "");

  function runTest(test: (typeof architectureTests)[number]) {
    const passed = placements[test.boundary] === architectureSolution[test.boundary];
    setTestsRun((current) => current.includes(test.id) ? current : [...current, test.id]);
    setResults((current) => ({ ...current, [test.id]: passed ? "pass" : "fail" }));
    setFeedback(passed
      ? `${test.name}: PASS — the required guarantee holds under failure.`
      : `${test.name}: FAIL — ${test.plainEvidence} (${test.evidence}). Match that plain-language failure to a safeguard description.`);
  }

  function placeSafeguard(boundary: BoundaryId) {
    if (!selected || solved) return;
    setPlacements((current) => {
      const next = { ...current };
      for (const [placedBoundary, safeguard] of Object.entries(next)) {
        if (safeguard === selected) delete next[placedBoundary as BoundaryId];
      }
      next[boundary] = selected;
      return next;
    });
    setResults({});
    setFeedback(`${architectureSafeguards.find((item) => item.id === selected)?.name} attached to ${boundaryLabels[boundary]}. Rerun the failure tests.`);
    setSelected(null);
  }

  function runFullSuite() {
    const correct = validateMasterBlueprint(placements);
    setResults({ duplicate: correct ? "pass" : "fail", latency: correct ? "pass" : "fail", worker: correct ? "pass" : "fail" });
    if (correct) {
      setSolved(true);
      setFeedback("Resilience suite passed: duplicate writes are contained, slow dependencies respect the SLO, and failed work is preserved.");
    } else {
      setFeedback("The full suite still fails. At least one safeguard protects the wrong system boundary.");
    }
  }

  return (
    <div className="blueprint-puzzle resilience-lab">
      <div className="blueprint-puzzle__workspace resilience-lab__workspace">
        <header className="resilience-requirements">
          <p>Architecture review · failure guarantees</p>
          <small>No computer-science background required: run a test, read what went wrong, and match it to a safeguard description.</small>
          <span>One write per request key</span>
          <span>Response within 500ms</span>
          <span>Accepted jobs are never lost</span>
        </header>

        <section className="failure-test-panel" aria-label="Failure injection tests">
          {architectureTests.map((test) => (
            <button key={test.id} onClick={() => runTest(test)} disabled={solved} className={results[test.id] ? `is-${results[test.id]}` : ""}>
              <small>{results[test.id] ? results[test.id]?.toUpperCase() : "NOT RUN"}</small>
              <b>{test.name}</b>
            </button>
          ))}
        </section>

        <section className="resilience-system" aria-label="System architecture under review">
          <div className="system-component is-client">Web Client</div>
          <button className="system-boundary boundary-api" onClick={() => placeSafeguard("api-write")} disabled={!selected || solved}>
            <span>API write boundary</span>
            <small>{boundaryExplanations["api-write"]}</small>
            <b>{placements["api-write"] ? architectureSafeguards.find((item) => item.id === placements["api-write"])?.name : "Attach safeguard"}</b>
          </button>
          <div className="system-component is-api">API</div>
          <button className="system-boundary boundary-data" onClick={() => placeSafeguard("data-call")} disabled={!selected || solved}>
            <span>Data service call</span>
            <small>{boundaryExplanations["data-call"]}</small>
            <b>{placements["data-call"] ? architectureSafeguards.find((item) => item.id === placements["data-call"])?.name : "Attach safeguard"}</b>
          </button>
          <div className="system-component is-data">Data Service</div>
          <div className="system-component is-queue">Job Queue</div>
          <button className="system-boundary boundary-worker" onClick={() => placeSafeguard("worker-recovery")} disabled={!selected || solved}>
            <span>Queue / worker recovery</span>
            <small>{boundaryExplanations["worker-recovery"]}</small>
            <b>{placements["worker-recovery"] ? architectureSafeguards.find((item) => item.id === placements["worker-recovery"])?.name : "Attach safeguard"}</b>
          </button>
          <div className="system-component is-worker">Worker</div>
        </section>

        <section className="safeguard-tray" aria-label="Available architecture safeguards">
          <p>Select a safeguard, then attach it to a boundary.</p>
          <div>
            {architectureSafeguards.map((safeguard) => {
              const attached = Object.entries(placements).find(([, value]) => value === safeguard.id)?.[0] as BoundaryId | undefined;
              return (
                <button key={safeguard.id} onClick={() => setSelected(safeguard.id)} disabled={solved} className={selected === safeguard.id ? "is-selected" : ""}>
                  <b>{safeguard.name}</b>
                  <span>{safeguard.detail}</span>
                  <small>{attached ? `Attached: ${boundaryLabels[attached]}` : "Available"}</small>
                </button>
              );
            })}
          </div>
        </section>

        <div className="blueprint-actions resilience-actions">
          <p aria-live="polite">{feedback || "Run all three failure tests to establish evidence before approving the design."}</p>
          {!solved ? (
            <button onClick={runFullSuite} disabled={testsRun.length !== architectureTests.length || Object.keys(placements).length !== 3}>Run full resilience suite</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Save architecture decision</button>
          ) : (
            <small>The architecture decision has been saved.</small>
          )}
        </div>
      </div>

      <HintPanel hints={masterBlueprintHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
