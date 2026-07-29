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
  { id: "crown", label: "A traffic spike" },
  { id: "key", label: "An auth failure" },
  { id: "quill", label: "A retry loop" },
  { id: "branch", label: "A stale branch" },
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
    alreadySolved ? "The recurring retry loop remains documented." : "",
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
        "The scattered events settle into a recurring trace. It matches none of the known healthy patterns.",
      );
      return;
    }
    setFeedback(
      `At ${domeDirections[rotation]}, the events still form no reliable pattern. The earlier Flow Trace marks a different handoff.`,
    );
  }

  function identifyShape(shape: string) {
    if (validateImpossibleConstellation({ rotation, shape })) {
      setSolved(true);
      setFeedback(
        "The trace resolves into a retry loop. What looked random is now a reproducible engineering signal.",
      );
    } else {
      setFeedback("That diagnosis does not explain the repeated path. Follow the long request chain and the calls folding back into it.");
    }
  }

  const rotationDegrees = (rotation - correctDomeRotation) * 45;

  return (
    <div className="constellation-puzzle">
      <div className="constellation-puzzle__workspace">
        <div className="chart-cabinet" aria-label="Known telemetry patterns">
          <p>Known production patterns</p>
          <span><i className="chart-mark chart-mark--crown" />Normal traffic</span>
          <span><i className="chart-mark chart-mark--stag" />Cache miss burst</span>
          <span><i className="chart-mark chart-mark--ship" />Scheduled batch</span>
          <small>Unclassified events: no match at the current service handoff.</small>
        </div>

        <div className={`star-dome ${alignmentFound ? "is-aligned" : ""} ${solved ? "is-solved" : ""}`}>
          <div className="dome-bearing" aria-label={`Service handoff ${domeDirections[rotation]}`}>
            <b>{domeDirections[rotation]}</b>
            <small>Service handoff</small>
          </div>
          <svg viewBox="0 0 100 100" role="img" aria-label={alignmentFound ? "Connected events forming an unidentified trace" : "A scattered group of production events"}>
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
            <button onClick={() => rotateDome(-1)} aria-label="Move to previous service handoff">↶</button>
            <button onClick={compareCharts}>Compare patterns</button>
            <button onClick={() => rotateDome(1)} aria-label="Move to next service handoff">↷</button>
          </div>
        </div>

        <div className="compass-bearing-card">
          <div className="flow-trace-icon compass-icon--small" aria-hidden="true"><i /></div>
          <p>Flow Trace</p>
          <strong>Marked handoff: SW</strong>
          <small>“Compare the unknown behavior where the documented request crosses services.”</small>
        </div>

        <div className={`shape-identification ${alignmentFound ? "is-visible" : ""}`}>
          <p>Which engineering pattern best explains this trace?</p>
          <div>
            {shapeChoices.map((choice) => (
              <button key={choice.id} onClick={() => identifyShape(choice.id)} disabled={!alignmentFound || solved}>
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        <div className="constellation-actions">
          <p aria-live="polite">{feedback || "The unclassified events remain noisy at the current service handoff."}</p>
          {solved && !alreadySolved ? (
            <button onClick={onCollectReward}>Save the pattern report</button>
          ) : solved ? (
            <small>The pattern report has been saved.</small>
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
