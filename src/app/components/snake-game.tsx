import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { MiniMap } from './mini-map';
import { soundManager } from './sound-manager';
import { ComboSystem } from './combo-system';
import { ParticleEffect } from './particle-effect';
import level2Img from '../../../image/Level 2.png';
import level5Img from '../../../image/Level 5.png';
import level6Img from '../../../image/Level 6.png';

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
  imageUrl: string;
  mechanicExplanation: string;
}


const LEVELS: Level[] = [
  {
    number: 1,
    name: 'Khái Niệm Dân Tộc',
    quote: 'Dân tộc là cộng đồng người ổn định làm thành nhân dân một nước.',
    mechanic: 'normal',
    colors: {
      primary: '#3498db',
      secondary: '#5dade2',
      background: '#ebf5fb',
      text: '#1a5490',
      gradient: ['#3498db', '#5dade2'],
      primaryRgba: 'rgba(52, 152, 219, 1)'
    },
    sentence: ['Dân tộc', 'là', 'cộng đồng', 'người', 'ổn định', 'nhân dân', 'một nước'],
    wrongWords: ['Sắc tộc', 'Chủng tộc', 'Bộ lạc', 'Bộ tộc', 'Đám đông'],
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80',
    mechanicExplanation: 'Cơ chế cơ bản để bạn làm quen với việc điều khiển sâu và ăn các khái niệm dân tộc theo trật tự đúng.'
  },
  {
    number: 2,
    name: 'Hai Xu Hướng Dân Tộc',
    quote: 'Xu hướng tách ra độc lập và xu hướng liên hiệp các dân tộc.',
    mechanic: 'moving_words',
    colors: {
      primary: '#4a90e2',
      secondary: '#ffffff',
      background: '#e8f4ff',
      text: '#2c5f8d',
      gradient: ['#4a90e2', '#64b5f6'],
      primaryRgba: 'rgba(74, 144, 226, 1)'
    },
    sentence: ['Xu hướng', 'tách ra', 'độc lập', 'và', 'xu hướng', 'liên hiệp', 'các dân tộc'],
    wrongWords: ['Đồng hóa', 'Bán nước', 'Chia rẽ', 'Cực đoan', 'Cô lập'],
    distractorWords: ['kinh tế', 'văn hóa', 'địa lý', 'lịch sử', 'xã hội'],
    imageUrl: level2Img,
    mechanicExplanation: 'Từ khóa di chuyển liên tục tượng trưng cho dòng chảy khách quan của hai xu hướng tách ra tự quyết và liên hiệp các dân tộc.'
  },
  {
    number: 3,
    name: 'Nguyên Nhân Tồn Tại Tôn Giáo',
    quote: 'Tôn giáo tồn tại do nhận thức và tâm lý chưa đồng đều.',
    mechanic: 'accumulation',
    requiresAccumulation: true,
    accumulationCount: 2,
    colors: {
      primary: '#27ae60',
      secondary: '#2ecc71',
      background: '#e8f8f0',
      text: '#1e7e4a',
      gradient: ['#27ae60', '#2ecc71'],
      primaryRgba: 'rgba(39, 174, 96, 1)'
    },
    sentence: ['Tôn giáo', 'tồn tại', 'do nhận thức', 'và', 'tâm lý', 'chưa đồng đều'],
    wrongWords: ['Biến mất', 'Bị cấm', 'Bắt buộc', 'Đồng bộ', 'Nhất quán'],
    imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&auto=format&fit=crop&q=80',
    mechanicExplanation: 'Ăn các hạt tích lũy (•) đại diện cho sự thay đổi về lượng trong nhận thức và kinh tế xã hội trước khi hình thành nên từ khóa chính.'
  },
  {
    number: 4,
    name: 'Đức Tin Và Chính Trị',
    quote: 'Phân biệt rõ hai mặt chính trị và tư tưởng trong tôn giáo.',
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
    sentence: ['Phân biệt', 'rõ', 'hai mặt', 'chính trị', 'và', 'tư tưởng'],
    wrongWords: ['Đồng nhất', 'Hòa lẫn', 'Đánh đồng', 'Bỏ qua', 'Áp đặt'],
    poisonWords: ['ly khai', 'chia rẽ', 'kích động', 'thù hận'],
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    mechanicExplanation: 'Đấu trường chia làm 2 vùng đối lập (đỏ/xanh) đại diện cho mặt chính trị và mặt tư tưởng. Tránh các từ độc đuổi theo đại diện cho thế lực phản động cực đoan chia rẽ.'
  },
  {
    number: 5,
    name: 'Cương Lĩnh Dân Tộc',
    quote: 'Các dân tộc hoàn toàn bình đẳng và có quyền tự quyết.',
    mechanic: 'legacy',
    isCircular: true,
    disableWrap: true,
    colors: {
      primary: '#9b59b6',
      secondary: '#f39c12',
      background: '#f4ecf7',
      text: '#6c2b7a',
      gradient: ['#9b59b6', '#c084fc'],
      primaryRgba: 'rgba(155, 89, 182, 1)'
    },
    sentence: ['Các dân tộc', 'hoàn toàn', 'bình đẳng', 'và', 'có quyền', 'tự quyết'],
    wrongWords: ['Đặc quyền', 'Áp bức', 'Lệ thuộc', 'Phân biệt', 'Cai trị'],
    imageUrl: level5Img,
    mechanicExplanation: 'Các vật cản xuất hiện tại vị trí cũ của sâu đại diện cho tính kế thừa biện chứng và sự phủ định có chắt lọc trong quá trình lịch sử.'
  },
  {
    number: 6,
    name: 'Bản Chất Tôn Giáo',
    quote: 'Tôn giáo là hình thái ý thức phản ánh hư ảo hiện thực.',
    mechanic: 'normal',
    hasFogOfWar: true,
    colors: {
      primary: '#4b0082',
      secondary: '#E6E6FA',
      background: '#eebbfa',
      text: '#3a0063',
      gradient: ['#4b0082', '#8A2BE2'],
      primaryRgba: 'rgba(75, 0, 130, 1)'
    },
    sentence: ['Tôn giáo', 'là', 'hình thái', 'ý thức', 'phản ánh', 'hư ảo', 'hiện thực'],
    wrongWords: ['Khoa học', 'Duy vật', 'Thực tế', 'Chân lý', 'Biện chứng'],
    imageUrl: level6Img,
    mechanicExplanation: 'Sương mù che khuất tầm nhìn (Fog of War) tượng trưng cho tính chất hư ảo và chủ quan của ý thức tôn giáo khi chưa được soi sáng bởi khoa học.'
  },
  {
    number: 7,
    name: 'Đặc Điểm Tôn Giáo',
    quote: 'Tôn giáo có tính lịch sử, quần chúng và tính chính trị.',
    mechanic: 'normal',
    hasDecoys: true,
    colors: {
      primary: '#00ced1',
      secondary: '#40e0d0',
      background: '#e0ffff',
      text: '#008b8b',
      gradient: ['#00ced1', '#20b2aa'],
      primaryRgba: 'rgba(0, 206, 209, 1)'
    },
    sentence: ['Tôn giáo', 'có', 'tính lịch sử', 'quần chúng', 'và', 'chính trị'],
    wrongWords: ['Vĩnh hằng', 'Cá biệt', 'Vô hại', 'Bất biến', 'Trung lập'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    mechanicExplanation: 'Các từ giả mạo (Decoys) xuất hiện tràn ngập đại diện cho sự biến tướng, mê tín dị đoan dễ nhầm lẫn với bản chất tinh thần quần chúng.'
  },
  {
    number: 8,
    name: 'Chính Sách Tôn Giáo',
    quote: 'Bảo đảm tự do tín ngưỡng và nghiêm cấm lợi dụng tôn giáo.',
    mechanic: 'normal',
    disableWrap: false,
    hasPatrolObstacles: true,
    colors: {
      primary: '#ffd700',
      secondary: '#daa520',
      background: '#fff8dc',
      text: '#b8860b',
      gradient: ['#ffd700', '#ffa500'],
      primaryRgba: 'rgba(255, 215, 0, 1)'
    },
    sentence: ['Bảo đảm', 'tự do', 'tín ngưỡng', 'và', 'nghiêm cấm', 'lợi dụng', 'tôn giáo'],
    wrongWords: ['Cấm đoán', 'Áp đặt', 'Chia rẽ', 'Kích động', 'Mê tín'],
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    mechanicExplanation: 'Các chướng ngại vật di chuyển tuần tra tượng trưng cho khuôn khổ pháp luật của Nhà nước (Cái tất yếu). Đi lại tự do nhưng phải tuân thủ kỷ cương pháp luật.'
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

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Record<number, QuizQuestion[]> = {
  1: [
    {
      question: "Dân tộc theo nghĩa rộng (Nation) chỉ khái niệm nào?",
      options: [
        "Cộng đồng tộc người thành phần",
        "Quốc gia - dân tộc độc lập có lãnh thổ và nền kinh tế thống nhất",
        "Một liên minh tôn giáo quốc tế",
        "Hình thức cộng đồng thời nguyên thủy"
      ],
      correctIndex: 1,
      explanation: "Nghĩa rộng chỉ quốc gia - dân tộc độc lập có lãnh thổ và nền kinh tế thống nhất."
    }
  ],
  2: [
    {
      question: "Hai xu hướng phát triển khách quan của dân tộc gồm xu hướng nào?",
      options: [
        "Đồng hóa dân tộc và cô lập dân tộc",
        "Tách ra tự quyết thành lập quốc gia độc lập và liên hiệp các dân tộc lại",
        "Áp bức dân tộc và giải phóng dân tộc đơn độc",
        "Hòa hợp tôn giáo và phân tách quốc gia"
      ],
      correctIndex: 1,
      explanation: "Hai xu hướng khách quan gồm: Xu hướng tách ra tự quyết và xu hướng liên hiệp các dân tộc."
    }
  ],
  3: [
    {
      question: "Nguyên nhân nhận thức nào làm tôn giáo vẫn tồn tại trong thời kỳ quá độ?",
      options: [
        "Khoa học chưa giải thích được mọi hiện tượng, trình độ dân trí chưa đồng đều",
        "Sự sợ hãi trước sức mạnh giai cấp thống trị",
        "Sự áp đặt của Hiến pháp cách mạng",
        "Đức tin tôn giáo là tuyệt đối đúng đắn"
      ],
      correctIndex: 0,
      explanation: "Tôn giáo tồn tại do nhận thức của con người chưa đồng đều và khoa học chưa giải thích được hết các hiện tượng xã hội/tự nhiên."
    }
  ],
  4: [
    {
      question: "Mặt chính trị trong giải quyết vấn đề tôn giáo phản ánh điều gì?",
      options: [
        "Sự khác biệt về đức tin và nhận thức giữa người đạo và không đạo",
        "Sự lợi dụng tôn giáo của thế lực phản động chống phá cách mạng",
        "Tính lịch sử lâu đời của các đức tin lành mạnh",
        "Nguyên tắc tự do tín ngưỡng của người dân"
      ],
      correctIndex: 1,
      explanation: "Mặt chính trị phản ánh sự lợi dụng tôn giáo của các thế lực phản động để chống phá cách mạng, đây là mâu thuẫn đối kháng."
    }
  ],
  5: [
    {
      question: "Ba nội dung cốt lõi của Cương lĩnh dân tộc do Lênin soạn thảo là gì?",
      options: [
        "Bình đẳng dân tộc; Tự quyết dân tộc; Liên hiệp công nhân tất cả các dân tộc",
        "Đồng hóa các tộc người; Giải tán bộ lạc; Xây dựng quốc gia đơn nhất",
        "Ưu tiên dân tộc đa số; Bảo tồn biệt lập; Tự do buôn bán biên giới",
        "Giải quyết áp bức; Phân chia vùng kinh tế; Bài trừ tôn giáo ngoại lai"
      ],
      correctIndex: 0,
      explanation: "Cương lĩnh dân tộc gồm: Các dân tộc hoàn toàn bình đẳng; Các dân tộc được quyền tự quyết; Liên hiệp công nhân tất cả các dân tộc."
    }
  ],
  6: [
    {
      question: "Theo quan điểm duy vật biện chứng, bản chất tôn giáo phản ánh hiện thực như thế nào?",
      options: [
        "Là sự phản ánh chân thực và khoa học thế giới tự nhiên",
        "Là hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan vào đầu óc con người",
        "Là một chân lý tối cao do thần thánh ban tặng",
        "Là kết quả tất yếu của sự phát triển kinh tế thị trường"
      ],
      correctIndex: 1,
      explanation: "Bản chất tôn giáo là một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan vào đầu óc con người."
    }
  ],
  7: [
    {
      question: "Tôn giáo có những đặc điểm cơ bản nào sau đây?",
      options: [
        "Tính vĩnh hằng, tính độc lập, tính phi chính trị",
        "Tính lịch sử, tính quần chúng, tính chính trị",
        "Tính kinh tế, tính hiện đại, tính thực dụng",
        "Tính ngẫu nhiên, tính nhất thời, tính bất biến"
      ],
      correctIndex: 1,
      explanation: "Ba đặc điểm tôn giáo: Tính lịch sử (tồn tại có giới hạn), Tính quần chúng (nhu cầu số đông), Tính chính trị (phản ánh lợi ích giai cấp)."
    }
  ],
  8: [
    {
      question: "Nội dung nghiêm cấm nào được nhấn mạnh trong chính sách tôn giáo của Việt Nam?",
      options: [
        "Cấm tự do đi lễ nhà thờ hoặc chùa chiền",
        "Nghiêm cấm lợi dụng tôn giáo để chia rẽ khối đại đoàn kết dân tộc hoặc vi phạm pháp luật",
        "Cấm truyền bá các tư tưởng đạo đức lành mạnh",
        "Cấm người có đạo tham gia vào bộ máy Nhà nước"
      ],
      correctIndex: 1,
      explanation: "Việt Nam bảo đảm tự do tín ngưỡng nhưng nghiêm cấm các hành vi lợi dụng tôn giáo để chống phá hoặc vi phạm pháp luật."
    }
  ]
};

export function SnakeGame({ level, onLevelComplete, onQuit }: SnakeGameProps) {
  const levelData = LEVELS[level - 1];
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [orbs, setOrbs] = useState<ConceptOrb[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'error' | 'quiz'>('playing');
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

  // Mobile and responsive states
  const [boardScale, setBoardScale] = useState<number>(1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    const updateScale = () => {
      const boardWidth = GRID_SIZE * CELL_SIZE; // e.g. 560
      // On mobile, reserve space for: status bar ~48px, sentence progress ~36px, d-pad ~120px, gap ~16px
      const reservedHeight = isTouch ? 220 : 80;
      const availableWidth = window.innerWidth - 24; // 12px padding on each side
      const availableHeight = window.innerHeight - reservedHeight;
      const scaleByWidth = availableWidth < boardWidth ? availableWidth / boardWidth : 1;
      const scaleByHeight = availableHeight < boardWidth ? availableHeight / boardWidth : 1;
      const scale = Math.min(scaleByWidth, scaleByHeight, 1);
      setBoardScale(scale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const threshold = 30; // minimum movement in pixels

    if (Math.max(absDx, absDy) < threshold) return;

    const currentDir = directionRef.current;

    if (absDx > absDy) {
      if (dx > 0 && currentDir !== 'LEFT') {
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
      } else if (dx < 0 && currentDir !== 'RIGHT') {
        setDirection('LEFT');
        directionRef.current = 'LEFT';
      }
    } else {
      if (dy > 0 && currentDir !== 'UP') {
        setDirection('DOWN');
        directionRef.current = 'DOWN';
      } else if (dy < 0 && currentDir !== 'DOWN') {
        setDirection('UP');
        directionRef.current = 'UP';
      }
    }
  };

  // New state for advanced mechanics
  const [obstacles, setObstacles] = useState<Position[]>([]); // Level 8 patrol obstacles
  const [accumulationOrbs, setAccumulationOrbs] = useState(0);
  const [chasingOrbs, setChasingOrbs] = useState<ConceptOrb[]>([]);
  const [currentZone, setCurrentZone] = useState<'red' | 'blue'>('red');
  const [legacyObstacles, setLegacyObstacles] = useState<Position[]>([]);
  const [wallCollisionEnabled, setWallCollisionEnabled] = useState(false);

  // Quiz Gates states
  const [quizOrb, setQuizOrb] = useState<Position | null>(null);
  const [quizSpawned, setQuizSpawned] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [speedOffset, setSpeedOffset] = useState<number>(0);

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    const correct = selectedOption === currentQuestion.correctIndex;
    setIsAnswerCorrect(correct);
    setShowAnswerFeedback(true);
    
    if (correct) {
      setSpeedOffset(prev => prev + 50); // Slow down the snake
      setUnderstanding(prev => Math.min(100, prev + 10)); // Boost understanding
      if (soundEnabled) {
        soundManager.playCorrectSound();
      }
    } else {
      setPenaltyTime(prev => prev + 5); // Add 5 seconds penalty
      if (soundEnabled) {
        soundManager.playWrongSound();
      }
    }
  };

  const handleCloseQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(null);
  };

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

    const currentSpeed = getGameSpeed(level, currentZone) + speedOffset;

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

        // Check collision with Quiz Orb
        if (quizOrb && newHead.x === quizOrb.x && newHead.y === quizOrb.y) {
          setQuizOrb(null);
          const questions = QUIZ_QUESTIONS[level] || [];
          const randomQ = questions[Math.floor(Math.random() * questions.length)];
          if (randomQ) {
            setCurrentQuestion(randomQ);
            setGameState('quiz');
            setSelectedOption(null);
            setShowAnswerFeedback(false);
          }
          return prevSnake;
        }

        // Check collision with self
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          return prevSnake;
        }

        // Check collision with legacy obstacles (Level 5)
        if (level === 5 && legacyObstacles.some(obstacle => obstacle.x === newHead.x && obstacle.y === newHead.y)) {
          setGameState('error');
          setErrorMessage('Đụng vật cản lịch sử!');
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
          setErrorMessage('Vi phạm pháp luật (Ranh giới tất yếu)!');
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
            setErrorMessage('Nhầm lẫn nhận thức dân tộc/tôn giáo!');
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
          setErrorMessage('Bị thế lực cực đoan lợi dụng!');
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
    
    // Reset Quiz states
    setQuizOrb(null);
    setQuizSpawned(false);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setShowAnswerFeedback(false);
    setIsAnswerCorrect(false);
    setSpeedOffset(0);
    setLegacyObstacles([]);
    setWallCollisionEnabled(levelData.disableWrap || false);
  }, [level]);

  // Spawn Quiz Orb when halfway
  useEffect(() => {
    if (gameState === 'playing' && !quizSpawned && collectedWords.length > 0 && collectedWords.length === Math.ceil(levelData.sentence.length / 2)) {
      const pos = getRandomPosition(snake, orbs);
      setQuizOrb(pos);
      setQuizSpawned(true);
    }
  }, [collectedWords.length, gameState, quizSpawned, snake, orbs]);

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
          <span className="text-[7px] text-center leading-tight px-1 text-[#0f172a] font-bold">{orb.word}</span>
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
          <span className="text-[7px] text-center leading-tight px-1 text-[#0f172a] font-bold">{orb.word}</span>
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
            className="text-[7px] text-center leading-tight text-[#0f172a] font-bold"
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
      className="w-full h-full relative flex flex-col overflow-hidden select-none touch-none"
      style={{
        backgroundColor: levelData.colors.background,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,0,0,0.03) 29px, rgba(0,0,0,0.03) 31px),
          repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(0,0,0,0.03) 29px, rgba(0,0,0,0.03) 31px)
        `
      }}
    >
      {/* Hint System - Removed (component not implemented) */}

      <ComboSystem combo={combo} show={showCombo} color={levelData.colors.primary} />

      {/* Status Bar - Compact on mobile */}
      <div
        className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-6 md:py-3 border-b flex flex-row items-center justify-between relative overflow-hidden flex-shrink-0"
        style={{
          backgroundColor: levelData.colors.secondary,
          borderColor: levelData.colors.text
        }}
      >
        {/* Animated background */}
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, ${levelData.colors.primary} 25%, transparent 25%, transparent 75%, ${levelData.colors.primary} 75%)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Level Info */}
        <div className="relative z-10 flex items-center gap-1 flex-shrink-0">
          <span
            className="text-[9px] sm:text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-white"
            style={{ backgroundColor: levelData.colors.primary }}
          >
            Màn {level}
          </span>
          <h2 className="hidden sm:block text-xs md:text-sm font-serif font-bold" style={{ color: levelData.colors.text }}>
            - {levelData.name}
          </h2>
        </div>

        {/* Stats & Controls Row */}
        <div className="flex items-center gap-2 sm:gap-4 relative z-10">
          {/* Timer Display */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <span className="text-[10px]" title="Thời gian">⏰</span>
            <span className="text-xs font-bold tabular-nums" style={{ color: levelData.colors.text }}>
              {Math.floor((elapsedTime + penaltyTime) / 60)}:{String((elapsedTime + penaltyTime) % 60).padStart(2, '0')}
            </span>
            {penaltyTime > 0 && (
              <span className="text-[8px] text-red-600 font-bold">+{penaltyTime}s</span>
            )}
          </div>

          {/* Understanding Display */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <span className="text-[10px]" title="Thấu hiểu">💡</span>
            <span className="text-xs font-bold" style={{ color: levelData.colors.primary }}>
              {understanding}%
            </span>
          </div>

          {/* Progress Toggle (mobile) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProgress(p => !p)}
            className="px-1.5 py-0.5 rounded text-[9px] font-semibold border lg:hidden"
            style={{
              backgroundColor: showProgress ? levelData.colors.primary : 'rgba(255,255,255,0.3)',
              borderColor: levelData.colors.text,
              color: showProgress ? '#fff' : levelData.colors.text
            }}
          >
            {showProgress ? 'Ẩn' : 'Mục tiêu'}
          </motion.button>

          <div className="flex items-center gap-1">
            {/* Info toggle (Mobile only) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfoModal(true)}
              className="p-1 rounded-full transition-all border lg:hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: levelData.colors.text,
                color: levelData.colors.text
              }}
            >
              <HelpCircle className="w-3 h-3" />
            </motion.button>

            {/* Sound toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 rounded-full transition-all border"
              style={{
                backgroundColor: soundEnabled ? levelData.colors.primary : 'rgba(255, 255, 255, 0.3)',
                borderColor: levelData.colors.text,
                color: soundEnabled ? '#fff' : levelData.colors.text
              }}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </motion.button>

            {/* Quit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onQuit}
              className="px-2 py-0.5 rounded font-semibold text-[9px] sm:text-xs transition-all border"
              style={{
                borderColor: levelData.colors.text,
                color: levelData.colors.text,
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              Menu
            </motion.button>
          </div>
        </div>
      </div>

      {/* Sentence Progress - Collapsible on mobile, always shown on desktop */}
      <AnimatePresence>
        {(showProgress || false) && (
          <motion.div
            key="progress-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b flex-shrink-0 overflow-hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderColor: levelData.colors.text + '40'
            }}
          >
            <div className="px-3 py-1.5 flex flex-wrap gap-1 items-center">
              <span className="text-[10px] font-semibold" style={{ color: levelData.colors.text }}>Mục tiêu:</span>
              {levelData.sentence.map((word, index) => (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    backgroundColor: index < collectedWords.length ? levelData.colors.text : 'transparent',
                    scale: index === collectedWords.length - 1 ? [1, 1.1, 1] : 1
                  }}
                  transition={{ scale: { duration: 0.3 } }}
                  className="px-1.5 py-0.5 rounded transition-all text-[10px]"
                  style={{
                    color: index < collectedWords.length ? '#fff' : levelData.colors.text + '60',
                    border: `1.2px ${index < collectedWords.length ? 'solid' : 'dashed'} ${levelData.colors.text}${index < collectedWords.length ? '' : '40'}`,
                    fontWeight: index < collectedWords.length ? 600 : 400
                  }}
                >
                  {index < collectedWords.length ? word : '......'}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sentence Progress - Always visible on desktop */}
      <div
        className="hidden lg:flex px-3 py-1 border-b flex-wrap gap-1 items-center min-h-[32px] text-[10px] sm:text-xs flex-shrink-0"
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderColor: levelData.colors.text + '40'
        }}
      >
        <span className="text-xs font-medium" style={{ color: levelData.colors.text }}>Mục tiêu:</span>
        {levelData.sentence.map((word, index) => (
          <motion.span
            key={index}
            initial={false}
            animate={{
              backgroundColor: index < collectedWords.length ? levelData.colors.text : 'transparent',
              scale: index === collectedWords.length - 1 ? [1, 1.1, 1] : 1
            }}
            transition={{ scale: { duration: 0.3 } }}
            className="px-1.5 py-0.5 rounded transition-all text-[10px] sm:text-xs"
            style={{
              color: index < collectedWords.length ? '#fff' : levelData.colors.text + '60',
              border: `1.2px ${index < collectedWords.length ? 'solid' : 'dashed'} ${levelData.colors.text}${index < collectedWords.length ? '' : '40'}`,
              fontWeight: index < collectedWords.length ? 600 : 400,
              boxShadow: index < collectedWords.length ? `0 2px 6px ${levelData.colors.primary}30` : 'none'
            }}
          >
            {index < collectedWords.length ? word : '......'}
          </motion.span>
        ))}
      </div>

      {/* Level 3: Accumulation Progress Indicator */}
      {level === 3 && levelData.requiresAccumulation && accumulationOrbs < (levelData.accumulationCount || 10) && (
        <div
          className="px-3 py-1 md:px-6 border-b flex items-center gap-2 text-xs flex-shrink-0"
          style={{
            backgroundColor: levelData.colors.primary + '20',
            borderColor: levelData.colors.text + '40'
          }}
        >
          <span className="font-medium text-[10px]" style={{ color: levelData.colors.text }}>Tích lũy:</span>
          <div className="flex gap-0.5">
            {Array.from({ length: levelData.accumulationCount || 10 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full border transition-all"
                style={{
                  backgroundColor: i < accumulationOrbs ? levelData.colors.primary : 'transparent',
                  borderColor: levelData.colors.text + '60'
                }}
              />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: levelData.colors.text + 'cc' }}>
            {accumulationOrbs}/{levelData.accumulationCount || 10}
          </span>
        </div>
      )}

      {/* Game Arena */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-2 lg:gap-8 p-2 sm:p-3 lg:p-8 relative overflow-hidden select-none min-h-0">
        {/* Level 4: Split zones (red/blue) */}
        {level === 4 && levelData.hasZones && (
          <div className="absolute inset-0 flex pointer-events-none">
            <motion.div
              className="flex-1"
              animate={{ opacity: currentZone === 'red' ? [0.2, 0.3, 0.2] : [0.05, 0.1, 0.05] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundColor: levelData.colors.primary }}
            />
            <motion.div
              className="flex-1"
              animate={{ opacity: currentZone === 'blue' ? [0.2, 0.3, 0.2] : [0.05, 0.1, 0.05] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundColor: levelData.colors.secondary }}
            />
          </div>
        )}

        {/* Column 1: Playing Board + D-pad stacked for mobile */}
        <div className="flex flex-col items-center flex-shrink-0 w-full lg:w-auto gap-2">
          <div
            className="relative overflow-hidden rounded-3xl flex-shrink-0"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              width: `${GRID_SIZE * CELL_SIZE * boardScale}px`,
              height: `${GRID_SIZE * CELL_SIZE * boardScale}px`
            }}
          >
            <div
              className="absolute"
              style={{
                transform: `scale(${boardScale})`,
                transformOrigin: 'top left',
                width: `${GRID_SIZE * CELL_SIZE}px`,
                height: `${GRID_SIZE * CELL_SIZE}px`,
                border: `3px solid ${levelData.colors.text}`,
                backgroundColor: levelData.colors.background,
                backgroundImage: `
                  radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 100%),
                  repeating-linear-gradient(0deg, transparent, transparent 27px, ${levelData.colors.primary}15 27px, ${levelData.colors.primary}15 28px),
                  repeating-linear-gradient(90deg, transparent, transparent 27px, ${levelData.colors.primary}15 27px, ${levelData.colors.primary}15 28px)
                `,
                boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 0 8px ${levelData.colors.primary}20`
              }}
            >
            {/* Level 6: Fog of War */}
            {level === 6 && (
              <div
                className="absolute inset-0 pointer-events-none z-20 transition-all duration-100"
                style={{
                  background: `radial-gradient(circle 90px at ${snake[0].x * CELL_SIZE + CELL_SIZE / 2}px ${snake[0].y * CELL_SIZE + CELL_SIZE / 2}px, transparent 0%, transparent 40%, rgba(15, 10, 25, 0.96) 90%)`
                }}
              />
            )}

            {/* Patrol Obstacles (Level 8) - Placed inside grid container to maintain absolute coordination alignment */}
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
                  backgroundColor: levelData.colors.text,
                  border: `2px solid ${levelData.colors.primary}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  boxShadow: `0 0 10px ${levelData.colors.primary}60`,
                  zIndex: 12
                }}
              >
                ⚖️
              </motion.div>
            ))}

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
                animate={{ opacity: 0.8, scale: 1 }}
                style={{
                  position: 'absolute',
                  left: `${obstacle.x * CELL_SIZE}px`,
                  top: `${obstacle.y * CELL_SIZE}px`,
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: levelData.colors.text,
                  border: `2px solid ${levelData.colors.primary}`,
                  borderRadius: '6px',
                  boxShadow: `0 0 10px ${levelData.colors.primary}60`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  zIndex: 12
                }}
              >
                📜
              </motion.div>
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
                  color: index === 0 ? '#0f172a' : '#fff',
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

            {/* Particle Effects */}
            {particles.map((p) => (
              <ParticleEffect key={p.id} x={p.x} y={p.y} color={p.color} />
            ))}

            {/* Quiz Orb */}
            {quizOrb && (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  left: `${quizOrb.x * CELL_SIZE}px`,
                  top: `${quizOrb.y * CELL_SIZE}px`,
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: '#f1c40f',
                  border: `2.5px solid ${levelData.colors.text}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  boxShadow: '0 0 15px rgba(241, 196, 15, 0.8)',
                  zIndex: 15
                }}
              >
                ❓
              </motion.div>
            )}

            {/* Error overlay */}
            <AnimatePresence>
              {gameState === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-30"
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
                  className="absolute inset-0 flex items-center justify-center z-30"
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
        </div>

          {/* Virtual D-pad for mobile - inside the board column so it stacks properly */}
          {isTouchDevice && (
            <div className="flex flex-col items-center gap-1 select-none flex-shrink-0">
              {/* UP button */}
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={() => {
                    if (directionRef.current !== 'DOWN') {
                      setDirection('UP');
                      directionRef.current = 'UP';
                    }
                  }}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl border-2 shadow-lg text-lg font-bold active:opacity-80"
                  style={{ backgroundColor: levelData.colors.primary, borderColor: levelData.colors.text, color: '#fff' }}
                >
                  ▲
                </motion.button>
              </div>
              {/* LEFT, DOWN, RIGHT buttons */}
              <div className="flex gap-3 items-center">
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={() => {
                    if (directionRef.current !== 'RIGHT') {
                      setDirection('LEFT');
                      directionRef.current = 'LEFT';
                    }
                  }}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl border-2 shadow-lg text-lg font-bold active:opacity-80"
                  style={{ backgroundColor: levelData.colors.primary, borderColor: levelData.colors.text, color: '#fff' }}
                >
                  ◀
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={() => {
                    if (directionRef.current !== 'UP') {
                      setDirection('DOWN');
                      directionRef.current = 'DOWN';
                    }
                  }}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl border-2 shadow-lg text-lg font-bold active:opacity-80"
                  style={{ backgroundColor: levelData.colors.primary, borderColor: levelData.colors.text, color: '#fff' }}
                >
                  ▼
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={() => {
                    if (directionRef.current !== 'LEFT') {
                      setDirection('RIGHT');
                      directionRef.current = 'RIGHT';
                    }
                  }}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl border-2 shadow-lg text-lg font-bold active:opacity-80"
                  style={{ backgroundColor: levelData.colors.primary, borderColor: levelData.colors.text, color: '#fff' }}
                >
                  ▶
                </motion.button>
              </div>
            </div>
          )}

          {/* Controls Help (desktop only) */}
          {!isTouchDevice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="px-4 py-2 rounded-lg flex items-center gap-4 bg-white/90 shadow border border-slate-100"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Điều khiển:</span>
              <div className="flex gap-1 items-center">
                {['↑', '←', '↓', '→'].map((arrow, i) => (
                  <span key={i} className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700">
                    {arrow}
                  </span>
                ))}
                <span className="mx-1 text-xs text-slate-400">hoặc</span>
                {['W', 'A', 'S', 'D'].map((key, i) => (
                  <span key={i} className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700">
                    {key}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Column 2: Educational Details Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex w-full max-w-sm lg:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 p-4 md:p-5 flex-col gap-3 md:gap-4 text-left z-10 flex-shrink-0"
          style={{ borderColor: levelData.colors.text + '30' }}
        >
          {/* Header Image */}
          <div className="h-28 md:h-36 lg:h-40 w-full relative overflow-hidden rounded-xl bg-slate-100 border">
            <img src={levelData.imageUrl} alt={levelData.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Title & Quote */}
          <div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: levelData.colors.primary }}>
                Màn {level}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CHƯƠNG VI</span>
            </div>
            <h3 className="text-xl font-bold mt-2" style={{ color: levelData.colors.text }}>{levelData.name}</h3>
            <p className="text-xs italic mt-2 border-l-2 pl-3 py-1 font-serif leading-relaxed" style={{ color: levelData.colors.text, borderColor: levelData.colors.primary }}>
              "{levelData.quote}"
            </p>
          </div>

          {/* Mechanic & Explanation */}
          <div className="mt-1 pt-3 border-t border-slate-100 flex-1 flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Cơ chế & Ý nghĩa</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {levelData.mechanicExplanation}
            </p>
            
            {/* Integrated Mini-map */}
            <div className="mt-auto pt-3 flex justify-center border-t border-slate-100/60">
              <MiniMap
                snake={snake}
                orbs={orbs}
                gridSize={GRID_SIZE}
                color={levelData.colors.primary}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {gameState === 'quiz' && currentQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="max-w-md w-full bg-white rounded-2xl shadow-2xl border-4 p-6 text-left flex flex-col gap-4"
              style={{ borderColor: levelData.colors.primary }}
            >
              <div className="flex items-center gap-2 text-yellow-500">
                <HelpCircle className="w-6 h-6 animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Câu Hỏi Nhận Thức - Màn {level}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-serif font-bold text-slate-800 leading-snug">
                {currentQuestion.question}
              </h3>

              <div className="flex flex-col gap-2 mt-2">
                {currentQuestion.options.map((option, idx) => {
                  let btnBg = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                  if (showAnswerFeedback) {
                    if (idx === currentQuestion.correctIndex) {
                      btnBg = 'bg-green-100 border-green-500 text-green-800 font-semibold';
                    } else if (idx === selectedOption) {
                      btnBg = 'bg-red-100 border-red-500 text-red-800';
                    } else {
                      btnBg = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (selectedOption === idx) {
                    btnBg = 'bg-blue-50 border-blue-500 text-blue-700 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showAnswerFeedback}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border-2 text-xs md:text-sm transition-all flex items-center gap-2 ${btnBg}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Continue button */}
              {showAnswerFeedback ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex flex-col gap-3"
                >
                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed border ${
                      isAnswerCorrect
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    <p className="font-bold mb-1">
                      {isAnswerCorrect ? '🎉 CHÍNH XÁC!' : '❌ CHƯA ĐÚNG!'}
                    </p>
                    <p>{currentQuestion.explanation}</p>
                    <p className="mt-1.5 font-semibold text-[10px] uppercase tracking-wider">
                      {isAnswerCorrect ? 'Phần thưởng: Giảm tốc độ sâu + Tăng 10% hiểu biết!' : 'Hình phạt: Cộng thêm 5 giây vào đồng hồ!'}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseQuiz}
                    className="w-full py-3 bg-slate-800 text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-slate-700 transition-all"
                  >
                    Tiếp tục hành trình
                  </button>
                </motion.div>
              ) : (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="w-full py-3 mt-2 text-white rounded-xl text-xs md:text-sm font-semibold transition-all disabled:opacity-50"
                  style={{ backgroundColor: levelData.colors.primary }}
                >
                  Kiểm tra đáp án
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Details Modal (Mobile Only) */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-40 p-4 touch-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border-2 p-5 flex flex-col gap-4 text-left max-h-[90vh] overflow-y-auto"
              style={{ borderColor: levelData.colors.primary }}
            >
              {/* Header Image */}
              <div className="h-36 w-full relative overflow-hidden rounded-xl bg-slate-100 border">
                <img src={levelData.imageUrl} alt={levelData.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title & Quote */}
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: levelData.colors.primary }}>
                    Màn {level}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CHƯƠNG VI</span>
                </div>
                <h3 className="text-xl font-bold mt-2" style={{ color: levelData.colors.text }}>{levelData.name}</h3>
                <p className="text-xs italic mt-2 border-l-2 pl-3 py-1 font-serif leading-relaxed" style={{ color: levelData.colors.text, borderColor: levelData.colors.primary }}>
                  "{levelData.quote}"
                </p>
              </div>

              {/* Mechanic & Explanation */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">Cơ chế & Ý nghĩa</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {levelData.mechanicExplanation}
                </p>
                
                {/* Integrated Mini-map */}
                <div className="pt-3 flex justify-center border-t border-slate-100/60">
                  <MiniMap
                    snake={snake}
                    orbs={orbs}
                    gridSize={GRID_SIZE}
                    color={levelData.colors.primary}
                  />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full py-2.5 rounded-xl text-white font-semibold text-xs transition-all mt-2"
                style={{ backgroundColor: levelData.colors.primary }}
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}