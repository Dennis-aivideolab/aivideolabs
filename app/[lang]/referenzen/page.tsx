'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getT } from '@/lib/i18n';

const clients = [
  {
    id: 'hk-holz',
    name: 'HK Holz',
    logo: '/logos/Logo HK-Holz.PNG',
    video: '/videos/HK Holz clip2 - 720WebShareName.mov',
    tag: 'Video Production',
    color: '#a855f7',
  },
  {
    id: 'nicky-wahle',
    name: 'Nicky Wahle',
    logo: '/logos/Nicky Wahle.PNG',
    video: '/videos/Nicky Wahle.mp4',
    tag: 'Video Production',
    color: '#22d3ee',
  },
  {
    id: 'schurmann-kruse',
    name: 'Schürmann & Kruse',
    logo: '/logos/Schürmann&Kruse.PNG',
    video: '/videos/Schürmann & Kruse .mp4',
    tag: 'Video Production',
    color: '#ff00ff',
  },
  {
    id: 'texseller',
    name: 'Texseller',
    logo: '/logos/Texseller.PNG',
    video: null,
    tag: 'AI Design',
    color: '#7c3aed',
  },
  {
    id: 'tgk',
    name: 'TGK',
    logo: '/logos/TGK.PNG',
    video: '/videos/TGK - 720WebShareName.mov',
    tag: 'Video Production',
    color: '#a855f7',
  },
];

export default function ReferenzenPage() {
  const params = useParams();
  const lang = ((params?.lang as string) || 'de');
  const t = getT(lang).referenzen;
  const [active, setActive] = useState<string | null>(null);

  const activeClient = clients.find(c => c.id === active);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0a0e27', paddingTop: '100px', paddingBottom: '80px' }}>

        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '0 24px 64px' }}>
          <span style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: '50px',
            background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)',
            color: '#a855f7', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em',
            marginBottom: '24px',
          }}>
            {t.badge}
          </span>
          <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
            {t.title}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{t.titleGrad}</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
            {t.sub}
          </p>
        </section>

        {/* Logo Grid */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {clients.map(client => (
              <button
                key={client.id}
                onClick={() => setActive(active === client.id ? null : client.id)}
                style={{
                  background: active === client.id
                    ? `rgba(${client.color === '#22d3ee' ? '34,211,238' : client.color === '#ff00ff' ? '255,0,255' : '168,85,247'},0.1)`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active === client.id ? client.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '20px',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: active === client.id ? `0 0 30px ${client.color}40` : 'none',
                }}
                onMouseEnter={e => {
                  if (active !== client.id) {
                    (e.currentTarget as HTMLElement).style.border = `1px solid rgba(255,255,255,0.2)`;
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  }
                }}
                onMouseLeave={e => {
                  if (active !== client.id) {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
              >
                <div style={{ width: '120px', height: '80px', position: 'relative', filter: 'brightness(0) invert(1)' }}>
                  <Image src={client.logo} alt={client.name} fill style={{ objectFit: 'contain' }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {client.tag}
                </span>
                <span style={{
                  fontSize: '12px', padding: '4px 12px', borderRadius: '50px',
                  background: active === client.id ? client.color + '30' : 'rgba(255,255,255,0.05)',
                  color: active === client.id ? client.color : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${active === client.id ? client.color + '60' : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.3s',
                }}>
                  {active === client.id ? t.hide : t.show}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Detail View */}
        {activeClient && (
          <section style={{
            maxWidth: '900px', margin: '0 auto 80px', padding: '0 24px',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeClient.color}50`,
              borderRadius: '24px', padding: '40px',
              boxShadow: `0 0 60px ${activeClient.color}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div style={{ width: '100px', height: '64px', position: 'relative', filter: 'brightness(0) invert(1)', flexShrink: 0 }}>
                  <Image src={activeClient.logo} alt={activeClient.name} fill style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>{activeClient.name}</h2>
                  <span style={{
                    display: 'inline-block', padding: '3px 12px', borderRadius: '50px',
                    background: activeClient.color + '20', border: `1px solid ${activeClient.color}50`,
                    color: activeClient.color, fontSize: '12px', fontWeight: 600,
                  }}>{activeClient.tag}</span>
                </div>
              </div>

              {activeClient.video ? (
                <video
                  src={activeClient.video}
                  controls
                  playsInline
                  style={{
                    width: '100%', borderRadius: '16px',
                    border: `1px solid ${activeClient.color}30`,
                    boxShadow: `0 0 40px ${activeClient.color}20`,
                    maxHeight: '520px', background: '#000',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '200px', borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)', fontSize: '15px',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  {t.noVideo}
                </div>
              )}

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <a href={`/${lang}#contact`} style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  color: '#fff', textDecoration: 'none',
                  padding: '14px 36px', borderRadius: '50px',
                  fontSize: '15px', fontWeight: 700,
                  boxShadow: '0 0 30px rgba(168,85,247,0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(168,85,247,0.65)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(168,85,247,0.4)'; }}
                >
                  {t.cta}
                </a>
              </div>
            </div>
          </section>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
