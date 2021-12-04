import { readFileSync } from "fs";

export function linesToArray(filePath: string): string[] {
  return readFileSync(filePath).toString().split("\n");
}

export function fileContents(filePath: string): string {
  return readFileSync(filePath).toString();
}

export function linesToNumberArray(filePath: string): number[] {
  return linesToArray(filePath).map(Number);
}
