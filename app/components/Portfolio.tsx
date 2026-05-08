'use client';

import { useState } from 'react';

const projects = [
  {
    type: 'VIDEO',
    title: 'TikTok Viral Series',
    desc: '10M+ Views | KI-generierte Content-Serie',
    detail: 'Vollständig KI-gestützte Videoserie, die innerhalb von 2 Wochen viral ging.',
    tags: ['TikTok', 'AI', 'Viral'],
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(124,58,237,0.08) 100%)',
    icon: '▶',
    stat: '10M+',
    statLabel: 'Views',
    emoji: '🎬',
  },
  {
    type: 'DESIGN',
    title: 'AI Asset Pipeline',
    desc: '500+ Designs in 2 Wochen',
    detail: 'Automatisierte Design-Pipeline mit neuronalen Netzwerken für schnelle Asset-Erstellung.',
    tags: ['AI Art', 'Automation', 'Scale'],
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(34,211,238,0.06) 100%)',
    icon: '✦',
    stat: '500+',
    statLabel: 'Designs',
    emoji: '🤖',
  },
  {
    type: 'WEB',
    title: 'High-Performance Web',
    desc: '95+ Lighthouse Score',
    detail: 'Next.js Website mit perfekter Performance, SEO und modernem UI für ein Startup.',
    tags: ['Next.js', 'React', 'SEO'],
    color: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(124,58,237,0.08) 100%)',
    icon: '◈',
    stat: '95+',
    statLabel: 'Score',
    emoji: '🌐',
  },
];

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="portfolio" style={{
      padding: '90px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(34, 211, 238, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '50px',
            padding: '5px 16px',
            fontSize: '12px',
            color: '#22d3ee',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: 600,
          }}>
            Unsere Arbeit
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
          }}>
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            marginTop: '12px',
          }}>
            Ausgewählte Projekte – Resultate sprechen für sich.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered === i ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                boxShadow: hovered === i
                  ? `0 30px 80px ${project.glow}, 0 0 0 1px ${project.glow}`
                  : '0 4px 30px rgba(0,0,0,0.3)',
                border: `1px solid ${hovered === i ? project.glow : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              {/* Visual area */}
              <div style={{
                height: '220px',
                background: project.bgGradient,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* Grid pattern */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `linear-gradient(${project.color}15 1px, transparent 1px), linear-gradient(90deg, ${project.color}15 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                  opacity: hovered === i ? 0.8 : 0.4,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Glow orb */}
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${project.glow.replace('0.4', '0.2')} 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  transform: hovered === i ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.4s ease',
                }} />

                {/* Center icon */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '8px',
                    filter: `drop-shadow(0 0 20px ${project.color})`,
                    transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}>
                    {project.emoji}
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    color: project.color,
                    textShadow: `0 0 30px ${project.color}`,
                    lineHeight: 1,
                  }}>
                    {project.stat}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginTop: '4px',
                  }}>
                    {project.statLabel}
                  </div>
                </div>

                {/* Type badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: `rgba(${project.color === '#a855f7' ? '255,0,255' : project.color === '#7c3aed' ? '138,43,226' : '0,217,255'}, 0.15)`,
                  border: `1px solid ${project.glow}`,
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '10px',
                  color: project.color,
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                }}>
                  {project.type}
                </div>
              </div>

              {/* Content area */}
              <div style={{
                padding: '24px',
                background: 'rgba(10, 14, 39, 0.9)',
                backdropFilter: 'blur(10px)',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '6px',
                  letterSpacing: '-0.5px',
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: '12px',
                  lineHeight: 1.6,
                }}>
                  {hovered === i ? project.detail : project.desc}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag, j) => (
                    <span key={j} style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#contact" style={{
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            fontSize: '14px',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '2px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = '#22d3ee'}
          onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}>
            Alle Projekte anfragen →
          </a>
        </div>
      </div>
    </section>
  );
}
