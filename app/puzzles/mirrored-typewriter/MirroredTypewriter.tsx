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
    alreadySolved ? "The decoded handoff remains clear and actionable." : "",
  );

  function pressKey(key: string) {
    if (solved || printed.length >= mirroredTypewriterTarget.length) return;
    const nextPressed = pressed + key;
    const nextPrinted = printed + mirrorKey(key);
    setPressed(nextPressed);
    setPrinted(nextPrinted);
    setFeedback(`Input ${key} decodes as ${mirrorKey(key)}.`);
    if (nextPrinted.length === mirroredTypewriterTarget.length) {
      if (validateMirroredTypewriter({ keys: nextPressed, printed: nextPrinted })) {
        setSolved(true);
        setFeedback("The handoff is complete. The unclear output has become an actionable message.");
      } else {
        setFeedback("The decoded ending is incorrect. Reset the message and recheck the transformation.");
      }
    }
  }

  function clearPaper() {
    if (solved) return;
    setPressed("");
    setPrinted("");
    setFeedback("The draft resets. Four empty characters wait at the end of the handoff.");
  }

  return (
    <div className="typewriter-puzzle">
      <div className="typewriter-puzzle__workspace">
        <p className="typewriter-puzzle__instruction">
          Each example uses the same keyboard transformation. Infer the rule,
          then use it to complete the missing four-letter word.
        </p>
        <aside className="typing-record">
          <p>Decoder samples</p>
          <span><b>Input</b> Q W E R T</span>
          <span><b>Output</b> P O I U Y</span>
          <span><b>Input</b> A S D F</span>
          <span><b>Output</b> L K J H</span>
          <small>The transformation mirrors each row consistently.</small>
        </aside>

        <div className={`antique-typewriter ${solved ? "is-solved" : ""}`}>
          <div className="typewriter-paper">
            <small>ENGINEERING HANDOFF · INCOMPLETE</small>
            <p>A useful handoff begins where ambiguity</p>
            <strong>
              {Array.from({ length: 4 }, (_, index) => (
                <i key={index}>{printed[index] ?? ""}</i>
              ))}
            </strong>
          </div>
          <div className="typewriter-carriage" aria-hidden="true" />
          <div className="typewriter-keyboard" aria-label="Mirrored message decoder">
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
            {feedback || "Find the missing word, then press the keys that produce it as mirrored output."}
          </p>
          {!solved && <button onClick={clearPaper}>Reset message</button>}
          {solved && !alreadySolved ? (
            <button onClick={onCollectReward}>Save the handoff</button>
          ) : solved ? (
            <small>The handoff has been saved.</small>
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
