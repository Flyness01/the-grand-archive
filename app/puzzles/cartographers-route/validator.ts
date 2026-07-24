import { cartographersRouteSolution } from "./puzzleData";

export function validateCartographersRoute(input: unknown): boolean {
  return (
    Array.isArray(input) &&
    input.length === cartographersRouteSolution.length &&
    cartographersRouteSolution.every((nodeId, index) => input[index] === nodeId)
  );
}
