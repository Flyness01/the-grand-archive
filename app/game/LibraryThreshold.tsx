"use client";

export function LibraryThreshold({ onReturn }: { onReturn: () => void }) {
  return (
    <section className="library-threshold" aria-labelledby="library-title">
      <div className="library-threshold__shelves" aria-hidden="true">
        {Array.from({ length: 56 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="library-threshold__veil" />
      <div className="library-threshold__copy">
        <p>The east wing</p>
        <h1 id="library-title">Library</h1>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="library-threshold__story">
          Shelves vanish into the dark. Somewhere behind them, old mechanisms
          hold their breath.
        </p>
        <p className="library-threshold__status">The Librarian’s Shelf awaits in Chunk 2.</p>
        <button className="brass-button" onClick={onReturn}>
          Return to the Grand Hall
        </button>
      </div>
    </section>
  );
}
