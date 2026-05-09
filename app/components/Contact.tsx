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

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%', padding: '14px 18px',
    background: focused === name ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === name ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px', color: '#ffffff', fontSize: '15px', outline: 'none', transition: 'all 0.3s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(34,211,238,0.08)' : 'none',
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

  return (
    <section id="contact" style={{ padding: '90px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: '50px', padding: '5px 16px', fontSize: '12px', color: '#a855f7',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600,
          }}>{t.badge}</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
            {t.title}{' '}<span className="gradient-text">{t.titleGrad}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginTop: '12px' }}>{t.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px', padding: '36px', marginBottom: '20px',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>{t.infoTitle}</h3>
              {t.info.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</div>
                    <div style={{ fontSize: '14px', color: item.color, fontWeight: 500, marginTop: '2px' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(124,58,237,0.06))',
              border: '1px solid rgba(168,85,247,0.15)', borderRadius: '16px', padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88', animation: 'pulse-glow 2s infinite', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{t.available}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{t.slots}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '36px' }}>
            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#00ff88', marginBottom: '8px' }}>{t.successTitle}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>{t.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.name}</label>
                    <input type="text" required placeholder={t.namePH} value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={inputStyle('name')} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.email}</label>
                    <input type="email" required placeholder={t.emailPH} value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.phone}</label>
                  <input type="tel" placeholder={t.phonePH} value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={inputStyle('phone')} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.service}</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('service'), cursor: 'pointer' }}>
                    <option value="" style={{ background: '#1a1a3f' }}>{t.servicePH}</option>
                    {t.services.map(s => <option key={s} value={s} style={{ background: '#1a1a3f' }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.message}</label>
                  <textarea required rows={5} placeholder={t.messagePH} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.6 }} />
                </div>
                {status === 'error' && (
                  <div style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center' }}>{t.errorMsg}</div>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ width: '100%', marginTop: '4px', fontSize: '16px', padding: '16px', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? '...' : t.submit}
                </button>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{t.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
