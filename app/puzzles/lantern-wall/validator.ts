import {
  lanternWallSolution,
  type LanternSetting,
} from "./puzzleData";

export function validateLanternWall(input: unknown): boolean {
  if (!Array.isArray(input) || input.length !== lanternWallSolution.length) {
    return false;
  }

  return input.every((setting, index) => {
    if (
      typeof setting !== "object" ||
      setting === null ||
      !("angle" in setting) ||
      !("height" in setting)
    ) {
      return false;
    }
    const candidate = setting as LanternSetting;
    return (
      candidate.angle === lanternWallSolution[index].angle &&
      candidate.height === lanternWallSolution[index].height
    );
  });
}

