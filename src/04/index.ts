import { fileContents } from "../input";

export function runA(inputPath: string): any {
  const { draws, boards } = parseInput(inputPath);

  let winner: Board | void;
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    playRound(draw, boards);
    winner = findWinner(boards);
    if (winner) {
      const boardSum = sumOfUnmarked(winner);
      return boardSum * Number(draw);
    }
  }
}

export function runB(inputPath: string): any {
  const { draws, boards } = parseInput(inputPath);

  let remainingLosingBoards: Board[] = [];
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    playRound(draw, boards);
    scoreBoards(boards);
    const losingBoards = boards.filter((board) => !board.won);
    if (losingBoards.length === 0) {
      const boardSum = sumOfUnmarked(remainingLosingBoards[0]);
      return boardSum * Number(draw);
    }
    remainingLosingBoards = losingBoards;
  }
}

function sumOfUnmarked(board: Board): number {
  return board.positions.reduce((boardAcc, row) => {
    const rowSum = row.reduce((rowAcc, position) => {
      return rowAcc + (position.called ? 0 : Number(position.val));
    }, 0);
    return boardAcc + rowSum;
  }, 0);
}

function scoreBoards(boards: Board[]) {
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    if (isWinner(board)) {
      board.won = true;
    }
  }
}

function findWinner(boards: Board[]): Board | void {
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    if (isWinner(board)) {
      return board;
    }
  }
}

function isWinner(board: Board): boolean {
  // did we already figure out that this board is a winner?
  if (board.won) return true;

  // check for completed rows
  const hasRowComplete = board.positions.some(allPositionsComplete);
  if (hasRowComplete) return true;

  // check for completed columns
  let columns: Position[][] = [];
  for (let c = 0; c < board.positions[0].length; c++) {
    let columnPositions: Position[] = [];
    for (let r = 0; r < board.positions.length; r++) {
      columnPositions.push(board.positions[r][c]);
    }
    columns.push(columnPositions);
  }
  const hasColumnComplete = columns.some(allPositionsComplete);
  return hasColumnComplete;
}

function allPositionsComplete(row: Position[]): boolean {
  return row.every((row) => row.called === true);
}

function playRound(draw: number, boards: Board[]) {
  boards
    .filter((board) => !board.won)
    .forEach((board) => {
      for (let r = 0; r < board.positions[0].length; r++) {
        for (let c = 0; c < board.positions[0].length; c++) {
          const position = board.positions[r][c];
          if (position.val === draw) {
            board.positions[r][c] = { ...position, called: true };
          }
        }
      }
    });
}

function drawBoard(board: Board) {
  board.positions.forEach((row) => {
    console.log(
      row
        .map((row) => {
          const val = row.called ? "X" : row.val;
          return val.toString().padStart(2, " ");
        })
        .join(" ")
    );
  });
  console.log("\n");
}

function parseInput(inputPath: string): Input {
  const contents = fileContents(inputPath);
  const [rawDraws, ...rawBoards] = contents.split("\n\n");
  const draws = rawDraws.split(",").map(Number);
  const boards: Board[] = rawBoards.map((rawBoard) => {
    const boardLines = rawBoard.split("\n");
    const positions = boardLines.map((boardLine) =>
      boardLine
        .trim()
        .split(/ +/)
        .map((val) => ({ val: Number(val), called: false }))
    );

    return { positions, won: false };
  });

  return { draws, boards };
}

interface Input {
  draws: number[];
  boards: Board[];
}

type Board = { positions: Position[][]; won: boolean };
type Position = { val: number; called: boolean };
