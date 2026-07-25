"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  keyboardRows,
  mirroredTypewriterHints,
  mirroredTypewriterTarget,
} from "./puzzleData";
import { mirrorKey, validateMirroredTypewriter } from "./validator";

export function MirroredTypewriter({
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
  const [pressed, setPressed] = useState("");
  const [printed, setPrinted] = useState(alreadySolved ? mirroredTypewriterTarget : "");
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The final sentence remains cleanly inked upon the page." : "",
  );

  function pressKey(key: string) {
    if (solved || printed.length >= mirroredTypewriterTarget.length) return;
    const nextPressed = pressed + key;
    const nextPrinted = printed + mirrorKey(key);
    setPressed(nextPressed);
    setPrinted(nextPrinted);
    setFeedback(`The ${key} key strikes ${mirrorKey(key)} onto the paper.`);
    if (nextPrinted.length === mirroredTypewriterTarget.length) {
      if (validateMirroredTypewriter({ keys: nextPressed, printed: nextPrinted })) {
        setSolved(true);
        setFeedback("The sentence is complete. A narrow drawer releases beneath the carriage.");
      } else {
        setFeedback("The sentence ends incorrectly. The carriage returns, waiting for another attempt.");
      }
    }
  }

  function clearPaper() {
    if (solved) return;
    setPressed("");
    setPrinted("");
    setFeedback("The carriage rolls back. Four empty spaces wait at the end of the sentence.");
  }

  return (
    <div className="typewriter-puzzle">
      <div className="typewriter-puzzle__workspace">
        <aside className="typing-record">
          <p>Carbon-copy tests</p>
          <span><b>Pressed</b> Q W E R T</span>
          <span><b>Printed</b> P O I U Y</span>
          <span><b>Pressed</b> A S D F</span>
          <span><b>Printed</b> L K J H</span>
          <small>The fault repeats from the opposite side of every row.</small>
        </aside>

        <div className={`antique-typewriter ${solved ? "is-solved" : ""}`}>
          <div className="typewriter-paper">
            <small>ARCHIVIST’S NOTE · UNFINISHED</small>
            <p>Memory begins where certainty</p>
            <strong>
              {Array.from({ length: 4 }, (_, index) => (
                <i key={index}>{printed[index] ?? ""}</i>
              ))}
            </strong>
          </div>
          <div className="typewriter-carriage" aria-hidden="true" />
          <div className="typewriter-keyboard" aria-label="Mirrored typewriter keyboard">
            {keyboardRows.map((row) => (
              <div key={row}>
                {[...row].map((key) => (
                  <button key={key} onClick={() => pressKey(key)} disabled={solved}>
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="typewriter-actions">
          <p aria-live="polite">
            {feedback || "Complete the intended sentence. The key you press will not be the letter that appears."}
          </p>
          {!solved && <button onClick={clearPaper}>Return carriage</button>}
          {solved && !alreadySolved ? (
            <button onClick={onCollectReward}>Open the hidden drawer</button>
          ) : solved ? (
            <small>The hidden drawer stands empty.</small>
          ) : null}
        </div>
      </div>

      <HintPanel
        hints={mirroredTypewriterHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />
    </div>
  );
}

