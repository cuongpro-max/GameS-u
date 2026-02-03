import { useState, useEffect } from 'react';
import { CoverPage } from '@/app/components/cover-page';
import { LevelMenu } from '@/app/components/level-menu';
import { GamePage } from '@/app/components/game-page';
import { LevelSummary } from '@/app/components/level-summary';
import {
  loadProgress,
  saveProgress,
  unlockNextLevel,
  updateLevelStats,
  type GameProgress,
  type LevelResult
} from '@/app/utils/game-progress';

type Page = 'cover' | 'menu' | 'game' | 'summary';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('cover');
  // Always start fresh - no localStorage persistence
  const [progress, setProgress] = useState<GameProgress>({
    unlockedLevels: [1],
    levelStats: {}
  });
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
  const [lastResult, setLastResult] = useState<LevelResult | null>(null);

  // Progress is not saved to localStorage - resets on each reload

  const handleStartGame = () => {
    setCurrentPage('menu');
  };

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
    setCurrentPage('game');
  };

  const handleLevelComplete = (result: LevelResult) => {
    setLastResult(result);

    // Update progress
    let newProgress = updateLevelStats(progress, result.level, result.totalTime);
    newProgress = unlockNextLevel(newProgress, result.level);
    setProgress(newProgress);

    setCurrentPage('summary');
  };

  const handleReplay = () => {
    if (lastResult) {
      setSelectedLevel(lastResult.level as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
      setCurrentPage('game');
    }
  };

  const handleNextLevel = () => {
    if (lastResult && lastResult.level < 8) {
      setSelectedLevel((lastResult.level + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
      setCurrentPage('game');
    }
  };

  const handleBackToMenu = () => {
    setCurrentPage('menu');
  };

  const handleBackToCover = () => {
    setCurrentPage('cover');
  };

  const handleQuitGame = () => {
    setCurrentPage('menu');
  };

  // Check if new record
  const isNewRecord = lastResult
    ? !progress.levelStats[lastResult.level] ||
    lastResult.totalTime < progress.levelStats[lastResult.level].bestTime
    : false;

  return (
    <div className="w-full h-screen overflow-auto">
      {currentPage === 'cover' && <CoverPage onStart={handleStartGame} />}

      {currentPage === 'menu' && (
        <LevelMenu
          unlockedLevels={progress.unlockedLevels}
          levelStats={progress.levelStats}
          onSelectLevel={handleSelectLevel}
          onBackToCover={handleBackToCover}
        />
      )}

      {currentPage === 'game' && (
        <GamePage
          level={selectedLevel}
          onComplete={handleLevelComplete}
          onQuit={handleQuitGame}
        />
      )}

      {currentPage === 'summary' && lastResult && (
        <LevelSummary
          level={lastResult.level as 1 | 2 | 3 | 4 | 5}
          completedSentence={lastResult.sentence}
          elapsedTime={lastResult.elapsedTime}
          penaltyTime={lastResult.penaltyTime}
          isNewRecord={isNewRecord}
          onReplay={handleReplay}
          onNextLevel={lastResult.level < 5 ? handleNextLevel : undefined}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
