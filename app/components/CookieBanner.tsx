'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getT } from '@/lib/i18n';

interface Prefs { essential: true; analytics: boolean; marketing: boolean; }

function getPrefs(): Prefs | null {
  try { return JSON.parse(localStorage.getItem('cookie_consent') ?? 'null'); } catch { return null; }
}

function savePrefs(prefs: Prefs) {
  localStorage.setItem('cookie_consent', JSON.stringify(prefs));
  window.dispatchEvent(new Event('cookie_consent_updated'));
}

export default function CookieBanner() {
  const params = useParams();
  const lang = (params?.lang as string) ?? 'de';
  const t = getT(lang).cookie;

  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!getPrefs()) setVisible(true);
  }, []);

  const accept = (all: boolean) => {
    savePrefs({ essential: true, analytics: all, marketing: all });
    setVisible(false);
  };

  const saveCustom = () => {
    savePrefs({ essential: true, analytics, marketing });
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, width: 'min(95vw, 600px)',
      background: 'rgba(13, 21, 64, 0.97)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(124, 58, 237, 0.35)',
      borderRadius: '20px',
      padding: '24px 28px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)',
    }}>
      {!showSettings ? (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '28px', flexShrink: 0 }}>🍪</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '6px' }}>{t.title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => accept(true)} style={{
              flex: 1, minWidth: '140px', padding: '11px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', fontWeight: 600, fontSize: '14px',
              boxShadow: '0 4px 16px rgba(124,58,237,0.4)', transition: 'all 0.2s',
            }}>{t.acceptAll}</button>
            <button onClick={() => accept(false)} style={{
              flex: 1, minWidth: '120px', padding: '11px 20px', borderRadius: '50px', cursor: 'pointer',
              background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
            }}>{t.essentialOnly}</button>
            <button onClick={() => setShowSettings(true)} style={{
              padding: '11px 20px', borderRadius: '50px', cursor: 'pointer',
              background: 'transparent', border: '1.5px solid rgba(124,58,237,0.4)',
              color: '#a78bfa', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
            }}>{t.settings}</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '20px' }}>{t.settingsTitle}</div>

          {[
            { key: 'essential', label: t.essential, desc: t.essentialDesc, value: true, fixed: true },
            { key: 'analytics', label: t.analytics, desc: t.analyticsDesc, value: analytics, fixed: false, set: setAnalytics },
            { key: 'marketing', label: t.marketing, desc: t.marketingDesc, value: marketing, fixed: false, set: setMarketing },
          ].map(item => (
            <div key={item.key} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ flex: 1, paddingRight: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff', marginBottom: '3px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
              {item.fixed ? (
                <span style={{ fontSize: '11px', color: '#22d3ee', fontWeight: 600, background: 'rgba(34,211,238,0.1)', padding: '4px 10px', borderRadius: '20px' }}>
                  {t.alwaysActive}
                </span>
              ) : (
                <button
                  onClick={() => item.set?.(!item.value)}
                  style={{
                    width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', flexShrink: 0,
                    background: item.value ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.12)',
                    transition: 'all 0.2s', position: 'relative',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: '3px', left: item.value ? '23px' : '3px',
                    width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                    transition: 'left 0.2s', display: 'block',
                  }} />
                </button>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={saveCustom} style={{
              flex: 1, padding: '12px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', fontWeight: 600, fontSize: '14px',
            }}>{t.save}</button>
            <button onClick={() => setShowSettings(false)} style={{
              padding: '12px 20px', borderRadius: '50px', cursor: 'pointer',
              background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '14px',
            }}>←</button>
          </div>
        </>
      )}
    </div>
  );
}
