import { useCallback } from 'react';
import { SnakeGame } from './snake-game';
import { type LevelResult } from '../utils/game-progress';

interface GamePageProps {
  level: 1 | 2 | 3 | 4 | 5;
  onComplete: (result: LevelResult) => void;
  onQuit: () => void;
}

export function GamePage({ level, onComplete, onQuit }: GamePageProps) {
  const handleLevelComplete = useCallback((result: {
    sentence: string;
    elapsedTime: number;
    penaltyTime: number;
  }) => {
    const levelResult: LevelResult = {
      level,
      sentence: result.sentence,
      elapsedTime: result.elapsedTime,
      penaltyTime: result.penaltyTime,
      totalTime: result.elapsedTime + result.penaltyTime
    };

    onComplete(levelResult);
  }, [level, onComplete]);

  return (
    <div className="w-full h-full">
      <SnakeGame
        level={level}
        onLevelComplete={handleLevelComplete}
        onQuit={onQuit}
      />
    </div>
  );
}
