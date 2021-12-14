import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  const grid = parseInput(inputPath);
  const lowPoints = findLowPoints(grid);
  return lowPoints.reduce((acc, cur) => {
    return (acc += grid[cur[0]][cur[1]].val + 1);
  }, 0);
}

export function runB(inputPath: string): any {
  const grid = parseInput(inputPath);
  const lowPoints = findLowPoints(grid);
  const basinSizes = lowPoints
    .map((lowPoint) => explore(lowPoint, grid))
    .sort((a, b) => b - a);
  const threeLargestBasinSizes = basinSizes.splice(0, 3);
  return threeLargestBasinSizes.reduce((acc, cur) => {
    return cur * acc;
  }, 1);
}

function explore(point: Point, grid: Grid) {
  grid[point[0]][point[1]].visited = true;
  let basinSize = 1;

  const right: Point = [point[0], point[1] + 1];
  if (isAllowed(right, grid)) {
    basinSize += explore(right, grid);
  }

  const down: Point = [point[0] + 1, point[1]];
  if (isAllowed(down, grid)) {
    basinSize += explore(down, grid);
  }

  const left: Point = [point[0], point[1] - 1];
  if (isAllowed(left, grid)) {
    basinSize += explore(left, grid);
  }

  const up: Point = [point[0] - 1, point[1]];
  if (isAllowed(up, grid)) {
    basinSize += explore(up, grid);
  }

  return basinSize;
}

function isAllowed(point: Point, grid: Grid) {
  return (
    point[0] < grid.length &&
    point[0] >= 0 &&
    point[1] < grid[0].length &&
    point[1] >= 0 &&
    grid[point[0]][point[1]].visited == false &&
    grid[point[0]][point[1]].val !== 9
  );
}

function findLowPoints(grid: Grid): Point[] {
  const lowPoints: Point[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const val = grid[r][c].val;
      const adjacent = getAdjacentValues(r, c, grid);
      const isLowest = adjacent.every((a) => a > val);
      if (isLowest) {
        lowPoints.push([r, c]);
      }
    }
  }

  return lowPoints;
}

function getAdjacentValues(row: number, col: number, grid: Grid): number[] {
  const points = getAdjacentIndexes(row, col, grid);
  return points.map((point) => grid[point[0]][point[1]].val);
}

function getAdjacentIndexes(row: number, col: number, grid: Grid): Point[] {
  const potentialPoints: Point[] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  return potentialPoints.filter((point) => {
    return (
      point[0] >= 0 &&
      point[0] < grid.length &&
      point[1] >= 0 &&
      point[1] < grid[0].length
    );
  });
}

function parseInput(inputPath: string): Grid {
  const lines = linesToArray(inputPath);

  return lines.map((line) =>
    line.split("").map((x) => ({ val: Number(x), visited: false }))
  );
}

type GridVal = { val: number; visited: boolean };
type Grid = GridVal[][];
type Point = [number, number];
