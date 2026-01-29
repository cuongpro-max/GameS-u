import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface HintSystemProps {
  currentWord: string;
  show: boolean;
  color: string;
}

export function HintSystem({ currentWord, show, color }: HintSystemProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 15 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div 
            className="px-6 py-3 rounded-full shadow-2xl border-2 flex items-center gap-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.98)',
              borderColor: color,
              boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 0 4px ${color}20`
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Lightbulb 
                className="w-5 h-5" 
                style={{ color }}
                fill={color}
              />
            </motion.div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: '#555' }}>
                Tìm từ:
              </span>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-lg font-bold px-3 py-1 rounded-lg"
                style={{
                  color: '#fff',
                  backgroundColor: color
                }}
              >
                {currentWord}
              </motion.span>
            </div>

            <ArrowRight className="w-4 h-4" style={{ color }} />
          </div>

          {/* Pointer arrow */}
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r-2 border-b-2"
            style={{
              backgroundColor: 'rgba(255,255,255,0.98)',
              borderColor: color
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
