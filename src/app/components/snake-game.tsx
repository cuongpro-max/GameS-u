import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { MiniMap } from './mini-map';
import { soundManager } from './sound-manager';

interface Level {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  name: string;
  quote: string;
  mechanic: 'normal' | 'moving_words' | 'accumulation' | 'opposing' | 'legacy';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    gradient: string[];
    primaryRgba: string;
  };
  sentence: string[];
  wrongWords: string[];
  distractorWords?: string[];
  requiresAccumulation?: boolean;
  accumulationCount?: number;
  hasOpposingWords?: boolean;
  poisonWords?: string[];
  hasZones?: boolean;
  isCircular?: boolean;
  disableWrap?: boolean;
  hasPatrolObstacles?: boolean;
  hasFogOfWar?: boolean;
  hasDecoys?: boolean;
}


const LEVELS: Level[] = [
  {
    number: 1,
    name: 'Thế Giới Quan',
    quote: 'Vật chất có trước, ý thức có sau.',
    mechanic: 'normal',
    colors: {
      primary: '#3498db',      // Bright blue
      secondary: '#5dade2',    // Light blue
      background: '#ebf5fb',   // Very light blue
      text: '#1a5490',         // Dark blue for text
      gradient: ['#3498db', '#5dade2'],
      primaryRgba: 'rgba(52, 152, 219, 1)'
    },
    sentence: ['Vật chất', 'có trước', 'ý thức', 'có sau'],
    wrongWords: ['Ý thức', 'có', 'trước', 'vật chất', 'sau']
  },
  {
    number: 2,
    name: 'Sự Vận Động',
    quote: 'Vận động là phương thức tồn tại của vật chất.',
    mechanic: 'moving_words',
    colors: {
      primary: '#4a90e2',
      secondary: '#ffffff',
      background: '#e8f4ff',
      text: '#2c5f8d',
      gradient: ['#4a90e2', '#64b5f6'],
      primaryRgba: 'rgba(74, 144, 226, 1)'
    },
    sentence: ['Vận động', 'là', 'phương thức', 'tồn tại', 'của vật chất'],
    wrongWords: ['Tĩnh tại', 'không phải', 'cách thức', 'biến mất', 'thuộc', 'ý thức'],
    distractorWords: ['mây', 'nước', 'đá', 'gió', 'lửa', 'cát', 'sương']
  },
  {
    number: 3,
    name: 'Lượng - Chất',
    quote: 'Tích lũy về lượng dẫn đến thay đổi về chất.',
    mechanic: 'accumulation',
    requiresAccumulation: true,
    accumulationCount: 2,  // Changed from 10 to 2
    colors: {
      primary: '#27ae60',
      secondary: '#2ecc71',
      background: '#e8f8f0',
      text: '#1e7e4a',
      gradient: ['#27ae60', '#2ecc71'],
      primaryRgba: 'rgba(39, 174, 96, 1)'
    },
    sentence: ['Tích lũy', 'về lượng', 'dẫn đến', 'thay đổi', 'về chất'],
    wrongWords: ['Giảm bớt', 'về chất', 'không liên quan', 'giữ nguyên', 'về lượng', 'phá hủy']
  },
  {
    number: 4,
    name: 'Mâu Thuẫn',
    quote: 'Mâu thuẫn là động lực của sự phát triển.',
    mechanic: 'opposing',
    hasOpposingWords: true,
    hasZones: true,
    colors: {
      primary: '#e74c3c',
      secondary: '#3498db',
      background: '#ffe8e6',
      text: '#8b1e0e',
      gradient: ['#e74c3c', '#ff6b6b'],
      primaryRgba: 'rgba(231, 76, 60, 1)'
    },
    sentence: ['Mâu thuẫn', 'là', 'động lực', 'của', 'sự phát triển'],
    wrongWords: ['Hòa hợp', 'không phải', 'trở ngại', 'cho', 'sự thoái hóa', 'cản trở'],
    poisonWords: ['đứng im', 'tĩnh tại', 'bất động', 'trì trệ']
  },
  {
    number: 5,
    name: 'Phủ Định',
    quote: 'Cái mới ra đời trên cơ sở kế thừa cái cũ.',
    mechanic: 'legacy',
    isCircular: true,
    disableWrap: true,
    colors: {
      primary: '#9b59b6',
      secondary: '#f39c12',
      background: '#f3e8ff',
      text: '#6c2b7a',
      gradient: ['#9b59b6', '#c084fc'],
      primaryRgba: 'rgba(155, 89, 182, 1)'
    },
    sentence: ['Cái mới', 'ra đời', 'trên cơ sở', 'kế thừa', 'cái cũ'],
    wrongWords: ['Cái cũ', 'biến mất', 'không liên quan', 'từ bỏ', 'hoàn toàn mới', 'phủ nhận']
  },
  {
    number: 6,
    name: 'Thực Tiễn',
    quote: 'Thực tiễn là tiêu chuẩn của chân lý.',
    mechanic: 'normal',
    hasFogOfWar: true,
    colors: {
      primary: '#4b0082', // Indigo/Deep Purple
      secondary: '#E6E6FA', // Lavender
      background: '#eebbfa',
      text: '#3a0063',
      gradient: ['#4b0082', '#8A2BE2'],
      primaryRgba: 'rgba(75, 0, 130, 1)'
    },
    sentence: ['Thực tiễn', 'là', 'tiêu chuẩn', 'của', 'chân lý'],
    wrongWords: ['Lý thuyết', 'ảo tưởng', 'suy đoán', 'lời nói', 'giả thuyết']
  },
  {
    number: 7,
    name: 'Bản Chất',
    quote: 'Bản chất quyết định hiện tượng.',
    mechanic: 'normal',
    hasDecoys: true,
    colors: {
      primary: '#00ced1', // Dark Turquoise
      secondary: '#40e0d0', // Turquoise
      background: '#e0ffff',
      text: '#008b8b',
      gradient: ['#00ced1', '#20b2aa'],
      primaryRgba: 'rgba(0, 206, 209, 1)'
    },
    sentence: ['Bản chất', 'quyết định', 'hiện tượng'],
    wrongWords: ['Hiện tượng', 'bề ngoài', 'ngẫu nhiên', 'thay thế', 'che giấu']
  },
  {
    number: 8,
    name: 'Tự Do',
    quote: 'Tự do là sự nhận thức được cái tất yếu.',
    mechanic: 'normal',
    disableWrap: false, // ENABLE WRAP for this level. 
    // Wait, by default disableWrap is undefined, which usually means "wrap" is disabled (die on wall) in standard snake?
    // Let's check logic: "if (wallCollisionEnabled) ... error".
    // I need to check where `wallCollisionEnabled` is set or used.
    hasPatrolObstacles: true,
    colors: {
      primary: '#ffd700', // Gold
      secondary: '#daa520', // Goldenrod
      background: '#fff8dc', // Cornsilk
      text: '#b8860b', // Dark Goldenrod
      gradient: ['#ffd700', '#ffa500'],
      primaryRgba: 'rgba(255, 215, 0, 1)'
    },
    sentence: ['Tự do', 'là', 'nhận thức', 'cái', 'tất yếu'],
    wrongWords: ['Tùy tiện', 'ngẫu hứng', 'bất chấp', 'vô kỉ luật', 'may rủi', 'bắt buộc']
  }
];


