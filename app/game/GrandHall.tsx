"use client";

const pedestals = Array.from({ length: 20 }, (_, index) => index + 1);
const tiles = Array.from({ length: 100 }, (_, index) => index);

export function GrandHall({ onEnterLibrary }: { onEnterLibrary: () => void }) {
  return (
    <section className="hall" aria-labelledby="room-title">
      <div className="hall__rain" aria-hidden="true" />
      <div className="hall__architecture" aria-hidden="true">
        <div className="hall__arch hall__arch--left" />
        <div className="hall__arch hall__arch--right" />
        <div className="hall__ceiling" />
        <div className="hall__chandelier">
          <i />
          <i />
          <i />
        </div>
      </div>

      <header className="room-title">
        <p>The heart of the Archive</p>
        <h1 id="room-title">Grand Hall</h1>
      </header>

      <div className="mosaic">
        <div className="mosaic__plaque">The Archive Restored</div>
        <div className="mosaic__grid" aria-label="An empty mosaic frame">
          {tiles.map((tile) => (
            <span key={tile} />
          ))}
        </div>
      </div>

      <button
        className="door door--library"
        onClick={onEnterLibrary}
        aria-label="Enter the Library"
      >
        <span className="door__glow" />
        <span className="door__frame">
          <span className="door__panel" />
          <span className="door__handle" />
        </span>
        <span className="door__label">
          <small>A faint light remains</small>
          Library
        </span>
      </button>

      <button
        className="door door--locked"
        aria-label="Map Room, locked"
        disabled
      >
        <span className="door__frame">
          <span className="door__panel" />
        </span>
        <span className="door__label">
          <small>Sealed</small>
          Map Room
        </span>
      </button>

      <div className="pedestals" aria-label="Twenty empty artifact pedestals">
        {pedestals.map((pedestal) => (
          <span key={pedestal} aria-hidden="true" />
        ))}
      </div>
      <div className="hall__dust" aria-hidden="true" />
      <p className="hall__invitation">
        One doorway holds a little light.
        <span>Move closer to inspect it.</span>
      </p>
    </section>
  );
}
