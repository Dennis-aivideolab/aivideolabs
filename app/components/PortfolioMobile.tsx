'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';

// Exact same design as the Three.js desktop overlay — mobile-only
export default function PortfolioMobile() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => setShow(window.innerWidth < 761);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t    = getT(lang);
  const pf   = t.portfolio.items;

  const pfH2: [string, string, string] = ['Ausgewählte ', 'Arbeiten', '.'];
  if (lang === 'en') { pfH2[0] = 'Selected '; pfH2[1] = 'Works'; }
  if (lang === 'ch') { pfH2[0] = 'Usgwählti '; pfH2[1] = 'Arbeite'; }

  if (!show) return null; // desktop: render nothing — Three.js overlay handles it

  return (
    <section
      id="portfolio-mobile"
      style={{
        padding: 'clamp(64px,10vw,100px) clamp(20px,6vw,48px)',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Badge — same as overlay */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 11,
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: 'var(--plat)', fontWeight: 500, marginBottom: 24,
        }}>
          <span style={{ width: 34, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-fraunces,Georgia),serif', fontStyle: 'italic', fontWeight: 300 }}>02</span>
          &nbsp; {t.nav.portfolio}
        </div>

        {/* Headline — same as overlay */}
        <h2 className="font-fraunces" style={{ fontWeight: 300, fontSize: 'clamp(32px,9vw,60px)', marginBottom: 30, lineHeight: 1.04 }}>
          {pfH2[0]}
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>{pfH2[1]}</em>
          {pfH2[2]}
        </h2>

        {/* Cards — same card design, single column on mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {pf.map((item: { tag: string; title: string; desc: string; video?: string }, i: number) => (
            <div key={i} style={{
              border: '1px solid rgba(220,228,238,0.12)',
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.015)',
            }}>
              {/* Preview — same aspect ratio and styling */}
              <div style={{
                aspectRatio: '16/10',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg,#161b22,#0c0f14)',
              }}>
                {item.video ? (
                  <video
                    src={item.video}
                    loop muted autoPlay playsInline
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', opacity: 0.85,
                    }}
                  />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(115deg,transparent 30%,rgba(197,203,212,.14) 50%,transparent 70%)',
                    backgroundSize: '300% 100%',
                    animation: 'sh 4.5s linear infinite',
                  }} />
                )}
                <span style={{
                  position: 'absolute', top: 14, left: 14,
                  fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
                  color: 'var(--plat)', border: '1px solid rgba(220,228,238,0.12)',
                  padding: '5px 9px', borderRadius: 2, background: 'rgba(8,10,13,0.6)',
                }}>
                  {item.tag}
                </span>
              </div>

              {/* Info — same padding and typography */}
              <div style={{ padding: 18 }}>
                <div className="font-fraunces" style={{ fontWeight: 400, fontSize: 18, marginBottom: 6 }}>
                  {item.title}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 300 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
