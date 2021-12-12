import { linesToArray } from "../input";

const digitData: Record<number, DigitData> = {
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

export function runB(inputPath: string): any {
  const entries = parseInput(inputPath);

  entries.forEach((entry) => {
    const answers = new Array(10);

    answers[1] = entry.signals.find((x) => x.raw.length === 2)!.raw;
    answers[4] = entry.signals.find((x) => x.raw.length === 4)!.raw;
    answers[7] = entry.signals.find((x) => x.raw.length === 3)!.raw;
    answers[8] = entry.signals.find((x) => x.raw.length === 7)!.raw;

    entry.signals.forEach((signal) => {
      switch (signal.raw.length) {
        case 5:
          // 2, 3, 5
          if (numOverlaps(signal.raw, answers[1]) === 2) {
            answers[3] = signal.raw;
          } else {
            if (numOverlaps(signal.raw, answers[4]) === 2) {
              answers[2] = signal.raw;
            } else {
              answers[5] = signal.raw;
            }
          }

          // 2
          //   1 1
          //   4 2
          //   7 2
          // 3
          //   1 2
          //   4 3
          //   7 3
          // 5
          //   1 1
          //   4 3
          //   7 2
          break;
        case 6:
          // 0, 6, 9
          if (numOverlaps(signal.raw, answers[1]) === 1) {
            answers[6] = signal.raw;
          } else {
            if (numOverlaps(signal.raw, answers[4]) === 3) {
              answers[0] = signal.raw;
            } else {
              answers[9] = signal.raw;
            }
          }

          // 0
          //   1 2
          //   4 3
          //   7 3
          // 6
          //   1 1
          //   4 3
          //   7 2
          // 9
          //   1 2
          //   4 4
          //   7 3
          break;
      }
    });

    const mappings = {} as any;

    mappings[letterNotIn(answers[7], answers[1])!] = "a";
    mappings[letterNotIn(answers[4], answers[3])!] = "b";
    mappings[letterNotIn(answers[7], answers[6])!] = "c";
    mappings[letterNotIn(answers[8], answers[0])!] = "d";
    mappings[letterNotIn(answers[2], answers[3])!] = "e";
    mappings[letterNotIn(answers[1], answers[2])!] = "f";
    mappings[letterNotIn(answers[9], answers[7])!] = "g";

    const answer = entry.output.map((x) => {
      const normalized = x.raw
        .split("")
        .map((y) => mappings[y])
        .sort();

      const matchingEntry = Object.entries(digitData).find(([key, val]) => {
        return val.segments.join("") === normalized.join("");
      });

      return matchingEntry![0];
    });

    console.log(Number(answer.join("")));
  });
}

function numOverlaps(a: string, b: string): number {
  return a.split("").reduce((acc, cur) => {
    if (b.includes(cur)) acc++;
    return acc;
  }, 0);
}

function getDiff(short: string, long: string): string {
  let diff = long;
  short.split("").forEach((letterToRemove) => {
    diff = diff.replace(letterToRemove, "");
  });
  return diff;
}

function letterNotIn(source: string, dest: string) {
  return source.split("").find((letter) => {
    return !dest.includes(letter);
  });
}

function isUniqueDigit(digit: Digit): boolean {
  return findUniqueDigit(digit) !== undefined;
}

function findUniqueDigit(digit: Digit): number | undefined {
  return uniqueDigits.find((uniqueDigit) => {
    const digitLen = digitData[uniqueDigit].segments.length;
    return digit.raw.length === digitLen;
  });
}

function parseInput(inputPath: string): Entry[] {
  const lines = linesToArray(inputPath);
  return lines.map((line) => {
    const [signals, output] = line
      .split(" | ")
      .map((x) => x.split(" ").map((x) => ({ raw: x, segments: {} })));
    return { signals, output };
  });
}

interface Entry {
  signals: Digit[];
  output: Digit[];
}

interface Digit {
  raw: string;
  match?: number;
  segments: { [letter: string]: string[] };
}

interface DigitData {
  segments: string[];
}
