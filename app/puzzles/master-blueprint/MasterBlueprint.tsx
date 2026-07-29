"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  blueprintLayerOrder,
  blueprintSolution,
  masterBlueprintHints,
  type BlueprintLayerId,
} from "./puzzleData";
import { normalizeBlueprintRotation, validateMasterBlueprint } from "./validator";

const layerLabels: Record<BlueprintLayerId, string> = {
  architecture: "User experience",
  mechanical: "Service architecture",
  pedestals: "Reliability plan",
};

export function MasterBlueprint({
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
  const [rotations, setRotations] = useState<Record<BlueprintLayerId, number>>(
    alreadySolved ? blueprintSolution : { architecture: 0, mechanical: 90, pedestals: 270 },
  );
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The three system perspectives remain aligned." : "",
  );

  function rotateLayer(layer: BlueprintLayerId, direction: number) {
    if (solved) return;
    setRotations((current) => ({
      ...current,
      [layer]: normalizeBlueprintRotation(current[layer] + direction * 90),
    }));
    setFeedback("");
  }

  function inspectComposite() {
    if (validateMasterBlueprint(rotations)) {
      setSolved(true);
      setFeedback("Experience, services, and reliability now support one coherent system design.");
      return;
    }
    const alignedCount = blueprintLayerOrder.filter(
      (layer) => rotations[layer] === blueprintSolution[layer],
    ).length;
    setFeedback(
      `${alignedCount} of 3 system constraints align. The remaining perspective still conflicts with the design.`,
    );
  }

  return (
    <div className="blueprint-puzzle">
      <div className="blueprint-puzzle__workspace">
        <aside className="drafting-reference">
          <p>Fixed system constraints</p>
          <span><i>→</i><b>Client boundary</b> East</span>
          <span><i>←</i><b>Data service</b> West</span>
          <span><i>↓</i><b>Recovery path</b> South</span>
          <small>The constraints do not move. Make every system perspective agree with them.</small>
        </aside>

        <div className={`blueprint-composite ${solved ? "is-solved" : ""}`}>
          <div className="blueprint-registration" aria-hidden="true"><i /><i /><i /><i /></div>
          {blueprintLayerOrder.map((layer) => (
            <div
              key={layer}
              className={`blueprint-sheet blueprint-sheet--${layer}`}
              style={{ transform: `rotate(${rotations[layer]}deg)` }}
              aria-label={`${layerLabels[layer]} rotated ${rotations[layer]} degrees`}
            >
              <i /><i /><i /><i />
            </div>
          ))}
          {solved && <strong>REVIEW THE WHOLE SYSTEM</strong>}
        </div>

        <div className="blueprint-controls">
          {blueprintLayerOrder.map((layer) => (
            <section key={layer}>
              <p>{layerLabels[layer]}</p>
              <div>
                <button onClick={() => rotateLayer(layer, -1)} disabled={solved} aria-label={`Rotate ${layerLabels[layer]} counterclockwise`}>↶</button>
                <b>{rotations[layer]}°</b>
                <button onClick={() => rotateLayer(layer, 1)} disabled={solved} aria-label={`Rotate ${layerLabels[layer]} clockwise`}>↷</button>
              </div>
            </section>
          ))}
        </div>

        <div className="blueprint-actions">
          <p aria-live="polite">{feedback || "Three individually reasonable plans disagree as one system."}</p>
          {!solved ? <button onClick={inspectComposite}>Review system design</button> :
            !alreadySolved ? <button onClick={onCollectReward}>Save architecture decision</button> :
              <small>The architecture decision has been saved.</small>}
        </div>
      </div>

      <HintPanel hints={masterBlueprintHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
