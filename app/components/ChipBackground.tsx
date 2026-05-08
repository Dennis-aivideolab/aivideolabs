'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChipBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const p = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
        setScrollProgress(p);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // As user scrolls 0→1:
  // - chip scale grows: 0.55 → 1.1
  // - circuit traces draw themselves (dashoffset)
  // - outer traces appear progressively
  // - opacity fades in then stays

  const scale = 0.55 + scrollProgress * 0.65;
  const opacity = 0.06 + scrollProgress * 0.09; // max 0.15 – very subtle
  const traceProgress = scrollProgress; // 0 → 1

  // Total length of each path group for dashoffset
  const LONG = 600;
  const MED = 400;
  const SHORT = 200;

  const dashLong = (p: number, delay = 0) => {
    const eff = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));
    return LONG - eff * LONG;
  };
  const dashMed = (p: number, delay = 0) => {
    const eff = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));
    return MED - eff * MED;
  };
  const dashShort = (p: number, delay = 0) => {
    const eff = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));
    return SHORT - eff * SHORT;
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.05s linear, opacity 0.05s linear',
        willChange: 'transform, opacity',
      }}>
        <svg
          width="900"
          height="900"
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chipGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B3FA0" />
              <stop offset="50%" stopColor="#4F6FD4" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
            <linearGradient id="chipGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="100%" stopColor="#6B3FA0" />
            </linearGradient>
          </defs>

          {/* ═══════════════════════════════════════
              CHIP BODY (center square)
          ═══════════════════════════════════════ */}
          <rect
            x="300" y="300" width="300" height="300"
            rx="12"
            stroke="url(#chipGrad1)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={`${LONG}`}
            strokeDashoffset={dashLong(traceProgress, 0)}
          />
          {/* Inner chip detail lines */}
          <rect
            x="320" y="320" width="260" height="260"
            rx="8"
            stroke="url(#chipGrad1)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
            strokeDasharray={`${MED}`}
            strokeDashoffset={dashMed(traceProgress, 0.05)}
          />

          {/* Chip core label area */}
          <rect
            x="370" y="370" width="160" height="160"
            rx="6"
            stroke="url(#chipGrad1)"
            strokeWidth="1.5"
            fill="rgba(99,102,241,0.04)"
            strokeDasharray={`${SHORT * 3}`}
            strokeDashoffset={dashShort(traceProgress, 0.1) * 3}
          />

          {/* Internal grid lines (circuit pattern on chip) */}
          {[390, 420, 450, 480, 510].map((x, i) => (
            <line
              key={`vg${i}`}
              x1={x} y1="375" x2={x} y2="525"
              stroke="url(#chipGrad1)"
              strokeWidth="0.6"
              opacity="0.3"
              strokeDasharray="150"
              strokeDashoffset={Math.max(0, 150 - Math.max(0, traceProgress - 0.1 - i * 0.03) / 0.6 * 150)}
            />
          ))}
          {[390, 420, 450, 480, 510].map((y, i) => (
            <line
              key={`hg${i}`}
              x1="375" y1={y} x2="525" y2={y}
              stroke="url(#chipGrad1)"
              strokeWidth="0.6"
              opacity="0.3"
              strokeDasharray="150"
              strokeDashoffset={Math.max(0, 150 - Math.max(0, traceProgress - 0.1 - i * 0.03) / 0.6 * 150)}
            />
          ))}

          {/* ═══════════════════════════════════════
              PINS – TOP SIDE (6 pins)
          ═══════════════════════════════════════ */}
          {[330, 360, 390, 420, 450, 510, 540, 570].map((x, i) => (
            <g key={`pt${i}`}>
              {/* Pin body */}
              <rect
                x={x - 7} y="278" width="14" height="22"
                rx="2"
                stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none"
                strokeDasharray="80"
                strokeDashoffset={Math.max(0, 80 - Math.max(0, traceProgress - 0.05 - i * 0.02) / 0.7 * 80)}
              />
            </g>
          ))}

          {/* PINS – BOTTOM SIDE */}
          {[330, 360, 390, 420, 450, 510, 540, 570].map((x, i) => (
            <rect
              key={`pb${i}`}
              x={x - 7} y="600" width="14" height="22"
              rx="2"
              stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none"
              strokeDasharray="80"
              strokeDashoffset={Math.max(0, 80 - Math.max(0, traceProgress - 0.05 - i * 0.02) / 0.7 * 80)}
            />
          ))}

          {/* PINS – LEFT SIDE */}
          {[330, 360, 390, 420, 450, 510, 540, 570].map((y, i) => (
            <rect
              key={`pl${i}`}
              x="278" y={y - 7} width="22" height="14"
              rx="2"
              stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none"
              strokeDasharray="80"
              strokeDashoffset={Math.max(0, 80 - Math.max(0, traceProgress - 0.05 - i * 0.02) / 0.7 * 80)}
            />
          ))}

          {/* PINS – RIGHT SIDE */}
          {[330, 360, 390, 420, 450, 510, 540, 570].map((y, i) => (
            <rect
              key={`pr${i}`}
              x="600" y={y - 7} width="22" height="14"
              rx="2"
              stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none"
              strokeDasharray="80"
              strokeDashoffset={Math.max(0, 80 - Math.max(0, traceProgress - 0.05 - i * 0.02) / 0.7 * 80)}
            />
          ))}

          {/* ═══════════════════════════════════════
              CIRCUIT TRACES – extending outward
          ═══════════════════════════════════════ */}

          {/* TOP traces – going up then branching */}
          {/* Trace from pin at x=330 → up → left branch */}
          <polyline
            points="330,278 330,220 180,220 180,150"
            stroke="url(#chipGrad1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.15)}
          />
          <polyline
            points="360,278 360,200 500,200 500,120 620,120"
            stroke="url(#chipGrad1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.18)}
          />
          <polyline
            points="420,278 420,240 260,240 260,160 180,160"
            stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.2)}
          />
          <polyline
            points="510,278 510,220 660,220 660,140 740,140"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.22)}
          />
          <polyline
            points="450,278 450,200 550,200 550,100"
            stroke="url(#chipGrad2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.17)}
          />
          <polyline
            points="570,278 570,180 720,180 720,100 800,100"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.25)}
          />

          {/* BOTTOM traces */}
          <polyline
            points="330,622 330,680 180,680 180,760"
            stroke="url(#chipGrad1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.15)}
          />
          <polyline
            points="390,622 390,700 260,700 260,780"
            stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.2)}
          />
          <polyline
            points="450,622 450,700 550,700 550,800"
            stroke="url(#chipGrad2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.17)}
          />
          <polyline
            points="510,622 510,680 660,680 660,760 740,760"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.22)}
          />
          <polyline
            points="540,622 540,700 720,700 720,800"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.25)}
          />
          <polyline
            points="570,622 570,720 800,720 800,800"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.27)}
          />

          {/* LEFT traces */}
          <polyline
            points="278,330 220,330 220,180 150,180"
            stroke="url(#chipGrad1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.15)}
          />
          <polyline
            points="278,390 200,390 200,260 120,260"
            stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.2)}
          />
          <polyline
            points="278,450 160,450 160,560 80,560"
            stroke="url(#chipGrad1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.17)}
          />
          <polyline
            points="278,510 200,510 200,640 120,640"
            stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.22)}
          />
          <polyline
            points="278,540 180,540 180,680 100,680"
            stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.25)}
          />
          <polyline
            points="278,570 140,570 140,720 80,720"
            stroke="url(#chipGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.27)}
          />

          {/* RIGHT traces */}
          <polyline
            points="622,330 680,330 680,180 760,180"
            stroke="url(#chipGrad2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.15)}
          />
          <polyline
            points="622,390 700,390 700,240 800,240"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.2)}
          />
          <polyline
            points="622,450 740,450 740,340 820,340"
            stroke="url(#chipGrad2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LONG} strokeDashoffset={dashLong(traceProgress, 0.17)}
          />
          <polyline
            points="622,510 700,510 700,640 800,640"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.22)}
          />
          <polyline
            points="622,540 760,540 760,680 840,680"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.25)}
          />
          <polyline
            points="622,570 720,570 720,740 820,740"
            stroke="url(#chipGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={MED} strokeDashoffset={dashMed(traceProgress, 0.28)}
          />

          {/* ═══════════════════════════════════════
              SOLDER PADS / VIA DOTS at trace endpoints
          ═══════════════════════════════════════ */}
          {[
            [150, 180], [120, 260], [80, 560], [120, 640], [100, 680], [80, 720],
            [760, 180], [800, 240], [820, 340], [800, 640], [840, 680], [820, 740],
            [180, 150], [620, 120], [740, 140], [800, 100],
            [180, 760], [260, 780], [550, 800], [740, 760], [720, 800], [800, 800],
            [550, 100],
          ].map(([cx, cy], i) => {
            const p = Math.max(0, traceProgress - 0.35);
            const localP = Math.min(1, p / 0.5 - i * 0.02);
            return localP > 0 ? (
              <circle
                key={`via${i}`}
                cx={cx} cy={cy} r="4"
                fill="none"
                stroke={i % 2 === 0 ? '#6B3FA0' : '#00D9FF'}
                strokeWidth="1.5"
                opacity={localP * 0.8}
              />
            ) : null;
          })}

          {/* Small square pads at pin connections */}
          {[330, 360, 390, 420, 450, 510, 540, 570].map((x, i) => {
            const p = Math.max(0, traceProgress - 0.1 - i * 0.015);
            return p > 0 ? (
              <g key={`padT${i}`}>
                <rect x={x - 4} y="270" width="8" height="8" rx="1"
                  fill={p > 0.5 ? 'rgba(0,217,255,0.15)' : 'none'}
                  stroke="url(#chipGrad1)" strokeWidth="1" opacity={Math.min(1, p * 2)} />
                <rect x={x - 4} y="622" width="8" height="8" rx="1"
                  fill={p > 0.5 ? 'rgba(0,217,255,0.15)' : 'none'}
                  stroke="url(#chipGrad1)" strokeWidth="1" opacity={Math.min(1, p * 2)} />
              </g>
            ) : null;
          })}
          {[330, 360, 390, 420, 450, 510, 540, 570].map((y, i) => {
            const p = Math.max(0, traceProgress - 0.1 - i * 0.015);
            return p > 0 ? (
              <g key={`padL${i}`}>
                <rect x="270" y={y - 4} width="8" height="8" rx="1"
                  fill={p > 0.5 ? 'rgba(107,63,160,0.15)' : 'none'}
                  stroke="url(#chipGrad2)" strokeWidth="1" opacity={Math.min(1, p * 2)} />
                <rect x="622" y={y - 4} width="8" height="8" rx="1"
                  fill={p > 0.5 ? 'rgba(107,63,160,0.15)' : 'none'}
                  stroke="url(#chipGrad2)" strokeWidth="1" opacity={Math.min(1, p * 2)} />
              </g>
            ) : null;
          })}

          {/* Corner decorations */}
          {[[300, 300], [600, 300], [300, 600], [600, 600]].map(([x, y], i) => {
            const p = Math.max(0, traceProgress - 0.05);
            const size = 14;
            return (
              <g key={`corner${i}`}>
                <rect
                  x={x - size / 2} y={y - size / 2}
                  width={size} height={size}
                  rx="3"
                  stroke="url(#chipGrad1)"
                  strokeWidth="2"
                  fill="rgba(0,217,255,0.05)"
                  opacity={Math.min(1, p * 3)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
