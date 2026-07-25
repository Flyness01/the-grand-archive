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
        <p>The final room</p>
        <h1 id="study-title">Archivist’s Study</h1>
        <small>The Archive is no longer waiting</small>
      </header>

      <button className="appreciation-envelope" onClick={() => setLetterOpen(true)}>
        <span aria-hidden="true">✦</span>
        Open the sealed letter
      </button>
      <button className="return-hall" onClick={onReturn}><span aria-hidden="true">←</span> Grand Hall</button>

      {letterOpen && (
        <div className="letter-backdrop" onMouseDown={() => setLetterOpen(false)}>
          <article className="appreciation-letter" role="dialog" aria-modal="true" aria-labelledby="letter-title" onMouseDown={(event) => event.stopPropagation()}>
            <button onClick={() => setLetterOpen(false)} aria-label="Close appreciation letter">×</button>
            <p>For everyone who helped build what came next</p>
            <h2 id="letter-title">A Letter from the Archive</h2>
            <blockquote>“The final record was the journey itself.”</blockquote>
            <p>
              Thank you for the questions you asked, the ideas you shared, and the patience you offered while we learned together.
              Every thoughtful review, generous explanation, unexpected solution, and small moment of encouragement became part of this Archive.
            </p>
            <p>
              The rooms are restored because no meaningful piece of work is built alone. I’m grateful for the chance to have worked beside you,
              and for everything your curiosity, craft, and kindness taught me along the way.
            </p>
            <p className="letter-signature">With appreciation,<br />The Archivist</p>
          </article>
        </div>
      )}
    </section>
  );
}
