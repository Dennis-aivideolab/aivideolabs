'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
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
    <footer style={{
      padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,90px) 32px',
      borderTop: '1px solid rgba(220,228,238,0.08)', position: 'relative', overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse,rgba(197,203,212,0.04) 0%,transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <Link href={`/${lang}`} style={{
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--plat)', boxShadow: '0 0 8px var(--plat)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-fraunces,Georgia),serif', fontWeight: 500, fontSize: 15, letterSpacing: '0.18em', color: 'var(--ink)' }}>
                AI VIDEO LABS
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 220, fontWeight: 300 }}>{t.tagline}</p>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16 }}>Services</div>
            {services.map(s => (
              <a key={s.href} href={s.href} style={{
                display: 'block', color: 'rgba(232,237,242,0.5)', textDecoration: 'none',
                fontSize: 13, marginBottom: 10, transition: 'color .25s', fontWeight: 300,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--plat-lt)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,242,0.5)')}>
                {s.label}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16 }}>Legal</div>
            {legal.map(l => (
              <Link key={l.href} href={l.href} style={{
                display: 'block', color: 'rgba(232,237,242,0.5)', textDecoration: 'none',
                fontSize: 13, marginBottom: 10, transition: 'color .25s', fontWeight: 300,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--plat-lt)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,242,0.5)')}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16 }}>Contact</div>
            <a href="mailto:aivideolabs.ch@gmail.com" style={{ display: 'block', color: 'var(--plat)', textDecoration: 'none', fontSize: 13, marginBottom: 8 }}>
              aivideolabs.ch@gmail.com
            </a>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>aivideolabs.ch</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, fontWeight: 300 }}>Schweiz 🇨🇭</div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(220,228,238,0.08)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 300 }}>{t.copyright}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ code: 'de', flag: '🇩🇪', label: 'DE' }, { code: 'ch', flag: '🇨🇭', label: 'CH' }, { code: 'en', flag: '🇬🇧', label: 'EN' }].map(l => (
              <Link key={l.code} href={`/${l.code}`} style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 2,
                textDecoration: 'none', fontSize: 12, fontWeight: l.code === lang ? 500 : 300,
                background: l.code === lang ? 'rgba(197,203,212,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${l.code === lang ? 'rgba(197,203,212,0.3)' : 'rgba(220,228,238,0.08)'}`,
                color: l.code === lang ? 'var(--plat-lt)' : 'var(--muted)',
                transition: 'all .25s',
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
