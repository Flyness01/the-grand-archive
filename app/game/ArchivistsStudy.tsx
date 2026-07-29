"use client";

import { useState } from "react";

export function ArchivistsStudy({ onReturn }: { onReturn: () => void }) {
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section className="archivists-study" aria-labelledby="study-title">
      <div className="archivists-study__window" aria-hidden="true" />
      <div className="archivists-study__shelves" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="archivists-study__desk" aria-hidden="true" />
      <header className="library-room__title">
        <p>A quiet moment after the work</p>
        <h1 id="study-title">The Debrief Room</h1>
        <small>The project is complete. What you learned travels with you.</small>
      </header>

      <button className="appreciation-envelope" onClick={() => setLetterOpen(true)}>
        <span aria-hidden="true">✦</span>
        Open the team’s note
      </button>
      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Team Hub</button>

      {letterOpen && (
        <div className="letter-backdrop" onMouseDown={() => setLetterOpen(false)}>
          <article className="appreciation-letter" role="dialog" aria-modal="true" aria-labelledby="letter-title" onMouseDown={(event) => event.stopPropagation()}>
            <button onClick={() => setLetterOpen(false)} aria-label="Close appreciation letter">×</button>
            <h2 id="letter-title">Two summers, countless lessons, one very full heart.</h2>
            <p>
              Thank you for the past two summers on Enterprise: for teaching me to slow down and really read code,
              for making 1:1s feel like a place to grow, and for helping me understand that engineering is as much
              communication as implementation.
            </p>
            <p>
              I learned from broken PRs, thoughtful reviews, patient explanations, careful handoffs, and all the small
              moments where someone lent a helping hand before I even knew how to ask.
            </p>
            <p>
              To my mentor: words genuinely fail me a little. Thank you for the countless lessons, the trust, the kindness,
              and the way you made me feel capable while I was still becoming capable.
            </p>
            <p>
              I am leaving with better instincts, more confidence, a deeper appreciation for teams that care, and a mental
              scrapbook that includes code, trails, pets, and people I will be grateful for long after this internship.
            </p>
          </article>
        </div>
      )}
    </section>
  );
}
