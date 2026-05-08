'use client';

import { useState } from 'react';

export default function CTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '20%',
        transform: 'translateY(-50%)',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} className="animate-orb" />
      <div style={{
        position: 'absolute',
        top: '50%', right: '15%',
        transform: 'translateY(-50%)',
        width: '350px', height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} className="animate-orb2" />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Glass card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px',
          padding: 'clamp(48px, 8vw, 72px) clamp(32px, 6vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        }}>
          {/* Top gradient border */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #ff00ff, #8a2be2, #00d9ff, #8a2be2, #ff00ff)',
            backgroundSize: '200% auto',
            animation: 'shimmer 3s linear infinite',
          }} />

          {/* Inner glow */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(138,43,226,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,0,255,0.1)',
            border: '1px solid rgba(255,0,255,0.25)',
            borderRadius: '50px',
            padding: '5px 16px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#ff00ff',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            ✦ Let's create
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            Bereit für dein{' '}
            <span className="gradient-text">nächstes Projekt?</span>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '40px',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}>
            Lass uns gemeinsam etwas{' '}
            <span style={{ color: '#00d9ff', fontWeight: 500 }}>Großartiges schaffen.</span>
            {' '}Wir sind bereit für deine Vision.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              className="btn-primary"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '17px',
                padding: '16px 40px',
              }}
            >
              Kontakt aufnehmen ✦
            </a>
            <a href="#services" className="btn-secondary" style={{
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
            }}>
              Services ansehen
            </a>
          </div>

          {/* Trust row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '36px',
            flexWrap: 'wrap',
          }}>
            {['✓ Schnelle Lieferung', '✓ Professionelle Qualität', '✓ 24/7 Support'].map((item, i) => (
              <span key={i} style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.45)',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
