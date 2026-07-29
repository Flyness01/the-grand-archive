"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  clockGears,
  stoppedClockHints,
  stoppedClockSolution,
} from "./puzzleData";
import { validateStoppedClock } from "./validator";

export function StoppedClock({
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
  const [sequence, setSequence] = useState<string[]>(
    alreadySolved ? stoppedClockSolution : [],
  );
  const [running, setRunning] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The recovered services remain healthy." : "",
  );

  function chooseGear(gearId: string) {
    if (running || sequence.includes(gearId) || sequence.length === 4) return;
    setSequence((current) => [...current, gearId]);
    setFeedback("");
  }

  function removeGear(index: number) {
    if (running) return;
    setSequence((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setFeedback("");
  }

  function testRepair() {
    if (sequence.length < 4) {
      setFeedback("Four recovery steps are required before the incident can be resolved.");
      return;
    }
    if (validateStoppedClock(sequence)) {
      setRunning(true);
      setFeedback(
        "The dependency chain recovers cleanly. Requests are flowing and every service reports healthy.",
      );
      return;
    }
    setFeedback(
      "The recovery stalls and rolls back safely. Recheck the failure timeline and unwind it in reverse.",
    );
    window.setTimeout(() => {
      setSequence([]);
      setFeedback("");
    }, 4500);
  }

  return (
    <div className="clock-puzzle">
      <div className="clock-puzzle__workspace">
        <div className="clock-documents">
          <section className="failure-log">
            <p>Incident Timeline · Release 14</p>
            <ol>
              <li><time>9:03</time> Auth Service began rejecting valid sessions.</li>
              <li><time>9:08</time> API Handler exhausted its retries.</li>
              <li><time>9:12</time> Job Queue stopped processing events.</li>
              <li><time>9:17</time> Notifier stopped delivering updates.</li>
            </ol>
            <small>Health Monitor checked — healthy. Do not restart it.</small>
          </section>
          <blockquote>
            Recovery note · Incident commander
            <strong>“Restore dependents first. Unwind the failure cascade in reverse.”</strong>
          </blockquote>
        </div>

        <div className={`clock-movement ${running ? "is-running" : ""}`}>
          <div className="clock-face" aria-label={running ? "All services are healthy" : "Incident active since 9:17"}>
            <span className="clock-hand clock-hand--hour" />
            <span className="clock-hand clock-hand--minute" />
            <i />
            <b>{running ? "SYSTEM HEALTHY" : "INCIDENT · 9:17"}</b>
          </div>
          <div className="repair-sequence" aria-label="Four-step service recovery sequence">
            {Array.from({ length: 4 }, (_, index) => {
              const gear = clockGears.find((item) => item.id === sequence[index]);
              return (
                <button
                  key={index}
                  className={gear ? `is-filled gear--${gear.tone}` : ""}
                  onClick={() => removeGear(index)}
                  disabled={!gear || running}
                  aria-label={
                    gear
                      ? `Recovery step ${index + 1}: ${gear.name}. Remove from sequence`
                      : `Empty recovery step ${index + 1}`
                  }
                >
                  <span className="sequence-number">{index + 1}</span>
                  {gear ? <><i style={{ "--teeth": gear.teeth } as CSSProperties} /><small>{gear.name}</small></> : <em>Add service</em>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="gear-tray" aria-label="Service list">
          {clockGears.map((gear) => {
            const used = sequence.includes(gear.id);
            return (
              <button
                key={gear.id}
                className={`gear-choice gear--${gear.tone} ${used ? "is-used" : ""}`}
                onClick={() => chooseGear(gear.id)}
                disabled={used || running}
              >
                <i style={{ "--teeth": gear.teeth } as CSSProperties}>{gear.mark}</i>
                <span>{gear.name}</span>
                <small>{used ? "Queued" : gear.id === "governor" ? "healthy" : "failed"}</small>
              </button>
            );
          })}
        </div>

        <div className="clock-actions">
          <p aria-live="polite">{feedback || "Choose the first service in the recovery sequence."}</p>
          {!running ? (
            <>
              <button onClick={() => { setSequence([]); setFeedback(""); }} disabled={sequence.length === 0}>Clear recovery</button>
              <button className="clock-key" onClick={testRepair}>Run recovery</button>
            </>
          ) : !alreadySolved ? (
            <button className="clock-key" onClick={onCollectReward}>Save incident review</button>
          ) : (
            <small>The incident review has been saved.</small>
          )}
        </div>
      </div>

      <HintPanel
        hints={stoppedClockHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />
    </div>
  );
}
