'use client';

import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';

export default function CTA() {
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t = getT(lang).cta;

  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="animate-orb" style={{
        position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div className="animate-orb2" style={{
        position: 'absolute', top: '50%', right: '15%', transform: 'translateY(-50%)',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px',
          padding: 'clamp(48px, 8vw, 72px) clamp(32px, 6vw, 64px)',
          position: 'relative', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, #a855f7, #7c3aed, #22d3ee, #7c3aed, #a855f7)',
            backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents: 'none',
          }} />

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: '50px', padding: '5px 16px', marginBottom: '24px',
            fontSize: '12px', color: '#a855f7', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600,
          }}>{t.badge}</div>

          <h2 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.15, marginBottom: '16px' }}>
            {t.title}{' '}<span className="gradient-text">{t.titleGrad}</span>
          </h2>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px' }}>
            {t.sub}{' '}<span style={{ color: '#22d3ee', fontWeight: 500 }}>{t.subAccent}</span>{' '}{t.subEnd}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`/${lang}#contact`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '17px', padding: '16px 40px' }}>{t.btn1}</a>
            <a href={`/${lang}#services`} className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '16px' }}>{t.btn2}</a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '36px', flexWrap: 'wrap' }}>
            {t.trust.map((item, i) => (
              <span key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
