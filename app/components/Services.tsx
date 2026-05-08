'use client';

import { useState } from 'react';

const services = [
  {
    icon: '🎬',
    title: 'Video Production',
    desc: 'Professionelle Werbevideos und Social Media Content – optimiert für maximale Reichweite.',
    tags: ['TikTok', 'Reels', 'YouTube'],
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  {
    icon: '🤖',
    title: 'AI Design',
    desc: 'Innovative Design-Konzepte mit neuronalen Netzwerken. Asset-Generierung in Rekordzeit.',
    tags: ['AI Art', 'Branding', 'Motion'],
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.3)',
  },
  {
    icon: '📸',
    title: 'Advertising Content',
    desc: 'Premium Fotografie und Product Shots – professionell inszeniert für höchste Wirkung.',
    tags: ['Product', 'Campaign', 'Editorial'],
    color: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.3)',
  },
  {
    icon: '🌐',
    title: 'Digital Solutions',
    desc: 'Moderne Websites mit React & Next.js. High-Performance für Agencies und Startups.',
    tags: ['React', 'Next.js', 'Performance'],
    color: '#ff6b6b',
    glow: 'rgba(255, 107, 107, 0.3)',
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" style={{
      padding: '90px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(124, 58, 237, 0.1)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: '50px',
            padding: '5px 16px',
            fontSize: '12px',
            color: '#7c3aed',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: 600,
          }}>
            Was wir machen
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
          }}>
            Unsere{' '}
            <span className="gradient-text">Services</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            marginTop: '12px',
            maxWidth: '500px',
            margin: '12px auto 0',
          }}>
            Alles aus einer Hand – von der ersten Idee bis zur fertigen Kampagne.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {services.map((service, i) => (
            <div
              key={i}
              className="card-shine"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: hoveredIndex === i
                  ? `rgba(255,255,255,0.07)`
                  : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${hoveredIndex === i ? service.glow : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredIndex === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredIndex === i
                  ? `0 20px 60px ${service.glow}, 0 0 0 1px ${service.glow}`
                  : '0 4px 20px rgba(0,0,0,0.2)',
                cursor: 'default',
              }}
            >
              {/* Top gradient line */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                opacity: hoveredIndex === i ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }} />

              {/* Background glow on hover */}
              <div style={{
                position: 'absolute',
                top: '-50px', right: '-50px',
                width: '180px', height: '180px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${service.glow.replace('0.3', '0.1')} 0%, transparent 70%)`,
                opacity: hoveredIndex === i ? 1 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '14px',
                background: `rgba(${service.color === '#a855f7' ? '255,0,255' : service.color === '#7c3aed' ? '138,43,226' : service.color === '#22d3ee' ? '0,217,255' : '255,107,107'}, 0.12)`,
                border: `1px solid ${service.glow}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                marginBottom: '20px',
                transition: 'all 0.35s ease',
                boxShadow: hoveredIndex === i ? `0 0 20px ${service.glow}` : 'none',
              }}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: hoveredIndex === i ? '#ffffff' : 'rgba(255,255,255,0.9)',
                marginBottom: '10px',
                transition: 'color 0.3s ease',
              }}>
                {service.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}>
                {service.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {service.tags.map((tag, j) => (
                  <span key={j} style={{
                    background: `rgba(${service.color === '#a855f7' ? '255,0,255' : service.color === '#7c3aed' ? '138,43,226' : service.color === '#22d3ee' ? '0,217,255' : '255,107,107'}, 0.1)`,
                    border: `1px solid ${service.glow}`,
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    color: service.color,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div style={{
                marginTop: '24px',
                fontSize: '13px',
                color: service.color,
                opacity: hoveredIndex === i ? 1 : 0,
                transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'all 0.3s ease',
                fontWeight: 600,
              }}>
                Mehr erfahren →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
