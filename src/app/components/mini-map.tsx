import { ConceptOrb, Position } from './snake-game';

interface MiniMapProps {
  snake: Position[];
  orbs: ConceptOrb[];
  gridSize: number;
  color: string;
  className?: string;
  compact?: boolean;
}

export function MiniMap({ snake, orbs, gridSize, color, className = '', compact = false }: MiniMapProps) {
  // Mini-map size in pixels - smaller when compact (mobile overlay)
  const MAP_SIZE = compact ? 80 : 120;
  const CELL_SIZE = MAP_SIZE / gridSize;

  return (
    <div
      className={`backdrop-blur-md rounded-lg shadow-lg border-2 ${compact ? 'p-1' : 'p-2'} ${className}`}
      style={{
        width: MAP_SIZE + (compact ? 8 : 16),
        height: MAP_SIZE + (compact ? 8 : 16),
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderColor: color + '60',
      }}
    >
      <div className="relative" style={{ width: MAP_SIZE, height: MAP_SIZE }}>
        {/* Grid Background (optional, maybe just border) */}
        <div className="absolute inset-0 bg-slate-50/50 rounded-sm" />

        {/* Orbs */}
        {orbs.map((orb) => {
          const isCorrect = orb.isCorrect;
          // Only highlight correct orbs prominently as requested
          // Wrong orbs can be shown smaller or dimmer

          return (
            <div
              key={orb.id}
              className={`absolute rounded-full transition-all duration-300 ${isCorrect ? 'z-10 animate-pulse' : 'z-0'}`}
              style={{
                left: orb.position.x * CELL_SIZE,
                top: orb.position.y * CELL_SIZE,
                width: isCorrect ? CELL_SIZE : CELL_SIZE * 0.6,
                height: isCorrect ? CELL_SIZE : CELL_SIZE * 0.6,
                backgroundColor: isCorrect ? color : '#cbd5e1', // Theme color for correct, slate-300 for wrong
                opacity: isCorrect ? 1 : 0.5,
                transform: isCorrect ? 'scale(1.2)' : 'none',
              }}
            />
          );
        })}

        {/* Snake Body */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <div
              key={`snake-${index}`}
              className="absolute rounded-sm"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: isHead ? color : '#334155', // Theme color head, dark slate body
                zIndex: isHead ? 20 : 15,
                opacity: isHead ? 1 : 0.7
              }}
            />
          );
        })}
      </div>

      {/* Legend/Label - hidden when compact */}
      {!compact && (
        <div className="mt-1 text-[10px] text-center font-medium text-slate-500 uppercase tracking-wider">
          Bản đồ
        </div>
      )}
    </div>
  );
}
