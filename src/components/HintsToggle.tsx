'use client';

import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export function HintsToggle() {
  const { hintsEnabled, toggleHints } = useGame();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleHints}
      className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8"
    >
      {hintsEnabled ? (
        <Eye className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <EyeOff className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle hints</span>
    </Button>
  );
} 