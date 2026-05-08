'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      padding: '48px 24px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top border */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,0,255,0.3), rgba(0,217,255,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ff00ff, #8a2be2, #00d9ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}>
              AI VIDEO LABS
            </div>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7,
              maxWidth: '240px',
            }}>
              KI-gestützte Video- und Designlösungen für die nächste Generation.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              Services
            </h4>
            {['Video Production', 'AI Design', 'Advertising Content', 'Digital Solutions'].map(item => (
              <a key={item} href="#services" style={{
                display: 'block',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '5px 0',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#ffffff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}>
                {item}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              Unternehmen
            </h4>
            {[
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Über uns', href: '#home' },
              { label: 'Kontakt', href: '#contact' },
            ].map(item => (
              <a key={item.label} href={item.href} style={{
                display: 'block',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '5px 0',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#ffffff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              Kontakt
            </h4>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>
              <div>📧 aivideolabs.ch@gmail.com</div>
              <div>🌐 aivideolabs.ch</div>
              <div>📍 Schweiz 🇨🇭</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            © {year} AI Video Labs – Alle Rechte vorbehalten
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Datenschutz', 'Impressum', 'AGB'].map(item => (
              <a key={item} href="#" style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
