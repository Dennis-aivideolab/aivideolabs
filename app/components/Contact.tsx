'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';
import { trackEvent } from './GoogleAnalytics';

export default function Contact() {
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const t = getT(lang).contact;

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const inp = (name: string): React.CSSProperties => ({
    width: '100%', padding: '14px 18px',
    background: focused === name ? 'rgba(197,203,212,0.06)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === name ? 'rgba(197,203,212,0.4)' : 'rgba(220,228,238,0.12)'}`,
    borderRadius: 2, color: 'var(--ink)', fontSize: 14, outline: 'none',
    transition: 'all 0.3s ease', fontFamily: 'var(--font-manrope,sans-serif)',
    boxShadow: focused === name ? '0 0 0 3px rgba(197,203,212,0.06)' : 'none',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
        trackEvent('form_submit', { form_name: 'contact_form' });
        setTimeout(() => setStatus('idle'), 5000);
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(220,228,238,0.10)',
    borderRadius: 4, padding: 36,
  };

  return (
    <section id="kontakt" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,90px)', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: 500, height: 500,
        background: 'radial-gradient(circle,rgba(197,203,212,0.04) 0%,transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* heading */}
        <div style={{ marginBottom: 60 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 11,
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--plat)', fontWeight: 500, marginBottom: 20,
          }}>
            <span style={{ width: 34, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
            {t.badge}
          </div>
          <h2 className="font-fraunces" style={{ fontWeight: 300, fontSize: 'clamp(32px,5vw,72px)', lineHeight: 1.04, letterSpacing: '-0.01em' }}>
            {t.title}{' '}
            <em style={{
              fontStyle: 'italic', fontWeight: 400,
              background: 'linear-gradient(100deg,var(--plat-dk),var(--plat) 42%,var(--plat-lt))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{t.titleGrad}</em>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginTop: 14, fontWeight: 300 }}>{t.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32, alignItems: 'start' }}>
          {/* Info panel */}
          <div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 24, color: 'var(--ink)', fontFamily: 'var(--font-fraunces,Georgia),serif' }}>{t.infoTitle}</h3>
              {t.info.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0',
                  borderBottom: i < t.info.length - 1 ? '1px solid rgba(220,228,238,0.08)' : 'none',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 2, flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                    border: '1px solid rgba(220,228,238,0.08)',
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: 'var(--plat-lt)', fontWeight: 400 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              ...cardStyle, marginTop: 16, padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: '#4ade80', flexShrink: 0,
                boxShadow: '0 0 8px #4ade80', animation: 'pulse-glow 2s infinite',
              }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{t.available}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.slots}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={cardStyle}>
            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>✓</div>
                <h3 className="font-fraunces" style={{ fontSize: 24, fontWeight: 400, color: '#4ade80', marginBottom: 10 }}>{t.successTitle}</h3>
                <p style={{ color: 'var(--muted)', fontWeight: 300 }}>{t.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { key: 'name', label: t.name, type: 'text', ph: t.namePH, required: true },
                    { key: 'email', label: t.email, type: 'email', ph: t.emailPH, required: true },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{f.label}</label>
                      <input type={f.type} required={f.required} placeholder={f.ph}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        onFocus={() => setFocused(f.key)} onBlur={() => setFocused(null)}
                        style={inp(f.key)} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{t.phone}</label>
                  <input type="tel" placeholder={t.phonePH} value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                    style={inp('phone')} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{t.service}</label>
                  <select value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                    style={{ ...inp('service'), cursor: 'pointer' }}>
                    <option value="" style={{ background: '#0f131a' }}>{t.servicePH}</option>
                    {t.services.map(sv => <option key={sv} value={sv} style={{ background: '#0f131a' }}>{sv}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{t.message}</label>
                  <textarea required rows={5} placeholder={t.messagePH} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ ...inp('message'), resize: 'none', lineHeight: 1.7 }} />
                </div>
                {status === 'error' && (
                  <div style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>{t.errorMsg}</div>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-primary"
                  style={{ width: '100%', marginTop: 4, padding: '18px', textAlign: 'center' }}>
                  {status === 'sending' ? '…' : t.submit.replace(' ✦', '')}
                </button>
                <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', fontWeight: 300 }}>{t.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
