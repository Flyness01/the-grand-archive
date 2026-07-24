# State model

The complete game state is defined in `app/game/types.ts`. All changes flow
through `gameReducer`; components dispatch intent and do not edit state directly.

Saves use the `grand-archive-save` local-storage key and the envelope:

```json
{
  "version": 1,
  "state": {}
}
```

Unsupported versions fail safely to a new game. Before the schema changes, add
a migration step keyed by envelope version and retain fixtures for every
previously shipped version.
