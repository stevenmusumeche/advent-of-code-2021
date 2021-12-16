import { linesToArray } from "../input";

const symbols = new Map([
  ["(", { closer: ")" }],
  ["[", { closer: "]" }],
  ["{", { closer: "}" }],
  ["<", { closer: ">" }],
]);

const closers = new Map([
  [")", { val: 3 }],
  ["]", { val: 57 }],
  ["}", { val: 1197 }],
  [">", { val: 25137 }],
]);

export function runA(inputPath: string): any {
  const lines = linesToArray(inputPath);

  const invalidCharPoints = lines
    .map((line) => {
      const invalidIndex = findFirstIllegalCharIndex(line);
      if (invalidIndex) {
        return closers.get(line[invalidIndex])?.val;
      }

      return;
    })
    .filter(Boolean) as number[];

  return invalidCharPoints.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
}

export function runB(inputPath: string): any {}

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