export interface Position {
  x: number;
  y: number;
}

export interface ConceptOrb {
  id: string;
  word: string;
  position: Position;
  isCorrect: boolean;
  shape: 'circle' | 'square' | 'triangle';
}

interface SnakeGameProps {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  onLevelComplete: (result: {
    sentence: string;
    elapsedTime: number;
    penaltyTime: number;
  }) => void;
  onQuit: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 28;  // Increased from 24 to 32 for better readability

// Dynamic game speed based on level
const getGameSpeed = (level: number, zone?: 'red' | 'blue') => {
  const baseSpeed = 200 - (level * 20); // Level 1: 180ms, Level 5: 100ms

  // Level 4: Speed varies by zone
  if (level === 4 && zone) {
    return zone === 'red' ? baseSpeed * 0.8 : baseSpeed * 1.2;
  }
  // Level 8: Faster speed for challenge
  if (level === 8) {
    return 100;
  }

  return baseSpeed;
};

export function SnakeGame({ level, onLevelComplete, onQuit }: SnakeGameProps) {
  const levelData = LEVELS[level - 1];
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [orbs, setOrbs] = useState<ConceptOrb[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'error'>('playing');
  const [errorMessage, setErrorMessage] = useState('');
  const [understanding, setUnderstanding] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const [ghostSnakes, setGhostSnakes] = useState<Position[][]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; color: string; id: string }[]>([]);
  const [trail, setTrail] = useState<Position[]>([]);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastMoveTime, setLastMoveTime] = useState(0);

  // New state for advanced mechanics
  const [obstacles, setObstacles] = useState<Position[]>([]); // Level 8 patrol obstacles
  const [accumulationOrbs, setAccumulationOrbs] = useState(0);
  const [chasingOrbs, setChasingOrbs] = useState<ConceptOrb[]>([]);
  const [currentZone, setCurrentZone] = useState<'red' | 'blue'>('red');
  const [legacyObstacles, setLegacyObstacles] = useState<Position[]>([]);
  const [wallCollisionEnabled, setWallCollisionEnabled] = useState(false);

  // Timer system for speedrun
  const [elapsedTime, setElapsedTime] = useState(0);  // in seconds
  const [penaltyTime, setPenaltyTime] = useState(0);  // penalty seconds
  const timerRef = useRef<number | undefined>(undefined);

  const directionRef = useRef(direction);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const comboTimeoutRef = useRef<number | undefined>(undefined);

