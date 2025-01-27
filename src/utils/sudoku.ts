type Board = (number | null)[][];

export const createEmptyBoard = (): Board => {
  return Array(9).fill(null).map(() => Array(9).fill(null));
};

const createPresetCells = (): boolean[][] => {
  return Array(9).fill(null).map(() => Array(9).fill(false));
};

export const isValidMove = (
  board: Board,
  row: number,
  col: number,
  num: number
): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
};

export const generateSudoku = () => {
  const board = createEmptyBoard();
  const preset = createPresetCells();
  fillBoard(board);
  const solution = board.map(row => [...row]);
  removeNumbers(board, preset);
  return { board, preset, solution };
};

const fillBoard = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const removeNumbers = (board: Board, preset: boolean[][]): void => {
  const cellsToRemove = 45;
  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== null) {
      board[row][col] = null;
      preset[row][col] = false;
    } else {
      i--;
    }
  }
  // Mark remaining numbers as preset
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== null) {
        preset[row][col] = true;
      }
    }
  }
}; 