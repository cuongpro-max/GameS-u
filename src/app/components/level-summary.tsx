import { motion } from 'framer-motion';
import { CheckCircle, Clock, Trophy, RotateCcw, ArrowRight, Menu } from 'lucide-react';
import { LEVEL_LESSONS, formatTime } from '../utils/game-progress';

interface LevelSummaryProps {
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    completedSentence: string;
    elapsedTime: number;
    penaltyTime: number;
    isNewRecord: boolean;
    onReplay: () => void;
    onNextLevel?: () => void;  // undefined if level 5 (now 8)
    onBackToMenu: () => void;
}

const LEVEL_COLORS = {
    1: { primary: '#3498db', bg: '#ebf5fb', text: '#1a5490' },
    2: { primary: '#4a90e2', bg: '#e8f4ff', text: '#2c5f8d' },
    3: { primary: '#27ae60', bg: '#e8f8f0', text: '#0d5c2e' },
    4: { primary: '#e74c3c', bg: '#ffe8e6', text: '#8b1e0e' },
    5: { primary: '#9b59b6', bg: '#f4ecf7', text: '#5b2c6f' },
    6: { primary: '#4b0082', bg: '#eebbfa', text: '#3a0063' },
    7: { primary: '#00ced1', bg: '#e0ffff', text: '#008b8b' },
    8: { primary: '#ffd700', bg: '#fff8dc', text: '#b8860b' }
};

export function LevelSummary({
    level,
    completedSentence,
    elapsedTime,
    penaltyTime,
    isNewRecord,
    onReplay,
    onNextLevel,
    onBackToMenu
}: LevelSummaryProps) {
    const totalTime = elapsedTime + penaltyTime;
    const colors = LEVEL_COLORS[level];
    const lesson = LEVEL_LESSONS[level];

    return (
        <div
            className="w-full h-screen flex items-center justify-center p-4 overflow-auto"
            style={{ backgroundColor: colors.bg }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden my-4"
            >
                {/* Header */}
                <div
                    className="p-6 text-center relative overflow-hidden"
                    style={{ backgroundColor: colors.primary }}
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CheckCircle className="w-16 h-16 mx-auto mb-3 text-white" />
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Hoàn Thành Màn {level}!
                        </h1>
                        <p className="text-lg text-white opacity-90">
                            {lesson.title}
                        </p>
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 p-4 border-b">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-4 rounded-xl"
                        style={{ backgroundColor: colors.bg }}
                    >
                        <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                        <p className="text-xs text-gray-600 mb-1">Thời gian</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>
                            {formatTime(totalTime)}
                        </p>
                        {penaltyTime > 0 && (
                            <p className="text-xs text-red-600 mt-1">
                                (+{penaltyTime}s phạt)
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-4 rounded-xl"
                        style={{ backgroundColor: colors.bg }}
                    >
                        <Trophy className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                        <p className="text-xs text-gray-600 mb-1">Kết quả</p>
                        <p className="text-base font-semibold" style={{ color: colors.text }}>
                            {completedSentence}
                        </p>
                        {isNewRecord && (
                            <motion.p
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                                className="text-xs font-bold mt-2"
                                style={{ color: colors.primary }}
                            >
                                🏆 KỶ LỤC MỚI!
                            </motion.p>
                        )}
                    </motion.div>
                </div>
                {/* Educational Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 border-b max-h-64 overflow-y-auto"
                >
                    <h2 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
                        📚 Nội dung bài học
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        {lesson.content}
                    </p>

                    <h3 className="text-base font-semibold mb-2" style={{ color: colors.text }}>
                        Điểm chính:
                    </h3>
                    <ul className="space-y-2">
                        {lesson.keyPoints.map((point, index) => (
                            <motion.li
                                key={index}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start gap-2"
                            >
                                <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: colors.primary }}
                                >
                                    {index + 1}
                                </span>
                                <span className="text-sm text-gray-700">{point}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Action Buttons */}
                <div className="p-4 flex gap-3 justify-center flex-wrap">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onReplay}
                        className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 border-2 transition-colors"
                        style={{
                            borderColor: colors.primary,
                            color: colors.primary
                        }}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Chơi lại
                    </motion.button>

                    {onNextLevel && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNextLevel}
                            className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 text-white transition-colors"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Màn tiếp theo
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBackToMenu}
                        className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300"
                    >
                        <Menu className="w-4 h-4" />
                        Menu
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
