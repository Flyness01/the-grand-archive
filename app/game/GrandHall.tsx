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
  lanternWallUnlocked,
  lanternWallSolved,
  onInspectLanternWall,
  onEnterWorkshop,
  clockSolved,
  onEnterConservatory,
  conservatorySolved,
  onEnterObservatory,
  observatorySolved,
  onEnterOuterOffice,
  typewriterSolved,
  onEnterReflections,
  blueprintSolved,
}: {
  onEnterLibrary: () => void;
  onEnterMapRoom: () => void;
  revealedTiles: number[];
  restored: boolean;
  mapRoomUnlocked: boolean;
  floorMechanismActive: boolean;
  lanternWallUnlocked: boolean;
  lanternWallSolved: boolean;
  onInspectLanternWall: () => void;
  onEnterWorkshop: () => void;
  clockSolved: boolean;
  onEnterConservatory: () => void;
  conservatorySolved: boolean;
  onEnterObservatory: () => void;
  observatorySolved: boolean;
  onEnterOuterOffice: () => void;
  typewriterSolved: boolean;
  onEnterReflections: () => void;
  blueprintSolved: boolean;
}) {
  return (
    <section className={`hall ${restored ? "is-restored" : ""} ${lanternWallSolved ? "is-lantern-restored" : ""} ${blueprintSolved ? "is-blueprint-restored" : ""}`} aria-labelledby="room-title">
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
        className={`reflections-threshold ${typewriterSolved ? "is-unlocked" : ""}`}
        disabled={!typewriterSolved}
        onClick={onEnterReflections}
        aria-label={typewriterSolved ? "Enter the Hall of Reflections" : "The Hall of Reflections is sealed"}
      >
        <span><i /></span>
        <b>Hall of Reflections</b>
        <small>{typewriterSolved ? "The journal reveals the door" : "No door appears here"}</small>
      </button>

      <button
        className={`observatory-threshold ${conservatorySolved ? "is-unlocked" : ""}`}
        disabled={!conservatorySolved}
        onClick={onEnterObservatory}
        aria-label={
          conservatorySolved
            ? "The Observatory stair is uncovered"
            : "The Observatory stair is hidden"
        }
      >
        <span><i /><i /><i /></span>
        <b>Observatory</b>
        <small>{conservatorySolved ? "Stair uncovered" : "Lost beneath vines"}</small>
      </button>

      <button
        className={`office-threshold ${observatorySolved ? "is-unlocked" : ""}`}
        disabled={!observatorySolved}
        onClick={onEnterOuterOffice}
        aria-label={observatorySolved ? "Enter the Archivist’s Outer Office" : "The Archivist’s Outer Office is sealed"}
      >
        <span><i /></span>
        <b>Outer Office</b>
        <small>{observatorySolved ? "A ribbon stirs within" : "Sealed beyond the dome"}</small>
      </button>

      <button
        className={`conservatory-threshold ${clockSolved ? "is-unlocked" : ""}`}
        disabled={!clockSolved}
        onClick={onEnterConservatory}
        aria-label={
          clockSolved
            ? "The Conservatory door is unlocked"
            : "The Conservatory door is sealed"
        }
      >
        <span><i /><i /><i /></span>
        <b>Conservatory</b>
        <small>{clockSolved ? "Irrigation restored" : "Glass gone dark"}</small>
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

      <button
        className={`workshop-threshold ${lanternWallSolved ? "is-unlocked" : ""}`}
        disabled={!lanternWallSolved}
        onClick={onEnterWorkshop}
        aria-label={
          lanternWallSolved
            ? "The Workshop door is unlocked"
            : "The Workshop door is sealed"
        }
      >
        <span><i /></span>
        <b>Workshop</b>
        <small>{lanternWallSolved ? "Unlocked" : "Sealed by shadow"}</small>
      </button>

      <div
        className={`hall-floor-mechanism ${floorMechanismActive ? "is-active" : ""}`}
        aria-label={floorMechanismActive ? "The Grand Hall floor mechanism is active" : "A dormant mechanism lies beneath the floor"}
      >
        <i /><i /><i />
      </div>

      <button
        className={`lantern-wall-hotspot ${
          lanternWallUnlocked ? "is-unlocked" : ""
        } ${lanternWallSolved ? "is-solved" : ""}`}
        disabled={!lanternWallUnlocked}
        onClick={onInspectLanternWall}
        aria-label={
          lanternWallUnlocked
            ? lanternWallSolved
              ? "Inspect the completed Lantern Wall"
              : "Inspect the Lantern Wall"
            : "A dark arrangement of lanterns"
        }
      >
        {[0, 1, 2, 3].map((lantern) => (
          <span key={lantern}><i /></span>
        ))}
        <b>
          {lanternWallSolved
            ? "A keyhole of shadow remains"
            : lanternWallUnlocked
              ? "Align the lantern shadows"
              : "Dormant lanterns"}
        </b>
      </button>

      <div className="pedestals" aria-label="Ten empty artifact pedestals">
        {pedestals.map((pedestal) => (
          <span key={pedestal} aria-hidden="true" />
        ))}
      </div>
      <div className="hall__dust" aria-hidden="true" />
      <p className="hall__invitation">
        {blueprintSolved
          ? "The pedestal ring rises into the light."
          : typewriterSolved
          ? "A silver doorway appears where the Journal says it should."
          : observatorySolved
          ? "A narrow office door opens beneath the newly revealed stars."
          : conservatorySolved
          ? "Vines curl away from a stair climbing into darkness."
          : clockSolved
          ? "A measured pulse moves water through the walls."
          : lanternWallSolved
          ? "The central lantern burns without a flame."
          : lanternWallUnlocked
          ? "The floor mechanism points toward the lanterns."
          : restored
            ? "The first fragment has returned."
            : "One doorway holds a little light."}
        <span>
          {blueprintSolved
            ? "Nine base shapes wait for everything the Archive lent you."
            : typewriterSolved
            ? "Its reflection opens before the door itself."
            : observatorySolved
            ? "Inside, a typewriter strikes the wrong letter with perfect consistency."
            : conservatorySolved
            ? "Above, an unrecorded group of stars waits in the dome."
            : clockSolved
            ? "Beyond the glass, six sleeping leaves begin to stir."
            : lanternWallSolved
            ? "Warm light reaches the newly opened Workshop."
            : lanternWallUnlocked
            ? "Four shadows wait to become one."
            : restored
              ? "The mosaic remembers the Library."
              : "Move closer to inspect it."}
        </span>
      </p>
    </section>
  );
}
