import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  const lines = linesToArray(inputPath);
  const gamma = calcGamma(lines);
  const epsilon = bitwiseComplement(gamma);

  const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
  return powerConsumption;
}

export function runB(inputPath: string): any {
  const lines = linesToArray(inputPath);
  const oxygenGenRating = calcOxygenGenRating(lines);
  const co2ScrubberRating = calcCo2ScrubberRating(lines);

  return parseInt(oxygenGenRating, 2) * parseInt(co2ScrubberRating, 2);
}

function calcOxygenGenRating(lines: string[]): string {
  let curLines = filterLines(lines, "1", (line, pos, freqs) => {
    const common = mostCommonAtPosition(pos, freqs);
    if (common === null) {
      return line[pos] === "1";
    } else {
      return line[pos] === common;
    }
  });

  return curLines[0];
}

function calcCo2ScrubberRating(lines: string[]): string {
  let curLines = filterLines(lines, "0", (line, pos, freqs) => {
    const common = mostCommonAtPosition(pos, freqs);
    if (common === null) {
      return line[pos] === "0";
    } else {
      return line[pos] !== common;
    }
  });

  return curLines[0];
}

function mostCommonAtPosition(
  position: number,
  freqs: Frequencies[]
): Bit | null {
  if (freqs[position][0] === freqs[position][1]) return null;
  return freqs[position][0] > freqs[position][1] ? "0" : "1";
}

function filterLines(
  lines: string[],
  tiebreaker: Bit,
  predicate: (
    line: string,
    pos: number,
    freqs: Frequencies[],
    tiebreaker: Bit
  ) => boolean
) {
  const len = lines[0].length;
  let curLines = [...lines];

  let pos = 0;
  while (pos < len && curLines.length > 1) {
    let freqs = calcFrequencies(curLines);
    curLines = curLines.filter((line) => {
      return predicate(line, pos, freqs, tiebreaker);
    });
    pos++;
  }

  return curLines;
}

function calcGamma(lines: string[]): string {
  let freqs: Frequencies[] = calcFrequencies(lines);

  let binary = "";
  freqs.forEach((freq) => {
    binary += freq[0] > freq[1] ? "0" : "1";
  });

  return binary;
}

function calcFrequencies(lines: string[]): Frequencies[] {
  let freqs: Frequencies[] = [];
  lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      const digit = line[i];
      const curFreq = freqs[i] ?? { 0: 0, 1: 0 };
      if (digit === "0") {
        freqs[i] = { ...curFreq, 0: curFreq[0] + 1 };
      } else {
        freqs[i] = { ...curFreq, 1: curFreq[1] + 1 };
      }
    }
  });
  return freqs;
}

function bitwiseComplement(binary: string): string {
  return binary
    .split("")
    .map((x) => {
      return x === "1" ? "0" : "1";
    })
    .join("");
}

interface Frequencies {
  0: number;
  1: number;
}

type Bit = "0" | "1";
