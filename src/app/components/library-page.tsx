import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Check, Award, Landmark, HelpCircle } from 'lucide-react';
import { LEVEL_LESSONS, type LevelLesson } from '../utils/game-progress';

interface LibraryPageProps {
  onBack: () => void;
}

const LEVEL_THEMES: Record<number, { color: string; border: string; bg: string; icon: any }> = {
  1: { color: '#3498db', border: 'border-[#3498db]', bg: 'bg-[#ebf5fb]', icon: BookOpen },
  2: { color: '#4a90e2', border: 'border-[#4a90e2]', bg: 'bg-[#e8f4ff]', icon: Landmark },
  3: { color: '#27ae60', border: 'border-[#27ae60]', bg: 'bg-[#e8f8f0]', icon: HelpCircle },
  4: { color: '#e74c3c', border: 'border-[#e74c3c]', bg: 'bg-[#ffe8e6]', icon: Award },
  5: { color: '#9b59b6', border: 'border-[#9b59b6]', bg: 'bg-[#f4ecf7]', icon: BookOpen },
  6: { color: '#4b0082', border: 'border-[#4b0082]', bg: 'bg-[#eebbfa]', icon: HelpCircle },
  7: { color: '#00ced1', border: 'border-[#00ced1]', bg: 'bg-[#e0ffff]', icon: Award },
  8: { color: '#ffd700', border: 'border-[#ffd700]', bg: 'bg-[#fff8dc]', icon: Landmark },
};

export function LibraryPage({ onBack }: LibraryPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const lesson = LEVEL_LESSONS[selectedLevel];
  const theme = LEVEL_THEMES[selectedLevel];
  const Icon = theme.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-[#e8e4db] flex flex-col relative overflow-y-auto py-8 px-4 md:px-8"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 29px, #d4cfc2 29px, #d4cfc2 31px),
          repeating-linear-gradient(90deg, transparent, transparent 29px, #d4cfc2 29px, #d4cfc2 31px)
        `
      }}
    >
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-12 h-12 md:top-8 md:left-8 md:w-16 md:h-16 border-l-2 border-t-2 border-[#7a6f5d]" />
      <div className="absolute top-4 right-4 w-12 h-12 md:top-8 md:right-8 md:w-16 md:h-16 border-r-2 border-t-2 border-[#7a6f5d]" />
      <div className="absolute bottom-4 left-4 w-12 h-12 md:bottom-8 md:left-8 md:w-16 md:h-16 border-l-2 border-b-2 border-[#7a6f5d]" />
      <div className="absolute bottom-4 right-4 w-12 h-12 md:bottom-8 md:right-8 md:w-16 md:h-16 border-r-2 border-b-2 border-[#7a6f5d]" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col gap-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#7a6f5d] pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-[#5a5244] hover:text-[#3d3529] hover:bg-[#d4cfc2]/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại Menu
          </button>
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#3d3529]" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#3d3529]">
              THƯ VIỆN TRI THỨC
            </h1>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#7a6f5d] font-bold hidden sm:inline">
            Chương VI: Dân tộc & Tôn giáo
          </span>
        </div>

        {/* Main Content Split Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Level Navigation (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-[650px] overflow-y-auto pr-2">
            <p className="text-xs uppercase tracking-wider text-[#7a6f5d] font-bold mb-1">Danh sách chương học</p>
            {Object.keys(LEVEL_LESSONS).map((lvlKey) => {
              const lvlNum = parseInt(lvlKey);
              const isActive = selectedLevel === lvlNum;
              const lvlLesson = LEVEL_LESSONS[lvlNum];
              const lvlTheme = LEVEL_THEMES[lvlNum];

              return (
                <motion.button
                  key={lvlNum}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedLevel(lvlNum)}
                  className={`w-full text-left p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    isActive
                      ? `bg-white border-[#3d3529] shadow-md`
                      : 'bg-white/60 border-transparent hover:bg-white/80 hover:border-[#7a6f5d]/50'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: lvlTheme.color }}
                  >
                    {lvlNum}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">MÀN {lvlNum}</p>
                    <p className="font-serif font-bold text-sm text-[#3d3529] truncate">{lvlLesson.title}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Reading panel (8 cols) */}
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-8 bg-white border-2 border-[#7a6f5d] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col gap-6`}
          >
            {/* Header Title */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: theme.color }}
                >
                  Bài Học Số {selectedLevel}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Triết học Mác - Lênin
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3d3529] leading-tight">
                {lesson.title}
              </h2>
            </div>

            {/* Graphic and Quote Block */}
            <div
              className={`p-4 rounded-xl border-l-4 ${theme.bg} ${theme.border} flex items-start gap-4`}
            >
              <Icon className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: theme.color }} />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Luận điểm cốt lõi
                </p>
                <p className="text-sm font-serif italic text-slate-700 leading-relaxed">
                  "{lesson.content.substring(0, 150)}..."
                </p>
              </div>
            </div>

            {/* Full Summary Content */}
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-[#7a6f5d] font-bold border-b pb-1">
                Tóm Tắt Giáo Trình
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-slate-700 font-normal">
                {lesson.content}
              </p>
            </div>

            {/* Key points checklist */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-[#7a6f5d] font-bold border-b pb-1">
                Các điểm trọng tâm ôn tập
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: theme.color }}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-xs md:text-sm text-slate-700 font-normal">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
