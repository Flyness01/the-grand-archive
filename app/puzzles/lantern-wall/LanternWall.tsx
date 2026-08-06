"use client";

import { useMemo, useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  lanternWallHints,
  lanternWallSolution,
  type LanternSetting,
} from "./puzzleData";
import { validateLanternWall } from "./validator";

const angleLabels = ["exploring", "proposed", "reviewed", "committed"];
const heightLabels = ["low", "medium", "high"];
const signalNames = ["Design", "Frontend", "API", "Product"];

const initialSettings: LanternSetting[] = [
  { angle: 0, height: 0 },
  { angle: 3, height: 1 },
  { angle: 1, height: 2 },
  { angle: 2, height: 1 },
];

export function LanternWall({
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
  const [settings, setSettings] = useState(
    alreadySolved ? lanternWallSolution : initialSettings,
  );
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The shared implementation remains aligned." : "",
  );

  const alignedParts = useMemo(
    () =>
      settings.map(
        (setting, index) =>
          setting.angle === lanternWallSolution[index].angle &&
          setting.height === lanternWallSolution[index].height,
      ),
    [settings],
  );

  function adjust(index: number, key: keyof LanternSetting, direction: number) {
    if (solved) return;
    setSettings((current) =>
      current.map((setting, settingIndex) => {
        if (settingIndex !== index) return setting;
        const count = key === "angle" ? angleLabels.length : heightLabels.length;
        return {
          ...setting,
          [key]: (setting[key] + direction + count) % count,
        };
      }),
    );
    setFeedback("");
  }

  function testAlignment() {
    if (validateLanternWall(settings)) {
      setSolved(true);
      setFeedback(
        "Four perspectives resolve into one implementation. The decision is ready to build.",
      );
      return;
    }
    const closeCount = alignedParts.filter(Boolean).length;
    setFeedback(
      closeCount === 0
        ? "The signals still conflict. None support the same implementation yet."
        : `${closeCount} of four team signals align; the remaining perspectives still conflict.`,
    );
  }

  return (
    <div className="lantern-puzzle">
      <div className="lantern-puzzle__workspace">
        <p className="lantern-puzzle__instruction">
          Design, Frontend, API, and Product describe the same feature differently.
          Adjust each signal&apos;s direction and priority until they form one shared implementation.
        </p>

        <aside className="alignment-brief" aria-label="Alignment brief">
          <p>Notes from the decision thread</p>
          <ul>
            <li>No two teams are at the same point: <b>Frontend</b> is earliest and <b>API</b> is furthest along.</li>
            <li><b>Product</b> is one step ahead of Frontend; <b>Design</b> is one step behind API.</li>
            <li><b>Frontend</b> and <b>Product</b> share the strongest immediate priority.</li>
            <li><b>Design</b>&apos;s priority falls between theirs and API&apos;s.</li>
          </ul>
        </aside>

        <div className={`shadow-wall ${solved ? "is-solved" : ""}`}>
          <div className="shadow-wall__plaster" aria-hidden="true" />
          <div className="shadow-composition" aria-label={`${alignedParts.filter(Boolean).length} of four team signals aligned`}>
            {settings.map((setting, index) => {
              const solution = lanternWallSolution[index];
              const xOffset = (setting.angle - solution.angle) * 36;
              const yOffset = (solution.height - setting.height) * 31;
              return (
                <span
                  className={`shadow-fragment shadow-fragment--${index + 1} ${
                    alignedParts[index] ? "is-aligned" : ""
                  }`}
                  style={{
                    transform: `translate(${xOffset}px, ${yOffset}px) rotate(${
                      (setting.angle - solution.angle) * 7
                    }deg)`,
                  }}
                  key={index}
                />
              );
            })}
            <div className="keyhole-glow" aria-hidden="true" />
          </div>
          <p>{solved ? "One implementation, understood by everyone." : "The shared plan is still fragmented."}</p>
        </div>

        <div className="lantern-controls" aria-label="Team signal controls">
          {settings.map((setting, index) => (
            <section className={alignedParts[index] ? "is-aligned" : ""} key={index}>
              <div className="mini-lantern" aria-hidden="true"><i /></div>
              <h3>{signalNames[index]}</h3>
              <div className="lantern-dial">
                <button onClick={() => adjust(index, "angle", -1)} aria-label={`Move ${signalNames[index]} direction backward`}>−</button>
                <span>Direction<small>{angleLabels[setting.angle]}</small></span>
                <button onClick={() => adjust(index, "angle", 1)} aria-label={`Move ${signalNames[index]} direction forward`}>+</button>
              </div>
              <div className="lantern-dial">
                <button onClick={() => adjust(index, "height", -1)} aria-label={`Lower ${signalNames[index]} priority`}>−</button>
                <span>Priority<small>{heightLabels[setting.height]}</small></span>
                <button onClick={() => adjust(index, "height", 1)} aria-label={`Raise ${signalNames[index]} priority`}>+</button>
              </div>
            </section>
          ))}
        </div>

        <div className="lantern-actions">
          <p aria-live="polite">{feedback || "Each adjustment updates the shared implementation preview."}</p>
          {!solved ? (
            <button onClick={testAlignment}>Check alignment</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Save alignment note</button>
          ) : (
            <small>The alignment note has been saved.</small>
          )}
        </div>
      </div>

      <HintPanel
        hints={lanternWallHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />
    </div>
  );
}
