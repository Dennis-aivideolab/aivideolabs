'use client';

import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', service: '', message: '' });
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    background: focused === name ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === name ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(34,211,238,0.08)' : 'none',
  });

  const services = ['Video Production', 'AI Design', 'Advertising Content', 'Digital Solutions', 'Anderes'];

  return (
    <section id="contact" style={{
      padding: '90px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '50px',
            padding: '5px 16px',
            fontSize: '12px',
            color: '#a855f7',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: 600,
          }}>
            Get in Touch
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
          }}>
            Lass uns{' '}
            <span className="gradient-text">reden</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            marginTop: '12px',
          }}>
            Beschreib dein Projekt – wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Contact info */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px',
              padding: '36px',
              marginBottom: '20px',
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '24px',
                color: '#ffffff',
              }}>
                Kontaktinfo
              </h3>
              {[
                { icon: '📧', label: 'E-Mail', value: 'aivideolabs.ch@gmail.com', color: '#a855f7' },
                { icon: '🌐', label: 'Website', value: 'aivideolabs.ch', color: '#22d3ee' },
                { icon: '📍', label: 'Standort', value: 'Schweiz 🇨🇭', color: '#7c3aed' },
                { icon: '⏱️', label: 'Response', value: 'Innerhalb 24h', color: '#ff6b6b' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `rgba(${item.color === '#a855f7' ? '255,0,255' : item.color === '#22d3ee' ? '0,217,255' : item.color === '#7c3aed' ? '138,43,226' : '255,107,107'}, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '14px', color: item.color, fontWeight: 500, marginTop: '2px' }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social / availability */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(124,58,237,0.06))',
              border: '1px solid rgba(168,85,247,0.15)',
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: '#00ff88',
                boxShadow: '0 0 10px #00ff88',
                animation: 'pulse-glow 2s infinite',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Verfügbar für neue Projekte</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>Aktuell 2 Slots offen</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px',
            padding: '36px',
          }}>
            {sent ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 24px',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#00ff88', marginBottom: '8px' }}>
                  Nachricht gesendet!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Wir melden uns innerhalb von 24 Stunden.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Max Mustermann"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      E-Mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="max@example.ch"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('email')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('service'),
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" style={{ background: '#1a1a3f' }}>Service auswählen…</option>
                    {services.map(s => (
                      <option key={s} value={s} style={{ background: '#1a1a3f' }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Nachricht
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Beschreib dein Projekt, Budget und Zeitrahmen…"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('message'),
                      resize: 'none',
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{
                  width: '100%',
                  marginTop: '4px',
                  fontSize: '16px',
                  padding: '16px',
                }}>
                  Anfrage senden ✦
                </button>

                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.3)',
                  textAlign: 'center',
                }}>
                  Keine Spam. Deine Daten sind sicher.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
