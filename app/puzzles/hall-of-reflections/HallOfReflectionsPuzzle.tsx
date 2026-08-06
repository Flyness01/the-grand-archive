"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import { qaColumns, qaColumnRuns, qaFailureSolution, qaRows, qaRowRuns, reflectionHints } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

export function HallOfReflectionsPuzzle({
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
  const [failures, setFailures] = useState<string[]>(alreadySolved ? [...qaFailureSolution] : []);
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(alreadySolved ? "The CI failure cluster remains isolated." : "");

  function toggleCell(cell: string) {
    if (solved) return;
    setFailures((current) => current.includes(cell) ? current.filter((item) => item !== cell) : [...current, cell]);
    setFeedback("");
  }

  function inspectPattern() {
    if (validateHallOfReflections(failures)) {
      setSolved(true);
      setFeedback("Every row and column summary agrees. The hidden failure cluster resolves into one shared component pattern.");
      return;
    }
    setFeedback("At least one row or column does not match its run summary. Check group length and the required gap between separate groups.");
  }

  return (
    <div className="reflections-puzzle ci-matrix-puzzle">
      <div className="reflections-puzzle__workspace ci-matrix-workspace">
        <header className="ci-matrix-header">
          <p>CI run #284 · 25 hidden test results</p>
          <strong>Reconstruct the failed cells from the row and column summaries.</strong>
          <small><b>Example:</b> “3” = three neighboring failures. “1 1” = one failure, a gap, then one failure.</small>
        </header>

        <div className="ci-matrix-shell">
          <div className="ci-column-clues" aria-label="Column failure run summaries">
            <span />
            {qaColumns.map((column, index) => <div key={column}><b>{qaColumnRuns[index]}</b><small>{column}</small></div>)}
          </div>
          {qaRows.map((row, rowIndex) => (
            <div className="ci-matrix-row" key={row}>
              <div className="ci-row-clue"><small>{row}</small><b>{qaRowRuns[rowIndex]}</b></div>
              {qaColumns.map((column, columnIndex) => {
                const id = `${rowIndex}:${columnIndex}`;
                const failed = failures.includes(id);
                return (
                  <button key={column} onClick={() => toggleCell(id)} aria-label={`${row} ${column} test ${failed ? "marked failed" : "unmarked"}`} aria-pressed={failed} disabled={solved} className={failed ? "is-failed" : ""}>
                    {failed ? "×" : ""}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="reflection-actions">
          <p aria-live="polite">{feedback || `${failures.length} cells marked failed. Empty cells are treated as passing.`}</p>
          {!solved ? <button onClick={inspectPattern}>Check failure pattern</button> :
            !alreadySolved ? <button onClick={onCollectReward}>Save CI pattern report</button> :
              <small>The CI pattern report has been saved.</small>}
        </div>
      </div>
      <HintPanel hints={reflectionHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
