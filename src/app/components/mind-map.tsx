import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, ZoomIn, ZoomOut, Maximize2, Check, BookOpen, Landmark, HelpCircle, Award } from 'lucide-react';
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
  // Categories
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
  // Sub-nodes: Dân tộc
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
  // Sub-nodes: Tôn giáo
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

export function MindMap({ onBack }: MindMapProps) {
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const getAnchorPoints = (nodeId: string) => {
    const node = NODES.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    // Returns left, right depending on connection layout
    if (node.type === 'root') {
      return {
        left: { x: node.x - 110, y: node.y },
        right: { x: node.x + 110, y: node.y }
      };
    }

    if (node.id === 'cat-dantoc') {
      return {
        left: { x: node.x - 90, y: node.y },
        right: { x: node.x + 90, y: node.y }
      };
    }

    if (node.id === 'cat-tongiao') {
      return {
        left: { x: node.x - 90, y: node.y },
        right: { x: node.x + 90, y: node.y }
      };
    }

    if (node.parent === 'cat-dantoc') {
      return { right: { x: node.x + 100, y: node.y } };
    }

    if (node.parent === 'cat-tongiao') {
      return { left: { x: node.x - 100, y: node.y } };
    }

    return { x: node.x, y: node.y };
  };

  const getPathData = (fromId: string, toId: string) => {
    const fromAnchors = getAnchorPoints(fromId) as any;
    const toAnchors = getAnchorPoints(toId) as any;

    let startX = 0, startY = 0, endX = 0, endY = 0;

    if (fromId === 'root' && toId === 'cat-dantoc') {
      startX = fromAnchors.left.x;
      startY = fromAnchors.left.y;
      endX = toAnchors.right.x;
      endY = toAnchors.right.y;
    } else if (fromId === 'root' && toId === 'cat-tongiao') {
      startX = fromAnchors.right.x;
      startY = fromAnchors.right.y;
      endX = toAnchors.left.x;
      endY = toAnchors.left.y;
    } else if (fromId === 'cat-dantoc') {
      startX = fromAnchors.left.x;
      startY = fromAnchors.left.y;
      endX = toAnchors.right.x;
      endY = toAnchors.right.y;
    } else if (fromId === 'cat-tongiao') {
      startX = fromAnchors.right.x;
      startY = fromAnchors.right.y;
      endX = toAnchors.left.x;
      endY = toAnchors.left.y;
    }

    // Generate smooth bezier curve
    const controlPointX = (startX + endX) / 2;
    return `M ${startX} ${startY} C ${controlPointX} ${startY}, ${controlPointX} ${endY}, ${endX} ${endY}`;
  };

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    if (type === 'in') setZoom(prev => Math.min(1.4, prev + 0.1));
    else if (type === 'out') setZoom(prev => Math.max(0.6, prev - 0.1));
    else setZoom(1);
  };

  const handlePrint = () => {
    window.print();
  };

  const activeLesson = selectedNode?.lessonIndex ? LEVEL_LESSONS[selectedNode.lessonIndex] : null;

  return (
    <div className="w-full min-h-screen bg-[#e8e4db] flex flex-col relative overflow-hidden py-6 px-4 md:px-8">
      {/* Dynamic print style injection */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background: none !important;
          }
          #print-section, #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 297mm; /* Landscape A4 width */
            height: 210mm; /* Landscape A4 height */
            transform: scale(0.9) !important;
            transform-origin: top left;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-12 h-12 md:top-8 md:left-8 md:w-16 md:h-16 border-l-2 border-t-2 border-[#7a6f5d] pointer-events-none no-print" />
      <div className="absolute top-4 right-4 w-12 h-12 md:top-8 md:right-8 md:w-16 md:h-16 border-r-2 border-t-2 border-[#7a6f5d] pointer-events-none no-print" />
      <div className="absolute bottom-4 left-4 w-12 h-12 md:bottom-8 md:left-8 md:w-16 md:h-16 border-l-2 border-b-2 border-[#7a6f5d] pointer-events-none no-print" />
      <div className="absolute bottom-4 right-4 w-12 h-12 md:bottom-8 md:right-8 md:w-16 md:h-16 border-r-2 border-b-2 border-[#7a6f5d] pointer-events-none no-print" />

      {/* Header */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b-2 border-[#7a6f5d] pb-4 mb-4 relative z-20 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-[#5a5244] hover:text-[#3d3529] hover:bg-[#d4cfc2]/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Menu chính
        </button>

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#3d3529]">
            BẢN ĐỒ TƯ DUY TỔNG KẾT
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#7a6f5d] font-bold mt-1">
            Chương VI: Dân tộc & Tôn giáo
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-[#b8860b] hover:bg-[#966d03] transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            In / Lưu PDF
          </button>
        </div>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-[#7a6f5d] p-1.5 rounded-xl shadow-lg z-30 no-print">
        <button
          onClick={() => handleZoom('out')}
          className="p-2 text-[#7a6f5d] hover:bg-[#e8e4db] rounded-lg transition-all"
          title="Thu nhỏ"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-[#5a5244] min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => handleZoom('in')}
          className="p-2 text-[#7a6f5d] hover:bg-[#e8e4db] rounded-lg transition-all"
          title="Phóng to"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleZoom('reset')}
          className="p-2 text-[#7a6f5d] hover:bg-[#e8e4db] rounded-lg transition-all border-l border-[#7a6f5d]/30"
          title="Khôi phục"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Map Interactive Canvas */}
      <div className="flex-1 w-full overflow-auto flex items-center justify-center relative p-4 select-none">
        <div
          id="print-section"
          ref={printAreaRef}
          className="relative transition-transform duration-100 ease-out border-2 border-[#7a6f5d]/30 rounded-3xl bg-[#f5f2eb]/90 shadow-inner"
          style={{
            width: '1300px',
            height: '750px',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(122,111,93,0.02) 29px, rgba(122,111,93,0.02) 31px),
              repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(122,111,93,0.02) 29px, rgba(122,111,93,0.02) 31px)
            `
          }}
        >
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrow-left"
                viewBox="0 0 10 10"
                refX="0"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 10 0 L 0 5 L 10 10 z" fill="#7a6f5d" opacity="0.6" />
              </marker>
              <marker
                id="arrow-right"
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a6f5d" opacity="0.6" />
              </marker>
            </defs>
            {CONNECTIONS.map((conn, idx) => {
              const fromNode = NODES.find(n => n.id === conn.from);
              const toNode = NODES.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isLeftFlow = toNode.parent === 'cat-dantoc' || toNode.id === 'cat-dantoc';

              return (
                <g key={idx}>
                  {/* Outer path for vintage shadow/border effect */}
                  <path
                    d={getPathData(conn.from, conn.to)}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Main connection curve */}
                  <path
                    d={getPathData(conn.from, conn.to)}
                    fill="none"
                    stroke="#7a6f5d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    markerEnd={isLeftFlow ? "url(#arrow-left)" : "url(#arrow-right)"}
                    opacity="0.75"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Render Nodes */}
          {NODES.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            
            // Adjust widths/heights according to node type
            let nodeWidth = 'w-[220px]';
            let nodeHeight = 'h-[75px]';
            let nodeRound = 'rounded-2xl';
            let fontSize = 'text-xs md:text-sm';
            
            if (node.type === 'root') {
              nodeWidth = 'w-[240px]';
              nodeHeight = 'h-[85px]';
              nodeRound = 'rounded-3xl';
              fontSize = 'text-sm md:text-base font-bold';
            } else if (node.type === 'category') {
              nodeWidth = 'w-[180px]';
              nodeHeight = 'h-[65px]';
              nodeRound = 'rounded-xl';
              fontSize = 'text-xs md:text-sm font-semibold';
            }

            let leftPos = node.x;
            let topPos = node.y;
            if (node.type === 'root') {
              leftPos = node.x - 120;
              topPos = node.y - 42.5;
            } else if (node.type === 'category') {
              leftPos = node.x - 90;
              topPos = node.y - 32.5;
            } else {
              leftPos = node.x - 110;
              topPos = node.y - 37.5;
            }

            return (
              <motion.button
                key={node.id}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedNode(node)}
                className={`absolute ${nodeWidth} ${nodeHeight} ${nodeRound} p-2 flex flex-col items-center justify-center text-center transition-colors border-2 shadow-md z-10`}
                style={{
                  left: `${leftPos}px`,
                  top: `${topPos}px`,
                  backgroundColor: isSelected ? node.hoverColor : node.color,
                  borderColor: '#7a6f5d',
                  color: node.textColor
                }}
              >
                <div className="flex items-center gap-1.5 justify-center w-full">
                  {node.icon && <node.icon className="w-4 h-4 flex-shrink-0 opacity-80" />}
                  <span className={`${fontSize} font-serif tracking-wide leading-tight whitespace-pre-line`}>
                    {node.label}
                  </span>
                </div>
                {node.level && (
                  <span className="text-[8px] opacity-75 uppercase tracking-wider font-bold mt-1">
                    MÀN {node.level}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Floating Detailed Sidebar/Drawer on Selection */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-[#fcfaf7] border-l-4 border-[#7a6f5d] shadow-2xl z-50 flex flex-col p-6 overflow-y-auto no-print"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-start border-b border-[#7a6f5d]/30 pb-4 mb-4">
              <div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: selectedNode.color }}
                >
                  {selectedNode.type === 'root'
                    ? 'Gốc lý luận'
                    : selectedNode.type === 'category'
                    ? 'Chuyên đề lớn'
                    : `Chương học - Màn ${selectedNode.level}`}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#3d3529] mt-2">
                  {selectedNode.label.replace('\n', ' ')}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="w-8 h-8 rounded-full border border-[#7a6f5d]/30 flex items-center justify-center text-[#7a6f5d] hover:bg-[#e8e4db] transition-all font-bold text-lg"
              >
                ×
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 flex flex-col gap-6 text-left">
              {/* Core concept explanation */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                  Tóm tắt nội dung
                </h4>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                  {selectedNode.description}
                </p>
              </div>

              {/* Detail points if it's connected to level lesson */}
              {activeLesson && (
                <>
                  <div className="p-4 rounded-xl border border-[#7a6f5d]/20 bg-[#e8e4db]/30 flex flex-col gap-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#7a6f5d]">
                      Luận điểm sách giáo khoa
                    </h5>
                    <p className="text-sm italic font-serif leading-relaxed text-slate-600">
                      "{activeLesson.content}"
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-[#7a6f5d]/20 pb-1">
                      Các trọng tâm ôn thi
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {activeLesson.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: selectedNode.color }}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="text-xs md:text-sm text-slate-700 font-normal leading-snug">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Footer Close */}
            <div className="border-t border-[#7a6f5d]/20 pt-4 mt-6">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-3 bg-[#3d3529] hover:bg-[#252019] text-white rounded-xl font-semibold text-sm transition-all"
              >
                Đóng thông tin chi tiết
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
