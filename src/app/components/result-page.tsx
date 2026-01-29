import { motion } from 'motion/react';

interface ResultPageProps {
  sentences: string[];
  onBackToCover: () => void;
}

export function ResultPage({ sentences, onBackToCover }: ResultPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-[#f5f1e8] overflow-auto"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 29px, #e8e0d0 29px, #e8e0d0 31px),
          repeating-linear-gradient(90deg, transparent, transparent 29px, #e8e0d0 29px, #e8e0d0 31px)
        `
      }}
    >
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Newspaper Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 pb-6 border-b-4"
          style={{ borderColor: '#3d3529' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-px flex-1 bg-[#7a6f5d]" />
            <div className="px-6">
              <div className="text-xs tracking-widest uppercase mb-2" style={{ color: '#7a6f5d' }}>
                Tạp Chí Triết Học
              </div>
              <h1 className="text-5xl font-serif" style={{ color: '#3d3529' }}>
                BẢN ĐỒ NHẬN THỨC
              </h1>
              <div className="text-sm italic mt-2" style={{ color: '#5a5244' }}>
                Hành Trình Hoàn Tất
              </div>
            </div>
            <div className="h-px flex-1 bg-[#7a6f5d]" />
          </div>
          <div className="flex justify-between text-xs" style={{ color: '#7a6f5d' }}>
            <span>VOL. 1</span>
            <span>29 THÁNG 1, 2026</span>
            <span>XUẤT BẢN ĐẶC BIỆT</span>
          </div>
        </motion.div>

        {/* Main Article */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 
            className="text-3xl font-serif mb-6 text-center"
            style={{ color: '#3d3529' }}
          >
            Những Chân Lý Được Khám Phá
          </h2>
          
          <div className="space-y-8">
            {sentences.map((sentence, index) => {
              const levelNames = ['Sự Vận Động', 'Mâu Thuẫn', 'Phủ Định'];
              const levelColors = ['#4a90e2', '#e74c3c', '#9b59b6'];
              
              return (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="p-6 rounded-lg border-2 relative overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderColor: levelColors[index]
                  }}
                >
                  {/* Level number decoration */}
                  <div 
                    className="absolute top-0 left-0 w-20 h-20 flex items-center justify-center text-6xl font-bold opacity-10"
                    style={{ color: levelColors[index] }}
                  >
                    {index + 1}
                  </div>
                  
                  <div className="relative z-10">
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{
                        backgroundColor: levelColors[index],
                        color: '#fff'
                      }}
                    >
                      Level {index + 1}: {levelNames[index]}
                    </div>
                    
                    <p 
                      className="text-2xl font-serif italic leading-relaxed"
                      style={{ color: '#3d3529' }}
                    >
                      "{sentence}"
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${levelColors[index]}, transparent)`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Editorial Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="p-8 rounded-lg mb-12"
          style={{
            backgroundColor: 'rgba(61,53,41,0.05)',
            border: '2px dashed #7a6f5d'
          }}
        >
          <h3 
            className="text-xl font-serif mb-4 text-center"
            style={{ color: '#3d3529' }}
          >
            Lời Bình Luận
          </h3>
          <p 
            className="text-base leading-relaxed text-center max-w-2xl mx-auto"
            style={{ color: '#5a5244' }}
          >
            Qua hành trình này, bạn đã không chỉ di chuyển một con rắn trong không gian ảo, 
            mà đã trải nghiệm bản chất của nhận thức: từ sự vận động, qua mâu thuẫn, 
            đến phủ định của phủ định. Đó chính là con đường mà mọi sự phát triển đều phải trải qua.
          </p>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center mb-12 py-8"
        >
          <div className="max-w-2xl mx-auto">
            <div 
              className="text-6xl mb-4 opacity-20"
              style={{ color: '#7a6f5d' }}
            >
              ❝
            </div>
            <p 
              className="text-xl italic leading-relaxed mb-4"
              style={{ color: '#5a5244' }}
            >
              Nhận thức không phải là sự phản ánh thụ động, 
              mà là quá trình tích cực cải tạo thế giới.
            </p>
            <div 
              className="text-6xl opacity-20"
              style={{ color: '#7a6f5d' }}
            >
              ❞
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="grid grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: 'Cấp độ hoàn thành', value: '3/3', color: '#4a90e2' },
            { label: 'Chân lý khám phá', value: sentences.length, color: '#e74c3c' },
            { label: 'Mức thấu hiểu', value: '100%', color: '#9b59b6' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border-2"
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderColor: stat.color
              }}
            >
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: '#5a5244' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToCover}
            className="px-12 py-4 rounded-lg text-lg font-medium transition-all shadow-lg"
            style={{
              backgroundColor: '#3d3529',
              color: '#e8e4db',
              border: '2px solid #7a6f5d'
            }}
          >
            Trở về Trang Bìa
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center mt-12 pt-8 border-t"
          style={{ borderColor: '#7a6f5d' }}
        >
          <p className="text-xs tracking-widest uppercase" style={{ color: '#7a6f5d' }}>
            © 2026 - Bản Đồ Nhận Thức - Một Trải Nghiệm Triết Học Tương Tác
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
