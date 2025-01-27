'use client';

import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Wand2 } from 'lucide-react';

export function GameControls() {
  const { startNewGame, solveGame } = useGame();

  return (
    <div className="flex gap-2 mt-4">
      <Button 
        variant="outline" 
        onClick={startNewGame}
        className="flex items-center gap-2"
      >
        <RefreshCcw className="h-4 w-4" />
        New Game
      </Button>
      <Button 
        variant="outline" 
        onClick={solveGame}
        className="flex items-center gap-2"
      >
        <Wand2 className="h-4 w-4" />
        Solve
      </Button>
    </div>
  );
} 