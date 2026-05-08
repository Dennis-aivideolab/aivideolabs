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
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
          AI VIDEO <span style={{ color: '#67e8f9' }}>LABS</span>
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
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          color: 'white',
          textDecoration: 'none',
          padding: '9px 22px',
          borderRadius: '50px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 0 20px rgba(168,85,247,0.4)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.transform = 'translateY(-1px)';
          (e.target as HTMLElement).style.boxShadow = '0 0 35px rgba(168,85,247,0.65)';
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.transform = 'translateY(0)';
          (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(168,85,247,0.4)';
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
              ? i === 1 ? 'transparent' : 'linear-gradient(135deg, #a855f7, #22d3ee)'
              : 'linear-gradient(135deg, #a855f7, #22d3ee)',
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
    <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Accurate recreation of the AI Video Labs logo icon */}
      <svg width="44" height="44" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lg1" x1="10" y1="105" x2="110" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#5B21B6" />
            <stop offset="35%"  stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="lg2" x1="10" y1="105" x2="110" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#7C3AED" />
            <stop offset="50%"  stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>

        {/* === OUTER TRIANGLE EDGES === */}
        {/* Top-left → Top-right edge */}
        <line x1="14" y1="98" x2="60" y2="8"  stroke="url(#lg1)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Top-left → Right tip */}
        <line x1="14" y1="98" x2="108" y2="55" stroke="url(#lg1)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Top apex → Right tip */}
        <line x1="60" y1="8"  x2="108" y2="55" stroke="url(#lg1)" strokeWidth="2.5" strokeLinecap="round"/>

        {/* === INNER NETWORK LINES === */}
        {/* From apex down to center nodes */}
        <line x1="60" y1="8"  x2="36" y2="52" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        <line x1="60" y1="8"  x2="80" y2="30" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        {/* Bottom-left to inner nodes */}
        <line x1="14" y1="98" x2="36" y2="52" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        <line x1="14" y1="98" x2="60" y2="78" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        {/* Right tip to inner nodes */}
        <line x1="108" y1="55" x2="80" y2="30" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        <line x1="108" y1="55" x2="82" y2="55" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        <line x1="108" y1="55" x2="60" y2="78" stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"/>
        {/* Cross-connections inner cluster */}
        <line x1="36" y1="52" x2="48" y2="52" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.8"/>
        <line x1="80" y1="30" x2="62" y2="32" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.8"/>
        <line x1="48" y1="52" x2="62" y2="32" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="48" y1="52" x2="82" y2="55" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="48" y1="52" x2="60" y2="78" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="62" y1="32" x2="82" y2="55" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="82" y1="55" x2="60" y2="78" stroke="url(#lg2)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75"/>
        <line x1="36" y1="52" x2="60" y2="78" stroke="url(#lg2)" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.65"/>

        {/* === BRAIN SYMBOL (center-left of triangle) === */}
        {/* Stylized brain outline - two lobes */}
        <path
          d="M42 58 C38 54, 36 48, 40 44 C43 41, 46 42, 48 44
             C48 40, 52 38, 55 41 C58 38, 62 40, 62 44
             C64 42, 67 43, 67 47 C69 50, 67 55, 64 57
             C62 59, 60 60, 58 59 L55 63 L52 59
             C49 60, 46 60, 44 58 Z"
          stroke="url(#lg2)" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round"
        />
        {/* Brain center divider */}
        <line x1="55" y1="41" x2="55" y2="63" stroke="url(#lg2)" strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round"/>
        {/* Brain convolution lines */}
        <path d="M44 50 C46 48, 49 49, 50 51" stroke="url(#lg2)" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.7"/>
        <path d="M60 50 C62 48, 64 49, 64 52" stroke="url(#lg2)" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.7"/>

        {/* === OUTER CORNER NODES (large) === */}
        <circle cx="14"  cy="98"  r="5.5" fill="url(#lg1)"/>
        <circle cx="60"  cy="8"   r="5"   fill="url(#lg1)"/>
        <circle cx="108" cy="55"  r="5.5" fill="url(#lg1)"/>

        {/* === EDGE MIDPOINT NODES === */}
        <circle cx="36"  cy="52"  r="4"   fill="url(#lg1)"/>
        <circle cx="80"  cy="30"  r="3.8" fill="url(#lg1)"/>
        <circle cx="60"  cy="78"  r="3.8" fill="url(#lg1)"/>

        {/* === INNER CLUSTER NODES === */}
        <circle cx="48"  cy="52"  r="3.2" fill="url(#lg2)"/>
        <circle cx="62"  cy="32"  r="3.2" fill="url(#lg2)"/>
        <circle cx="82"  cy="55"  r="3.2" fill="url(#lg2)"/>
      </svg>
    </div>
  );
}
