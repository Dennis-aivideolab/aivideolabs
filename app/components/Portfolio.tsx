'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';

const meta = [
  { glow: 'rgba(168,85,247,0.4)', bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(124,58,237,0.08) 100%)', stat: '10M+', statLabel: 'Views', emoji: '🎬', typeColor: '#a855f7', type: 'VIDEO' },
  { glow: 'rgba(124,58,237,0.4)', bgGradient: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(34,211,238,0.06) 100%)', stat: '500+', statLabel: 'Designs', emoji: '🤖', typeColor: '#7c3aed', type: 'DESIGN' },
  { glow: 'rgba(34,211,238,0.4)', bgGradient: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(124,58,237,0.08) 100%)', stat: '95+', statLabel: 'Score', emoji: '🌐', typeColor: '#22d3ee', type: 'WEB' },
];

const rgbs: Record<string, string> = { '#a855f7': '255,0,255', '#7c3aed': '138,43,226', '#22d3ee': '0,217,255' };

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null);
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t = getT(lang).portfolio;

  return (
    <section id="portfolio" style={{ padding: '90px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 65%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.3)',
            borderRadius: '50px', padding: '5px 16px', fontSize: '12px', color: '#22d3ee',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600,
          }}>{t.badge}</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
            <span className="gradient-text">{t.title}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {t.items.map((project, i) => {
            const m = meta[i];
            return (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hovered === i ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: hovered === i ? `0 30px 80px ${m.glow}, 0 0 0 1px ${m.glow}` : '0 4px 30px rgba(0,0,0,0.3)',
                  border: `1px solid ${hovered === i ? m.glow : 'rgba(255,255,255,0.07)'}`,
                }}>
                <div style={{ height: '220px', background: m.bgGradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `linear-gradient(${m.typeColor}15 1px, transparent 1px), linear-gradient(90deg, ${m.typeColor}15 1px, transparent 1px)`,
                    backgroundSize: '30px 30px', opacity: hovered === i ? 0.8 : 0.4, transition: 'opacity 0.4s ease',
                  }} />
                  <div style={{
                    position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
                    background: `radial-gradient(circle, ${m.glow.replace('0.4', '0.2')} 0%, transparent 70%)`,
                    filter: 'blur(20px)', transform: hovered === i ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.4s ease',
                  }} />
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px', filter: `drop-shadow(0 0 20px ${m.typeColor})`, transform: hovered === i ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>{m.emoji}</div>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: m.typeColor, textShadow: `0 0 30px ${m.typeColor}`, lineHeight: 1 }}>{m.stat}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>{m.statLabel}</div>
                  </div>
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: `rgba(${rgbs[m.typeColor] || '138,43,226'}, 0.15)`, border: `1px solid ${m.glow}`,
                    borderRadius: '6px', padding: '4px 10px', fontSize: '10px', color: m.typeColor, fontWeight: 700, letterSpacing: '1.5px',
                  }}>{m.type}</div>
                </div>
                <div style={{ padding: '24px', background: 'rgba(10,14,39,0.9)', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.5px' }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '12px', lineHeight: 1.6 }}>{project.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
