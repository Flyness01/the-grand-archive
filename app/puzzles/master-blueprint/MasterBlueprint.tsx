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
  architecture: "Architectural layout",
  mechanical: "Mechanical systems",
  pedestals: "Pedestal positions",
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
    alreadySolved ? "The three plans remain registered as a single drawing." : "",
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
      setFeedback("Every line meets its counterpart. Hidden ink gathers into a single instruction.");
      return;
    }
    const alignedCount = blueprintLayerOrder.filter(
      (layer) => rotations[layer] === blueprintSolution[layer],
    ).length;
    setFeedback(
      `${alignedCount} of 3 registration landmarks agree with the building. The remaining sheets still divide the plan.`,
    );
  }

  return (
    <div className="blueprint-puzzle">
      <div className="blueprint-puzzle__workspace">
        <aside className="drafting-reference">
          <p>Surveyor’s fixed landmarks</p>
          <span><i>→</i><b>Library notch</b> East</span>
          <span><i>←</i><b>Clock gear</b> West</span>
          <span><i>↓</i><b>Pedestal opening</b> South</span>
          <small>The building does not rotate. Make the plans agree with it.</small>
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
          {solved && <strong>RETURN WHAT WAS BORROWED</strong>}
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
          <p aria-live="polite">{feedback || "Three incomplete drawings overlap without meaning."}</p>
          {!solved ? <button onClick={inspectComposite}>Inspect the composite</button> :
            !alreadySolved ? <button onClick={onCollectReward}>Lift the completed blueprint</button> :
              <small>The drafting table holds only registration pins.</small>}
        </div>
      </div>

      <HintPanel hints={masterBlueprintHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
