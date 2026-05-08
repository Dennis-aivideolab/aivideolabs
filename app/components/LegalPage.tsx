'use client';

import Link from 'next/link';

interface Props {
  title: string;
  content: string;
  lang: string;
  backLabel?: string;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#ffffff', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.5px' }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginTop: '24px', marginBottom: '12px' }}>{line.slice(4)}</h3>);
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '32px 0' }} />);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} style={{ fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ')) {
      elements.push(<li key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.7, marginBottom: '6px', marginLeft: '20px' }}>{parseLine(line.slice(2))}</li>);
    } else if (line.startsWith('| ')) {
      // Table row
      const cells = line.split('|').filter(c => c.trim() && !c.trim().match(/^-+$/));
      if (cells.length > 0 && !line.includes('---')) {
        elements.push(
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {cells.map((cell, ci) => (
              <td key={ci} style={{ padding: '10px 16px', fontSize: '13px', color: i === 1 ? '#a78bfa' : 'rgba(255,255,255,0.65)', fontWeight: ci === 0 ? 600 : 400 }}>
                {cell.trim()}
              </td>
            ))}
          </tr>
        );
      }
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      elements.push(<p key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>{parseLine(line)}</p>);
    }
    i++;
  }
  return elements;
}

function parseLine(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#ffffff', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: '#67e8f9', textDecoration: 'underline' }}>{linkMatch[1]}</a>;
    }
    return part;
  });
}

export default function LegalPage({ title, content, lang, backLabel = '← Zurück' }: Props) {
  return (
    <div style={{
      minHeight: '100vh', padding: '120px 24px 80px',
      background: 'linear-gradient(160deg, #0d1540 0%, #172060 40%, #0e1a50 70%, #0b1235 100%)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href={`/${lang}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px',
          marginBottom: '40px', transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#a78bfa'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}>
          {backLabel}
        </Link>

        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', padding: 'clamp(32px, 5vw, 56px)',
        }}>
          <div style={{
            display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '50px', padding: '4px 14px', fontSize: '11px', color: '#a78bfa',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600,
          }}>Legal</div>

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-1.5px', marginBottom: '40px' }}>
            {title}
          </h1>

          <div>{renderMarkdown(content)}</div>
        </div>
      </div>
    </div>
  );
}
