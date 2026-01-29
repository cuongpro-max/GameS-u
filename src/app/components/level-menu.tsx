import { motion } from 'framer-motion';
import { Lock, Trophy, Clock, ArrowLeft } from 'lucide-react';
import { LevelStats, formatTime } from '../utils/game-progress';

interface LevelMenuProps {
    unlockedLevels: number[];
    levelStats: Record<number, LevelStats>;
    onSelectLevel: (level: number) => void;
    onBackToCover: () => void;
}

const LEVELS_INFO = [
    {
        number: 1,
        name: 'Thế Giới Quan',
        quote: 'Vật chất có trước, ý thức có sau.',
        color: '#3498db',
        bg: '#ebf5fb',
        text: '#1a5490'
    },
    {
        number: 2,
        name: 'Sự Vận Động',
        quote: 'Vận động là phương thức tồn tại của vật chất.',
        color: '#4a90e2',
        bg: '#e8f4ff',
        text: '#2c5f8d'
    },
    {
        number: 3,
        name: 'Lượng - Chất',
        quote: 'Tích lũy về lượng dẫn đến thay đổi về chất.',
        color: '#27ae60',
        bg: '#e8f8f0',
        text: '#0d5c2e'
    },
    {
        number: 4,
        name: 'Mâu Thuẫn',
        quote: 'Mâu thuẫn là động lực của sự phát triển.',
        color: '#e74c3c',
        bg: '#ffe8e6',
        text: '#8b1e0e'
    },
    {
        number: 5,
        name: 'Phủ Định',
        quote: 'Cái mới ra đời trên cơ sở kế thừa cái cũ.',
        color: '#9b59b6',
        bg: '#f4ecf7',
        text: '#5b2c6f'
    }
];

export function LevelMenu({
    unlockedLevels,
    levelStats,
    onSelectLevel,
    onBackToCover
}: LevelMenuProps) {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                    <button
                        onClick={onBackToCover}
                        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>

                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Chọn Màn Chơi
                    </h1>
                    <p className="text-xl text-gray-600">
                        Khám phá 5 quy luật cơ bản của triết học Mác - Lênin
                    </p>
                </motion.div>

                {/* Level Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LEVELS_INFO.map((level, index) => {
                        const isUnlocked = unlockedLevels.includes(level.number);
                        const stats = levelStats[level.number];
                        const hasPlayed = stats && stats.completedCount > 0;

                        return (
                            <motion.div
                                key={level.number}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={isUnlocked ? { scale: 1.03, y: -5 } : {}}
                                onClick={() => isUnlocked && onSelectLevel(level.number)}
                                className={`relative rounded-2xl overflow-hidden shadow-lg transition-all ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                                    }`}
                                style={{ backgroundColor: level.bg }}
                            >
                                {/* Lock Overlay */}
                                {!isUnlocked && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                                        <Lock className="w-16 h-16 text-white" />
                                    </div>
                                )}

                                {/* Card Content */}
                                <div className="p-6">
                                    {/* Level Number Badge */}
                                    <div
                                        className="inline-block px-4 py-2 rounded-full text-white font-bold mb-4"
                                        style={{ backgroundColor: level.color }}
                                    >
                                        Màn {level.number}
                                    </div>

                                    {/* Level Name */}
                                    <h2
                                        className="text-2xl font-bold mb-2"
                                        style={{ color: level.text }}
                                    >
                                        {level.name}
                                    </h2>

                                    {/* Quote */}
                                    <p
                                        className="text-sm italic mb-4 leading-relaxed"
                                        style={{ color: level.text, opacity: 0.8 }}
                                    >
                                        "{level.quote}"
                                    </p>

                                    {/* Stats */}
                                    {hasPlayed && (
                                        <div className="mt-4 pt-4 border-t" style={{ borderColor: level.color + '40' }}>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="w-4 h-4" style={{ color: level.color }} />
                                                    <span style={{ color: level.text }}>
                                                        Kỷ lục: {formatTime(stats.bestTime)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" style={{ color: level.color }} />
                                                    <span style={{ color: level.text }}>
                                                        {stats.completedCount} lần
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Play Indicator */}
                                    {isUnlocked && (
                                        <motion.div
                                            className="mt-4 text-center py-2 rounded-lg font-semibold text-white"
                                            style={{ backgroundColor: level.color }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {hasPlayed ? 'Chơi lại' : 'Bắt đầu'}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Decorative Corner */}
                                <div
                                    className="absolute top-0 right-0 w-24 h-24 opacity-10"
                                    style={{
                                        background: `linear-gradient(135deg, transparent 50%, ${level.color} 50%)`,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 mb-4">
                        Tiến độ: {unlockedLevels.length}/5 màn đã mở
                    </p>
                    <div className="max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(unlockedLevels.length / 5) * 100}%` }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
