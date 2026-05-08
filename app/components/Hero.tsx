'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      const orbs = hero.querySelectorAll<HTMLElement>('.parallax-orb');
      orbs.forEach((orb, i) => {
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
      {/* Background radial halos */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        {/* Central halo */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(138, 43, 226, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Floating Orb 1 - Magenta */}
        <div className="parallax-orb animate-orb" style={{
          position: 'absolute',
          top: '15%', left: '10%',
          width: '320px', height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.18) 0%, rgba(255, 0, 255, 0.04) 60%, transparent 80%)',
          filter: 'blur(40px)',
        }} />

        {/* Floating Orb 2 - Cyan */}
        <div className="parallax-orb animate-orb2" style={{
          position: 'absolute',
          top: '20%', right: '8%',
          width: '280px', height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, rgba(0, 217, 255, 0.03) 60%, transparent 80%)',
          filter: 'blur(35px)',
        }} />

        {/* Floating Orb 3 - Purple */}
        <div className="parallax-orb animate-orb3" style={{
          position: 'absolute',
          bottom: '20%', left: '25%',
          width: '240px', height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />

        {/* Bottom center glow */}
        <div style={{
          position: 'absolute',
          bottom: '-100px', left: '50%',
          transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(255, 0, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`animate-float${(i % 3) + 1 === 1 ? '' : (i % 3) + 1 === 2 ? '2' : '3'}`} style={{
            position: 'absolute',
            width: i % 3 === 0 ? '3px' : i % 3 === 1 ? '2px' : '4px',
            height: i % 3 === 0 ? '3px' : i % 3 === 1 ? '2px' : '4px',
            borderRadius: '50%',
            background: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00d9ff' : '#8a2be2',
            left: `${8 + i * 8}%`,
            top: `${20 + (i * 17) % 60}%`,
            boxShadow: i % 3 === 0
              ? '0 0 8px rgba(255,0,255,0.8)'
              : i % 3 === 1
              ? '0 0 8px rgba(0,217,255,0.8)'
              : '0 0 8px rgba(138,43,226,0.8)',
            animationDelay: `${i * 0.4}s`,
            opacity: 0.7,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 0, 255, 0.1)',
          border: '1px solid rgba(255, 0, 255, 0.3)',
          borderRadius: '50px',
          padding: '6px 18px',
          marginBottom: '28px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.5px',
          backdropFilter: 'blur(10px)',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#ff00ff',
            boxShadow: '0 0 8px #ff00ff',
            animation: 'pulse-glow 2s infinite',
          }} />
          Powered by Modern AI Technology
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(38px, 7vw, 76px)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-2px',
        }}>
          <span style={{ color: '#ffffff' }}>Kreative</span>
          <br />
          <span className="gradient-text">AI-gestützte</span>
          <br />
          <span style={{ color: '#ffffff' }}>Videoinhalte</span>
        </h1>

        {/* Subheader */}
        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'rgba(255, 255, 255, 0.65)',
          maxWidth: '680px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
          fontWeight: 400,
        }}>
          Wir transformieren deine Vision in professionelle, virale Videoinhalte –{' '}
          <span style={{ color: 'rgba(0, 217, 255, 0.9)', fontWeight: 500 }}>
            powered by moderne KI-Technologie
          </span>{' '}
          und dramatischen Effekten.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '64px',
        }}>
          <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Jetzt anfragen ✦
          </a>
          <a href="#portfolio" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Portfolio ansehen →
          </a>
        </div>

        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '50+', label: 'Projekte' },
            { num: '98%', label: 'Zufriedenheit' },
            { num: '5x', label: 'Schneller' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ff00ff, #00d9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{stat.num}</div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
        }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,0,255,0.8), transparent)',
          }} className="animate-float2" />
        </div>
      </div>
    </section>
  );
}
