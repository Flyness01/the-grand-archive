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

  const eventsById = useMemo(
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
        "At the documented service boundary, the same calls repeat and fold back into the request path.",
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
        <div className="chart-cabinet" aria-label="Trace comparison guide">
          <p>Trace comparison guide</p>
          <span><i className="chart-mark chart-mark--crown" />Traffic spike: calls continue forward</span>
          <span><i className="chart-mark chart-mark--stag" />Auth failure: calls stop at access</span>
          <span><i className="chart-mark chart-mark--ship" />Retry loop: calls return and repeat</span>
          <small>Group the same recorded events at the service boundary documented in Puzzle 2.</small>
        </div>

        <div className={`star-dome ${alignmentFound ? "is-aligned" : ""} ${solved ? "is-solved" : ""}`}>
          <div className="dome-bearing" aria-label={`Service handoff ${domeDirections[rotation]}`}>
            <b>{domeDirections[rotation]}</b>
            <small>Boundary under review</small>
          </div>
          <svg viewBox="0 0 100 100" role="img" aria-label={alignmentFound ? "Correlated events revealing repeated calls" : "Uncorrelated production events"}>
            <g style={{ transform: `rotate(${rotationDegrees}deg)`, transformOrigin: "50% 50%" }}>
              {quillConnections.map(([fromId, toId]) => {
                const from = eventsById.get(fromId)!;
                const to = eventsById.get(toId)!;
                return <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
              })}
              {quillStars.map((star) => (
                <circle key={star.id} cx={star.x} cy={star.y} r={star.size} />
              ))}
            </g>
          </svg>
          <div className="dome-rotation-controls">
            <button onClick={() => rotateDome(-1)} aria-label="Previous service boundary">‹</button>
            <button onClick={compareCharts}>Correlate events</button>
            <button onClick={() => rotateDome(1)} aria-label="Next service boundary">›</button>
          </div>
        </div>

        <div className="compass-bearing-card">
          <div className="flow-trace-icon compass-icon--small" aria-hidden="true"><i /></div>
          <p>Flow Trace</p>
          <strong>Marked handoff: SW</strong>
          <small>“Compare the unknown behavior where the documented request crosses services.”</small>
        </div>

        <div className={`shape-identification ${alignmentFound ? "is-visible" : ""}`}>
          <p>The calls now connect. Which diagnosis explains their behavior?</p>
          <div>
            {shapeChoices.map((choice) => (
              <button key={choice.id} onClick={() => identifyShape(choice.id)} disabled={!alignmentFound || solved}>
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        <div className="constellation-actions">
          <p aria-live="polite">{feedback || "Choose a service boundary, then correlate the recorded events."}</p>
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
