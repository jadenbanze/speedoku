'use client';

import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Delete as Backspace } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NumberPad() {
  const { makeMove, selectedCell, clearCell } = useGame();

  const buttonClass = "aspect-square w-full text-base sm:text-xl flex items-center justify-center p-0";

  return (
    <div className="grid grid-cols-3 gap-2 mt-6 w-[280px] font-mono">
      <div className="col-span-3 grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => makeMove(num)}
            disabled={!selectedCell}
            variant="outline"
            className={buttonClass}
          >
            {num}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => clearCell()}
        disabled={!selectedCell}
        variant="destructive"
        className={cn(buttonClass, "col-span-3")}
      >
        <Backspace className="h-5 w-5" />
      </Button>
    </div>
  );
} 