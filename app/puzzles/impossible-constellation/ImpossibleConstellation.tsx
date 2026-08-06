"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import { impossibleConstellationHints, productionCheckSolution, signalRows, type SignalRowId } from "./puzzleData";
import { validateImpossibleConstellation } from "./validator";

function rotate<T>(items: T[], offset: number) {
  const normalized = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(normalized), ...items.slice(0, normalized)];
}

export function ImpossibleConstellation({ hintCount, onUseHint, onCollectReward, alreadySolved }: {
  hintCount: number; onUseHint: () => void; onCollectReward: () => void; alreadySolved: boolean;
}) {
  const initial = Object.fromEntries(signalRows.map((row) => [row.id, alreadySolved ? productionCheckSolution[row.id] : row.startOffset])) as Record<SignalRowId, number>;
  const [offsets, setOffsets] = useState(initial);
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(alreadySolved ? "The three signals remain aligned at 14:05." : "");

  function shift(id: SignalRowId, amount: number) {
    if (solved) return;
    setOffsets((current) => ({ ...current, [id]: (current[id] + amount + 7) % 7 }));
    setFeedback("");
  }

  function inspectWindow() {
    if (validateImpossibleConstellation(offsets)) {
      setSolved(true);
      setFeedback("The shared moment is visible: v2.7 goes live, waiting work jumps, and retries begin at 14:05.");
    } else {
      setFeedback("The center column still mixes different times. Align matching timestamps vertically, with 14:05 in the center.");
    }
  }

  return (
    <div className="constellation-puzzle production-check telemetry-alignment">
      <div className="constellation-puzzle__workspace production-check__workspace">
        <header className="production-check__header">
          <p>Release 2.7 · scrambled monitoring export</p>
          <strong>Align the three timelines to reveal the moment production changed.</strong>
          <small><b>How it works:</b> matching times belong in the same vertical column. The shaded center is the incident window.</small>
        </header>

        <div className="telemetry-board" aria-label="Three movable monitoring timelines">
          <div className="telemetry-focus" aria-hidden="true"><span>Incident window</span></div>
          {signalRows.map((row) => (
            <section className="telemetry-row" key={row.id} aria-label={row.label}>
              <div className="telemetry-row__controls">
                <b>{row.label}</b>
                <span><button onClick={() => shift(row.id, -1)} disabled={solved} aria-label={`Move ${row.label} left`}>←</button><button onClick={() => shift(row.id, 1)} disabled={solved} aria-label={`Move ${row.label} right`}>→</button></span>
              </div>
              <div className="telemetry-strip">
                {rotate(row.entries, offsets[row.id]).map((entry, index) => (
                  <div key={`${entry.time}-${index}`} className={solved && entry.incident ? "is-incident" : ""}>
                    <time>{entry.time}</time><strong>{entry.value}</strong>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="constellation-actions">
          <p aria-live="polite">{feedback || "Use the arrows. You are matching times—not interpreting technical metrics."}</p>
          {!solved ? <button onClick={inspectWindow}>Inspect center window</button> : !alreadySolved ? <button onClick={onCollectReward}>Save the production finding</button> : <small>The production finding has been saved.</small>}
        </div>
      </div>
      <HintPanel hints={impossibleConstellationHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
