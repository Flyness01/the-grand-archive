"use client";

import { useState } from "react";

export function ArchivistsStudy({ onReturn }: { onReturn: () => void }) {
  const [letterOpen, setLetterOpen] = useState(true);

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
        Open my thank-you note
      </button>
      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Team Hub</button>

      {letterOpen && (
        <div className="letter-backdrop" onMouseDown={() => setLetterOpen(false)}>
          <article className="appreciation-letter" role="dialog" aria-modal="true" aria-labelledby="letter-title" onMouseDown={(event) => event.stopPropagation()}>
            <button onClick={() => setLetterOpen(false)} aria-label="Close appreciation letter">×</button>
            <p className="letter-eyebrow">For the team who made two summers unforgettable</p>
            <h2 id="letter-title">Thank You for Two Amazing Summers</h2>
            <blockquote>“The best part of everything I built was getting to build it with you.”</blockquote>
            <p>
              Thank you for welcoming me onto this team and giving me two summers filled with learning, laughter, challenges,
              and opportunities I will carry with me for a long time. I came ready to learn, and you gave me the space to ask questions,
              try unfamiliar things, make mistakes, and grow into a more thoughtful engineer.
            </p>
            <p>
              I am grateful for every patient explanation, thoughtful review, honest piece of feedback, shared joke, and moment when someone
              took the time to help me understand not just what we were building, but why it mattered. You made difficult work feel shared,
              and every contribution feel valued.
            </p>
            <p>
              These two summers gave me more than projects to talk about. They gave me confidence, perspective, friendships,
              and an example of the kind of teammate I hope to be. Thank you for such an amazing summer, for the summer before it,
              and for making both experiences so meaningful. I feel incredibly lucky that I got to be part of this team.
            </p>
            <p className="letter-signature">With so much appreciation,<br />Flyness</p>
          </article>
        </div>
      )}
    </section>
  );
}
