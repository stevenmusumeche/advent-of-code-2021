import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  const grid = parseInput(inputPath);
  const lowPoints = findLowPoints(grid);
  return lowPoints.reduce((acc, cur) => {
    return (acc += grid[cur[0]][cur[1]] + 1);
  }, 0);
}

export function runB(inputPath: string): any {}

function findLowPoints(grid: Grid): Point[] {
  const lowPoints: Point[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const val = grid[r][c];
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
  return points.map((point) => grid[point[0]][point[1]]);
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

  return lines.map((line) => line.split("").map(Number));
}

type Grid = number[][];
type Point = [number, number];
