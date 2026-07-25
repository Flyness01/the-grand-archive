"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  conservatoryPlants,
  lightPhases,
  sleepingConservatoryHints,
  sleepingConservatorySolution,
  type LightPhase,
  type Moisture,
} from "./puzzleData";
import { validateSleepingConservatory } from "./validator";

const phaseSymbols: Record<LightPhase, string> = {
  dawn: "◐",
  day: "☼",
  dusk: "◑",
  night: "☾",
};

export function SleepingConservatory({
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
  const [phase, setPhase] = useState<LightPhase>("dawn");
  const [moisture, setMoisture] = useState<Moisture>("dry");
  const [blooms, setBlooms] = useState<string[]>(
    alreadySolved ? sleepingConservatorySolution : [],
  );
  const [complete, setComplete] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The restored garden follows its cycle without assistance." : "",
  );

  function advanceLight() {
    if (complete) return;
    const currentIndex = lightPhases.indexOf(phase);
    setPhase(lightPhases[(currentIndex + 1) % lightPhases.length]);
    setFeedback("");
  }

  function tryBloom(plantId: string) {
    if (complete || blooms.includes(plantId)) return;
    const plant = conservatoryPlants.find((item) => item.id === plantId)!;
    if (plant.phase !== phase || plant.moisture !== moisture) {
      setFeedback(
        `${plant.name} remains closed. Its tag calls for ${plant.phase} light and ${plant.moisture} soil.`,
      );
      return;
    }

    const expectedPlant = sleepingConservatorySolution[blooms.length];
    if (plantId !== expectedPlant) {
      setFeedback(
        `${plant.name} opens too early and shades an unopened neighbor. The garden slowly folds back to sleep.`,
      );
      window.setTimeout(() => {
        setBlooms([]);
        setPhase("dawn");
        setMoisture("dry");
        setFeedback("");
      }, 4500);
      return;
    }

    const nextBlooms = [...blooms, plantId];
    setBlooms(nextBlooms);
    if (validateSleepingConservatory(nextBlooms)) {
      setComplete(true);
      setFeedback(
        "Six blooms answer one another. Vines climb the glass and uncover a narrow stair beneath the Observatory.",
      );
    } else {
      setFeedback(`${plant.name} opens. The next brass tag catches the changing light.`);
    }
  }

  return (
    <div className="garden-puzzle">
      <div className={`garden-puzzle__workspace phase--${phase}`}>
        <div className="gardener-card">
          <p>The Gardener’s Cycle</p>
          <blockquote>“Wake them as the day wakes—dawn to stars.”</blockquote>
          <small>When two share one light, dry petals open before watered roots.</small>
        </div>

        <div className="garden-canopy" aria-hidden="true">
          <i /><i /><i />
        </div>

        <div className="plant-beds" aria-label={`${blooms.length} of six plants blooming`}>
          {conservatoryPlants.map((plant) => {
            const bloomed = blooms.includes(plant.id);
            return (
              <button
                key={plant.id}
                className={`plant-pot plant--${plant.color} ${bloomed ? "is-blooming" : ""}`}
                onClick={() => tryBloom(plant.id)}
                disabled={bloomed || complete}
                aria-label={`${plant.name}. ${plant.note}${bloomed ? " Blooming." : ""}`}
              >
                <span className="plant-stem" aria-hidden="true"><i /><i /><i /></span>
                <b>{plant.name}</b>
                <small>
                  <span aria-hidden="true">{phaseSymbols[plant.phase]}</span> {plant.phase}
                  {" · "}
                  <span aria-hidden="true">{plant.moisture === "wet" ? "●" : "○"}</span> {plant.moisture}
                </small>
              </button>
            );
          })}
        </div>

        <div className="garden-console">
          <div className="light-dial" aria-label={`Current light: ${phase}`}>
            {lightPhases.map((lightPhase) => (
              <span className={phase === lightPhase ? "is-current" : ""} key={lightPhase}>
                <i aria-hidden="true">{phaseSymbols[lightPhase]}</i>{lightPhase}
              </span>
            ))}
          </div>
          <button onClick={advanceLight} disabled={complete}>Advance the light</button>
          <button
            className={`water-valve ${moisture === "wet" ? "is-wet" : ""}`}
            onClick={() => {
              setMoisture((current) => current === "dry" ? "wet" : "dry");
              setFeedback("");
            }}
            disabled={complete}
          >
            Water valve: {moisture}
          </button>
        </div>

        <div className="garden-actions">
          <p aria-live="polite">{feedback || "Dawn enters through the eastern glass. The soil is dry."}</p>
          {!complete ? (
            <button onClick={() => { setBlooms([]); setPhase("dawn"); setMoisture("dry"); setFeedback(""); }} disabled={blooms.length === 0}>Let the garden sleep</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Press the sixth bloom</button>
          ) : (
            <small>The specimen frame is empty.</small>
          )}
        </div>
      </div>

      <HintPanel
        hints={sleepingConservatoryHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />
    </div>
  );
}

