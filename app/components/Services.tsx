'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';

const colors = ['#a855f7', '#7c3aed', '#22d3ee', '#ff6b6b'];
const glows = ['rgba(168,85,247,0.3)', 'rgba(124,58,237,0.3)', 'rgba(34,211,238,0.3)', 'rgba(255,107,107,0.3)'];
const rgbs = ['255,0,255', '138,43,226', '0,217,255', '255,107,107'];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t = getT(lang).services;

  return (
    <section id="services" style={{ padding: '90px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.06) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '50px', padding: '5px 16px', fontSize: '12px', color: '#7c3aed',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600,
          }}>{t.badge}</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.15 }}>
            {t.title}{' '}<span className="gradient-text">{t.titleGrad}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {t.items.map((service, i) => (
            <div key={i} className="card-shine"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: hoveredIndex === i ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${hoveredIndex === i ? glows[i] : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px', padding: '32px 28px', position: 'relative', overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredIndex === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredIndex === i ? `0 20px 60px ${glows[i]}, 0 0 0 1px ${glows[i]}` : '0 4px 20px rgba(0,0,0,0.2)',
                cursor: 'default',
              }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)`,
                opacity: hoveredIndex === i ? 1 : 0, transition: 'opacity 0.35s ease',
              }} />
              <div style={{
                position: 'absolute', top: '-50px', right: '-50px', width: '180px', height: '180px', borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${rgbs[i]}, 0.08) 0%, transparent 70%)`,
                opacity: hoveredIndex === i ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none',
              }} />
              <div style={{
                width: '60px', height: '60px', borderRadius: '14px',
                background: `rgba(${rgbs[i]}, 0.12)`, border: `1px solid ${glows[i]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px',
                transition: 'all 0.35s ease', boxShadow: hoveredIndex === i ? `0 0 20px ${glows[i]}` : 'none',
              }}>{service.icon}</div>
              <h3 style={{
                fontSize: '20px', fontWeight: 700,
                color: hoveredIndex === i ? '#ffffff' : 'rgba(255,255,255,0.9)',
                marginBottom: '10px', transition: 'color 0.3s ease',
              }}>{service.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '20px' }}>{service.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {service.tags.map((tag, j) => (
                  <span key={j} style={{
                    background: `rgba(${rgbs[i]}, 0.1)`, border: `1px solid ${glows[i]}`,
                    borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: colors[i], fontWeight: 600, letterSpacing: '0.5px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
