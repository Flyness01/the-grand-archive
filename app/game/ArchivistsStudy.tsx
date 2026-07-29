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
            <p>For the person behind every thoughtful contribution</p>
            <h2 id="letter-title">You Made a Difference Here</h2>
            <blockquote>“The work mattered. So did the person you became while doing it.”</blockquote>
            <p>
              You arrived willing to learn an unfamiliar system. Then you traced what others had missed, asked the question that clarified the room,
              stayed steady when the build failed, and remained present long enough to see the work reach real people.
            </p>
            <p>
              Your contribution was never only the code. It was the context you gathered, the care you brought to reviews,
              the clarity of your handoffs, and the way you made difficult work feel shared. Those things changed the project—and they changed us.
            </p>
            <p>
              Wherever you build next, keep the curiosity, judgment, resilience, and generosity represented on the Project Board.
              We are grateful we had the chance to build beside you.
            </p>
            <p className="letter-signature">With genuine appreciation,<br />Your Team</p>
          </article>
        </div>
      )}
    </section>
  );
}
