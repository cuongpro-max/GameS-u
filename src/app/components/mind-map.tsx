import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Check, BookOpen, Landmark, HelpCircle, Award, ChevronDown, ChevronRight } from 'lucide-react';
import { LEVEL_LESSONS } from '../utils/game-progress';

interface MindMapProps {
  onBack: () => void;
}

interface MindMapNode {
  id: string;
  label: string;
  type: 'root' | 'category' | 'sub';
  x: number;
  y: number;
  level?: number;
  color: string;
  hoverColor: string;
  textColor: string;
  description: string;
  parent?: string;
  lessonIndex?: number;
  icon?: any;
}

const NODES: MindMapNode[] = [
  {
    id: 'root',
    label: 'CHƯƠNG VI\nDÂN TỘC & TÔN GIÁO',
    type: 'root',
    x: 650,
    y: 375,
    color: '#b8860b',
    hoverColor: '#966d03',
    textColor: '#ffffff',
    description: 'Mối quan hệ biện chứng giữa vấn đề dân tộc và tôn giáo trong quá trình xây dựng chủ nghĩa xã hội, bao gồm cơ sở lý luận, cương lĩnh hành động và các nguyên tắc chính sách thực tiễn của Nhà nước Việt Nam.'
  },
  {
    id: 'cat-dantoc',
    label: 'VẤN ĐỀ DÂN TỘC',
    type: 'category',
    x: 400,
    y: 375,
    color: '#1a5490',
    hoverColor: '#123e6d',
    textColor: '#ffffff',
    parent: 'root',
    description: 'Nghiên cứu về sự hình thành các cộng đồng dân tộc tộc người, hai xu hướng phát triển khách quan của dân tộc và Cương lĩnh dân tộc của chủ nghĩa Mác - Lênin.'
  },
  {
    id: 'cat-tongiao',
    label: 'VẤN ĐỀ TÔN GIÁO',
    type: 'category',
    x: 900,
    y: 375,
    color: '#0d5c2e',
    hoverColor: '#073c1d',
    textColor: '#ffffff',
    parent: 'root',
    description: 'Nghiên cứu về thế giới quan tôn giáo dưới góc nhìn duy vật biện chứng: bản chất, nguyên nhân tồn tại, các đặc điểm xã hội và chính sách tự do tín ngưỡng tôn giáo tại Việt Nam.'
  },
  {
    id: 'sub-concept',
    label: 'Khái niệm Dân tộc',
    type: 'sub',
    level: 1,
    x: 140,
    y: 180,
    color: '#3498db',
    hoverColor: '#2980b9',
    textColor: '#ffffff',
    parent: 'cat-dantoc',
    lessonIndex: 1,
    icon: BookOpen,
    description: 'Lý giải dân tộc theo 2 nghĩa: nghĩa rộng (Quốc gia - dân tộc độc lập có lãnh thổ và nền kinh tế thống nhất) và nghĩa hẹp (Cộng đồng tộc người thành phần có chung ngôn ngữ, văn hóa và lịch sử).'
  },
  {
    id: 'sub-trends',
    label: 'Hai xu hướng phát triển',
    type: 'sub',
    level: 2,
    x: 140,
    y: 375,
    color: '#4a90e2',
    hoverColor: '#357abd',
    textColor: '#ffffff',
    parent: 'cat-dantoc',
    lessonIndex: 2,
    icon: Landmark,
    description: 'Sự vận động tự nhiên của các tộc người trong lịch sử gồm: Xu hướng tách ra tự quyết để khẳng định độc lập dân tộc và Xu hướng liên hiệp các dân tộc lại để tăng cường sức mạnh, xích lại gần nhau.'
  },
  {
    id: 'sub-program',
    label: 'Cương lĩnh Dân tộc',
    type: 'sub',
    level: 5,
    x: 140,
    y: 570,
    color: '#9b59b6',
    hoverColor: '#8e44ad',
    textColor: '#ffffff',
    parent: 'cat-dantoc',
    lessonIndex: 5,
    icon: BookOpen,
    description: 'Ba nội dung cốt lõi do V.I.Lênin soạn thảo nhằm giải quyết quan hệ dân tộc khoa học: Các dân tộc hoàn toàn bình đẳng; Các dân tộc được quyền tự quyết; Liên hiệp công nhân tất cả các dân tộc.'
  },
  {
    id: 'sub-nature',
    label: 'Bản chất Tôn giáo',
    type: 'sub',
    level: 6,
    x: 1160,
    y: 110,
    color: '#4b0082',
    hoverColor: '#3a0063',
    textColor: '#ffffff',
    parent: 'cat-tongiao',
    lessonIndex: 6,
    icon: HelpCircle,
    description: 'Dưới thế giới quan duy vật biện chứng, tôn giáo là một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan vào đầu óc con người. Tôn giáo mang thế giới quan duy tâm, xoa dịu tâm lý bất lực trước thực tế.'
  },
  {
    id: 'sub-causes',
    label: 'Nguyên nhân tồn tại',
    type: 'sub',
    level: 3,
    x: 1160,
    y: 242,
    color: '#27ae60',
    hoverColor: '#219653',
    textColor: '#ffffff',
    parent: 'cat-tongiao',
    lessonIndex: 3,
    icon: HelpCircle,
    description: 'Lý giải vì sao tôn giáo tiếp tục tồn tại lâu dài trong thời kỳ quá độ: Nguyên nhân nhận thức (dân trí chưa đồng đều), Tâm lý (nhu cầu an ủi), Kinh tế, Lịch sử (kế thừa văn hóa), và bị lợi dụng Chính trị.'
  },
  {
    id: 'sub-features',
    label: 'Đặc điểm Tôn giáo',
    type: 'sub',
    level: 7,
    x: 1160,
    y: 375,
    color: '#00ced1',
    hoverColor: '#00b5b8',
    textColor: '#ffffff',
    parent: 'cat-tongiao',
    lessonIndex: 7,
    icon: Award,
    description: 'Ba tính chất cơ bản gắn liền với sự vận động của tôn giáo: Tính lịch sử (có điểm sinh ra, phát triển và mất đi), Tính quần chúng (sinh hoạt tinh thần số đông), và Tính chính trị (phản ánh xung đột giai cấp hoặc bị lợi dụng).'
  },
  {
    id: 'sub-aspects',
    label: 'Hai mặt Tư tưởng & Chính trị',
    type: 'sub',
    level: 4,
    x: 1160,
    y: 507,
    color: '#e74c3c',
    hoverColor: '#c0392b',
    textColor: '#ffffff',
    parent: 'cat-tongiao',
    lessonIndex: 4,
    icon: Award,
    description: 'Nguyên tắc vàng để giải quyết vấn đề tôn giáo: Phân biệt rõ Mặt tư tưởng (niềm tin tôn giáo lành mạnh, cần giáo dục thuyết phục) và Mặt chính trị (sự thù địch lợi dụng đức tin chống phá cách mạng, phải trấn áp bằng luật pháp).'
  },
  {
    id: 'sub-policy',
    label: 'Chính sách Việt Nam',
    type: 'sub',
    level: 8,
    x: 1160,
    y: 640,
    color: '#f39c12',
    hoverColor: '#d35400',
    textColor: '#ffffff',
    parent: 'cat-tongiao',
    lessonIndex: 8,
    icon: Landmark,
    description: 'Chính sách tôn trọng và bảo đảm tự do tín ngưỡng, tôn giáo và không tín ngưỡng; đoàn kết lương - giáo vì khối đại đoàn kết dân tộc; nghiêm cấm các hành vi lợi dụng tôn giáo để chia rẽ khối đoàn kết hoặc chống phá.'
  }
];

