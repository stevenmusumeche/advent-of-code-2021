import { linesToArray } from "../input";

const digits: Record<number, Digit> = {
  0: { segments: ["a", "b", "c", "e", "f", "g"] },
  1: { segments: ["c", "f"] },
  2: { segments: ["a", "c", "d", "e", "g"] },
  3: { segments: ["a", "c", "d", "f", "g"] },
  4: { segments: ["b", "c", "d", "f"] },
  5: { segments: ["a", "b", "d", "f", "g"] },
  6: { segments: ["a", "b", "d", "e", "f", "g"] },
  7: { segments: ["a", "c", "f"] },
  8: { segments: ["a", "b", "c", "d", "e", "f", "g"] },
  9: { segments: ["a", "b", "c", "d", "f", "g"] },
};

const uniqueDigits = [1, 4, 7, 8];

export function runA(inputPath: string): any {
  const entries = parseInput(inputPath);
  return entries.reduce((acc, entry) => {
    return acc + entry.output.filter(isUniqueDigit).length;
  }, 0);
}

export function runB(inputPath: string): any {}

function isUniqueDigit(digitRep: string): boolean {
  return findUniqueDigit(digitRep) !== undefined;
}

function findUniqueDigit(digitRep: string): number | undefined {
  return uniqueDigits.find((uniqueDigit) => {
    const digitLen = digits[uniqueDigit].segments.length;
    return digitRep.length === digitLen;
  });
}

function parseInput(inputPath: string): Entry[] {
  const lines = linesToArray(inputPath);
  return lines.map((line) => {
    const [signals, output] = line.split(" | ").map((x) => x.split(" "));
    return { signals, output };
  });
}

interface Entry {
  signals: string[];
  output: string[];
}

interface Digit {
  segments: string[];
}
