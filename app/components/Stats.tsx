'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: '+', label: 'Projekte', sublabel: 'erfolgreich abgeschlossen', color: '#a855f7', icon: '🚀' },
  { value: 98, suffix: '%', label: 'Zufriedenheit', sublabel: 'unserer Kunden', color: '#7c3aed', icon: '⭐' },
  { value: 5, suffix: 'x', label: 'Schneller', sublabel: 'als klassische Produktion', color: '#22d3ee', icon: '⚡' },
  { value: 24, suffix: '/7', label: 'Support', sublabel: 'immer erreichbar', color: '#ff6b6b', icon: '🛡️' },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 1800, inView);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? stat.color + '50' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        padding: '36px 28px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 50px rgba(${stat.color === '#a855f7' ? '255,0,255' : stat.color === '#7c3aed' ? '138,43,226' : stat.color === '#22d3ee' ? '0,217,255' : '255,107,107'}, 0.2)`
          : 'none',
        opacity: inView ? 1 : 0,
        animationDelay: `${index * 0.15}s`,
        animation: inView ? `fadeInUp 0.7s ease-out ${index * 0.15}s both` : 'none',
      }}
    >
      {/* Top line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '150px', height: '150px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{stat.icon}</div>

      <div style={{
        fontSize: 'clamp(36px, 4vw, 52px)',
        fontWeight: 900,
        color: stat.color,
        textShadow: hovered ? `0 0 30px ${stat.color}` : `0 0 15px ${stat.color}50`,
        lineHeight: 1,
        transition: 'text-shadow 0.3s ease',
        letterSpacing: '-2px',
      }}>
        {inView ? count : 0}{stat.suffix}
      </div>

      <div style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#ffffff',
        marginTop: '8px',
        marginBottom: '4px',
      }}>
        {stat.label}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.5px',
      }}>
        {stat.sublabel}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(168,85,247,0.03) 0%, rgba(124,58,237,0.05) 50%, rgba(34,211,238,0.03) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(34,211,238,0.3), transparent)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
