import { fileContents } from "../input";

export function runA(inputPath: string): any {
  let fish = getInput(inputPath);
  let curDay = 1;
  let maxDays = 80;
  while (curDay <= maxDays) {
    fish = cycleDay(fish);
    curDay++;
  }

  return calcNumFish(fish);
}

export function runB(inputPath: string): any {
  let fish = getInput(inputPath);
  let curDay = 1;
  let maxDays = 256;
  while (curDay <= maxDays) {
    fish = cycleDay(fish);
    curDay++;
  }

  return calcNumFish(fish);
}

function calcNumFish(fish: Fish): any {
  return [...fish.entries()].reduce((acc, cur) => {
    return acc + cur[1];
  }, 0);
}

function cycleDay(fish: Fish): Fish {
  const newFishToAdd = fish.get(0) ?? 0;

  const cycledFish: Fish = new Map();
  for (let i = 0; i <= 8; i++) {
    const oldVal = fish.get(i) ?? 0;
    if (i === 0) {
      cycledFish.set(6, (cycledFish.get(6) ?? 0) + oldVal);
    } else {
      cycledFish.set(i - 1, (cycledFish.get(i - 1) ?? 0) + oldVal);
    }
  }

  cycledFish.set(8, newFishToAdd);

  return cycledFish;
}

function getInput(inputPath: string): Fish {
  const input = fileContents(inputPath).split(",").map(Number);
  return input.reduce((acc: Fish, cur) => {
    acc.set(cur, (acc.get(cur) ?? 0) + 1);
    return acc;
  }, new Map());
}

type Fish = Map<number, number>;
