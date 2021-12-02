# Advent of Code 2021 Solutions

This is my (probably poor) attempt to solve the Advent of Code 2021 puzzles using TypeScript.

## Solving a problem

Create a directory within `src` corresponding to the day number, for example `src/08` corresponding to Day 8. Within that directory, create an `index.ts` which should export two functions - `runA(inputFilePath: string): any` and `runB(inputFilePath: string): any` that solve problems A and B.

## Debugging in VS Code

Debug using VS Code's interactive debugger by modifying the `--day` and `--problem` args within `.vscode/launch.json` then launching the `Debug` action.

## Running from CLI

Run via the command line. Modify the `--day` and `--problem` flags to run a specific problem.

```bash
yarn go --day 1 --problem a
```
