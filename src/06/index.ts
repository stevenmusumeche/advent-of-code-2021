import { fileContents } from "../input";

export function runA(inputPath: string): any {
  let fish = getInput(inputPath);
  let curDay = 1;
  let maxDays = 2;
  while (curDay <= maxDays) {
    fish = cycleDay(fish);
    curDay++;
  }

  return fish.length;
}

export function runB(inputPath: string): any {}

function cycleDay(fish: Fish): Fish {
  const newFishToAdd = fish.filter((f) => f === 0).length;
  const cycledFish = fish.map((f) => (f === 0 ? 6 : f - 1));
  for (let i = 0; i < newFishToAdd; i++) {
    cycledFish.push(8);
  }

  return cycledFish;
}

function getInput(inputPath: string): Fish {
  return fileContents(inputPath).split(",").map(Number);
}

type Fish = number[];
