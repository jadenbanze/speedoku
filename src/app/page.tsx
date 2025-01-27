'use client';

import dynamic from 'next/dynamic';
import { GameProvider } from '@/context/GameContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { HintsToggle } from '@/components/HintsToggle';

// Dynamically import components with ssr disabled
const SudokuBoard = dynamic(() => import('@/components/SudokuBoard'), {
  ssr: false
});

const NumberPad = dynamic(() => import('@/components/NumberPad'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center font-mono">
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
        <ThemeToggle />
      </div>
      <GameProvider>
        <>
          <HintsToggle />
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">speedoku</h1>
          <div className="flex flex-col items-center max-w-full">
            <SudokuBoard />
            <NumberPad />
          </div>
        </>
      </GameProvider>
    </main>
  );
}