  // Initialize orbs
  useEffect(() => {
    const nextWordIndex = collectedWords.length;
    if (nextWordIndex >= levelData.sentence.length) return;

    const newOrbs: ConceptOrb[] = [];
    const nextWord = levelData.sentence[nextWordIndex];

    // Level 3: Accumulation system - only show accumulation orbs if not enough collected
    if (level === 3 && levelData.requiresAccumulation) {
      const requiredCount = levelData.accumulationCount || 10;

      // If we haven't collected enough accumulation orbs for this word yet
      if (accumulationOrbs < requiredCount) {
        // Spawn small accumulation orbs
        for (let i = 0; i < 3; i++) {
          newOrbs.push({
            id: `accumulation-${i}-${Date.now()}`,
            word: '•',
            position: getRandomPosition(snake, newOrbs),
            isCorrect: true,
            shape: 'circle'
          });
        }
        setOrbs(newOrbs);
        return;
      }
      // If we have collected enough, reset counter and continue to spawn main word below
      // (counter will be reset when word is collected)
    }

    // Add correct word
    newOrbs.push({
      id: `correct-${nextWordIndex}`,
      word: nextWord,
      position: getRandomPosition(snake, []),
      isCorrect: true,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as any
    });

    // Add wrong words (varying by level)
    const numWrong = level === 1 ? 2 : level === 2 ? 3 : level === 3 ? 3 : level === 4 ? 4 : level >= 5 ? 5 : 5;

    // Level 7: Decoy system - Add fake copies of the CORRECT word
    if (level === 7 && levelData.hasDecoys) {
      for (let i = 0; i < 3; i++) {
        newOrbs.push({
          id: `decoy-${i}`,
          word: nextWord, // SAME as correct word!
          position: getRandomPosition(snake, newOrbs),
          isCorrect: false, // But technically WRONG
          shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as any
        });
      }
    }

    for (let i = 0; i < numWrong; i++) {
      const wrongWord = levelData.wrongWords[Math.floor(Math.random() * levelData.wrongWords.length)];
      newOrbs.push({
        id: `wrong-${i}`,
        word: wrongWord,
        position: getRandomPosition(snake, newOrbs),
        isCorrect: false,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as any
      });
    }

    // Level 2: Add distractor words
    if (level === 2 && levelData.distractorWords) {
      for (let i = 0; i < 3; i++) {
        const distractorWord = levelData.distractorWords[Math.floor(Math.random() * levelData.distractorWords.length)];
        newOrbs.push({
          id: `distractor-${i}`,
          word: distractorWord,
          position: getRandomPosition(snake, newOrbs),
          isCorrect: false,
          shape: 'triangle'
        });
      }
    }

    // Level 4: Initialize chasing poison words
    if (level === 4 && levelData.poisonWords && chasingOrbs.length === 0) {
      const newChasingOrbs: ConceptOrb[] = [];
      for (let i = 0; i < 2; i++) {
        const poisonWord = levelData.poisonWords[Math.floor(Math.random() * levelData.poisonWords.length)];
        newChasingOrbs.push({
          id: `poison-${i}`,
          word: poisonWord,
          position: getRandomPosition(snake, [...newOrbs, ...newChasingOrbs]),
          isCorrect: false,
          shape: 'square'
        });
      }
      setChasingOrbs(newChasingOrbs);
    }

    setOrbs(newOrbs);
  }, [collectedWords.length, level, accumulationOrbs]);

