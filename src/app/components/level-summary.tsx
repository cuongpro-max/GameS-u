import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CheckCircle, Clock, Trophy, RotateCcw, ArrowRight, Menu, BookOpen, GraduationCap, Share2 } from 'lucide-react';
import { LEVEL_LESSONS, formatTime } from '../utils/game-progress';
import level2Img from '../../../image/Level 2.png';
import level5Img from '../../../image/Level 5.png';
import level6Img from '../../../image/Level 6.png';

interface LevelSummaryProps {
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    completedSentence: string;
    elapsedTime: number;
    penaltyTime: number;
    isNewRecord: boolean;
    onReplay: () => void;
    onNextLevel?: () => void;  // undefined if level 8
    onBackToMenu: () => void;
    onViewMindMap?: () => void;
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

const LEVEL_IMAGES = {
    1: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80',
    2: level2Img,
    3: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&auto=format&fit=crop&q=80',
    4: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    5: level5Img,
    6: level6Img,
    7: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    8: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80'
};

const LEVEL_QUOTES: Record<number, string> = {
    1: "Dân tộc là cộng đồng người ổn định làm thành nhân dân một nước.",
    2: "Xu hướng tách ra độc lập và xu hướng liên hiệp các dân tộc.",
    3: "Tôn giáo tồn tại do nhận thức và tâm lý chưa đồng đều.",
    4: "Phân biệt rõ hai mặt chính trị và tư tưởng trong tôn giáo.",
    5: "Các dân tộc hoàn toàn bình đẳng và có quyền tự quyết.",
    6: "Tôn giáo là hình thái ý thức phản ánh hư ảo hiện thực.",
    7: "Tôn giáo có tính lịch sử, quần chúng và tính chính trị.",
    8: "Bảo đảm tự do tín ngưỡng và nghiêm cấm lợi dụng tôn giáo."
};

interface DiagramItem {
    label: string;
    desc: string;
    color?: string;
}

interface LevelDiagram {
    title: string;
    type: 'split' | 'pillars';
    items: DiagramItem[];
}

const LEVEL_DIAGRAMS: Record<number, LevelDiagram> = {
    1: {
        title: "Hai nghĩa của Khái niệm Dân tộc",
        type: 'split',
        items: [
            { label: "Nghĩa rộng (Nation)", desc: "Quốc gia - dân tộc độc lập có lãnh thổ riêng, nền kinh tế thống nhất, ngôn ngữ chung, và quản lý bởi một Nhà nước." },
            { label: "Nghĩa hẹp (Ethnie)", desc: "Cộng đồng tộc người thành phần có chung ngôn ngữ, văn hóa, nguồn gốc lịch sử và ý thức tự giác dân tộc tộc người." }
        ]
    },
    2: {
        title: "Hai xu hướng phát triển khách quan của dân tộc",
        type: 'split',
        items: [
            { label: "Tách ra tự quyết", desc: "Các tộc người muốn tự quyết, phân tách để thành lập các quốc gia độc lập nhằm tự bảo vệ bản sắc và chủ quyền tộc người." },
            { label: "Liên hiệp xích lại", desc: "Các dân tộc xích lại gần nhau, xóa bỏ hàng rào biên giới nhằm hợp tác kinh tế, toàn cầu hóa và tăng cường sức mạnh chung." }
        ]
    },
    3: {
        title: "Nguyên nhân tồn tại Tôn giáo",
        type: 'pillars',
        items: [
            { label: "Nhận thức & Tâm lý", desc: "Trình độ dân trí chưa đồng đều và tâm lý bất lực mong cầu an ủi, che chở trước tai họa thiên nhiên hoặc biến động xã hội.", color: '#27ae60' },
            { label: "Lịch sử & Đạo đức", desc: "Các giá trị đạo đức, nhân văn và văn hóa tốt đẹp của tôn giáo được kế thừa, bám rễ sâu trong truyền thống nếp sống của nhân dân.", color: '#2ecc71' },
            { label: "Kinh tế & Lợi dụng", desc: "Quan hệ kinh tế còn phức tạp và sự lợi dụng, kích động đức tin từ các thế lực cực đoan chính trị nhằm chống phá Nhà nước.", color: '#1e7e4a' }
        ]
    },
    4: {
        title: "Hai mặt của vấn đề Tôn giáo",
        type: 'split',
        items: [
            { label: "Mặt Tư Tưởng", desc: "Sự khác biệt đức tin và niềm tin tâm linh lành mạnh. Giải quyết bằng phương pháp thuyết phục, giáo dục và tự do tín ngưỡng." },
            { label: "Mặt Chính Trị", desc: "Sự lợi dụng tôn giáo của các thế lực phản động chống phá cách mạng. Giải quyết bằng pháp luật hành chính và biện pháp hành động cứng rắn." }
        ]
    },
    5: {
        title: "Cương lĩnh Dân tộc của Lênin",
        type: 'pillars',
        items: [
            { label: "Bình đẳng Dân tộc", desc: "Quyền thiêng liêng và tối cao. Không phân biệt dân tộc lớn hay nhỏ, đa số hay thiểu số trong mọi lĩnh vực đời sống.", color: '#9b59b6' },
            { label: "Quyền Tự quyết", desc: "Quyền tự mình quyết định con đường phát triển: bao gồm tự do tách ra thành lập quốc gia riêng hoặc tự nguyện liên hiệp.", color: '#f39c12' },
            { label: "Liên hiệp Công nhân", desc: "Hạt nhân đoàn kết giai cấp, đảm bảo sự thắng lợi tuyệt đối của phong trào giải phóng dân tộc và cách mạng vô sản toàn cầu.", color: '#6c2b7a' }
        ]
    },
    6: {
        title: "Quan hệ phản ánh biện chứng của tôn giáo",
        type: 'split',
        items: [
            { label: "Hiện thực khách quan", desc: "Thế giới vật chất sinh động và các mối quan hệ xã hội phụ thuộc mà con người trải qua trong hoạt động lao động sản xuất thực tế." },
            { label: "Phản ánh hư ảo", desc: "Nhận thức của con người đưa hiện thực vào bộ óc một cách siêu nhiên, thần thoại hóa do bất lực trước các quy luật tự nhiên và xã hội." }
        ]
    },
    7: {
        title: "Ba đặc điểm của Tôn giáo",
        type: 'pillars',
        items: [
            { label: "Tính Lịch sử", desc: "Tôn giáo chỉ tồn tại trong giai đoạn lịch sử nhất định, sinh ra, biến đổi và tiêu vong cùng với trình độ phát triển của xã hội.", color: '#00ced1' },
            { label: "Tính Quần chúng", desc: "Là một hiện tượng xã hội rộng lớn, đáp ứng nhu cầu tinh thần, tâm linh của hàng triệu người dân qua các nghi lễ, nếp sống văn hóa.", color: '#40e0d0' },
            { label: "Tính Chính trị", desc: "Xuất hiện khi xã hội phân chia giai cấp. Tôn giáo có thể bị giai cấp thống trị lợi dụng hoặc giai cấp bị áp bức dùng để phản kháng.", color: '#008b8b' }
        ]
    },
    8: {
        title: "Trọng tâm Chính sách tôn giáo Việt Nam",
        type: 'pillars',
        items: [
            { label: "Tự do tín ngưỡng", desc: "Nhân dân có quyền tự do tín ngưỡng, theo hoặc không theo tôn giáo nào, các tổ chức tôn giáo bình đẳng trước pháp luật.", color: '#ffd700' },
            { label: "Đoàn kết lương - giáo", desc: "Nội dung cốt lõi của chính sách: đoàn kết đồng bào theo đạo và không theo đạo vì mục tiêu dân giàu, nước mạnh, dân chủ, văn minh.", color: '#daa520' },
            { label: "Nghiêm cấm lợi dụng", desc: "Kiên quyết bài trừ hoạt động mê tín dị đoan, nghiêm cấm lợi dụng tôn giáo để chia rẽ khối đoàn kết dân tộc hoặc vi phạm pháp luật.", color: '#b8860b' }
        ]
    }
};

export function LevelSummary({
    level,
    completedSentence,
    elapsedTime,
    penaltyTime,
    isNewRecord,
    onReplay,
    onNextLevel,
    onBackToMenu,
    onViewMindMap
}: LevelSummaryProps) {
    const totalTime = elapsedTime + penaltyTime;
    const colors = LEVEL_COLORS[level];
    const lesson = LEVEL_LESSONS[level];
    const [activeTab, setActiveTab] = useState<'summary' | 'keypoints'>('summary');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        }
    };

    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-y-auto"
            style={{ backgroundColor: colors.bg }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden my-2 md:my-4 border border-[#7a6f5d]/20"
            >
                {/* Header */}
                <div
                    className="p-4 md:p-6 text-center relative overflow-hidden"
                    style={{ backgroundColor: colors.primary }}
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CheckCircle className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 text-white" />
                        <h1 className="text-xl md:text-3xl font-bold text-white mb-1">
                            Hoàn Thành Màn {level}!
                        </h1>
                        <p className="text-sm md:text-lg text-white opacity-90">
                            {lesson.title}
                        </p>
                    </motion.div>
                </div>

                {/* Banner Image */}
                <div className="h-32 md:h-40 w-full relative overflow-hidden border-b">
                    <img
                        src={LEVEL_IMAGES[level]}
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 p-3 md:p-4 border-b">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-3 md:p-4 rounded-xl"
                        style={{ backgroundColor: colors.bg }}
                    >
                        <Clock className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2" style={{ color: colors.primary }} />
                        <p className="text-[10px] md:text-xs text-gray-600 mb-0.5 md:mb-1">Thời gian</p>
                        <p className="text-xl md:text-2xl font-bold" style={{ color: colors.text }}>
                            {formatTime(totalTime)}
                        </p>
                        {penaltyTime > 0 && (
                            <p className="text-[10px] md:text-xs text-red-600 mt-0.5 md:mt-1">
                                (+{penaltyTime}s phạt)
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-3 md:p-4 rounded-xl"
                        style={{ backgroundColor: colors.bg }}
                    >
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2" style={{ color: colors.primary }} />
                        <p className="text-[10px] md:text-xs text-gray-600 mb-0.5 md:mb-1">Kết quả</p>
                        <p className="text-sm md:text-base font-semibold" style={{ color: colors.text }}>
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

                {/* Tab Navigation */}
                <div className="px-6 pt-4 flex gap-4 border-b border-gray-100 bg-gray-50/50">
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`pb-2.5 font-serif font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
                            activeTab === 'summary'
                                ? 'border-[#7a6f5d] text-[#3d3529]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Tóm Tắt Bài Học
                    </button>
                    <button
                        onClick={() => setActiveTab('keypoints')}
                        className={`pb-2.5 font-serif font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
                            activeTab === 'keypoints'
                                ? 'border-[#7a6f5d] text-[#3d3529]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <GraduationCap className="w-4 h-4" />
                        Trọng Tâm Ôn Tập
                    </button>
                </div>

                {/* Tab Content & Diagrams */}
                <div className="p-5 md:p-6 bg-[#faf8f5] border-b max-h-[360px] md:max-h-[460px] overflow-y-auto flex flex-col gap-6 scrollbar-thin">
                    <AnimatePresence mode="wait">
                        {activeTab === 'summary' ? (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-4 text-left"
                            >
                                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-serif">
                                    <span
                                        className="float-left text-4xl md:text-5xl font-serif font-bold mr-2 mt-1 line-height-none"
                                        style={{ color: colors.primary }}
                                    >
                                        {lesson.content.charAt(0)}
                                    </span>
                                    {lesson.content.slice(1)}
                                </p>

                                {/* Cursive quote callout */}
                                <div className="mt-2 p-4 rounded-xl border-l-4 italic font-serif text-sm bg-amber-50/40 border-[#7a6f5d]/20 text-[#5a5244] relative shadow-sm">
                                    <span className="absolute -top-3 left-1 text-5xl text-[#7a6f5d]/10 font-serif">“</span>
                                    "{LEVEL_QUOTES[level] || completedSentence}"
                                    <span className="absolute -bottom-8 right-2 text-5xl text-[#7a6f5d]/10 font-serif">”</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="keypoints"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-left"
                            >
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 gap-3"
                                >
                                    {lesson.keyPoints.map((point, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderColor: colors.primary }}
                                            className="p-4 rounded-xl border bg-white flex gap-3 items-start border-[#7a6f5d]/15"
                                        >
                                            <span
                                                className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5"
                                                style={{ backgroundColor: colors.primary }}
                                            >
                                                {index + 1}
                                            </span>
                                            <span className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed">
                                                {point}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Concept Diagram Section */}
                    {LEVEL_DIAGRAMS[level] && (
                        <div className="border-t border-[#7a6f5d]/15 pt-5 mt-2 text-left">
                            <h4 className="text-xs uppercase tracking-wider text-[#7a6f5d] font-bold font-serif mb-3 flex items-center gap-1.5">
                                <Share2 className="w-3.5 h-3.5" />
                                Sơ Đồ Phân Tích Khái Niệm
                            </h4>
                            <p className="text-[11px] text-slate-400 font-serif italic mb-3">
                                {LEVEL_DIAGRAMS[level].title}
                            </p>
                            
                            {LEVEL_DIAGRAMS[level].type === 'split' ? (
                                <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 p-3 rounded-2xl bg-amber-50/20 border-2 border-double border-[#7a6f5d]/15">
                                    <div className="flex-1 p-3 rounded-xl border bg-white flex flex-col gap-1.5 transition-all hover:shadow-sm" style={{ borderColor: `${colors.primary}25` }}>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white inline-block self-start font-serif" style={{ backgroundColor: colors.primary }}>
                                            {LEVEL_DIAGRAMS[level].items[0].label}
                                        </span>
                                        <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed font-serif">
                                            {LEVEL_DIAGRAMS[level].items[0].desc}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center justify-center text-[#7a6f5d]/30 font-bold py-1 md:py-0">
                                        <span className="text-lg md:rotate-0 rotate-90">⟷</span>
                                    </div>
                                    
                                    <div className="flex-1 p-3 rounded-xl border bg-white flex flex-col gap-1.5 transition-all hover:shadow-sm" style={{ borderColor: `${colors.primary}25` }}>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white inline-block self-start font-serif" style={{ backgroundColor: colors.primary }}>
                                            {LEVEL_DIAGRAMS[level].items[1].label}
                                        </span>
                                        <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed font-serif">
                                            {LEVEL_DIAGRAMS[level].items[1].desc}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-2xl bg-amber-50/20 border-2 border-double border-[#7a6f5d]/15">
                                    {LEVEL_DIAGRAMS[level].items.map((item, idx) => (
                                        <div key={idx} className="p-3 rounded-xl border bg-white flex flex-col gap-1.5 transition-all hover:shadow-sm" style={{ borderColor: `${item.color || colors.primary}25` }}>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white inline-block self-start font-serif" style={{ backgroundColor: item.color || colors.primary }}>
                                                {item.label}
                                            </span>
                                            <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed font-serif">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onReplay}
                        className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-colors w-full sm:w-auto"
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
                            className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 text-white transition-colors w-full sm:w-auto"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Màn tiếp theo
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}

                    {level === 8 && onViewMindMap && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onViewMindMap}
                            className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 text-white transition-colors shadow-md w-full sm:w-auto"
                            style={{ backgroundColor: '#b8860b' }}
                        >
                            Xem Bản Đồ Tư Duy
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBackToMenu}
                        className="px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 w-full sm:w-auto"
                    >
                        <Menu className="w-4 h-4" />
                        Menu
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
