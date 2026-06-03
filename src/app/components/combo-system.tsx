import { motion, AnimatePresence } from 'motion/react';
import { Zap, Flame, Star } from 'lucide-react';

interface ComboSystemProps {
  combo: number;
  show: boolean;
  color: string;
}

export function ComboSystem({ combo, show, color }: ComboSystemProps) {
  const getComboIcon = () => {
    if (combo >= 4) return <Flame className="w-4 h-4 sm:w-6 sm:h-6" />;
    if (combo >= 2) return <Zap className="w-4 h-4 sm:w-6 sm:h-6" />;
    return <Star className="w-4 h-4 sm:w-6 sm:h-6" />;
  };

  const getComboText = () => {
    if (combo >= 5) return 'XUẤT SẮC!';
    if (combo >= 3) return 'TỐT LẮM!';
    if (combo >= 2) return 'TUYỆT VỜI!';
    return 'CHÍNH XÁC!';
  };

  return (
    <AnimatePresence>
      {show && combo > 0 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 15 }}
          className="fixed top-16 right-2 sm:top-20 sm:right-4 z-50 pointer-events-none"
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-lg"
              style={{ backgroundColor: color }}
            />

            {/* Main combo display - compact on mobile */}
            <div 
              className="relative px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 flex flex-col items-center gap-1 sm:gap-2"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: color,
                boxShadow: `0 0 20px ${color}80`
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ color }}
              >
                {getComboIcon()}
              </motion.div>

              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-2xl sm:text-4xl font-bold mb-0.5 sm:mb-1"
                  style={{ 
                    color,
                    textShadow: `0 0 20px ${color}80`
                  }}
                >
                  x{combo}
                </motion.div>
                <div 
                  className="text-[9px] sm:text-sm font-bold tracking-wider"
                  style={{ color: '#333' }}
                >
                  {getComboText()}
                </div>
              </div>

              {/* Particles - smaller on mobile */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((Math.PI * 2 * i) / 6) * 30,
                    y: Math.sin((Math.PI * 2 * i) / 6) * 30,
                    opacity: [1, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}