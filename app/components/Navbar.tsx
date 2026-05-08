'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 24px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      background: scrolled
        ? 'rgba(10, 14, 39, 0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
    }}>
      {/* Logo */}
      <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <LogoIcon />
        <span style={{
          fontSize: '20px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #ff00ff, #8a2be2, #00d9ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
        }}>
          AI VIDEO<span style={{ WebkitTextFillColor: '#00d9ff' }}> LABS</span>
        </span>
      </a>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} style={{
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.color = '#ffffff';
            (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
            (e.target as HTMLElement).style.background = 'transparent';
          }}>
            {link.label}
          </a>
        ))}
        <a href="#contact" style={{
          marginLeft: '8px',
          background: 'linear-gradient(135deg, #ff00ff, #8a2be2)',
          color: 'white',
          textDecoration: 'none',
          padding: '9px 22px',
          borderRadius: '50px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 0 20px rgba(255,0,255,0.4)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.transform = 'translateY(-1px)';
          (e.target as HTMLElement).style.boxShadow = '0 0 35px rgba(255,0,255,0.65)';
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.transform = 'translateY(0)';
          (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(255,0,255,0.4)';
        }}>
          Anfragen →
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          flexDirection: 'column',
          gap: '5px',
        }}
        className="mobile-menu-btn"
        aria-label="Menu"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: menuOpen
              ? i === 1 ? 'transparent' : 'linear-gradient(135deg, #ff00ff, #00d9ff)'
              : 'linear-gradient(135deg, #ff00ff, #00d9ff)',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
              : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
              : 'none'
              : 'none',
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '72px',
          left: 0,
          right: 0,
          background: 'rgba(10, 14, 39, 0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function LogoIcon() {
  return (
    <div style={{
      width: '42px',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6)) drop-shadow(0 0 16px rgba(0, 217, 255, 0.3))',
    }}>
      <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B3FA0" />
            <stop offset="40%" stopColor="#4F6FD4" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
          <linearGradient id="logoGradLines" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ── Outer play-triangle outline ── */}
        {/* Nodes: top=A(50,6), bottom-left=B(8,92), bottom-right=C(92,50), mid-right=D(92,50) */}
        {/* Using a proper play-button triangle shape with nodes at corners + midpoints */}

        {/* Corner nodes */}
        {/* A = top (50, 5), B = bottom-left (7, 90), C = right-tip (93, 48) */}
        {/* Midpoints: AB-mid (28, 47), AC-mid (71, 26), BC-mid (50, 69) */}
        {/* Inner nodes: center-left (40, 48), inner-top (55, 28), inner-right (72, 48), inner-bottom (55, 65) */}

        {/* Lines – outer triangle edges */}
        <line x1="50" y1="6" x2="7" y2="90" stroke="url(#logoGradLines)" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="50" y1="6" x2="93" y2="48" stroke="url(#logoGradLines)" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="7" y1="90" x2="93" y2="48" stroke="url(#logoGradLines)" strokeWidth="2.2" strokeLinecap="round"/>

        {/* Lines – inner connections (neural network web) */}
        <line x1="50" y1="6"  x2="28" y2="47" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="50" y1="6"  x2="71" y2="26" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="7"  y1="90" x2="28" y2="47" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="7"  y1="90" x2="50" y2="69" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="93" y1="48" x2="71" y2="26" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="93" y1="48" x2="72" y2="48" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="93" y1="48" x2="50" y2="69" stroke="url(#logoGradLines)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85"/>
        <line x1="28" y1="47" x2="40" y2="48" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="71" y1="26" x2="55" y2="28" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="50" y1="69" x2="55" y2="65" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="40" y1="48" x2="55" y2="28" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
        <line x1="40" y1="48" x2="72" y2="48" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
        <line x1="40" y1="48" x2="55" y2="65" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
        <line x1="55" y1="28" x2="72" y2="48" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
        <line x1="72" y1="48" x2="55" y2="65" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"/>
        <line x1="28" y1="47" x2="50" y2="69" stroke="url(#logoGradLines)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.65"/>

        {/* ── Corner / outer nodes (larger) ── */}
        <circle cx="50" cy="6"  r="4.5" fill="url(#logoGrad)" />
        <circle cx="7"  cy="90" r="4.5" fill="url(#logoGrad)" />
        <circle cx="93" cy="48" r="4.5" fill="url(#logoGrad)" />

        {/* ── Midpoint nodes ── */}
        <circle cx="28" cy="47" r="3.2" fill="url(#logoGrad)" />
        <circle cx="71" cy="26" r="3.2" fill="url(#logoGrad)" />
        <circle cx="50" cy="69" r="3.2" fill="url(#logoGrad)" />

        {/* ── Inner cluster nodes ── */}
        <circle cx="40" cy="48" r="2.8" fill="url(#logoGrad)" />
        <circle cx="55" cy="28" r="2.8" fill="url(#logoGrad)" />
        <circle cx="72" cy="48" r="2.8" fill="url(#logoGrad)" />
        <circle cx="55" cy="65" r="2.8" fill="url(#logoGrad)" />
      </svg>
    </div>
  );
}
