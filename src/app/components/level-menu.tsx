import { motion } from 'framer-motion';
import { Lock, Trophy, Clock, ArrowLeft, BookOpen, Network } from 'lucide-react';
import { LevelStats, formatTime } from '../utils/game-progress';
import level2Img from '../../../image/Level 2.png';
import level5Img from '../../../image/Level 5.png';
import level6Img from '../../../image/Level 6.png';

interface LevelMenuProps {
    unlockedLevels: number[];
    levelStats: Record<number, LevelStats>;
    onSelectLevel: (level: number) => void;
    onBackToCover: () => void;
    onOpenLibrary: () => void;
    onOpenMindMap: () => void;
}

const LEVELS_INFO = [
    {
        number: 1,
        name: 'Khái Niệm Dân Tộc',
        quote: 'Dân tộc là cộng đồng người ổn định làm thành nhân dân một nước.',
        color: '#3498db',
        bg: '#ebf5fb',
        text: '#1a5490',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80'
    },
    {
        number: 2,
        name: 'Hai Xu Hướng Dân Tộc',
        quote: 'Xu hướng tách ra độc lập và xu hướng liên hiệp các dân tộc.',
        color: '#4a90e2',
        bg: '#e8f4ff',
        text: '#2c5f8d',
        imageUrl: level2Img
    },
    {
        number: 3,
        name: 'Nguyên Nhân Tồn Tại Tôn Giáo',
        quote: 'Tôn giáo tồn tại do nhận thức và tâm lý chưa đồng đều.',
        color: '#27ae60',
        bg: '#e8f8f0',
        text: '#0d5c2e',
        imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&auto=format&fit=crop&q=80'
    },
    {
        number: 4,
        name: 'Đức Tin Và Chính Trị',
        quote: 'Phân biệt rõ hai mặt chính trị và tư tưởng trong tôn giáo.',
        color: '#e74c3c',
        bg: '#ffe8e6',
        text: '#8b1e0e',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
    },
    {
        number: 5,
        name: 'Cương Lĩnh Dân Tộc',
        quote: 'Các dân tộc hoàn toàn bình đẳng và có quyền tự quyết.',
        color: '#9b59b6',
        bg: '#f4ecf7',
        text: '#5b2c6f',
        imageUrl: level5Img
    },
    {
        number: 6,
        name: 'Bản Chất Tôn Giáo',
        quote: 'Tôn giáo là hình thái ý thức phản ánh hư ảo hiện thực.',
        color: '#4b0082',
        bg: '#eebbfa',
        text: '#3a0063',
        imageUrl: level6Img
    },
    {
        number: 7,
        name: 'Đặc Điểm Tôn Giáo',
        quote: 'Tôn giáo có tính lịch sử, quần chúng và tính chính trị.',
        color: '#00ced1',
        bg: '#e0ffff',
        text: '#008b8b',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
    },
    {
        number: 8,
        name: 'Chính Sách Tôn Giáo',
        quote: 'Bảo đảm tự do tín ngưỡng và nghiêm cấm lợi dụng tôn giáo.',
        color: '#ffd700',
        bg: '#fff8dc',
        text: '#b8860b',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80'
    }
];

export function LevelMenu({
    unlockedLevels,
    levelStats,
    onSelectLevel,
    onBackToCover,
    onOpenLibrary,
    onOpenMindMap
}: LevelMenuProps) {
    const isLevel8Completed = levelStats[8] && levelStats[8].completedCount > 0;

    return (
        <div className="w-full min-h-screen bg-gradient-to-tr from-sky-100 via-indigo-50 to-purple-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <button
                                onClick={onBackToCover}
                                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Quay lại
                            </button>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                                Chọn Màn Chơi
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:mt-11 self-start">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onOpenLibrary}
                                className="flex items-center gap-2 px-5 py-3 bg-[#3d3529] hover:bg-[#5a5244] text-[#e8e4db] font-semibold rounded-xl shadow-lg border border-[#7a6f5d] transition-all"
                            >
                                <BookOpen className="w-5 h-5" />
                                Thư Viện Tri Thức
                            </motion.button>
                            {isLevel8Completed && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onOpenMindMap}
                                    className="flex items-center gap-2 px-5 py-3 bg-[#b8860b] hover:bg-[#966d03] text-white font-semibold rounded-xl shadow-lg border border-[#7a6f5d] transition-all"
                                >
                                    <Network className="w-5 h-5" />
                                    Bản Đồ Tư Duy
                                </motion.button>
                            )}
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 mt-2">
                        Khám phá các nguyên lý, quy luật và phạm trù của triết học Mác - Lênin
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
                                className={`relative rounded-2xl overflow-hidden shadow-lg ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                                    }`}
                                style={{ backgroundColor: level.bg }}
                            >
                                {/* Lock Overlay */}
                                {!isUnlocked && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                                        <Lock className="w-16 h-16 text-white" />
                                    </div>
                                )}

                                {/* Card Header Image */}
                                <div className="h-32 w-full relative overflow-hidden">
                                    <img
                                        src={level.imageUrl}
                                        alt={level.name}
                                        className={`w-full h-full object-cover transition-all duration-300 ${isUnlocked ? 'filter-none hover:scale-105' : 'filter grayscale opacity-30'
                                            }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>

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
                        Tiến độ: {unlockedLevels.length}/8 màn đã mở
                    </p>
                    <div className="max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(unlockedLevels.length / 8) * 100}%` }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
