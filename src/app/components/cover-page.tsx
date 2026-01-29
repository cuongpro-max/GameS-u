import { motion } from 'motion/react';

interface CoverPageProps {
  onStart: () => void;
}

export function CoverPage({ onStart }: CoverPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#e8e4db] flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 29px, #d4cfc2 29px, #d4cfc2 31px),
          repeating-linear-gradient(90deg, transparent, transparent 29px, #d4cfc2 29px, #d4cfc2 31px)
        `
      }}
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#7a6f5d]" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#7a6f5d]" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#7a6f5d]" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#7a6f5d]" />

      <div className="max-w-2xl text-center px-8 space-y-8">
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-serif mb-2" style={{ color: '#3d3529' }}>
            BẢN ĐỒ NHẬN THỨC
          </h1>
          <div className="h-px bg-[#7a6f5d] w-48 mx-auto my-4" />
          <p className="text-xl italic" style={{ color: '#5a5244' }}>
            Hành Trình Qua Không Gian Triết Học
          </p>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative w-full h-64 rounded-lg overflow-hidden shadow-2xl border-4 border-[#7a6f5d]"
        >
          <img
            src="https://images.unsplash.com/photo-1632840820487-a827c16fb95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGlsb3NvcGh5JTIwYm9vayUyMHZpbnRhZ2UlMjBwYXBlcnxlbnwxfHx8fDE3Njk2NTkzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
          className="space-y-4"
        >
          <p className="text-base leading-relaxed" style={{ color: '#5a5244' }}>
            Trong trò chơi này, bạn sẽ không chỉ di chuyển một con rắn,
            mà dẫn dắt chính bản thân qua dòng chảy của nhận thức.
            Mỗi từ bạn thu thập là một mảnh ghép của chân lý.
          </p>
          <p className="text-sm italic" style={{ color: '#7a6f5d' }}>
            "Mỗi bước đi không chỉ là sự vận động, mà là sự thấu hiểu."
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-12 py-4 rounded-lg text-lg font-medium transition-all shadow-lg"
          style={{
            backgroundColor: '#3d3529',
            color: '#e8e4db',
            border: '2px solid #7a6f5d'
          }}
        >
          BẮT ĐẦU NHẬN THỨC
        </motion.button>

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
