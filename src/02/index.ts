import { linesToArray } from "../input";

export function runA(inputPath: string): any {
  let position: Position = { horizontal: 0, depth: 0 };
  const commands = getCommands(inputPath);
  commands.forEach((command) => {
    position = move(position, command);
  });

  return position.depth * position.horizontal;
}

export function runB(inputPath: string): any {
  let position: PositionB = { horizontal: 0, depth: 0, aim: 0 };
  const commands = getCommands(inputPath);
  commands.forEach((command) => {
    position = moveB(position, command);
  });

  return position.depth * position.horizontal;
}

function getCommands(inputPath: string): Command[] {
  const lines = linesToArray(inputPath);
  return lines.map(mapToCommand);
}

function mapToCommand(line: string): Command {
  const [direction, val] = line.split(" ");
  return { direction: direction as Direction, val: Number(val) };
}

type Direction = "forward" | "down" | "up";
interface Command {
  direction: Direction;
  val: number;
}
interface Position {
  horizontal: number;
  depth: number;
}
interface PositionB {
  horizontal: number;
  depth: number;
  aim: number;
}

function move(position: Position, command: Command): Position {
  switch (command.direction) {
    case "down":
      return { ...position, depth: position.depth + command.val };
    case "up":
      return { ...position, depth: position.depth - command.val };
    case "forward":
      return { ...position, horizontal: position.horizontal + command.val };
  }
}

function moveB(position: PositionB, command: Command): PositionB {
  switch (command.direction) {
    case "down":
      return { ...position, aim: position.aim + command.val };
    case "up":
      return { ...position, aim: position.aim - command.val };
    case "forward":
      return {
        ...position,
        horizontal: position.horizontal + command.val,
        depth: position.depth + position.aim * command.val,
      };
  }
}
