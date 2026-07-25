"use client";

import { useMemo, useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  correctDomeRotation,
  domeDirections,
  impossibleConstellationHints,
  quillConnections,
  quillStars,
} from "./puzzleData";
import { validateImpossibleConstellation } from "./validator";

const shapeChoices = [
  { id: "crown", label: "A crown" },
  { id: "key", label: "A key" },
  { id: "quill", label: "A quill" },
  { id: "branch", label: "A branch" },
];

export function ImpossibleConstellation({
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
  const [rotation, setRotation] = useState(alreadySolved ? correctDomeRotation : 1);
  const [alignmentFound, setAlignmentFound] = useState(alreadySolved);
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The quill remains written across the open dome." : "",
  );

  const starsById = useMemo(
    () => new Map(quillStars.map((star) => [star.id, star])),
    [],
  );

  function rotateDome(direction: number) {
    if (solved) return;
    setRotation((current) => (current + direction + domeDirections.length) % domeDirections.length);
    setAlignmentFound(false);
    setFeedback("");
  }

  function compareCharts() {
    if (rotation === correctDomeRotation) {
      setAlignmentFound(true);
      setFeedback(
        "The scattered points settle into a deliberate outline. It appears in none of the old charts.",
      );
      return;
    }
    setFeedback(
      `At ${domeDirections[rotation]}, the cluster still resembles no recorded constellation. The Compass needle does not rest here.`,
    );
  }

  function identifyShape(shape: string) {
    if (validateImpossibleConstellation({ rotation, shape })) {
      setSolved(true);
      setFeedback(
        "A quill burns between the stars. The dome answers by opening to the true night.",
      );
    } else {
      setFeedback("The lines refuse that reading. Follow the long central shaft and its feathered edge.");
    }
  }

  const rotationDegrees = (rotation - correctDomeRotation) * 45;

  return (
    <div className="constellation-puzzle">
      <div className="constellation-puzzle__workspace">
        <div className="chart-cabinet" aria-label="Reference constellation charts">
          <p>Filed constellations</p>
          <span><i className="chart-mark chart-mark--crown" />The Brass Crown</span>
          <span><i className="chart-mark chart-mark--stag" />The Winter Stag</span>
          <span><i className="chart-mark chart-mark--ship" />The Returning Ship</span>
          <small>Unfiled cluster: no match at the present bearing.</small>
        </div>

        <div className={`star-dome ${alignmentFound ? "is-aligned" : ""} ${solved ? "is-solved" : ""}`}>
          <div className="dome-bearing" aria-label={`Dome bearing ${domeDirections[rotation]}`}>
            <b>{domeDirections[rotation]}</b>
            <small>Dome bearing</small>
          </div>
          <svg viewBox="0 0 100 100" role="img" aria-label={alignmentFound ? "Connected stars forming an unidentified figure" : "A scattered unfiled group of stars"}>
            <g style={{ transform: `rotate(${rotationDegrees}deg)`, transformOrigin: "50% 50%" }}>
              {quillConnections.map(([fromId, toId]) => {
                const from = starsById.get(fromId)!;
                const to = starsById.get(toId)!;
                return <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
              })}
              {quillStars.map((star) => (
                <circle key={star.id} cx={star.x} cy={star.y} r={star.size} />
              ))}
            </g>
          </svg>
          <div className="dome-rotation-controls">
            <button onClick={() => rotateDome(-1)} aria-label="Rotate dome counterclockwise">↶</button>
            <button onClick={compareCharts}>Compare the charts</button>
            <button onClick={() => rotateDome(1)} aria-label="Rotate dome clockwise">↷</button>
          </div>
        </div>

        <div className="compass-bearing-card">
          <div className="compass-icon compass-icon--small" aria-hidden="true"><i /></div>
          <p>Navigator’s Compass</p>
          <strong>Needle at rest: SW</strong>
          <small>“Home is found when the room agrees with the needle.”</small>
        </div>

        <div className={`shape-identification ${alignmentFound ? "is-visible" : ""}`}>
          <p>What figure has the unfiled cluster drawn?</p>
          <div>
            {shapeChoices.map((choice) => (
              <button key={choice.id} onClick={() => identifyShape(choice.id)} disabled={!alignmentFound || solved}>
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        <div className="constellation-actions">
          <p aria-live="polite">{feedback || "The unfiled stars drift at the dome’s current bearing."}</p>
          {solved && !alreadySolved ? (
            <button onClick={onCollectReward}>Lower the star chart</button>
          ) : solved ? (
            <small>The chart cradle is empty.</small>
          ) : null}
        </div>
      </div>

      <HintPanel
        hints={impossibleConstellationHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />
    </div>
  );
}

