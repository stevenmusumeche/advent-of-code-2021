import { fileContents } from "../input";

export function runA(inputPath: string): any {
  const input = getInput(inputPath);
  input.sort((a, b) => a - b);
  let options: number[] = [];
  if (input.length % 2 === 0) {
    options.push(input[input.length / 2 - 1]);
  } else {
    options.push(input[input.length / 2 - 1]);
    options.push(input[input.length / 2]);
  }

  const fuels = options.map((option) => calcFuelAlgoA(input, option));
  return Math.min(...fuels);
}

export function runB(inputPath: string): any {
  const inputs = getInput(inputPath);
  const options = range(Math.min(...inputs), Math.max(...inputs));

  const fuels = options.map((dest) => {
    return calcFuelAlgoB(inputs, dest);
  });

  return Math.min(...fuels);
}

function calcFuelAlgoA(input: number[], destination: number): number {
  return input.reduce((acc, cur) => {
    return acc + Math.abs(destination - cur);
  }, 0);
}

function calcFuelAlgoB(input: number[], destination: number): number {
  return input.reduce((acc, cur) => {
    return acc + calcItemFuelAlgoB(destination, cur);
  }, 0);
}

function calcItemFuelAlgoB(start: number, destination: number): number {
  const distance = Math.abs(destination - start);
  return recurse(distance);

  // 5-6 -> 1
  // 1 = 1

  // 5-7 -> 2
  // 1 2 = 3

  // 5-8 -> 3
  // 1 2 3 = 6

  // 5-9 -> 4
  // 1 2 3 4 = 10

  // 5-10 -> 5
  // 1 2 3 4 5 = 15

  // prevAnswer + curDist
}

const memo = new Map<number, number>();
function recurse(n: number): number {
  if (n <= 1) return n;

  if (memo.has(n)) {
    return memo.get(n)!;
  }

  const answer = recurse(n - 1) + n;
  memo.set(n, answer);
  return answer;
}

function getInput(inputPath: string): number[] {
  const input = fileContents(inputPath);
  return input.split(",").map(Number);
}

function range(from: number, to: number): ReadonlyArray<number> {
  return [...Array(to - from + 1).keys()].map((i) => i + from);
}
