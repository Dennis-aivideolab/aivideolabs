'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChipBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docH > 0 ? Math.min(window.scrollY / docH, 1) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const p = scrollProgress;

  // Scale: starts small, grows as user scrolls
  const scale = 0.5 + p * 0.7;
  // Slight 3-D tilt that relaxes to flat at full scroll
  const rotX = 28 - p * 28;   // 28deg → 0deg
  const rotZ = -6 + p * 6;    // -6deg → 0deg
  // Opacity: fades in, stays readable
  const opacity = 0.07 + p * 0.11;

  // Stroke-dashoffset helper: returns offset for a trace of given length, appearing at delay (0-1)
  const dash = (len: number, delay = 0, speed = 0.7) => {
    const eff = Math.max(0, Math.min(1, (p - delay) / speed));
    return len * (1 - eff);
  };

  const C = '#22D3EE';   // cyan traces
  const V = '#7C3AED';   // violet traces
  const M = '#818CF8';   // indigo mid

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      perspective: '1200px',
    }}>
      <div style={{
        transform: `scale(${scale}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
        opacity,
        transition: 'transform 0.08s linear, opacity 0.08s linear',
        willChange: 'transform, opacity',
        transformStyle: 'preserve-3d',
      }}>
        <svg width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cg1" x1="0" y1="1000" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#5B21B6"/>
              <stop offset="50%"  stopColor="#3B82F6"/>
              <stop offset="100%" stopColor="#22D3EE"/>
            </linearGradient>
            <linearGradient id="cg2" x1="1000" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#22D3EE"/>
              <stop offset="100%" stopColor="#7C3AED"/>
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ══════════════════════════════════════
              CHIP BODY
          ══════════════════════════════════════ */}
          {/* Outer casing */}
          <rect x="310" y="310" width="380" height="380" rx="16"
            stroke="url(#cg1)" strokeWidth="3" fill="rgba(30,40,100,0.3)"
            strokeDasharray="1520" strokeDashoffset={dash(1520, 0, 0.25)}
            filter="url(#glow)"
          />
          {/* Inner border */}
          <rect x="330" y="330" width="340" height="340" rx="10"
            stroke={M} strokeWidth="1.2" fill="rgba(20,30,80,0.2)" strokeOpacity="0.6"
            strokeDasharray="1360" strokeDashoffset={dash(1360, 0.04, 0.25)}
          />
          {/* Die area */}
          <rect x="380" y="380" width="240" height="240" rx="6"
            stroke="url(#cg1)" strokeWidth="1.5" fill="rgba(40,50,120,0.15)"
            strokeDasharray="960" strokeDashoffset={dash(960, 0.08, 0.25)}
          />

          {/* Internal grid – circuit layer */}
          {[400,430,460,490,520,550,580].map((x,i) => (
            <line key={`vg${i}`} x1={x} y1="385" x2={x} y2="615"
              stroke={M} strokeWidth="0.5" strokeOpacity="0.25"
              strokeDasharray="230" strokeDashoffset={dash(230, 0.1+i*0.015, 0.4)}
            />
          ))}
          {[400,430,460,490,520,550,580].map((y,i) => (
            <line key={`hg${i}`} x1="385" y1={y} x2="615" y2={y}
              stroke={M} strokeWidth="0.5" strokeOpacity="0.25"
              strokeDasharray="230" strokeDashoffset={dash(230, 0.1+i*0.015, 0.4)}
            />
          ))}

          {/* Corner marks on die */}
          {[[380,380],[620,380],[380,620],[620,620]].map(([x,y],i) => (
            <g key={`cm${i}`} opacity={Math.min(1, Math.max(0,(p-0.06)*5))}>
              <rect x={x-8} y={y-8} width={16} height={16} rx="3"
                stroke="url(#cg1)" strokeWidth="2" fill="rgba(34,211,238,0.08)"/>
            </g>
          ))}

          {/* Center processor mark */}
          <rect x="460" y="460" width="80" height="80" rx="4"
            stroke="url(#cg1)" strokeWidth="1.8" fill="rgba(34,211,238,0.05)"
            strokeDasharray="320" strokeDashoffset={dash(320, 0.12, 0.3)}
          />
          <line x1="500" y1="462" x2="500" y2="538"
            stroke={C} strokeWidth="0.8" strokeOpacity="0.4"
            strokeDasharray="76" strokeDashoffset={dash(76, 0.14, 0.3)}
          />
          <line x1="462" y1="500" x2="538" y2="500"
            stroke={C} strokeWidth="0.8" strokeOpacity="0.4"
            strokeDasharray="76" strokeDashoffset={dash(76, 0.14, 0.3)}
          />

          {/* ══════════════════════════════════════
              PINS – all 4 sides, 8 per side
          ══════════════════════════════════════ */}
          {/* TOP pins */}
          {[340,366,392,418,444,470,496,522,548,574,600,626,652].map((x,i) => (
            <g key={`pt${i}`}>
              <rect x={x-8} y={286} width={16} height={24} rx="2.5"
                stroke="url(#cg1)" strokeWidth="1.8" fill="rgba(30,40,100,0.4)"
                strokeDasharray="88" strokeDashoffset={dash(88, 0.05+i*0.012, 0.5)}
              />
              {/* Solder ball highlight */}
              <circle cx={x} cy={293} r="2.5"
                fill={C} fillOpacity={Math.max(0, (p-0.08)*4) * 0.7}
              />
            </g>
          ))}
          {/* BOTTOM pins */}
          {[340,366,392,418,444,470,496,522,548,574,600,626,652].map((x,i) => (
            <g key={`pb${i}`}>
              <rect x={x-8} y={690} width={16} height={24} rx="2.5"
                stroke="url(#cg2)" strokeWidth="1.8" fill="rgba(30,40,100,0.4)"
                strokeDasharray="88" strokeDashoffset={dash(88, 0.05+i*0.012, 0.5)}
              />
              <circle cx={x} cy={705} r="2.5"
                fill={V} fillOpacity={Math.max(0, (p-0.08)*4) * 0.7}
              />
            </g>
          ))}
          {/* LEFT pins */}
          {[340,366,392,418,444,470,496,522,548,574,600,626,652].map((y,i) => (
            <g key={`pl${i}`}>
              <rect x={286} y={y-8} width={24} height={16} rx="2.5"
                stroke="url(#cg1)" strokeWidth="1.8" fill="rgba(30,40,100,0.4)"
                strokeDasharray="88" strokeDashoffset={dash(88, 0.05+i*0.012, 0.5)}
              />
              <circle cx={293} cy={y} r="2.5"
                fill={M} fillOpacity={Math.max(0, (p-0.08)*4) * 0.7}
              />
            </g>
          ))}
          {/* RIGHT pins */}
          {[340,366,392,418,444,470,496,522,548,574,600,626,652].map((y,i) => (
            <g key={`pr${i}`}>
              <rect x={690} y={y-8} width={24} height={16} rx="2.5"
                stroke="url(#cg2)" strokeWidth="1.8" fill="rgba(30,40,100,0.4)"
                strokeDasharray="88" strokeDashoffset={dash(88, 0.05+i*0.012, 0.5)}
              />
              <circle cx={705} cy={y} r="2.5"
                fill={C} fillOpacity={Math.max(0, (p-0.08)*4) * 0.7}
              />
            </g>
          ))}

          {/* ══════════════════════════════════════
              CIRCUIT TRACES – extending outward
          ══════════════════════════════════════ */}
          {/* TOP TRACES */}
          <polyline points="340,286 340,220 180,220 180,130 100,130"     stroke="url(#cg1)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="700" strokeDashoffset={dash(700,0.18)}/>
          <polyline points="392,286 392,200 560,200 560,110 680,110"     stroke="url(#cg1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="650" strokeDashoffset={dash(650,0.21)}/>
          <polyline points="444,286 444,240 280,240 280,155 180,155"     stroke={M}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="550" strokeDashoffset={dash(550,0.23)}/>
          <polyline points="496,286 496,180 640,180 640,100 780,100"     stroke="url(#cg2)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="700" strokeDashoffset={dash(700,0.20)}/>
          <polyline points="548,286 548,220 730,220 730,130 850,130"     stroke="url(#cg2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset={dash(600,0.24)}/>
          <polyline points="600,286 600,200 780,200 780,90 900,90"       stroke={C}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset={dash(600,0.26)}/>
          <polyline points="652,286 652,170 860,170 860,80"              stroke="url(#cg2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="550" strokeDashoffset={dash(550,0.27)}/>

          {/* BOTTOM TRACES */}
          <polyline points="340,714 340,780 160,780 160,880 80,880"     stroke="url(#cg1)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="700" strokeDashoffset={dash(700,0.18)}/>
          <polyline points="392,714 392,800 240,800 240,900"            stroke={M}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.22)}/>
          <polyline points="444,714 444,760 560,760 560,880 680,880"    stroke="url(#cg1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset={dash(600,0.20)}/>
          <polyline points="496,714 496,820 640,820 640,920"            stroke="url(#cg2)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="550" strokeDashoffset={dash(550,0.21)}/>
          <polyline points="548,714 548,800 730,800 730,900"            stroke={C}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="550" strokeDashoffset={dash(550,0.24)}/>
          <polyline points="600,714 600,780 800,780 800,900 900,900"    stroke="url(#cg2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="650" strokeDashoffset={dash(650,0.23)}/>
          <polyline points="652,714 652,820 860,820 860,930"            stroke="url(#cg2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.26)}/>

          {/* LEFT TRACES */}
          <polyline points="286,340 220,340 220,170 130,170"            stroke="url(#cg1)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset={dash(600,0.18)}/>
          <polyline points="286,392 200,392 200,250 110,250"            stroke={M}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="450" strokeDashoffset={dash(450,0.22)}/>
          <polyline points="286,444 170,444 170,590 80,590"             stroke="url(#cg1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="550" strokeDashoffset={dash(550,0.20)}/>
          <polyline points="286,496 140,496 140,660 60,660"             stroke={C}         strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="550" strokeDashoffset={dash(550,0.19)}/>
          <polyline points="286,548 200,548 200,700 100,700"            stroke={M}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.23)}/>
          <polyline points="286,600 160,600 160,760 80,760"             stroke="url(#cg1)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset={dash(520,0.25)}/>
          <polyline points="286,652 120,652 120,830 60,830"             stroke="url(#cg1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.27)}/>

          {/* RIGHT TRACES */}
          <polyline points="714,340 780,340 780,170 870,170"            stroke="url(#cg2)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset={dash(600,0.18)}/>
          <polyline points="714,392 800,392 800,240 900,240"            stroke={C}         strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.22)}/>
          <polyline points="714,444 830,444 830,320 920,320"            stroke="url(#cg2)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.20)}/>
          <polyline points="714,496 860,496 860,380 950,380"            stroke={C}         strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset={dash(520,0.19)}/>
          <polyline points="714,548 800,548 800,680 920,680"            stroke="url(#cg2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset={dash(520,0.23)}/>
          <polyline points="714,600 840,600 840,740 940,740"            stroke={M}         strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset={dash(520,0.25)}/>
          <polyline points="714,652 830,652 830,820 930,820"            stroke="url(#cg2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={dash(500,0.27)}/>

          {/* ══════════════════════════════════════
              SMD COMPONENTS on traces (resistors, caps)
          ══════════════════════════════════════ */}
          {/* Resistors: small rectangles on traces */}
          {[
            [180,218],[560,198],[280,238],[640,178],
            [180,778],[560,758],[640,818],
            [218,340],[170,442],[200,546],[160,598],
            [780,338],[830,442],[800,546],[840,598],
          ].map(([x,y],i) => {
            const show = Math.min(1, Math.max(0,(p-0.3)*4));
            return show > 0 ? (
              <g key={`r${i}`} opacity={show}>
                <rect x={x-12} y={y-5} width={24} height={10} rx="2"
                  stroke={i%2===0 ? C : V} strokeWidth="1.5"
                  fill="rgba(30,40,100,0.5)"
                />
                <line x1={x-6} y1={y} x2={x+6} y2={y}
                  stroke={i%2===0 ? C : V} strokeWidth="0.8" strokeOpacity="0.7"
                />
              </g>
            ) : null;
          })}

          {/* Capacitors: two parallel lines */}
          {[
            [340,218],[730,218],[860,168],
            [340,780],[730,778],[860,818],
            [218,496],[218,652],
            [780,496],[780,652],
          ].map(([x,y],i) => {
            const show = Math.min(1, Math.max(0,(p-0.32)*4));
            const horiz = i < 6;
            return show > 0 ? (
              <g key={`cap${i}`} opacity={show}>
                {horiz ? (
                  <>
                    <line x1={x-2} y1={y-8} x2={x-2} y2={y+8} stroke={C} strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1={x+2} y1={y-8} x2={x+2} y2={y+8} stroke={C} strokeWidth="2.5" strokeLinecap="round"/>
                  </>
                ) : (
                  <>
                    <line x1={x-8} y1={y-2} x2={x+8} y2={y-2} stroke={V} strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1={x-8} y1={y+2} x2={x+8} y2={y+2} stroke={V} strokeWidth="2.5" strokeLinecap="round"/>
                  </>
                )}
              </g>
            ) : null;
          })}

          {/* ══════════════════════════════════════
              VIA DOTS at trace endpoints
          ══════════════════════════════════════ */}
          {[
            [100,130,C],[680,110,C],[180,155,M],[780,100,C],[850,130,C],[900,90,V],
            [80,880,V],[240,900,M],[680,880,C],[640,920,V],[900,900,C],[860,930,V],
            [130,170,C],[110,250,M],[80,590,C],[60,660,C],[100,700,M],[80,760,V],[60,830,V],
            [870,170,C],[900,240,M],[920,320,V],[950,380,C],[920,680,V],[940,740,M],[930,820,C],
          ].map(([cx,cy,col],i) => {
            const show = Math.min(1, Math.max(0,(p-0.4)*5 - i*0.05));
            return show > 0 ? (
              <g key={`via${i}`} opacity={show} filter="url(#strongGlow)">
                <circle cx={cx as number} cy={cy as number} r="5" fill="none" stroke={col as string} strokeWidth="2"/>
                <circle cx={cx as number} cy={cy as number} r="2" fill={col as string}/>
              </g>
            ) : null;
          })}
        </svg>
      </div>
    </div>
  );
}