  // Move wrong orbs in level 2
  useEffect(() => {
    if (level !== 2) return;

    const interval = setInterval(() => {
      setOrbs(prevOrbs =>
        prevOrbs.map(orb => {
          if (!orb.isCorrect) {
            const directions = [
              { x: 1, y: 0 }, { x: -1, y: 0 },
              { x: 0, y: 1 }, { x: 0, y: -1 }
            ];
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const newX = Math.max(0, Math.min(GRID_SIZE - 1, orb.position.x + dir.x));
            const newY = Math.max(0, Math.min(GRID_SIZE - 1, orb.position.y + dir.y));
            return {
              ...orb,
              position: { x: newX, y: newY }
            };
          }
          return orb;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [level]);

  // Level 4: Chasing poison words
  useEffect(() => {
    if (level !== 4 || chasingOrbs.length === 0) return;

    const interval = setInterval(() => {
      setChasingOrbs(prevChasing =>
        prevChasing.map(orb => {
          const head = snake[0];
          if (!head) return orb;

          // Move towards snake head
          const dx = head.x - orb.position.x;
          const dy = head.y - orb.position.y;

          let newX = orb.position.x;
          let newY = orb.position.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 ? 1 : -1;
          } else {
            newY += dy > 0 ? 1 : -1;
          }

          newX = Math.max(0, Math.min(GRID_SIZE - 1, newX));
          newY = Math.max(0, Math.min(GRID_SIZE - 1, newY));

          return {
            ...orb,
            position: { x: newX, y: newY }
          };
        })
      );
    }, 800);

    return () => clearInterval(interval);
  }, [level, chasingOrbs.length, snake]);

  // Level 8: Initialize Patrol Obstacles
  useEffect(() => {
    if (level === 8 && levelData.hasPatrolObstacles) {
      const newObstacles: Position[] = [
        { x: 5, y: 5 }, { x: 15, y: 5 },
        { x: 5, y: 15 }, { x: 15, y: 15 },
        { x: 10, y: 10 }
      ];
      setObstacles(newObstacles);
    } else {
      setObstacles([]);
    }
  }, [level]);

  // Level 8: Move Patrol Obstacles
  useEffect(() => {
    if (level !== 8 || obstacles.length === 0) return;

    const interval = setInterval(() => {
      setObstacles(prev => prev.map((obs, idx) => {
        // Simple patrol pattern
        let newX = obs.x;
        let newY = obs.y;

        // Pattern: Move in a small square or line based on index
        const time = Date.now() / 1000;
        if (idx % 2 === 0) {
          // Horizontal patrol
          newX = obs.x + (Math.sin(time) > 0 ? 1 : -1);
        } else {
          // Vertical patrol
          newY = obs.y + (Math.cos(time) > 0 ? 1 : -1);
        }

        // Keep within bounds
        return {
          x: Math.max(0, Math.min(GRID_SIZE - 1, newX)),
          y: Math.max(0, Math.min(GRID_SIZE - 1, newY))
        };
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [level, obstacles.length]);

  // Timer system - count elapsed time continuously during gameplay
  useEffect(() => {
    // Only stop timer when game is completed
    if (gameState === 'completed') return;

    timerRef.current = window.setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  // Hint system - show after 5 seconds of no progress
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      if (gameState === 'playing' && collectedWords.length < levelData.sentence.length) {
        setShowHint(true);
      }
    }, 5000);

    return () => clearTimeout(hintTimer);
  }, [collectedWords.length, gameState]);

  // Background music
  useEffect(() => {
    if (soundEnabled) {
      soundManager.startBackgroundMusic(level);
    }
    return () => {
      soundManager.stopBackgroundMusic();
    };
  }, [level, soundEnabled]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      const currentDir = directionRef.current;

      if ((key === 'ArrowUp' || key === 'w' || key === 'W') && currentDir !== 'DOWN') {
        setDirection('UP');
        directionRef.current = 'UP';
      } else if ((key === 'ArrowDown' || key === 's' || key === 'S') && currentDir !== 'UP') {
        setDirection('DOWN');
        directionRef.current = 'DOWN';
      } else if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && currentDir !== 'RIGHT') {
        setDirection('LEFT');
        directionRef.current = 'LEFT';
      } else if ((key === 'ArrowRight' || key === 'd' || key === 'D') && currentDir !== 'LEFT') {
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const currentSpeed = getGameSpeed(level, currentZone);

    gameLoopRef.current = window.setInterval(() => {
      const now = Date.now();
      setLastMoveTime(now);

      setSnake(prevSnake => {
        const head = prevSnake[0];
        const dir = directionRef.current;

        let newHead: Position;
        switch (dir) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // Level 5: Wall collision (no wrap)
        if (level === 5 && levelData.disableWrap) {
          if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
            setGameState('error');
            setErrorMessage('Đụng tường!');
            if (soundEnabled) {
              soundManager.playWrongSound();
            }
            setTimeout(() => {
              setGameState('playing');
              setErrorMessage('');
            }, 1000);
            return prevSnake;
          }
        } else {
          // Wrap around for other levels
          if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
          if (newHead.x >= GRID_SIZE) newHead.x = 0;
          if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
          if (newHead.y >= GRID_SIZE) newHead.y = 0;
        }

        // Level 4: Zone detection
        if (level === 4 && levelData.hasZones) {
          const zoneX = newHead.x / GRID_SIZE;
          setCurrentZone(zoneX < 0.5 ? 'red' : 'blue');
        }

        // Add to trail
        setTrail(prev => [...prev.slice(-15), head]);

        // Check collision with self
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          return prevSnake;
        }

        // Check collision with legacy obstacles (Level 5)
        if (level === 5 && legacyObstacles.some(obstacle => obstacle.x === newHead.x && obstacle.y === newHead.y)) {
          setGameState('error');
          setErrorMessage('Đụng vật cản!');
          if (soundEnabled) {
            soundManager.playWrongSound();
          }
          setTimeout(() => {
            setGameState('playing');
            setErrorMessage('');
          }, 1000);
          return prevSnake;
        }

        // Level 8: Patrol Obstacles collision
        if (level === 8 && obstacles.some(obs => obs.x === newHead.x && obs.y === newHead.y)) {
          setGameState('error');
          setErrorMessage('Đụng chướng ngại (Tất yếu)!');
          if (soundEnabled) {
            soundManager.playWrongSound();
          }
          setTimeout(() => {
            setGameState('playing');
            setErrorMessage('');
          }, 1000);
          return prevSnake;
        }

        // Check collision with ghost snakes (level 3 - removed, now used for level 5)
        // Removed old Level 3 ghost snake logic

        // Check collision with orbs
        const hitOrb = orbs.find(orb =>
          orb.position.x === newHead.x && orb.position.y === newHead.y
        );

        // Check collision with chasing orbs (Level 4)
        const hitChasingOrb = chasingOrbs.find(orb =>
          orb.position.x === newHead.x && orb.position.y === newHead.y
        );

        if (hitOrb) {
          if (hitOrb.isCorrect) {
            // Level 3: Accumulation orb
            if (level === 3 && hitOrb.word === '•') {
              setAccumulationOrbs(prev => prev + 1);
              setShowRipple(true);
              setTimeout(() => setShowRipple(false), 300);

              if (soundEnabled) {
                soundManager.playCorrectSound();
              }

              return [newHead, ...prevSnake];
            }

            // Correct word - grow snake
            const newCollectedWords = [...collectedWords, hitOrb.word];
            setCollectedWords(newCollectedWords);
            setShowRipple(true);
            setShowHint(false);

            // Level 3: Reset accumulation counter for next word
            if (level === 3 && levelData.requiresAccumulation) {
              setAccumulationOrbs(0);
            }

            // Combo system
            setCombo(prev => prev + 1);
            setShowCombo(true);

            if (comboTimeoutRef.current) {
              clearTimeout(comboTimeoutRef.current);
            }
            comboTimeoutRef.current = window.setTimeout(() => {
              setShowCombo(false);
              setCombo(0);
            }, 2000);

            setTimeout(() => setShowRipple(false), 500);

            const newUnderstanding = Math.round((newCollectedWords.length / levelData.sentence.length) * 100);
            setUnderstanding(newUnderstanding);

            // Particles
            const particleX = newHead.x * CELL_SIZE + CELL_SIZE / 2;
            const particleY = newHead.y * CELL_SIZE + CELL_SIZE / 2;
            setParticles(prev => [...prev, {
              x: particleX,
              y: particleY,
              color: levelData.colors.primary,
              id: `particle-${Date.now()}`
            }]);
            setTimeout(() => {
              setParticles(prev => prev.slice(1));
            }, 1000);

            // Sound
            if (soundEnabled) {
              soundManager.playCorrectSound();
            }

            // Level 5: Add legacy obstacles when half sentence completed
            if (level === 5 && newCollectedWords.length === Math.ceil(levelData.sentence.length / 2)) {
              setLegacyObstacles([...prevSnake]);
            }

            // Check if level complete
            if (newCollectedWords.length === levelData.sentence.length) {
              setGameState('completed');
              if (soundEnabled) {
                soundManager.playCompleteSound();
              }
              const completeSentence = newCollectedWords.join(' ');
              setTimeout(() => {
                onLevelComplete({
                  sentence: completeSentence,
                  elapsedTime,
                  penaltyTime
                });
              }, 1500);
            }

            return [newHead, ...prevSnake];
          } else {
            // Wrong word - show error
            setGameState('error');
            setErrorMessage('Sự mâu thuẫn trong tư duy!');
            setCombo(0);
            setShowCombo(false);

            if (soundEnabled) {
              soundManager.playWrongSound();
            }

            // Level 4: Cut snake length by 50%
            if (level === 4) {
              const newLength = Math.max(1, Math.floor(prevSnake.length / 2));
              const cutSnake = prevSnake.slice(0, newLength);
              setTimeout(() => {
                setGameState('playing');
                setErrorMessage('');
              }, 1000);
              return cutSnake;
            }

            setTimeout(() => {
              setGameState('playing');
              setErrorMessage('');
            }, 1000);
            return prevSnake;
          }
        }

        // Check collision with chasing poison orbs (Level 4)
        if (hitChasingOrb) {
          setGameState('error');
          setErrorMessage('Bị từ độc đuổi kịp!');
          setCombo(0);
          setShowCombo(false);

          if (soundEnabled) {
            soundManager.playWrongSound();
          }

          // Cut snake length by 50%
          const newLength = Math.max(1, Math.floor(prevSnake.length / 2));
          const cutSnake = prevSnake.slice(0, newLength);

          setTimeout(() => {
            setGameState('playing');
            setErrorMessage('');
          }, 1000);
          return cutSnake;
        }

        // Normal movement
        let newSnake;
        if (level === 3) {
          // Level 3: Maintain current length (standard snake behavior) to allow growth
          // slice(0, -1) removes the tail, keeping length constant when moving
          newSnake = [newHead, ...prevSnake.slice(0, -1)];
          // Ensure at least length 1
          if (newSnake.length === 0) newSnake = [newHead];
        } else {
          // Other levels: Length strictly determined by collected words
          newSnake = [newHead, ...prevSnake.slice(0, collectedWords.length)];
        }
        return newSnake;
      });
    }, currentSpeed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, orbs, collectedWords, level, ghostSnakes, soundEnabled, currentZone]);

  // Reset on level change
  useEffect(() => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setCollectedWords([]);
    setGameState('playing');
    setUnderstanding(0);
    setGhostSnakes([]);
    setParticles([]);
    setTrail([]);
    setCombo(0);
    setShowCombo(false);
    setShowHint(false);

    // Reset new state variables
    setAccumulationOrbs(0);
    setChasingOrbs([]);
    setCurrentZone('red');
    setLegacyObstacles([]);
    setWallCollisionEnabled(levelData.disableWrap || false);
  }, [level]);

  function getRandomPosition(snake: Position[], existingOrbs: ConceptOrb[]): Position {
    let pos: Position;
    let attempts = 0;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      attempts++;
    } while (
      attempts < 100 &&
      (snake.some(s => s.x === pos.x && s.y === pos.y) ||
        existingOrbs.some(o => o.position.x === pos.x && o.position.y === pos.y))
    );
    return pos;
  }

  const renderShape = (orb: ConceptOrb, index: number) => {
    const baseStyle = {
      width: `${CELL_SIZE}px`,
      height: `${CELL_SIZE}px`,
      position: 'absolute' as const,
      left: `${orb.position.x * CELL_SIZE}px`,
      top: `${orb.position.y * CELL_SIZE}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '8px',
      fontWeight: 600,
      color: levelData.colors.text,
      cursor: 'default',
      userSelect: 'none' as const
    };

    const glowAnimation = orb.isCorrect ? {
      boxShadow: [
        `0 0 10px ${levelData.colors.primary}`,
        `0 0 20px ${levelData.colors.primary}, 0 0 30px ${levelData.colors.primary}80`,
        `0 0 10px ${levelData.colors.primary}`
      ]
    } : {};

    if (orb.shape === 'circle') {
      return (
        <motion.div
          key={orb.id}
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            ...glowAnimation
          }}
          transition={{
            scale: { delay: index * 0.1 },
            rotate: { delay: index * 0.1 },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
          style={{
            ...baseStyle,
            borderRadius: '50%',
            background: orb.isCorrect
              ? `linear-gradient(135deg, ${levelData.colors.gradient[0]}, ${levelData.colors.gradient[1]})`
              : 'linear-gradient(135deg, #ccc, #999)',
            border: `2px solid ${levelData.colors.text}`,
          }}
        >
          <span className="text-[7px] text-center leading-tight px-1 text-white font-bold">{orb.word}</span>
        </motion.div>
      );
    } else if (orb.shape === 'square') {
      return (
        <motion.div
          key={orb.id}
          initial={{ scale: 0, rotate: 180 }}
          animate={{
            scale: 1,
            rotate: 0,
            ...glowAnimation
          }}
          transition={{
            scale: { delay: index * 0.1 },
            rotate: { delay: index * 0.1 },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
          style={{
            ...baseStyle,
            background: orb.isCorrect
              ? `linear-gradient(135deg, ${levelData.colors.gradient[0]}, ${levelData.colors.gradient[1]})`
              : 'linear-gradient(135deg, #ccc, #999)',
            border: `2px solid ${levelData.colors.text}`,
          }}
        >
          <span className="text-[7px] text-center leading-tight px-1 text-white font-bold">{orb.word}</span>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          key={orb.id}
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{ delay: index * 0.1 }}
          style={{
            ...baseStyle,
            width: 0,
            height: 0,
            borderLeft: `${CELL_SIZE / 2}px solid transparent`,
            borderRight: `${CELL_SIZE / 2}px solid transparent`,
            borderBottom: `${CELL_SIZE}px solid ${orb.isCorrect ? levelData.colors.gradient[1] : '#999'}`,
            filter: orb.isCorrect ? `drop-shadow(0 0 10px ${levelData.colors.primary})` : 'none',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '4px'
          }}
        >
          <span
            className="text-[7px] text-center leading-tight text-white font-bold"
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${CELL_SIZE * 2}px`
            }}
          >
            {orb.word}
          </span>
        </motion.div>
      );
    }
  };

  const nextWord = levelData.sentence[collectedWords.length] || '';

  return (
    <div
      className="w-full h-full relative flex flex-col"
      style={{
        backgroundColor: levelData.colors.background,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,0,0,0.03) 29px, rgba(0,0,0,0.03) 31px),
          repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(0,0,0,0.03) 29px, rgba(0,0,0,0.03) 31px)
        `
      }}
    >
      {/* Hint System - Removed (component not implemented) */}

      {/* Combo System - Removed (component not implemented) */}

      {/* Status Bar */}
      <div
        className="px-8 py-6 border-b-2 flex items-center justify-between relative overflow-hidden"
        style={{
          backgroundColor: levelData.colors.secondary,
          borderColor: levelData.colors.text
        }}
      >
        {/* Animated background */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, ${levelData.colors.primary} 25%, transparent 25%, transparent 75%, ${levelData.colors.primary} 75%)`,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative z-10">
          <h2 className="text-2xl font-serif mb-1" style={{ color: levelData.colors.text }}>
            BẢN ĐỒ NHẬN THỨC - LEVEL {level}
          </h2>
          <p className="text-sm italic" style={{ color: levelData.colors.text, opacity: 0.7 }}>
            {levelData.name}
          </p>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          {/* Timer Display */}
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: levelData.colors.text }}>
              Thời gian
            </p>
            <motion.p
              className="text-3xl font-bold tabular-nums"
              style={{ color: levelData.colors.text }}
            >
              {Math.floor((elapsedTime + penaltyTime) / 60)}:{String((elapsedTime + penaltyTime) % 60).padStart(2, '0')}
            </motion.p>
            {penaltyTime > 0 && (
              <p className="text-xs text-red-600 font-medium mt-1">
                +{penaltyTime}s phạt
              </p>
            )}
          </div>

