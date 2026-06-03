import { motion } from 'motion/react';
import coverImg from '../../../image/Gemini_Generated_Image_56esfs56esfs56es (1).png';

interface CoverPageProps {
  onStart: () => void;
}

export function CoverPage({ onStart }: CoverPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-[#e8e4db] flex flex-col items-center justify-center relative overflow-y-auto py-8 px-4"
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

      <div className="max-w-2xl text-center px-4 md:px-8 space-y-4 md:space-y-6 my-auto">
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif mb-2 leading-tight px-2" style={{ color: '#3d3529' }}>
            Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội
          </h1>
          <div className="h-px bg-[#7a6f5d] w-24 md:w-48 mx-auto my-3" />
          <p className="text-base sm:text-lg md:text-xl italic font-serif" style={{ color: '#5a5244' }}>
            Hành Trình Qua Không Gian Triết Học
          </p>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative w-full h-36 sm:h-48 md:h-52 lg:h-64 rounded-lg overflow-hidden shadow-2xl border-4 border-[#7a6f5d]"
        >
          <img
            src={coverImg}
            alt="Philosophy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3d3529]/60 to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-2 md:space-y-3"
        >
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#5a5244' }}>
            Trong trò chơi này, bạn sẽ không chỉ di chuyển một con rắn,
            mà dẫn dắt chính bản thân qua dòng chảy của nhận thức.
            Mỗi từ bạn thu thập là một mảnh ghép của chân lý.
          </p>
          <p className="text-xs md:text-sm italic" style={{ color: '#7a6f5d' }}>
            "Mỗi bước đi không chỉ là sự vận động, mà là sự thấu hiểu."
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-3 md:px-12 md:py-4 rounded-lg text-base md:text-lg font-medium transition-all shadow-lg"
            style={{
              backgroundColor: '#3d3529',
              color: '#e8e4db',
              border: '2px solid #7a6f5d'
            }}
          >
            BẮT ĐẦU NHẬN THỨC
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xs tracking-widest uppercase"
          style={{ color: '#7a6f5d' }}
        >
          Một Tạp Chí Tương Tác Triết Học
        </motion.p>
      </div>
    </motion.div>
  );
}
