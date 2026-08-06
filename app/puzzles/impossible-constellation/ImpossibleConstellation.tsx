"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import { impossibleConstellationHints, productionCheckSolution } from "./puzzleData";
import { validateImpossibleConstellation } from "./validator";

const questions = [
  {
    key: "window",
    prompt: "When did production behavior change?",
    choices: [
      ["before-deploy", "Before the release"],
      ["after-deploy", "After the release"],
      ["all-day", "Throughout the day"],
    ],
  },
  {
    key: "service",
    prompt: "Which component became unhealthy?",
    choices: [
      ["web-client", "Web client"],
      ["api", "API"],
      ["job-worker", "Job worker"],
    ],
  },
  {
    key: "behavior",
    prompt: "What do its logs show?",
    choices: [
      ["traffic", "Expected traffic growth"],
      ["auth", "Authentication failures"],
      ["retries", "Repeated failed attempts"],
    ],
  },
] as const;

type AnswerKey = keyof typeof productionCheckSolution;

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
  const [answers, setAnswers] = useState<Record<AnswerKey, string>>(
    alreadySolved ? { ...productionCheckSolution } : { window: "", service: "", behavior: "" },
  );
  const [solved, setSolved] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The post-release finding remains documented." : "",
  );

  function selectAnswer(key: AnswerKey, value: string) {
    if (solved) return;
    setAnswers((current) => ({ ...current, [key]: value }));
    setFeedback("");
  }

  function reviewFinding() {
    if (validateImpossibleConstellation(answers)) {
      setSolved(true);
      setFeedback("The evidence agrees: after the release, the job worker repeatedly retried the same failed work.");
      return;
    }
    setFeedback("That conclusion leaves some evidence unexplained. Compare the deployment marker, service health, queue depth, and repeated request ID.");
  }

  return (
    <div className="constellation-puzzle production-check">
      <div className="constellation-puzzle__workspace production-check__workspace">
        <header className="production-check__header">
          <p>Release 2.7 · first 15 minutes</p>
          <strong>Find the one conclusion supported by every signal.</strong>
        </header>

        <section className="release-timeline" aria-label="Release timeline">
          <div><span>13:55</span><b>Stable baseline</b><small>All services healthy</small></div>
          <div className="is-deploy"><span>14:00</span><b>Release deployed</b><small>Version 2.7 at 100%</small></div>
          <div className="is-warning"><span>14:05</span><b>Queue alert</b><small>Backlog exceeds threshold</small></div>
          <div className="is-warning"><span>14:10</span><b>Jobs delayed</b><small>Completion rate falls</small></div>
        </section>

        <section className="service-metrics" aria-label="Service health after deployment">
          <article><small>Web client</small><strong>99.9%</strong><span>successful loads · steady</span></article>
          <article><small>API</small><strong>99.8%</strong><span>successful requests · steady</span></article>
          <article className="is-warning"><small>Job worker</small><strong>18 → 246</strong><span>queued jobs · rising</span></article>
        </section>

        <section className="production-log" aria-label="Job worker log sample">
          <p>Correlated log sample</p>
          <code>14:03:21.104&nbsp; req-1842&nbsp; attempt 1&nbsp; 503</code>
          <code>14:03:21.312&nbsp; req-1842&nbsp; attempt 2&nbsp; 503</code>
          <code>14:03:21.728&nbsp; req-1842&nbsp; attempt 3&nbsp; 503</code>
        </section>

        <section className="production-diagnosis" aria-label="Build the production finding">
          {questions.map((question) => (
            <fieldset key={question.key}>
              <legend>{question.prompt}</legend>
              {question.choices.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={answers[question.key] === value ? "is-selected" : ""}
                  onClick={() => selectAnswer(question.key, value)}
                  disabled={solved}
                >
                  {label}
                </button>
              ))}
            </fieldset>
          ))}
        </section>

        <div className="constellation-actions">
          <p aria-live="polite">{feedback || "Use all three evidence panels to build the finding."}</p>
          {!solved ? (
            <button onClick={reviewFinding} disabled={Object.values(answers).some((answer) => !answer)}>Review finding</button>
          ) : !alreadySolved ? (
            <button onClick={onCollectReward}>Save the production finding</button>
          ) : (
            <small>The production finding has been saved.</small>
          )}
        </div>
      </div>

      <HintPanel hints={impossibleConstellationHints} revealedCount={hintCount} onReveal={onUseHint} />
    </div>
  );
}
