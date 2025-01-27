'use client';

import { useGame } from '@/context/GameContext';
import { useEffect } from 'react';

export function Timer() {
  const { timer, setTimer, isGameComplete } = useGame();

  useEffect(() => {
    if (isGameComplete) return;
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameComplete, setTimer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-lg font-mono mb-4">
      {formatTime(timer)}
    </div>
  );
} 