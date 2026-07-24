"use client";

import { useMemo, useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  lanternWallHints,
  lanternWallSolution,
  type LanternSetting,
} from "./puzzleData";
import { validateLanternWall } from "./validator";

const angleLabels = ["far left", "left", "right", "far right"];
const heightLabels = ["low", "middle", "high"];

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
    alreadySolved ? "The keyhole remains clear in the joined light." : "",
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
        "The four shadows settle into one keyhole. Deep inside the wall, a lock turns.",
      );
      return;
    }
    const closeCount = alignedParts.filter(Boolean).length;
    setFeedback(
      closeCount === 0
        ? "The shadows scatter across the plaster. None of their edges meet."
        : `${closeCount} of the four shadow fragments holds steady; the others still drift apart.`,
    );
  }

  return (
    <div className="lantern-puzzle">
      <div className="lantern-puzzle__workspace">
        <p className="lantern-puzzle__instruction">
          Four old lamps face a blank wall. Turn their housings and raise their chains
          until the shadows remember a single shape.
        </p>

        <div className={`shadow-wall ${solved ? "is-solved" : ""}`}>
          <div className="shadow-wall__plaster" aria-hidden="true" />
          <div className="shadow-composition" aria-label={`${alignedParts.filter(Boolean).length} of four shadow fragments aligned`}>
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
          <p>{solved ? "A keyhole made from darkness." : "The wall holds four restless shadows."}</p>
        </div>

        <div className="lantern-controls" aria-label="Lantern controls">
          {settings.map((setting, index) => (
            <section className={alignedParts[index] ? "is-aligned" : ""} key={index}>
              <div className="mini-lantern" aria-hidden="true"><i /></div>
              <h3>Lantern {["I", "II", "III", "IV"][index]}</h3>
              <div className="lantern-dial">
                <button onClick={() => adjust(index, "angle", -1)} aria-label={`Turn lantern ${index + 1} left`}>−</button>
                <span>Angle<small>{angleLabels[setting.angle]}</small></span>
                <button onClick={() => adjust(index, "angle", 1)} aria-label={`Turn lantern ${index + 1} right`}>+</button>
              </div>
              <div className="lantern-dial">
                <button onClick={() => adjust(index, "height", -1)} aria-label={`Lower lantern ${index + 1}`}>−</button>
                <span>Height<small>{heightLabels[setting.height]}</small></span>
                <button onClick={() => adjust(index, "height", 1)} aria-label={`Raise lantern ${index + 1}`}>+</button>
              </div>
            </section>
          ))}
        </div>

        <div className="lantern-actions">
          <p aria-live="polite">{feedback || "The brass controls answer with a quiet click."}</p>
          {!solved ? (
            <button onClick={testAlignment}>Dim the flames</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Take the central lantern</button>
          ) : (
            <small>The central hook is empty.</small>
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

