import { motion, AnimatePresence } from 'motion/react';
import { Zap, Flame, Star } from 'lucide-react';

interface ComboSystemProps {
  combo: number;
  show: boolean;
  color: string;
}

export function ComboSystem({ combo, show, color }: ComboSystemProps) {
  const getComboIcon = () => {
    if (combo >= 4) return <Flame className="w-6 h-6" />;
    if (combo >= 2) return <Zap className="w-6 h-6" />;
    return <Star className="w-6 h-6" />;
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
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="fixed top-1/2 left-8 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: color }}
            />

            {/* Main combo display */}
            <div 
              className="relative px-6 py-4 rounded-2xl border-4 flex flex-col items-center gap-2"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: color,
                boxShadow: `0 0 40px ${color}80`
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
                  className="text-4xl font-bold mb-1"
                  style={{ 
                    color,
                    textShadow: `0 0 20px ${color}80`
                  }}
                >
                  x{combo}
                </motion.div>
                <div 
                  className="text-sm font-bold tracking-wider"
                  style={{ color: '#333' }}
                >
                  {getComboText()}
                </div>
              </div>

              {/* Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((Math.PI * 2 * i) / 8) * 50,
                    y: Math.sin((Math.PI * 2 * i) / 8) * 50,
                    opacity: [1, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
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