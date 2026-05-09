'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #0a0e27 0%, #1a1a3f 50%, #0f1628 100%)',
      padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,0,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 'clamp(80px, 20vw, 160px)', fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg, #ff00ff, #8a2be2, #00d9ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '16px', letterSpacing: '-4px',
        }}>404</div>

        <h1 style={{
          fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 700, color: '#ffffff',
          marginBottom: '16px', letterSpacing: '-0.5px',
        }}>Diese Seite existiert nicht</h1>

        <p style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '40px', maxWidth: '400px',
        }}>
          Die gesuchte Seite konnte nicht gefunden werden. Vielleicht wurde sie verschoben oder gelöscht.
        </p>

        <Link href="/de" style={{
          display: 'inline-block', padding: '14px 32px', borderRadius: '50px',
          background: 'linear-gradient(135deg, #ff00ff, #8a2be2)',
          color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
          boxShadow: '0 0 30px rgba(255,0,255,0.4)', transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(255,0,255,0.7)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255,0,255,0.4)'}
        >
          ← Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
