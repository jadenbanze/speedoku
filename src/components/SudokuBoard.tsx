'use client';

import { useGame } from '@/context/GameContext';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const SudokuBoard = () => {
  const { board, presetCells, selectedCell, setSelectedCell, makeMove, clearCell, hintsEnabled, solution } = useGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        makeMove(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        clearCell();
      } else if (e.key === 'ArrowUp' && selectedCell) {
        const [row, col] = selectedCell;
        if (row > 0) setSelectedCell([row - 1, col]);
      } else if (e.key === 'ArrowDown' && selectedCell) {
        const [row, col] = selectedCell;
        if (row < 8) setSelectedCell([row + 1, col]);
      } else if (e.key === 'ArrowLeft' && selectedCell) {
        const [row, col] = selectedCell;
        if (col > 0) setSelectedCell([row, col - 1]);
      } else if (e.key === 'ArrowRight' && selectedCell) {
        const [row, col] = selectedCell;
        if (col < 8) setSelectedCell([row, col + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, setSelectedCell, makeMove, clearCell]);

  const renderCell = (content: string | number | null, rowIndex: number, colIndex: number) => {
    const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
    const isInSameRow = selectedCell?.[0] === rowIndex;
    const isInSameColumn = selectedCell?.[1] === colIndex;
    const isInSameBox = selectedCell && 
      Math.floor(rowIndex / 3) === Math.floor(selectedCell[0] / 3) &&
      Math.floor(colIndex / 3) === Math.floor(selectedCell[1] / 3);
    const isPreset = presetCells[rowIndex][colIndex];
    const isCorrect = hintsEnabled && content && solution[rowIndex][colIndex] === content;
    const isWrong = hintsEnabled && content && solution[rowIndex][colIndex] !== content;
    
    return (
      <button
        key={`${rowIndex}-${colIndex}`}
        className={cn(
          "aspect-square w-8 sm:w-10 md:w-12 lg:w-14",
          "flex items-center justify-center",
          "text-sm sm:text-base md:text-lg font-mono",
          "transition-colors",
          "border-[0.5px] border-border/50",
          isPreset && "font-bold",
          isSelected && "bg-primary/20",
          isInSameRow && "bg-primary/5",
          isInSameColumn && "bg-primary/5",
          isInSameBox && "bg-primary/10",
          !isSelected && !isInSameRow && !isInSameColumn && !isInSameBox && "bg-background",
          (rowIndex + 1) % 3 === 0 && "border-b-2",
          (colIndex + 1) % 3 === 0 && "border-r-2",
          "hover:bg-primary/20",
          isCorrect && "text-green-500",
          isWrong && "text-red-500"
        )}
        onClick={() => setSelectedCell([rowIndex, colIndex])}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-9 gap-[1px] bg-border p-[1px] rounded-lg">
      {board.length ? (
        board.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            renderCell(cell || '', rowIndex, colIndex)
          )
        )
      ) : (
        Array(81).fill('').map((_, index) =>
          renderCell('', Math.floor(index / 9), index % 9)
        )
      )}
    </div>
  );
};

export default SudokuBoard; 