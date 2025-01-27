'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { generateSudoku } from '@/utils/sudoku';

type GameContextType = {
  board: (number | null)[][];
  presetCells: boolean[][];
  selectedCell: [number, number] | null;
  setSelectedCell: (cell: [number, number] | null) => void;
  makeMove: (num: number) => void;
  startNewGame: () => void;
  isGameComplete: boolean;
  timer: number;
  clearCell: () => void;
  hintsEnabled: boolean;
  toggleHints: () => void;
  solution: (number | null)[][];
  setTimer: (value: number | ((prev: number) => number)) => void;
  solveGame: () => void;
};

const createEmptyBoard = () => Array(9).fill(null).map(() => Array(9).fill(null));
const createPresetCells = () => Array(9).fill(null).map(() => Array(9).fill(false));

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [solution, setSolution] = useState<(number | null)[][]>(createEmptyBoard());
  const [presetCells, setPresetCells] = useState(createPresetCells());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hintsEnabled, setHintsEnabled] = useState(false);

  const toggleHints = useCallback(() => {
    setHintsEnabled(prev => !prev);
  }, []);

  useEffect(() => {
    const { board: newBoard, preset: newPreset, solution: newSolution } = generateSudoku();
    setBoard(newBoard);
    setPresetCells(newPreset);
    setSolution(newSolution);
  }, []);

  const makeMove = useCallback((num: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    
    if (presetCells[row][col]) return;
    
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = num;
    setBoard(newBoard);
    
    const isComplete = newBoard.every(row => 
      row.every(cell => cell !== null)
    );
    if (isComplete) setIsGameComplete(true);
  }, [board, selectedCell, presetCells]);

  const startNewGame = useCallback(() => {
    const { board: newBoard, preset: newPreset, solution: newSolution } = generateSudoku();
    setBoard(newBoard);
    setPresetCells(newPreset);
    setSolution(newSolution);
    setSelectedCell(null);
    setIsGameComplete(false);
    setTimer(0);
  }, []);

  const clearCell = useCallback(() => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    
    if (presetCells[row][col]) return;
    
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = null;
    setBoard(newBoard);
  }, [board, selectedCell, presetCells]);

  const solveGame = useCallback(() => {
    setBoard(solution);
    setIsGameComplete(true);
  }, [solution]);

  return (
    <GameContext.Provider value={{
      board,
      presetCells,
      selectedCell,
      setSelectedCell,
      makeMove,
      startNewGame,
      isGameComplete,
      timer,
      clearCell,
      hintsEnabled,
      toggleHints,
      solution,
      setTimer,
      solveGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 