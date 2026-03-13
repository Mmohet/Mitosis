import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const STAGE_DATA = [
  {
    name: "Interphase",
    desc: "The cell grows, carries out its normal functions, and prepares to divide. Crucially, the DNA replicates, though it remains loosely coiled as chromatin. The centrosomes have also duplicated.",
    cellPath: "M 200 20 C 299 20, 380 101, 380 200 C 380 299, 299 380, 200 380 C 101 380, 20 299, 20 200 C 20 101, 101 20, 200 20 Z",
    nucleus: [
      { id: 1, cx: 200, cy: 200, r: 80, op: 1, dash: "" },
      { id: 2, cx: 200, cy: 200, r: 80, op: 0, dash: "" }
    ],
    chromatin: [
      { id: 1, cx: 200, cy: 200, op: 1 },
      { id: 2, cx: 200, cy: 200, op: 0 }
    ],
    chromosomes: [
      { id: 1, x: 170, y: 170, rot: 30, sep: 0, op: 0 },
      { id: 2, x: 220, y: 160, rot: -45, sep: 0, op: 0 },
      { id: 3, x: 180, y: 230, rot: 60, sep: 0, op: 0 },
      { id: 4, x: 230, y: 220, rot: -15, sep: 0, op: 0 }
    ],
    centrosomes: [{ id: 1, x: 180, y: 100 }, { id: 2, x: 220, y: 100 }],
    spindleOpacity: 0
  },
  {
    name: "Prophase",
    desc: "The chromatin condenses into visible chromosomes, each consisting of two sister chromatids joined at the centromere. The nucleolus disappears, and the centrosomes begin moving to opposite poles, forming the early mitotic spindle.",
    cellPath: "M 200 20 C 299 20, 380 101, 380 200 C 380 299, 299 380, 200 380 C 101 380, 20 299, 20 200 C 20 101, 101 20, 200 20 Z",
    nucleus: [
      { id: 1, cx: 200, cy: 200, r: 80, op: 0.5, dash: "10 5" },
      { id: 2, cx: 200, cy: 200, r: 80, op: 0, dash: "10 5" }
    ],
    chromatin: [
      { id: 1, cx: 200, cy: 200, op: 0 },
      { id: 2, cx: 200, cy: 200, op: 0 }
    ],
    chromosomes: [
      { id: 1, x: 170, y: 170, rot: 30, sep: 0, op: 1 },
      { id: 2, x: 220, y: 160, rot: -45, sep: 0, op: 1 },
      { id: 3, x: 180, y: 230, rot: 60, sep: 0, op: 1 },
      { id: 4, x: 230, y: 220, rot: -15, sep: 0, op: 1 }
    ],
    centrosomes: [{ id: 1, x: 140, y: 90 }, { id: 2, x: 260, y: 90 }],
    spindleOpacity: 0.2
  },
  {
    name: "Prometaphase",
    desc: "The nuclear envelope completely fragments and breaks down. Spindle fibers extending from the centrosomes reach the center of the cell and attach to the kinetochores (protein structures on the centromeres of the chromosomes).",
    cellPath: "M 200 20 C 299 20, 380 101, 380 200 C 380 299, 299 380, 200 380 C 101 380, 20 299, 20 200 C 20 101, 101 20, 200 20 Z",
    nucleus: [
      { id: 1, cx: 200, cy: 200, r: 80, op: 0, dash: "5 10" },
      { id: 2, cx: 200, cy: 200, r: 80, op: 0, dash: "5 10" }
    ],
    chromatin: [
      { id: 1, cx: 200, cy: 200, op: 0 },
      { id: 2, cx: 200, cy: 200, op: 0 }
    ],
    chromosomes: [
      { id: 1, x: 190, y: 130, rot: 10, sep: 0, op: 1 },
      { id: 2, x: 210, y: 170, rot: -10, sep: 0, op: 1 },
      { id: 3, x: 195, y: 230, rot: 5, sep: 0, op: 1 },
      { id: 4, x: 205, y: 270, rot: -5, sep: 0, op: 1 }
    ],
    centrosomes: [{ id: 1, x: 80, y: 150 }, { id: 2, x: 320, y: 150 }],
    spindleOpacity: 0.6
  },
  {
    name: "Metaphase",
    desc: "The spindle fibers push and pull the chromosomes until they are perfectly aligned along the metaphase plate (the equator of the cell). This ensures each new cell will receive one copy of each chromosome.",
    cellPath: "M 200 25 C 299 25, 370 101, 370 200 C 370 299, 299 375, 200 375 C 101 375, 30 299, 30 200 C 30 101, 101 25, 200 25 Z",
    nucleus: [
      { id: 1, cx: 200, cy: 200, r: 80, op: 0, dash: "5 10" },
      { id: 2, cx: 200, cy: 200, r: 80, op: 0, dash: "5 10" }
    ],
    chromatin: [
      { id: 1, cx: 200, cy: 200, op: 0 },
      { id: 2, cx: 200, cy: 200, op: 0 }
    ],
    chromosomes: [
      { id: 1, x: 200, y: 120, rot: 0, sep: 0, op: 1 },
      { id: 2, x: 200, y: 170, rot: 0, sep: 0, op: 1 },
      { id: 3, x: 200, y: 230, rot: 0, sep: 0, op: 1 },
      { id: 4, x: 200, y: 280, rot: 0, sep: 0, op: 1 }
    ],
    centrosomes: [{ id: 1, x: 50, y: 200 }, { id: 2, x: 350, y: 200 }],
    spindleOpacity: 1
  },
  {
    name: "Anaphase",
    desc: "The sister chromatids abruptly separate at the centromere and are pulled toward opposite poles of the cell by the shortening spindle fibers. The cell itself begins to elongate.",
    cellPath: "M 200 40 C 310 40, 390 110, 390 200 C 390 290, 310 360, 200 360 C 90 360, 10 290, 10 200 C 10 110, 90 40, 200 40 Z",
    nucleus: [
      { id: 1, cx: 200, cy: 200, r: 80, op: 0, dash: "5 10" },
      { id: 2, cx: 200, cy: 200, r: 80, op: 0, dash: "5 10" }
    ],
    chromatin: [
      { id: 1, cx: 200, cy: 200, op: 0 },
      { id: 2, cx: 200, cy: 200, op: 0 }
    ],
    chromosomes: [
      { id: 1, x: 200, y: 120, rot: 0, sep: 60, op: 1 },
      { id: 2, x: 200, y: 170, rot: 0, sep: 60, op: 1 },
      { id: 3, x: 200, y: 230, rot: 0, sep: 60, op: 1 },
      { id: 4, x: 200, y: 280, rot: 0, sep: 60, op: 1 }
    ],
    centrosomes: [{ id: 1, x: 30, y: 200 }, { id: 2, x: 370, y: 200 }],
    spindleOpacity: 1
  },
  {
    name: "Telophase",
    desc: "The chromosomes reach the poles and begin to decondense back into chromatin. New nuclear envelopes form around each set of separated chromosomes. The mitotic spindle breaks down and a cleavage furrow begins to form.",
    cellPath: "M 200 180 C 260 50, 390 50, 390 200 C 390 350, 260 350, 200 220 C 140 350, 10 350, 10 200 C 10 50, 140 50, 200 180 Z",
    nucleus: [
      { id: 1, cx: 100, cy: 200, r: 60, op: 0.5, dash: "5 5" },
      { id: 2, cx: 300, cy: 200, r: 60, op: 0.5, dash: "5 5" }
    ],
    chromatin: [
      { id: 1, cx: 100, cy: 200, op: 0.5 },
      { id: 2, cx: 300, cy: 200, op: 0.5 }
    ],
    chromosomes: [
      { id: 1, x: 200, y: 180, rot: 20, sep: 110, op: 0.5 },
      { id: 2, x: 200, y: 190, rot: -30, sep: 90, op: 0.5 },
      { id: 3, x: 200, y: 210, rot: 45, sep: 110, op: 0.5 },
      { id: 4, x: 200, y: 220, rot: -10, sep: 90, op: 0.5 }
    ],
    centrosomes: [{ id: 1, x: 90, y: 120 }, { id: 2, x: 310, y: 120 }],
    spindleOpacity: 0.2
  },
  {
    name: "Cytokinesis",
    desc: "The cytoplasm fully divides as a cleavage furrow pinches the cell in two. This results in two distinct, genetically identical daughter cells, each returning to interphase.",
    cellPath: "M 200 200 C 200 50, 380 50, 380 200 C 380 350, 200 350, 200 200 C 200 350, 20 350, 20 200 C 20 50, 200 50, 200 200 Z",
    nucleus: [
      { id: 1, cx: 100, cy: 200, r: 60, op: 1, dash: "" },
      { id: 2, cx: 300, cy: 200, r: 60, op: 1, dash: "" }
    ],
    chromatin: [
      { id: 1, cx: 100, cy: 200, op: 1 },
      { id: 2, cx: 300, cy: 200, op: 1 }
    ],
    chromosomes: [
      { id: 1, x: 200, y: 180, rot: 20, sep: 110, op: 0 },
      { id: 2, x: 200, y: 190, rot: -30, sep: 90, op: 0 },
      { id: 3, x: 200, y: 210, rot: 45, sep: 110, op: 0 },
      { id: 4, x: 200, y: 220, rot: -10, sep: 90, op: 0 }
    ],
    centrosomes: [{ id: 1, x: 100, y: 120 }, { id: 2, x: 300, y: 120 }],
    spindleOpacity: 0
  }
];

