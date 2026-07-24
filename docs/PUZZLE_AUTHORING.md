# Puzzle authoring

Each main puzzle owns a folder beneath `app/puzzles/`. A puzzle folder contains:

1. Structured content and its solution in `puzzleData.ts`
2. A presentation-independent validator in `validator.ts`
3. A focused interaction component
4. Validator and progression tests

Register the puzzle in `app/puzzles/registry.ts` with its room, hints, artifact
reward, difficulty, expected duration, and curated mosaic tile IDs. Do not add
puzzle-specific conditionals to the core state reducer. Dispatch the generic
`SOLVE_PUZZLE` action with the registry’s effects instead.

Puzzle components may keep temporary attempt state locally. Durable outcomes
such as hints, solutions, artifacts, clues, restoration stages, and mosaic
tiles belong in centralized game state.

Every interaction must work through semantic buttons and keyboard navigation.
Visual clues need a non-color attribute, accessible label, texture, symbol, or
equivalent description that preserves the intended reasoning challenge.
