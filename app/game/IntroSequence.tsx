"use client";

import { useEffect, useState } from "react";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timings = [850, 1650, 3050, 4700, 6100];
    const timers = timings.map((time, index) =>
      window.setTimeout(() => setPhase(index + 1), time),
    );
    const completion = window.setTimeout(onComplete, 7600);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(completion);
    };
  }, [onComplete]);

  return (
    <section className={`intro intro--${phase}`} aria-label="Opening sequence">
      <button className="intro__skip" onClick={onComplete}>
        Skip intro
      </button>
      <div className="intro__match" aria-hidden="true" />
      <div className="intro__lantern" aria-hidden="true">
        <span />
      </div>
      <div className="intro__copy" aria-live="polite">
        <p>Knowledge is never truly lost.</p>
        <p>It only waits to be found.</p>
      </div>
      <div className="intro__caption" aria-hidden={phase < 1}>
        <span className="sound-wave" />
        {phase < 2 ? "A faint clock ticks" : "A match strikes"}
      </div>
    </section>
  );
}
