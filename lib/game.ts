export type Player = "X" | "O";
export type Cell = Player | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export type Result = { winner: Player | null; line: number[] | null };

/** Returns null while the game is still in progress. */
export function getResult(board: Cell[]): Result | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return board.every(Boolean) ? { winner: null, line: null } : null;
}
