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
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        shuffleArray(numbers);
        for (let num of numbers) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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