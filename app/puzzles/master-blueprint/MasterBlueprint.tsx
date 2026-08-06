"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  architectureSafeguards,
  architectureSolution,
  masterBlueprintHints,
  type BoundaryId,
  type SafeguardId,
} from "./puzzleData";
import { validateMasterBlueprint } from "./validator";

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
  const [results, setResults] = useState<Partial<Record<BoundaryId, TestResult>>>(
    alreadySolved ? { "api-write": "pass", "data-call": "pass", "worker-recovery": "pass" } : {},
  );
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(alreadySolved ? "The resilience suite remains green." : "");

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
    const nextResults = Object.fromEntries(
      Object.entries(architectureSolution).map(([boundary, safeguard]) => [boundary, placements[boundary as BoundaryId] === safeguard ? "pass" : "fail"]),
    ) as Record<BoundaryId, TestResult>;
    const correct = validateMasterBlueprint(placements);
    setResults(nextResults);
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

        <section className="diagnostic-streams" aria-label="Observed failure patterns">
          <article className={results["api-write"] ? `is-${results["api-write"]}` : ""}>
            <small>Write trace</small><b>req-284</b>
            <div><i>record #91</i><i>record #92</i></div>
            <p>One request key produced two records.</p>
          </article>
          <article className={results["data-call"] ? `is-${results["data-call"]}` : ""}>
            <small>Response time</small><b>120 · 140 · 2800 · 130 ms</b>
            <div className="latency-pattern"><i /><i /><i /><i /></div>
            <p>One dependency wait breaks the 500ms pattern.</p>
          </article>
          <article className={results["worker-recovery"] ? `is-${results["worker-recovery"]}` : ""}>
            <small>Accepted → completed</small><b>31 · 32 · 33 · 34</b>
            <div><i>31</i><i className="is-missing">—</i><i className="is-missing">—</i><i>34</i></div>
            <p>Two accepted jobs disappear after the worker stops.</p>
          </article>
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
          <p>Recognize what repeats, spikes, or disappears. Select a repair module, then attach it where that pattern begins.</p>
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
          <p aria-live="polite">{feedback || "The three diagnostic streams already contain the evidence. Repair each abnormal pattern, then rerun the simulation."}</p>
          {!solved ? (
            <button onClick={runFullSuite} disabled={Object.keys(placements).length !== 3}>Rerun failure simulation</button>
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
