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
      <div className="intro-workspace" aria-hidden="true">
        <aside>
          <b>◎</b>
          <i />
          <i />
          <i />
        </aside>
        <div>
          <small># two-summers</small>
          <p><b>F</b><span>Flyness pinned one last thread…</span></p>
        </div>
      </div>
      <div className="intro__copy" aria-live="polite">
        <p>Before I sign off, there is one last thread I want to share.</p>
        <p>Five moments return as visual pieces. Solve each lesson to unlock the next.</p>
      </div>
      <div className="intro__caption" aria-hidden={phase < 1}>
        <span className="sound-wave" />
        {phase < 2 ? "Last day · 4:42 PM" : "You opened #two-summers"}
      </div>
    </section>
  );
}
