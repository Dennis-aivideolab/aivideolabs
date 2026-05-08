'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getT, Lang } from '@/lib/i18n';

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();
  const lang = ((params?.lang as string) || 'de') as Lang;
  const t = getT(lang).nav;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setLangOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const navLinks = [
    { label: t.home, href: `/${lang}#home` },
    { label: t.services, href: `/${lang}#services` },
    { label: t.portfolio, href: `/${lang}#portfolio` },
    { label: t.contact, href: `/${lang}#contact` },
  ];

  const langOptions: { code: Lang; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ch', label: 'Schweizerdeutsch', flag: '🇨🇭' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const currentLang = langOptions.find(l => l.code === lang);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px', height: '72px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(10, 14, 39, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
    }}>
      {/* Logo */}
      <Link href={`/${lang}#home`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ height: '44px', width: '44px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="AI Video Labs" height={1024} width={1536} style={{ height: '44px', width: 'auto', minWidth: '66px' }} priority />
        </div>
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
          AI VIDEO <span style={{ color: '#67e8f9' }}>LABS</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} style={{
            color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
            padding: '8px 14px', borderRadius: '8px', fontSize: '15px', fontWeight: 500, transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; (e.target as HTMLElement).style.background = 'transparent'; }}>
            {link.label}
          </a>
        ))}

        {/* Language Switcher */}
        <div style={{ position: 'relative', marginLeft: '4px' }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.8)', padding: '7px 12px', borderRadius: '8px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <span>{currentLang?.flag}</span>
            <span>{currentLang?.code.toUpperCase()}</span>
            <span style={{ fontSize: '9px', opacity: 0.6 }}>▼</span>
          </button>
          {langOpen && (
            <div style={{
              position: 'absolute', top: '44px', right: 0,
              background: 'rgba(10, 14, 39, 0.97)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
              overflow: 'hidden', minWidth: '180px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}>
              {langOptions.map(opt => (
                <Link key={opt.code} href={`/${opt.code}`}
                  onClick={() => setLangOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '11px 16px', textDecoration: 'none',
                    color: opt.code === lang ? '#a78bfa' : 'rgba(255,255,255,0.75)',
                    fontSize: '14px', fontWeight: opt.code === lang ? 600 : 400,
                    background: opt.code === lang ? 'rgba(124,58,237,0.1)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (opt.code !== lang) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = opt.code === lang ? 'rgba(124,58,237,0.1)' : 'transparent'; }}
                >
                  <span style={{ fontSize: '18px' }}>{opt.flag}</span>
                  <span>{opt.label}</span>
                  {opt.code === lang && <span style={{ marginLeft: 'auto', fontSize: '12px' }}>✓</span>}
                </Link>
              ))}
            </div>
          )}
        </div>

        <a href={`/${lang}#contact`} style={{
          marginLeft: '6px', background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          color: 'white', textDecoration: 'none', padding: '9px 20px', borderRadius: '50px',
          fontSize: '14px', fontWeight: 600, boxShadow: '0 0 20px rgba(168,85,247,0.4)', transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 0 35px rgba(168,85,247,0.65)'; }}
        onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'translateY(0)'; (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(168,85,247,0.4)'; }}>
          {t.cta}
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer',
        padding: '8px', flexDirection: 'column', gap: '5px',
      }} className="mobile-menu-btn" aria-label="Menu">
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block', width: '24px', height: '2px',
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)', borderRadius: '2px', transition: 'all 0.3s ease',
            transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none') : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '72px', left: 0, right: 0,
          background: 'rgba(10, 14, 39, 0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              padding: '12px 16px', borderRadius: '8px', fontSize: '16px', fontWeight: 500,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{link.label}</a>
          ))}
          <div style={{ display: 'flex', gap: '8px', padding: '12px 0', flexWrap: 'wrap' }}>
            {langOptions.map(opt => (
              <Link key={opt.code} href={`/${opt.code}`} onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                borderRadius: '8px', textDecoration: 'none', fontSize: '14px',
                background: opt.code === lang ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${opt.code === lang ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: opt.code === lang ? '#a78bfa' : 'rgba(255,255,255,0.7)',
                fontWeight: opt.code === lang ? 600 : 400,
              }}>
                {opt.flag} {opt.label}
              </Link>
            ))}
          </div>
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
