import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  const ocean: Ocean = new Map();
  const allLines = parseInput(inputPath);
  const lines = allLines.filter(isHortizontalOrVertical);
  lines.forEach((line) => addLineToOcean(line, ocean));
  const pointsWithOverlaps = calcOverlaps(ocean, 2);
  return pointsWithOverlaps.length;
}

export function runB(inputPath: string): any {
  const ocean: Ocean = new Map();
  const allLines = parseInput(inputPath);
  allLines.forEach((line) => addLineToOcean(line, ocean));
  const pointsWithOverlaps = calcOverlaps(ocean, 2);
  return pointsWithOverlaps.length;
}

function calcOverlaps(ocean: Ocean, maxOverlap: number): Point[] {
  return [...ocean.entries()]
    .filter(([pointKey, numOverlaps]) => numOverlaps >= maxOverlap)
    .map(([pointKey, numOverlaps]) => {
      return fromPointKey(pointKey);
    });
}

function addLineToOcean(line: Line, ocean: Ocean): void {
  const { p1, p2 } = line;
  if (p1.x === p2.x) {
    // horizontal line
    const startY = Math.min(p1.y, p2.y);
    const endY = Math.max(p1.y, p2.y);
    const x = p1.x;
    for (let y = startY; y <= endY; y++) {
      const point = pointKey({ x, y });
      markPoint(ocean, point);
    }
  } else if (p1.y === p2.y) {
    // vertical line
    const startX = Math.min(p1.x, p2.x);
    const endX = Math.max(p1.x, p2.x);
    const y = p1.y;
    for (let x = startX; x <= endX; x++) {
      const point = pointKey({ x, y });
      markPoint(ocean, point);
    }
  } else {
    // diagonal
    const deltaX = p1.x <= p2.x ? 1 : -1;
    const deltaY = p1.y <= p2.y ? 1 : -1;
    let curPoint = { x: p1.x, y: p1.y };
    markPoint(ocean, pointKey(curPoint));
    while (curPoint.x !== p2.x && curPoint.y !== p2.y) {
      curPoint = { x: (curPoint.x += deltaX), y: (curPoint.y += deltaY) };
      markPoint(ocean, pointKey(curPoint));
    }
  }
}

function markPoint(ocean: Ocean, point: string) {
  ocean.set(point, (ocean.get(point) ?? 0) + 1);
}

/**
1,1 -> 3,3
deltaX = 1
deltaY = 1
2,2
3,3

3,3 -> 1,1
deltaX = -1
deltaY = -1

2,2
1,1

5,5 -> 8,2
deltaX = 1
deltaY = -1
6,4
7,3
8,2

8,2 -> 5,5
deltaX = -1
deltaY = 1
7,3
6,4
5,5
 */

function isHortizontalOrVertical(line: Line): boolean {
  return line.p1.x === line.p2.x || line.p1.y === line.p2.y;
}

function parseInput(inputPath: string): Line[] {
  return linesToArray(inputPath)
    .map((rawLine) => rawLine.split(" -> "))
    .map((arrayPair) => {
      const p1 = arrayPair[0].split(",").map(Number);
      const p2 = arrayPair[1].split(",").map(Number);
      return {
        p1: { x: p1[0], y: p1[1] },
        p2: { x: p2[0], y: p2[1] },
      };
    });
}

function pointKey(point: Point): string {
  return `${point.x},${point.y}`;
}

function fromPointKey(pointKey: string): Point {
  const [x, y] = pointKey.split(",").map(Number);
  return { x, y };
}

interface Line {
  p1: Point;
  p2: Point;
}
interface Point {
  x: number;
  y: number;
}

type PointKey = string;
type Ocean = Map<PointKey, number>;