          {/* Quit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onQuit}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2"
            style={{
              borderColor: levelData.colors.text,
              color: levelData.colors.text
            }}
          >
            Menu
          </motion.button>

          {/* Sound toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full transition-all"
            style={{
              backgroundColor: soundEnabled ? levelData.colors.primary : '#ccc',
              color: '#fff'
            }}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>

          <div className="text-right">
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: levelData.colors.text }}>
              Mức độ thấu hiểu
            </p>
            <motion.p
              key={understanding}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold"
              style={{ color: levelData.colors.primary }}
            >
              {understanding}%
            </motion.p>
          </div>
        </div>
      </div>

      {/* Sentence Progress */}
      <div
        className="px-8 py-4 border-b flex flex-wrap gap-2 items-center min-h-[60px]"
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderColor: levelData.colors.text + '40'
        }}
      >
        <span className="text-sm font-medium" style={{ color: levelData.colors.text }}>
          Mục tiêu:
        </span>
        {levelData.sentence.map((word, index) => (
          <motion.span
            key={index}
            initial={false}
            animate={{
              backgroundColor: index < collectedWords.length
                ? levelData.colors.primaryRgba
                : levelData.colors.primaryRgba.replace('1)', '0)'),
              scale: index === collectedWords.length - 1 ? [1, 1.1, 1] : 1
            }}
            transition={{ scale: { duration: 0.3 } }}
            className="px-3 py-1 rounded transition-all"
            style={{
              color: index < collectedWords.length
                ? '#fff'
                : levelData.colors.text + '60',
              border: `1px solid ${levelData.colors.text}40`,
              fontWeight: index < collectedWords.length ? 600 : 400,
              boxShadow: index < collectedWords.length
                ? `0 2px 8px ${levelData.colors.primary}40`
                : 'none'
            }}
          >
            {index < collectedWords.length ? word : '......'}
          </motion.span>
        ))}
      </div>

      {/* Level 3: Accumulation Progress Indicator */}
      {level === 3 && levelData.requiresAccumulation && accumulationOrbs < (levelData.accumulationCount || 10) && (
        <div
          className="px-8 py-3 border-b flex items-center gap-3"
          style={{
            backgroundColor: levelData.colors.primary + '20',
            borderColor: levelData.colors.text + '40'
          }}
        >
          <span className="text-sm font-medium" style={{ color: levelData.colors.text }}>
            Tích lũy:
          </span>
          <div className="flex gap-1">
            {Array.from({ length: levelData.accumulationCount || 10 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border transition-all"
                style={{
                  backgroundColor: i < accumulationOrbs ? levelData.colors.primary : 'transparent',
                  borderColor: levelData.colors.text + '60',
                  transform: i < accumulationOrbs ? 'scale(1.1)' : 'scale(1)'
                }}
              />
            ))}
          </div>
          <span className="text-xs ml-2" style={{ color: levelData.colors.text + 'cc' }}>
            {accumulationOrbs}/{levelData.accumulationCount || 10}
          </span>
        </div>
      )}

      {/* Game Arena */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Level 4: Split zones (red/blue) */}
        {level === 4 && levelData.hasZones && (
          <div className="absolute inset-0 flex">
            <motion.div
              className="flex-1"
              animate={{ opacity: currentZone === 'red' ? [0.3, 0.4, 0.3] : [0.1, 0.15, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundColor: levelData.colors.primary }}
            />
            <motion.div
              className="flex-1"
              animate={{ opacity: currentZone === 'blue' ? [0.3, 0.4, 0.3] : [0.1, 0.15, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundColor: levelData.colors.secondary }}
            />
          </div>
        )}

        {/* Patrol Obstacles (Level 8) */}
        {level === 8 && obstacles.map((obstacle, index) => (
          <motion.div
            key={`obstacle-${index}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              left: `${obstacle.x * CELL_SIZE}px`,
              top: `${obstacle.y * CELL_SIZE}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              backgroundColor: '#b8860b',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '10px',
              boxShadow: '0 0 10px rgba(184, 134, 11, 0.6)'
            }}
          >
            ⚡
          </motion.div>
        ))}

        {/* Mini-map */}
        <div className="absolute top-24 right-4 z-20">
          <MiniMap
            snake={snake}
            orbs={orbs}
            gridSize={GRID_SIZE}
            color={levelData.colors.primary}
          />
        </div>

        <div
          className="relative"
          style={{
            width: `${GRID_SIZE * CELL_SIZE}px`,
            height: `${GRID_SIZE * CELL_SIZE}px`,
            border: `3px solid ${levelData.colors.text}`,
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 0 8px ${levelData.colors.primary}20`
          }}
        >
          {/* Trail effect */}
          {trail.map((pos, index) => (
            <div
              key={`trail-${index}`}
              style={{
                position: 'absolute',
                left: `${pos.x * CELL_SIZE}px`,
                top: `${pos.y * CELL_SIZE}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: levelData.colors.primary,
                opacity: (index / trail.length) * 0.2,
                borderRadius: '4px',
                pointerEvents: 'none'
              }}
            />
          ))}

          {/* Legacy obstacles (Level 5) */}
          {level === 5 && legacyObstacles.map((obstacle, index) => (
            <motion.div
              key={`legacy-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              style={{
                position: 'absolute',
                left: `${obstacle.x * CELL_SIZE}px`,
                top: `${obstacle.y * CELL_SIZE}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: levelData.colors.text,
                border: `2px solid ${levelData.colors.primary}`,
                borderRadius: '3px',
                boxShadow: `0 0 10px ${levelData.colors.primary}40`
              }}
            />
          ))}

          {/* Chasing poison orbs (Level 4) */}
          {level === 4 && chasingOrbs.map((orb, index) => (
            <motion.div
              key={orb.id}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{
                scale: { duration: 1, repeat: Infinity },
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' }
              }}
              style={{
                position: 'absolute',
                left: `${orb.position.x * CELL_SIZE}px`,
                top: `${orb.position.y * CELL_SIZE}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                background: `linear-gradient(135deg, #ff0000, #cc0000)`,
                border: '2px solid #000',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '7px',
                fontWeight: 700,
                color: '#fff',
                boxShadow: '0 0 15px rgba(255,0,0,0.8)',
                zIndex: 15
              }}
            >
              <span className="text-[6px] text-center leading-tight px-0.5">{orb.word}</span>
            </motion.div>
          ))}

          {/* Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={`snake-${index}`}
              animate={showRipple && index === 0 ? {
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                left: `${segment.x * CELL_SIZE}px`,
                top: `${segment.y * CELL_SIZE}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                background: index === 0
                  ? `linear-gradient(135deg, ${levelData.colors.gradient[0]}, ${levelData.colors.gradient[1]})`
                  : `linear-gradient(135deg, ${levelData.colors.text}, ${levelData.colors.text}dd)`,
                border: `2px solid ${levelData.colors.secondary}`,
                borderRadius: index === 0 ? '6px' : '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                fontWeight: 600,
                color: '#fff',
                zIndex: 10,
                boxShadow: index === 0
                  ? `0 0 20px ${levelData.colors.primary}80, inset 0 0 10px rgba(255,255,255,0.3)`
                  : `inset 0 0 5px rgba(255,255,255,0.2)`
              }}
            >
              {index === 0 && collectedWords.length > 0 && (
                <span className="text-[7px] text-center leading-tight px-0.5 drop-shadow-lg">
                  {collectedWords[collectedWords.length - 1]}
                </span>
              )}
              {index > 0 && index <= collectedWords.length && (
                <span className="text-[7px] text-center leading-tight px-0.5">
                  {collectedWords[collectedWords.length - index]}
                </span>
              )}
            </motion.div>
          ))}

          {/* Orbs */}
          {orbs.map((orb, index) => renderShape(orb, index))}

          {/* Particles - Removed (component not implemented) */}

          {/* Error overlay */}
          <AnimatePresence>
            {gameState === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(231, 76, 60, 0.4)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <motion.p
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: -20 }}
                  className="text-2xl font-bold px-6 py-3 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    color: '#fff',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                  }}
                >
                  {errorMessage}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion overlay */}
          <AnimatePresence>
            {gameState === 'completed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${levelData.colors.gradient[0]}ee, ${levelData.colors.gradient[1]}ee)`,
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="text-8xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4"
                    style={{ color: '#fff', textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
                  >
                    BƯỚC NHẢY!
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl italic px-8"
                    style={{ color: levelData.colors.secondary, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                  >
                    "{collectedWords.join(' ')}"
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-8 px-4 py-3 rounded-lg"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: `2px solid ${levelData.colors.text}40`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: levelData.colors.text }}>
            Điều khiển:
          </p>
          <div className="flex gap-1">
            {['↑', '←', '↓', '→'].map((arrow, i) => (
              <span
                key={i}
                className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold"
                style={{
                  backgroundColor: levelData.colors.primary + '20',
                  color: levelData.colors.text,
                  border: `1px solid ${levelData.colors.primary}40`
                }}
              >
                {arrow}
              </span>
            ))}
            <span className="mx-1 text-xs" style={{ color: levelData.colors.text }}>hoặc</span>
            {['W', 'A', 'S', 'D'].map((key, i) => (
              <span
                key={i}
                className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold"
                style={{
                  backgroundColor: levelData.colors.primary + '20',
                  color: levelData.colors.text,
                  border: `1px solid ${levelData.colors.primary}40`
                }}
              >
                {key}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}