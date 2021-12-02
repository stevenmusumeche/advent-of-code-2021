import { readFileSync } from "fs";

export function linesToArray(filePath: string): string[] {
  return readFileSync(filePath).toString().split("\n");
}

export function linesToNumberArray(filePath: string): number[] {
  return linesToArray(filePath).map(Number);
}
