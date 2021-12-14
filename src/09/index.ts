import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  const grid = parseInput(inputPath);
  let riskScore = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const val = grid[r][c];
      const adjacent = getAdjacentIndexes(r, c, grid);
      const isLowest = adjacent.every((a) => grid[a[0]][a[1]] > val);
      if (isLowest) {
        riskScore += val + 1;
      }
    }
  }
  return riskScore;
}

export function runB(inputPath: string): any {}

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
