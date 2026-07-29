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
  dawn: "1",
  day: "2",
  dusk: "3",
  night: "4",
};
const phaseLabels: Record<LightPhase, string> = {
  dawn: "scope",
  day: "validate",
  dusk: "approve",
  night: "observe",
};
const modeLabels: Record<Moisture, string> = {
  dry: "isolated",
  wet: "connected",
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
    alreadySolved ? "The release checklist remains complete." : "",
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
        `${plant.name} is blocked. Its card requires the ${phaseLabels[plant.phase]} stage in ${modeLabels[plant.moisture]} mode.`,
      );
      return;
    }

    const expectedPlant = sleepingConservatorySolution[blooms.length];
    if (plantId !== expectedPlant) {
      setFeedback(
        `${plant.name} ran out of order. The release candidate resets so the checklist can be repeated safely.`,
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
        "Every release gate passes in order. The candidate ships cleanly and monitoring confirms it is healthy.",
      );
    } else {
      setFeedback(`${plant.name} passes. Continue through the release sequence.`);
    }
  }

  return (
    <div className="garden-puzzle">
      <div className={`garden-puzzle__workspace phase--${phase}`}>
        <div className="gardener-card">
          <p>Release Runbook</p>
          <blockquote>“A safe release is a sequence, not a button.”</blockquote>
          <small>Move from scope to observation. At one stage, isolated checks run before connected checks.</small>
        </div>

        <div className="garden-canopy" aria-hidden="true">
          <i /><i /><i />
        </div>

        <div className="plant-beds" aria-label={`${blooms.length} of six release checks complete`}>
          {conservatoryPlants.map((plant) => {
            const bloomed = blooms.includes(plant.id);
            return (
              <button
                key={plant.id}
                className={`plant-pot plant--${plant.color} ${bloomed ? "is-blooming" : ""}`}
                onClick={() => tryBloom(plant.id)}
                disabled={bloomed || complete}
                aria-label={`${plant.name}. ${plant.note}${bloomed ? " Complete." : ""}`}
              >
                <span className="plant-stem" aria-hidden="true"><i /><i /><i /></span>
                <b>{plant.name}</b>
                <small>
                  <span aria-hidden="true">{phaseSymbols[plant.phase]}</span> {phaseLabels[plant.phase]}
                  {" · "}
                  <span aria-hidden="true">{plant.moisture === "wet" ? "●" : "○"}</span> {modeLabels[plant.moisture]}
                </small>
              </button>
            );
          })}
        </div>

        <div className="garden-console">
          <div className="light-dial" aria-label={`Current release stage: ${phaseLabels[phase]}`}>
            {lightPhases.map((lightPhase) => (
              <span className={phase === lightPhase ? "is-current" : ""} key={lightPhase}>
                <i aria-hidden="true">{phaseSymbols[lightPhase]}</i>{phaseLabels[lightPhase]}
              </span>
            ))}
          </div>
          <button onClick={advanceLight} disabled={complete}>Advance stage</button>
          <button
            className={`water-valve ${moisture === "wet" ? "is-wet" : ""}`}
            onClick={() => {
              setMoisture((current) => current === "dry" ? "wet" : "dry");
              setFeedback("");
            }}
            disabled={complete}
          >
            Dependencies: {modeLabels[moisture]}
          </button>
        </div>

        <div className="garden-actions">
          <p aria-live="polite">{feedback || "The release candidate is scoped. Dependencies are isolated."}</p>
          {!complete ? (
            <button onClick={() => { setBlooms([]); setPhase("dawn"); setMoisture("dry"); setFeedback(""); }} disabled={blooms.length === 0}>Reset release</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Save release record</button>
          ) : (
            <small>The release record has been saved.</small>
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
