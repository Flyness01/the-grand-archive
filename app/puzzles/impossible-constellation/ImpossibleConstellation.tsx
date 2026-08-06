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
  hintCount: number; onUseHint: () => void; onCollectReward: (name: string) => void; alreadySolved: boolean;
}) {
  const initial = Object.fromEntries(signalRows.map((row) => [row.id, alreadySolved ? productionCheckSolution[row.id] : row.startOffset])) as Record<SignalRowId, number>;
  const [offsets, setOffsets] = useState(initial);
  const [solved, setSolved] = useState(alreadySolved);
  const [aligned, setAligned] = useState(alreadySolved);
  const [playerName, setPlayerName] = useState("");
  const [feedback, setFeedback] = useState(alreadySolved ? "The three viewpoints remain aligned on the shared journey." : "");

  function shift(id: SignalRowId, amount: number) {
    if (solved) return;
    const length = signalRows[0].entries.length;
    setOffsets((current) => ({ ...current, [id]: (current[id] + amount + length) % length }));
    setFeedback("");
  }

  function inspectWindow() {
    const correct = Object.entries(productionCheckSolution).every(([key, value]) => offsets[key as SignalRowId] === value);
    if (correct) {
      setAligned(true);
      setFeedback("The whole journey now connects, from the first week to the last day. Add your name below.");
    } else {
      setFeedback("Some columns still combine unrelated moments. Use the work timeline to reconnect each team response and lasting lesson.");
    }
  }

  function finishStory() {
    if (validateImpossibleConstellation({ ...offsets, name: playerName })) {
      setSolved(true);
      setFeedback(`Thank you, ${playerName.trim()}, for being part of the work we shared.`);
    } else {
      setFeedback("Add your name before continuing. There is no wrong answer here.");
    }
  }

  return (
    <div className="constellation-puzzle production-check telemetry-alignment">
      <div className="constellation-puzzle__workspace production-check__workspace">
        <header className="production-check__header">
          <p>Two summers · three scrambled viewpoints</p>
          <strong>Align the three timelines to reveal one shared journey.</strong>
          <small><b>How it works:</b> use “The work” as the timeline. Pair each work moment with the team response and lesson that belong with it.</small>
        </header>

        <div className="telemetry-board" aria-label="Three movable journey timelines">
          {signalRows.map((row) => (
            <section className="telemetry-row" key={row.id} aria-label={row.label}>
              <div className="telemetry-row__controls">
                <b>{row.label}</b>
                <span><button onClick={() => shift(row.id, -1)} disabled={solved} aria-label={`Move ${row.label} left`}>←</button><button onClick={() => shift(row.id, 1)} disabled={solved} aria-label={`Move ${row.label} right`}>→</button></span>
              </div>
              <div className="telemetry-strip">
                {rotate(row.entries, offsets[row.id]).map((entry, index) => (
                  <div
                    key={`${entry.time}-${index}`}
                    className={`${row.id !== "release" ? "is-unlabeled" : ""} ${solved && entry.incident ? "is-incident" : ""}`}
                    aria-label={entry.value}
                  >
                    {row.id === "release" && <time>{entry.time}</time>}
                    <strong>{entry.value}</strong>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {aligned && <section className="shared-story-finish" aria-label="Add your name to the shared story">
          <p><span>We learned</span><span>We traced</span><span>We aligned</span><span>We handed off</span><span>We did it together</span></p>
          <label htmlFor="shared-story-answer">One last person belongs in this story.</label>
          <div><input id="shared-story-answer" value={playerName} onChange={(event) => setPlayerName(event.target.value)} disabled={solved} placeholder="Your name" autoComplete="name" maxLength={60} /><button onClick={finishStory} disabled={solved}>Add my name to the story</button></div>
        </section>}

        <div className="constellation-actions">
          <p aria-live="polite">{feedback || "Use the work timeline to connect each team response and lasting lesson. No engineering knowledge is needed."}</p>
          {!aligned ? <button onClick={inspectWindow}>Check the timeline</button> : solved && !alreadySolved ? <button onClick={() => onCollectReward(playerName.trim())}>Light the final lanterns</button> : solved ? <small>The shared timeline has been saved.</small> : null}
        </div>
      </div>
      <HintPanel hints={impossibleConstellationHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