export default function MitosisApp() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredPart, setHoveredPart] = useState(null);

  const stage = STAGE_DATA[currentStage];

  // Auto-play logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStage((prev) => (prev < STAGE_DATA.length - 1 ? prev + 1 : 0));
      }, 3500); // 3.5 seconds per stage
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle manual navigation
  const nextStage = () => setCurrentStage((p) => Math.min(STAGE_DATA.length - 1, p + 1));
  const prevStage = () => setCurrentStage((p) => Math.max(0, p - 1));

  // Determine Opacity based on Hover (Highlighting parts)
  const getOpacity = (partName, baseOpacity = 1) => {
    if (hoveredPart && hoveredPart !== partName) return baseOpacity * 0.15;
    return baseOpacity;
  };

  // Helper to generate the squiggly chromatin path
  const chromatinD = "M -30 -10 C -10 -40, 20 -30, 40 -10 C 60 10, 30 40, 0 30 C -30 20, -50 10, -30 -10 Z M -15 15 Q 5 -5, 15 15 T 25 -5 T 0 5 M 20 -20 Q 30 -10, 20 0 T -10 -20 T -20 10";

  // Calculate Spindle Fiber Lines
  const renderSpindleFibers = () => {
    const fibers = [];
    const cLeft = stage.centrosomes[0];
    const cRight = stage.centrosomes[1];

    // Pole to Pole Fibers (curved paths for volume)
    fibers.push(
      <path key="pole1" d={`M ${cLeft.x} ${cLeft.y} Q 200 130 ${cRight.x} ${cRight.y}`} fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" style={{ transition: 'all 1s ease-in-out' }} opacity={getOpacity('spindles', stage.spindleOpacity)} />,
      <path key="pole2" d={`M ${cLeft.x} ${cLeft.y} Q 200 270 ${cRight.x} ${cRight.y}`} fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" style={{ transition: 'all 1s ease-in-out' }} opacity={getOpacity('spindles', stage.spindleOpacity)} />,
      <path key="pole3" d={`M ${cLeft.x} ${cLeft.y} L ${cRight.x} ${cRight.y}`} fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" style={{ transition: 'all 1s ease-in-out' }} opacity={getOpacity('spindles', stage.spindleOpacity)} />
    );

    // Kinetochore Fibers
    stage.chromosomes.forEach((chrom, i) => {
      const rad = chrom.rot * (Math.PI / 180);
      
      // Left Kinetochore absolute coords
      const localKxL = chrom.sep === 0 ? -5 : -15;
      const absLx = chrom.x + (-chrom.sep + localKxL) * Math.cos(rad);
      const absLy = chrom.y + (-chrom.sep + localKxL) * Math.sin(rad);

      // Right Kinetochore absolute coords
      const localKxR = chrom.sep === 0 ? 5 : 15;
      const absRx = chrom.x + (chrom.sep + localKxR) * Math.cos(rad);
      const absRy = chrom.y + (chrom.sep + localKxR) * Math.sin(rad);

      fibers.push(
        <line key={`fibL${i}`} x1={cLeft.x} y1={cLeft.y} x2={absLx} y2={absLy} stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" style={{ transition: 'all 1s ease-in-out' }} opacity={getOpacity('spindles', stage.spindleOpacity)} />,
        <line key={`fibR${i}`} x1={cRight.x} y1={cRight.y} x2={absRx} y2={absRy} stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" style={{ transition: 'all 1s ease-in-out' }} opacity={getOpacity('spindles', stage.spindleOpacity)} />
      );
    });

    return fibers;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* Interactive Visual Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative h-[50vh] md:h-screen">
        <svg viewBox="0 0 400 400" className="w-full max-w-2xl h-full drop-shadow-2xl">
          
          {/* Cell Membrane */}
          <path 
            d={stage.cellPath} 
            fill="rgba(56, 189, 248, 0.08)" 
            stroke="#38bdf8" 
            strokeWidth="3" 
            style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            opacity={getOpacity('membrane')}
          />

          {/* Nuclear Envelopes */}
          {stage.nucleus.map((nuc) => (
            <circle 
              key={`nuc-${nuc.id}`}
              cx={nuc.cx} 
              cy={nuc.cy} 
              r={nuc.r} 
              fill="rgba(192, 132, 252, 0.1)" 
              stroke="#c084fc" 
              strokeWidth="2.5" 
              strokeDasharray={nuc.dash}
              style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
              opacity={getOpacity('nucleus', nuc.op)}
            />
          ))}

          {/* Chromatin (Loosely Coiled DNA) */}
          {stage.chromatin.map((chr) => (
            <g 
              key={`chromatin-${chr.id}`} 
              style={{ 
                transform: `translate(${chr.cx}px, ${chr.cy}px) scale(${chr.op > 0 ? 1.5 : 0.5})`, 
                transition: 'all 1.2s ease-in-out' 
              }}
              opacity={getOpacity('chromosomes', chr.op)}
            >
              <path d={chromatinD} stroke="#e879f9" strokeWidth="2" fill="none" opacity="0.6" />
              <path d={chromatinD} stroke="#e879f9" strokeWidth="2" fill="none" opacity="0.6" transform="rotate(90)" />
            </g>
          ))}

          {/* Mitotic Spindle Fibers */}
          {renderSpindleFibers()}

          {/* Centrosomes (Spindle Poles) */}
          {stage.centrosomes.map((c) => (
            <g 
              key={`centro-${c.id}`} 
              style={{ transform: `translate(${c.x}px, ${c.y}px)`, transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
              opacity={getOpacity('centrosomes')}
            >
              <circle r="9" fill="#fb923c" opacity="0.3" />
              <circle r="5" fill="#fb923c" />
              <circle r="2" fill="#fff" />
            </g>
          ))}

          {/* Chromosomes / Sister Chromatids */}
          {stage.chromosomes.map((chrom) => {
            const leftPath = chrom.sep === 0 ? "M -5 -20 Q 5 0, -5 20" : "M 10 -20 Q -15 0, 10 20";
            const rightPath = chrom.sep === 0 ? "M 5 -20 Q -5 0, 5 20" : "M -10 -20 Q 15 0, -10 20";
            const localKxL = chrom.sep === 0 ? -5 : -15;
            const localKxR = chrom.sep === 0 ? 5 : 15;

            return (
              <g 
                key={`chrom-${chrom.id}`} 
                style={{ 
                  transform: `translate(${chrom.x}px, ${chrom.y}px) rotate(${chrom.rot}deg)`, 
                  transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' 
                }}
                opacity={getOpacity('chromosomes', chrom.op)}
              >
                {/* Left Sister Chromatid */}
                <g style={{ transform: `translate(${-chrom.sep}px, 0)`, transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <path d={leftPath} stroke="#e879f9" strokeWidth="6" strokeLinecap="round" fill="none" style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  {/* Kinetochore */}
                  <circle cx={localKxL} cy="0" r="3" fill="#22d3ee" style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} opacity={getOpacity('kinetochores', 1)} />
                </g>
                
                {/* Right Sister Chromatid */}
                <g style={{ transform: `translate(${chrom.sep}px, 0)`, transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <path d={rightPath} stroke="#e879f9" strokeWidth="6" strokeLinecap="round" fill="none" style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  {/* Kinetochore */}
                  <circle cx={localKxR} cy="0" r="3" fill="#22d3ee" style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} opacity={getOpacity('kinetochores', 1)} />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Control Panel & Descriptions */}
      <div className="w-full md:w-[420px] bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 p-6 md:p-8 flex flex-col h-[50vh] md:h-screen overflow-y-auto shadow-2xl z-10">
        
        {/* Progress Timeline */}
        <div className="flex gap-1 mb-6">
          {STAGE_DATA.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentStage(i)}
              className={`h-2 flex-1 rounded cursor-pointer transition-colors ${currentStage >= i ? 'bg-blue-500' : 'bg-slate-800 hover:bg-slate-700'}`}
            ></div>
          ))}
        </div>

        {/* Stage Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-white">{stage.name}</h1>
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded">
              Stage {currentStage + 1} of 7
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed mb-8">
            {stage.desc}
          </p>

          {/* Legend (Interactive) */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Interactive Legend (Hover to Highlight)</h3>
            <div className="grid grid-cols-2 gap-2">
              <LegendItem id="membrane" color="#38bdf8" name="Cell Membrane" setHover={setHoveredPart} />
              <LegendItem id="nucleus" color="#c084fc" name="Nuclear Envelope" setHover={setHoveredPart} />
              <LegendItem id="centrosomes" color="#fb923c" name="Centrosomes" setHover={setHoveredPart} />
              <LegendItem id="spindles" color="#4ade80" name="Spindle Fibers" setHover={setHoveredPart} />
              <LegendItem id="chromosomes" color="#e879f9" name="Chromosomes" setHover={setHoveredPart} />
              <LegendItem id="kinetochores" color="#22d3ee" name="Kinetochores" setHover={setHoveredPart} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800 mt-auto">
          <button 
            onClick={prevStage} 
            disabled={currentStage === 0}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-1 py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-500 font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
          >
            {isPlaying ? <><Pause size={18}/> Pause</> : <><Play size={18}/> Auto-Play</>}
          </button>
          
          <button 
            onClick={nextStage} 
            disabled={currentStage === STAGE_DATA.length - 1}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper component for the legend items
function LegendItem({ id, color, name, setHover }) {
  return (
    <div 
      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-colors"
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(null)}
    >
      <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
      <span className="text-sm font-medium text-slate-300">{name}</span>
    </div>
  );
}
