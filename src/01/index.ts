import { linesToNumberArray } from "../input";

export function runA(inputPath: string): number {
  const input = linesToNumberArray(inputPath);

  return calcIncreases(input);
}

export function runB(inputPath: string): number {
  const input = linesToNumberArray(inputPath);
  const startIndex = 2;
  const endIndex = input.length;
  const windowed: number[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    windowed[i] = input[i] + input[i - 1] + input[i - 2];
  }
  return calcIncreases(windowed);
}

function calcIncreases(input: number[]) {
  const result = input.reduce<{ numIncreases: number; prevVal?: number }>(
    (acc, cur) => {
      if (acc.prevVal && cur > acc.prevVal) {
        acc.numIncreases++;
      }
      acc.prevVal = cur;

      return acc;
    },
    { numIncreases: 0 }
  );

  return result.numIncreases;
}
