import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
}

interface ParticleEffectProps {
  x: number;
  y: number;
  color: string;
  count?: number;
}

export function ParticleEffect({ x, y, color, count = 12 }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 2 + Math.random() * 2;
      newParticles.push({
        id: `particle-${i}-${Date.now()}`,
        x,
        y,
        color,
        size: 4 + Math.random() * 6,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity
      });
    }
    setParticles(newParticles);
  }, [x, y, color, count]);

  return (
    <AnimatePresence>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: particle.x + particle.velocityX * 30,
            y: particle.y + particle.velocityY * 30,
            scale: 0,
            opacity: 0
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: particle.color,
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: `0 0 10px ${particle.color}`
          }}
        />
      ))}
    </AnimatePresence>
  );
}
