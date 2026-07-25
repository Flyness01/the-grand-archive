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
    alreadySolved ? "The repaired movement keeps perfect time." : "",
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
      setFeedback("Four restoration steps are required before the key will turn.");
      return;
    }
    if (validateStoppedClock(sequence)) {
      setRunning(true);
      setFeedback(
        "The escapement catches. One tick becomes two, then every clock in the Archive answers.",
      );
      return;
    }
    setFeedback(
      "The gears fit, but the movement binds. The service plate insists the silence must be reversed.",
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
            <p>Maintenance Log · 14 October</p>
            <ol>
              <li><time>9:03</time> Mainspring slipped; reserve power lost.</li>
              <li><time>9:08</time> Minute train ceased advancing.</li>
              <li><time>9:12</time> Escapement gave its final beat.</li>
              <li><time>9:17</time> Chime wheel fell silent.</li>
            </ol>
            <small>Governor inspected — sound. Leave in tray.</small>
          </section>
          <blockquote>
            Service plate No. 4
            <strong>“To wake the movement, reverse the order of its silence.”</strong>
          </blockquote>
        </div>

        <div className={`clock-movement ${running ? "is-running" : ""}`}>
          <div className="clock-face" aria-label={running ? "The clock is running" : "The clock is stopped at 9:17"}>
            <span className="clock-hand clock-hand--hour" />
            <span className="clock-hand clock-hand--minute" />
            <i />
            <b>{running ? "The Archive keeps time" : "Stopped · 9:17"}</b>
          </div>
          <div className="repair-sequence" aria-label="Four-step gear restoration sequence">
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
                      ? `Step ${index + 1}: ${gear.name}. Remove from sequence`
                      : `Empty restoration step ${index + 1}`
                  }
                >
                  <span className="sequence-number">{index + 1}</span>
                  {gear ? <><i style={{ "--teeth": gear.teeth } as CSSProperties} /><small>{gear.name}</small></> : <em>Empty shaft</em>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="gear-tray" aria-label="Gear tray">
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
                <small>{used ? "Placed" : `${gear.teeth} teeth`}</small>
              </button>
            );
          })}
        </div>

        <div className="clock-actions">
          <p aria-live="polite">{feedback || "Select the first gear in the restoration sequence."}</p>
          {!running ? (
            <>
              <button onClick={() => { setSequence([]); setFeedback(""); }} disabled={sequence.length === 0}>Clear sequence</button>
              <button className="clock-key" onClick={testRepair}>Turn the key</button>
            </>
          ) : !alreadySolved ? (
            <button className="clock-key" onClick={onCollectReward}>Open the gear drawer</button>
          ) : (
            <small>The gear drawer is empty.</small>
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
