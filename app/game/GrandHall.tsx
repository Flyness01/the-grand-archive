"use client";

const pedestals = Array.from({ length: 10 }, (_, index) => index + 1);
const tiles = Array.from({ length: 625 }, (_, index) => index);

export function GrandHall({
  onEnterLibrary,
  onEnterMapRoom,
  revealedTiles,
  restored,
  mapRoomUnlocked,
  floorMechanismActive,
}: {
  onEnterLibrary: () => void;
  onEnterMapRoom: () => void;
  revealedTiles: number[];
  restored: boolean;
  mapRoomUnlocked: boolean;
  floorMechanismActive: boolean;
}) {
  return (
    <section className={`hall ${restored ? "is-restored" : ""}`} aria-labelledby="room-title">
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
        <div className="mosaic__grid" aria-label={`${revealedTiles.length} mosaic tiles revealed`}>
          {tiles.map((tile) => (
            <span className={revealedTiles.includes(tile) ? "is-revealed" : ""} key={tile} />
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
        className={`door ${mapRoomUnlocked ? "door--map" : "door--locked"}`}
        aria-label={mapRoomUnlocked ? "Enter the Map Room" : "Map Room, locked"}
        disabled={!mapRoomUnlocked}
        onClick={onEnterMapRoom}
      >
        {mapRoomUnlocked && <span className="door__glow door__glow--green" />}
        <span className="door__frame">
          <span className="door__panel" />
          {mapRoomUnlocked && <span className="door__handle" />}
        </span>
        <span className="door__label">
          <small>{mapRoomUnlocked ? "An atlas has opened the way" : "Sealed"}</small>
          Map Room
        </span>
      </button>

      <div
        className={`hall-floor-mechanism ${floorMechanismActive ? "is-active" : ""}`}
        aria-label={floorMechanismActive ? "The Grand Hall floor mechanism is active" : "A dormant mechanism lies beneath the floor"}
      >
        <i /><i /><i />
      </div>

      <div className="pedestals" aria-label="Ten empty artifact pedestals">
        {pedestals.map((pedestal) => (
          <span key={pedestal} aria-hidden="true" />
        ))}
      </div>
      <div className="hall__dust" aria-hidden="true" />
      <p className="hall__invitation">
        {restored ? "The first fragment has returned." : "One doorway holds a little light."}
        <span>{restored ? "The mosaic remembers the Library." : "Move closer to inspect it."}</span>
      </p>
    </section>
  );
}
