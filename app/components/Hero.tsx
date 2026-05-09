'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';
import { trackEvent } from './GoogleAnalytics';

const VIDEO_SRC = '/videos/magnific_futuristic-holographic-lo_2948754529.mp4';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoHovered, setVideoHovered] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t = getT(lang).hero;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      hero.querySelectorAll<HTMLElement>('.parallax-orb').forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" ref={heroRef} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '100px 24px 80px',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '800px', height: '800px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
        }} />
        <div className="parallax-orb animate-orb" style={{
          position: 'absolute', top: '15%', left: '5%', width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0.04) 60%, transparent 80%)',
          filter: 'blur(40px)',
        }} />
        <div className="parallax-orb animate-orb2" style={{
          position: 'absolute', top: '20%', right: '5%', width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.03) 60%, transparent 80%)',
          filter: 'blur(35px)',
        }} />
        <div className="parallax-orb animate-orb3" style={{
          position: 'absolute', bottom: '20%', left: '25%', width: '240px', height: '240px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`animate-float${(i % 3) === 0 ? '' : (i % 3) === 1 ? '2' : '3'}`} style={{
            position: 'absolute',
            width: i % 3 === 0 ? '3px' : '2px', height: i % 3 === 0 ? '3px' : '2px',
            borderRadius: '50%',
            background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#22d3ee' : '#7c3aed',
            left: `${5 + i * 10}%`, top: `${20 + (i * 17) % 60}%`,
            boxShadow: `0 0 8px ${i % 3 === 0 ? 'rgba(168,85,247,0.8)' : i % 3 === 1 ? 'rgba(34,211,238,0.8)' : 'rgba(124,58,237,0.8)'}`,
            animationDelay: `${i * 0.4}s`, opacity: 0.6,
          }} />
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '48px',
        alignItems: 'center',
      }} className="hero-grid">

        {/* LEFT: Text content */}
        <div style={{ textAlign: 'left' }} className="hero-text">
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '50px', padding: '6px 18px', marginBottom: '28px',
            fontSize: '13px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.5px', backdropFilter: 'blur(10px)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
            {t.badge}
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            fontWeight: 800, lineHeight: 1.05,
            marginBottom: '24px', letterSpacing: '-2px',
          }}>
            <span style={{ color: '#ffffff' }}>{t.h1}</span>
            <br />
            <span className="gradient-text">{t.h2}</span>
            <br />
            <span style={{ color: '#ffffff' }}>{t.h3}</span>
          </h1>

          {/* Subheader */}
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255, 255, 255, 0.65)',
            marginBottom: '40px', lineHeight: 1.7, fontWeight: 400, maxWidth: '520px',
          }}>
            {t.sub}{' '}
            <span style={{ color: 'rgba(34, 211, 238, 0.9)', fontWeight: 500 }}>{t.subAccent}</span>{' '}
            {t.subEnd}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a href={`/${lang}#contact`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }} onClick={() => trackEvent('anfrage_klick')}>{t.btn1}</a>
            <a href={`/${lang}#portfolio`} className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }} onClick={() => trackEvent('portfolio_klick')}>{t.btn2}</a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
            {t.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: '26px', fontWeight: 800 }}>{stat.num}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Video */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-video-wrap">
          <div
            onMouseEnter={() => setVideoHovered(true)}
            onMouseLeave={() => setVideoHovered(false)}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid #ff00ff',
              boxShadow: videoHovered
                ? '0 0 50px rgba(255, 0, 255, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)'
                : '0 0 30px rgba(255, 0, 255, 0.3), 0 0 60px rgba(124, 58, 237, 0.15)',
              transition: 'all 0.3s ease',
              transform: videoHovered ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            {/* Magenta top glow line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 2,
              background: 'linear-gradient(90deg, transparent, #ff00ff, #a855f7, #ff00ff, transparent)',
              opacity: videoHovered ? 1 : 0.7, transition: 'opacity 0.3s ease',
            }} />

            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '14px',
              }}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            {/* Corner accents */}
            {[
              { top: '8px', left: '8px', borderTop: '2px solid #ff00ff', borderLeft: '2px solid #ff00ff' },
              { top: '8px', right: '8px', borderTop: '2px solid #ff00ff', borderRight: '2px solid #ff00ff' },
              { bottom: '8px', left: '8px', borderBottom: '2px solid #ff00ff', borderLeft: '2px solid #ff00ff' },
              { bottom: '8px', right: '8px', borderBottom: '2px solid #ff00ff', borderRight: '2px solid #ff00ff' },
            ].map((style, i) => (
              <div key={i} style={{
                position: 'absolute', width: '18px', height: '18px', zIndex: 3,
                opacity: videoHovered ? 1 : 0.6, transition: 'opacity 0.3s ease',
                ...style,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.4,
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(168,85,247,0.8), transparent)' }} className="animate-float2" />
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 40% 60% !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-text {
            text-align: center !important;
          }
          .hero-text > div:first-child {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-text p {
            max-width: 100% !important;
          }
          .hero-text > div[style*="display: flex; gap: 16px"] {
            justify-content: center;
          }
          .hero-text > div:last-child {
            justify-content: center;
          }
          .hero-video-wrap {
            order: 2;
          }
          .hero-video-wrap > div {
            max-width: 100% !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 50% 50% !important;
          }
        }
      `}</style>
    </section>
  );
}