const CONNECTIONS = [
  { from: 'root', to: 'cat-dantoc' },
  { from: 'root', to: 'cat-tongiao' },
  { from: 'cat-dantoc', to: 'sub-concept' },
  { from: 'cat-dantoc', to: 'sub-trends' },
  { from: 'cat-dantoc', to: 'sub-program' },
  { from: 'cat-tongiao', to: 'sub-nature' },
  { from: 'cat-tongiao', to: 'sub-causes' },
  { from: 'cat-tongiao', to: 'sub-features' },
  { from: 'cat-tongiao', to: 'sub-aspects' },
  { from: 'cat-tongiao', to: 'sub-policy' }
];

// ────────────────────────────────────────────────
// Mobile accordion tree component
// ────────────────────────────────────────────────
interface MobileTreeProps {
  onSelect: (node: MindMapNode) => void;
  selectedId: string | null;
}

function MobileTree({ onSelect, selectedId }: MobileTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'cat-dantoc': true,
    'cat-tongiao': true,
  });

  const rootNode = NODES.find(n => n.id === 'root')!;
  const categories = NODES.filter(n => n.type === 'category');

  const toggle = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-3 px-4 pb-24 pt-2 w-full max-w-lg mx-auto">
      {/* Root node */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(rootNode)}
        className="w-full py-4 px-5 rounded-2xl text-center font-bold text-base shadow-lg border-2 border-[#7a6f5d]/40"
        style={{
          backgroundColor: selectedId === rootNode.id ? rootNode.hoverColor : rootNode.color,
          color: rootNode.textColor
        }}
      >
        {rootNode.label.replace('\n', ' — ')}
      </motion.button>

      {/* Vertical connector from root */}
      <div className="flex justify-center">
        <div className="w-0.5 h-4 bg-[#7a6f5d]/50" />
      </div>

      {/* Categories + sub-nodes */}
      <div className="flex flex-col gap-4">
        {categories.map(cat => {
          const children = NODES.filter(n => n.parent === cat.id);
          const isOpen = expanded[cat.id];

          return (
            <div key={cat.id} className="flex flex-col">
              {/* Category header */}
              <div className="flex gap-2 items-center">
                <div className="w-4 h-0.5 bg-[#7a6f5d]/50 flex-shrink-0" />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onSelect(cat); toggle(cat.id); }}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm shadow-md border-2 border-[#7a6f5d]/30 flex items-center justify-between"
                  style={{
                    backgroundColor: selectedId === cat.id ? cat.hoverColor : cat.color,
                    color: cat.textColor
                  }}
                >
                  <span>{cat.label}</span>
                  {isOpen
                    ? <ChevronDown className="w-4 h-4 opacity-80 flex-shrink-0" />
                    : <ChevronRight className="w-4 h-4 opacity-80 flex-shrink-0" />
                  }
                </motion.button>
              </div>

              {/* Children */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-2 flex flex-col gap-2 border-l-2 border-[#7a6f5d]/25 pl-4">
                      {children.map(child => {
                        const Icon = child.icon;
                        return (
                          <motion.button
                            key={child.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onSelect(child)}
                            className="w-full py-3 px-4 rounded-xl text-sm shadow-sm border border-[#7a6f5d]/20 flex items-center gap-3 text-left"
                            style={{
                              backgroundColor: selectedId === child.id ? child.hoverColor : child.color,
                              color: child.textColor
                            }}
                          >
                            {Icon && <Icon className="w-4 h-4 flex-shrink-0 opacity-80" />}
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="font-semibold leading-snug">{child.label}</span>
                              {child.level && (
                                <span className="text-[10px] opacity-70 uppercase tracking-wider font-bold mt-0.5">
                                  Màn {child.level}
                                </span>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Desktop canvas component
// ────────────────────────────────────────────────
const CANVAS_W = 1300;
const CANVAS_H = 750;

function DesktopCanvas({ onSelect, selectedId }: { onSelect: (n: MindMapNode) => void; selectedId: string | null }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    isDragging.current = true;
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, panX: pan.x, panY: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.mouseX;
    const dy = e.clientY - dragStart.current.mouseY;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.min(1.4, Math.max(0.3, prev - e.deltaY * 0.001)));
  };

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    if (type === 'in') setZoom(p => Math.min(1.4, p + 0.1));
    else if (type === 'out') setZoom(p => Math.max(0.3, p - 0.1));
    else { setZoom(0.85); setPan({ x: 0, y: 0 }); }
  };

  const getAnchorPoints = (nodeId: string) => {
    const node = NODES.find(n => n.id === nodeId);
    if (!node) return {};
    if (node.type === 'root') {
      return {
        left: { x: node.x - 110, y: node.y },
        right: { x: node.x + 110, y: node.y }
      };
    }
    if (node.id === 'cat-dantoc' || node.id === 'cat-tongiao') {
      return {
        left: { x: node.x - 90, y: node.y },
        right: { x: node.x + 90, y: node.y }
      };
    }
    if (node.parent === 'cat-dantoc') return { right: { x: node.x + 100, y: node.y } };
    if (node.parent === 'cat-tongiao') return { left: { x: node.x - 100, y: node.y } };
    return {};
  };

  const getPathData = (fromId: string, toId: string) => {
    const fromA = getAnchorPoints(fromId) as any;
    const toA = getAnchorPoints(toId) as any;
    let sx = 0, sy = 0, ex = 0, ey = 0;
    if (fromId === 'root' && toId === 'cat-dantoc') { sx = fromA.left.x; sy = fromA.left.y; ex = toA.right.x; ey = toA.right.y; }
    else if (fromId === 'root' && toId === 'cat-tongiao') { sx = fromA.right.x; sy = fromA.right.y; ex = toA.left.x; ey = toA.left.y; }
    else if (fromId === 'cat-dantoc') { sx = fromA.left.x; sy = fromA.left.y; ex = toA.right.x; ey = toA.right.y; }
    else if (fromId === 'cat-tongiao') { sx = fromA.right.x; sy = fromA.right.y; ex = toA.left.x; ey = toA.left.y; }
    const cx = (sx + ex) / 2;
    return `M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ey}, ${ex} ${ey}`;
  };

  return (
    <div className="flex-1 w-full relative overflow-hidden select-none">
      {/* Pan/Zoom canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          style={{
            width: `${CANVAS_W}px`,
            height: `${CANVAS_H}px`,
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center center',
            position: 'relative',
            border: '2px solid rgba(122,111,93,0.3)',
            borderRadius: '24px',
            backgroundColor: 'rgba(245,242,235,0.9)',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(122,111,93,0.025) 29px, rgba(122,111,93,0.025) 31px),
              repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(122,111,93,0.025) 29px, rgba(122,111,93,0.025) 31px)
            `,
            flexShrink: 0,
          }}
        >
          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker id="arrow-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a6f5d" opacity="0.7" />
              </marker>
              <marker id="arrow-l" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 10 0 L 0 5 L 10 10 z" fill="#7a6f5d" opacity="0.7" />
              </marker>
            </defs>
            {CONNECTIONS.map((conn, idx) => {
              const toNode = NODES.find(n => n.id === conn.to);
              if (!toNode) return null;
              const isLeft = toNode.parent === 'cat-dantoc' || toNode.id === 'cat-dantoc';
              return (
                <g key={idx}>
                  <path d={getPathData(conn.from, conn.to)} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
                  <path
                    d={getPathData(conn.from, conn.to)}
                    fill="none"
                    stroke="#7a6f5d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    markerEnd={isLeft ? 'url(#arrow-l)' : 'url(#arrow-r)'}
                    opacity="0.75"
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map(node => {
            const isSelected = selectedId === node.id;
            let w = 220, h = 75, r = '16px';
            if (node.type === 'root') { w = 240; h = 85; r = '24px'; }
            else if (node.type === 'category') { w = 180; h = 65; r = '12px'; }
            const lx = node.type === 'root' ? node.x - 120 : node.type === 'category' ? node.x - 90 : node.x - 110;
            const ty = node.type === 'root' ? node.y - 42.5 : node.type === 'category' ? node.y - 32.5 : node.y - 37.5;
            const Icon = node.icon;
            return (
              <motion.button
                key={node.id}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.18)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(node)}
                style={{
                  position: 'absolute',
                  left: `${lx}px`,
                  top: `${ty}px`,
                  width: `${w}px`,
                  height: `${h}px`,
                  borderRadius: r,
                  backgroundColor: isSelected ? node.hoverColor : node.color,
                  color: node.textColor,
                  border: `2px solid ${isSelected ? '#fff' : '#7a6f5d'}`,
                  boxShadow: isSelected ? `0 0 0 3px ${node.color}80, 0 8px 24px rgba(0,0,0,0.15)` : '0 4px 12px rgba(0,0,0,0.12)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '8px', zIndex: 10, cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', width: '100%' }}>
                  {Icon && <Icon style={{ width: '14px', height: '14px', flexShrink: 0, opacity: 0.85 }} />}
                  <span style={{
                    fontSize: node.type === 'root' ? '13px' : '11px',
                    fontWeight: node.type === 'root' ? 700 : 600,
                    textAlign: 'center',
                    lineHeight: 1.35,
                    whiteSpace: 'pre-line',
                    fontFamily: 'serif'
                  }}>
                    {node.label}
                  </span>
                </div>
                {node.level && (
                  <span style={{ fontSize: '8px', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginTop: '3px' }}>
                    MÀN {node.level}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border-2 border-[#7a6f5d] p-1.5 rounded-xl shadow-lg z-30">
        <button onClick={() => handleZoom('out')} className="p-2 text-[#7a6f5d] hover:bg-[#e8e4db] rounded-lg transition-all" title="Thu nhỏ">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold text-[#5a5244] min-w-[44px] text-center">{Math.round(zoom * 100)}%</span>
        <button onClick={() => handleZoom('in')} className="p-2 text-[#7a6f5d] hover:bg-[#e8e4db] rounded-lg transition-all" title="Phóng to">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => handleZoom('reset')} className="p-2 text-[#7a6f5d] hover:bg-[#e8e4db] rounded-lg transition-all border-l border-[#7a6f5d]/30" title="Khôi phục">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────
export function MindMap({ onBack }: MindMapProps) {
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const activeLesson = selectedNode?.lessonIndex ? LEVEL_LESSONS[selectedNode.lessonIndex] : null;

  return (
    <div className="w-full min-h-screen bg-[#e8e4db] flex flex-col relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-[#7a6f5d] pointer-events-none" />
      <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-[#7a6f5d] pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-[#7a6f5d] pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-[#7a6f5d] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 border-b-2 border-[#7a6f5d]/40 bg-[#e8e4db]/80 backdrop-blur-sm z-20 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm text-[#5a5244] hover:text-[#3d3529] hover:bg-[#d4cfc2]/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Menu chính</span>
        </button>

        <div className="text-center flex-1 px-4">
          <h1 className="text-base md:text-2xl font-serif font-bold text-[#3d3529] leading-tight">
            BẢN ĐỒ TƯ DUY TỔNG KẾT
          </h1>
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#7a6f5d] font-bold mt-0.5 hidden sm:block">
            Chương VI: Dân tộc & Tôn giáo
          </p>
        </div>

        {/* Placeholder to balance header */}
        <div className="w-20 md:w-28" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* Map area */}
        <div className={`flex-1 overflow-y-auto md:overflow-hidden min-h-0 ${selectedNode && !isMobile ? 'md:mr-0' : ''}`}>
          {isMobile ? (
            <MobileTree
              onSelect={setSelectedNode}
              selectedId={selectedNode?.id ?? null}
            />
          ) : (
            <DesktopCanvas
              onSelect={setSelectedNode}
              selectedId={selectedNode?.id ?? null}
            />
          )}
        </div>

        {/* Desktop: inline sidebar */}
        <AnimatePresence>
          {selectedNode && !isMobile && (
            <motion.div
              key="desktop-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex flex-col border-l-4 border-[#7a6f5d]/50 bg-[#fcfaf7] overflow-y-auto flex-shrink-0"
              style={{ minHeight: 0 }}
            >
              <NodeDetail node={selectedNode} lesson={activeLesson} onClose={() => setSelectedNode(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: bottom sheet drawer */}
      <AnimatePresence>
        {selectedNode && isMobile && (
          <motion.div
            key="mobile-drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#fcfaf7] rounded-t-3xl shadow-2xl border-t-4 border-[#7a6f5d]/50 max-h-[75vh] flex flex-col"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-[#7a6f5d]/30" />
            </div>
            <div className="overflow-y-auto flex-1 min-h-0">
              <NodeDetail node={selectedNode} lesson={activeLesson} onClose={() => setSelectedNode(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {selectedNode && isMobile && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNode(null)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────────
// Shared detail panel
// ────────────────────────────────────────────────
interface NodeDetailProps {
  node: MindMapNode;
  lesson: any;
  onClose: () => void;
}

function NodeDetail({ node, lesson, onClose }: NodeDetailProps) {
  return (
    <div className="p-5 flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-3">
          <span
            className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-2"
            style={{ backgroundColor: node.color }}
          >
            {node.type === 'root' ? 'Gốc lý luận' : node.type === 'category' ? 'Chuyên đề lớn' : `Chương học - Màn ${node.level}`}
          </span>
          <h3 className="text-lg font-serif font-bold text-[#3d3529] leading-snug">
            {node.label.replace('\n', ' ')}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full border border-[#7a6f5d]/30 flex items-center justify-center text-[#7a6f5d] hover:bg-[#e8e4db] transition-all font-bold text-lg flex-shrink-0"
        >
          ×
        </button>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Tóm tắt nội dung</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{node.description}</p>
      </div>

      {/* Lesson detail */}
      {lesson && (
        <>
          <div className="p-4 rounded-xl border border-[#7a6f5d]/20 bg-[#e8e4db]/30">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#7a6f5d] mb-2">Luận điểm sách giáo khoa</h5>
            <p className="text-sm italic font-serif leading-relaxed text-slate-600">"{lesson.content}"</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-[#7a6f5d]/20 pb-1 mb-3">Các trọng tâm ôn thi</h4>
            <ul className="flex flex-col gap-2.5">
              {lesson.keyPoints.map((point: string, idx: number) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: node.color }}
                  >
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-xs text-slate-700 leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <button
        onClick={onClose}
        className="w-full py-3 bg-[#3d3529] hover:bg-[#252019] text-white rounded-xl font-semibold text-sm transition-all mt-auto"
      >
        Đóng thông tin
      </button>
    </div>
  );
}
