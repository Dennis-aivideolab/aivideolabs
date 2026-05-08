'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getT } from '@/lib/i18n';

export default function Footer() {
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t = getT(lang).footer;
  const nav = getT(lang).nav;

  const services = [
    { label: nav.services, href: `/${lang}#services` },
    { label: nav.portfolio, href: `/${lang}#portfolio` },
    { label: nav.contact, href: `/${lang}#contact` },
  ];

  const legal = [
    { label: t.impressum, href: `/${lang}${t.impressumHref}` },
    { label: t.datenschutz, href: `/${lang}${t.datenschutzHref}` },
    { label: t.agb, href: `/${lang}${t.agbHref}` },
    { label: t.cookies, href: `/${lang}${t.cookiesHref}` },
  ];

  return (
    <footer style={{ padding: '60px 24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '200px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <Link href={`/${lang}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ height: '36px', width: '36px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <Image src="/logo.png" alt="AI Video Labs" height={1024} width={1536} style={{ height: '36px', width: 'auto', minWidth: '54px' }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                AI VIDEO <span style={{ color: '#67e8f9' }}>LABS</span>
              </span>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '220px' }}>{t.tagline}</p>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Services</div>
            {services.map(s => (
              <a key={s.href} href={s.href} style={{ display: 'block', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#a78bfa'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}>
                {s.label}
              </a>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Legal</div>
            {legal.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#67e8f9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Contact</div>
            <a href="mailto:aivideolabs.ch@gmail.com" style={{ display: 'block', color: '#a855f7', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>
              aivideolabs.ch@gmail.com
            </a>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>aivideolabs.ch</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Schweiz 🇨🇭</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{t.copyright}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{ code: 'de', flag: '🇩🇪', label: 'DE' }, { code: 'ch', flag: '🇨🇭', label: 'CH' }, { code: 'en', flag: '🇬🇧', label: 'EN' }].map(l => (
              <Link key={l.code} href={`/${l.code}`} style={{
                display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px',
                textDecoration: 'none', fontSize: '12px', fontWeight: 600,
                background: l.code === lang ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${l.code === lang ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: l.code === lang ? '#a78bfa' : 'rgba(255,255,255,0.45)',
              }}>
                {l.flag} {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
