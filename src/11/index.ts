import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  const grid = buildGridFromInput(inputPath);

  let numFlashes = 0;
  const NUM_ITERATIONS = 100;
  for (let it = 0; it < NUM_ITERATIONS; it++) {
    numFlashes += iterate(grid);
  }

  return numFlashes;
}

export function runB(inputPath: string): any {
  const grid = buildGridFromInput(inputPath);
  const gridSize = grid.length * grid[0].length;
  let numFlashes = 0;
  let iterations = 0;
  while (numFlashes !== gridSize) {
    iterations++;
    numFlashes = iterate(grid);
  }

  return iterations;
}

function buildGridFromInput(inputPath: string): Grid {
  return linesToArray(inputPath).map((x) =>
    x.split("").map((x) => ({ val: Number(x) }))
  );
}

function iterate(grid: Grid): number {
  // first increment everything by 1
  incrementGrid(grid);

  // add values to points adjacent to flashes
  let flashes = getFlashes(grid);
  return applyFlashes(grid, flashes);
}

function getAdjacentPoints(point: Point, grid: Grid): Point[] {
  const points: Point[] = [];
  const [r, c] = point;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newPoint: Point = [r + i, c + j];
      if ((i === 0 && j === 0) || !isOnGrid(newPoint, grid)) continue;
      points.push(newPoint);
    }
  }

  return points;
}

function isOnGrid(point: Point, grid: Grid) {
  const [r, c] = point;

  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
}

/**
 * Recursively apply flashes
 */
function applyFlashes(grid: Grid, flashes: Point[]): number {
  if (flashes.length === 0) return 0;

  const newFlashes: Point[] = [];
  flashes.forEach((flashPoint) => {
    const adjacentPoints = getAdjacentPoints(flashPoint, grid);
    adjacentPoints.forEach((point) => {
      const isFlash = maybeIncreasePoint(point, grid);
      if (isFlash) {
        newFlashes.push(point);
      }
    });
  });

  return flashes.length + applyFlashes(grid, newFlashes);
}

function getFlashes(grid: Grid): Point[] {
  const flashes: Point[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const element = grid[r][c];
      if (element.val === 0) {
        flashes.push([r, c]);
      }
    }
  }

  return flashes;
}

/**
 * Increase the value if it's not already a flash
 *
 * @return true if the new value is a flash
 */
function maybeIncreasePoint(point: Point, grid: Grid): boolean {
  const [r, c] = point;
  const element = grid[r][c];
  // if this is already a flash, don't increment it
  if (element.val === 0) return false;

  // increment the val
  grid[r][c] = { ...element, val: element.val === 9 ? 0 : element.val + 1 };

  // return true if the new val is a flash
  return grid[r][c].val === 0;
}

function incrementGrid(grid: Grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const element = grid[r][c];
      grid[r][c] = { ...element, val: element.val === 9 ? 0 : element.val + 1 };
    }
  }
}

function drawGrid(grid: Grid) {
  grid.forEach((row) => {
    console.log(
      row
        .map((row) => {
          return row.val;
        })
        .join(" ")
    );
  });
  console.log("\n");
}

type GridVal = { val: number };
type Grid = GridVal[][];
type Point = [number, number];
