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
          VideoLabs<span style={{ WebkitTextFillColor: '#00d9ff' }}> AI</span>
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
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #0a0e27, #1a1a3f)',
      border: '1.5px solid rgba(255, 0, 255, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 15px rgba(255, 0, 255, 0.3), 0 0 30px rgba(138, 43, 226, 0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Neural network dots */}
      {[[20, 50], [50, 20], [50, 80], [80, 50], [35, 35], [65, 35], [35, 65], [65, 65]].map(([x, y], i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i < 4 ? '4px' : '3px',
          height: i < 4 ? '4px' : '3px',
          borderRadius: '50%',
          background: i < 4 ? '#ff00ff' : 'rgba(0, 217, 255, 0.8)',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: i < 4 ? '0 0 6px #ff00ff' : '0 0 4px #00d9ff',
        }} />
      ))}
      {/* Play triangle */}
      <div style={{
        width: 0,
        height: 0,
        borderTop: '7px solid transparent',
        borderBottom: '7px solid transparent',
        borderLeft: '12px solid rgba(0, 217, 255, 0.9)',
        marginLeft: '2px',
        filter: 'drop-shadow(0 0 4px #00d9ff)',
        zIndex: 1,
      }} />
    </div>
  );
}
