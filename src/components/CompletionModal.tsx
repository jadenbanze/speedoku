'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';

export function CompletionModal() {
  const { isGameComplete, timer, startNewGame } = useGame();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <Dialog open={isGameComplete} modal>
      <DialogContent className="border border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75" hideClose>
        <DialogHeader>
          <DialogTitle className="text-xl">Congratulations! 🎉</DialogTitle>
          <DialogDescription className="text-lg">
            You completed the puzzle in {formatTime(timer)}!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={startNewGame}>Play Again</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 