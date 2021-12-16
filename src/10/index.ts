import { linesToArray } from "../input";

const symbols = new Map([
  ["(", { closer: ")" }],
  ["[", { closer: "]" }],
  ["{", { closer: "}" }],
  ["<", { closer: ">" }],
]);

const closers = new Map([
  [")", { val1: 3, val2: 1 }],
  ["]", { val1: 57, val2: 2 }],
  ["}", { val1: 1197, val2: 3 }],
  [">", { val1: 25137, val2: 4 }],
]);

export function runA(inputPath: string): any {
  const lines = linesToArray(inputPath);

  const invalidCharPoints = lines
    .map((line) => {
      const invalidIndex = findFirstIllegalCharIndex(line);
      if (invalidIndex) {
        return closers.get(line[invalidIndex])?.val1;
      }

      return;
    })
    .filter(Boolean) as number[];

  return invalidCharPoints.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
}

export function runB(inputPath: string): any {
  const lines = linesToArray(inputPath);

  const validLines = lines.filter((line) => {
    return !findFirstIllegalCharIndex(line);
  });

  const closingChars = validLines.map(completeValidLine);

  const lineScores = closingChars
    .map((line) => {
      return line.reduce((acc, cur) => {
        return acc * 5 + closers.get(cur)!.val2;
      }, 0);
    })
    .sort((a, b) => a - b);

  return lineScores[Math.floor(lineScores.length / 2)];
}

function completeValidLine(line: string): string[] {
  const stack = [];
  for (let i = 0; i < line.length; i++) {
    const val = line[i];
    if (isCloser(val)) {
      stack.pop();
    } else {
      stack.push(val);
    }
  }

  return stack.reverse().map((opener) => symbols.get(opener)!.closer);
}

function findFirstIllegalCharIndex(line: string): number | void {
  const stack = [];
  for (let i = 0; i < line.length; i++) {
    const val = line[i];
    if (isCloser(val)) {
      const lastOpener = stack[stack.length - 1];
      if (symbols.get(lastOpener)?.closer !== val) {
        return i;
      }

      stack.pop();
    } else {
      stack.push(val);
    }
  }
}

function isCloser(char: string): boolean {
  return closers.has(char);
}
