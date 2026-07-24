# The Grand Archive — Architecture

## Delivery strategy

The game is built as production-ready vertical chunks. Each chunk must leave a
runnable, testable experience and must not pre-emptively implement future
puzzles.

### Chunk 1 — Foundation shell

- Application and visual shell
- Opening sequence with skip control
- Layered Grand Hall scene
- Explicit room graph for all planned rooms
- Grand Hall ↔ Library threshold navigation
- Versioned device-local save
- Reduced-motion, high-contrast, text-size, mute, and reset controls

### Chunk 2 — First complete gameplay loop

- Reusable hotspot and puzzle-dialog systems
- The Librarian’s Shelf puzzle and validator
- Three progressive hints
- Feather Bookmark reward and museum-cabinet inventory
- Library restoration stage 1
- Curated mosaic tile reveal
- Tests for the complete happy path and persistence

### Later chunks

Future rooms and puzzles remain data-driven additions. They must not require
changing the room state model, navigation contract, save envelope, artifact
contract, or puzzle registry contract established during Milestone 1.

## Current modules

- `app/game/types.ts`: stable domain types
- `app/game/rooms.ts`: declarative room graph
- `app/game/state.ts`: state defaults, reducer, save version, persistence
- `app/game/GameShell.tsx`: hydration, autosave, utility controls, room selection
- `app/game/IntroSequence.tsx`: opening presentation
- `app/game/GrandHall.tsx`: layered hub scene
- `app/game/LibraryThreshold.tsx`: first connected-room boundary

The reducer is the only place that changes game state. Browser persistence wraps
the complete state in a versioned envelope so migrations can be introduced
before the save schema changes.
