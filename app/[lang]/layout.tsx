import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'ch' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getT(lang);
  const localeMap: Record<string, string> = { de: 'de_DE', ch: 'de_CH', en: 'en_US' };
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: ['Video Production', 'AI Design', 'KI Videoinhalte', 'Schweiz', 'Social Media', 'TikTok', 'Next.js'],
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: 'website',
      locale: localeMap[lang] ?? 'de_DE',
      url: `https://aivideolabs.ch/${lang}`,
      images: [{ url: 'https://aivideolabs.ch/og-image.png', width: 1200, height: 630, alt: 'VideoLabs AI' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['https://aivideolabs.ch/og-image.png'],
    },
    alternates: {
      canonical: `https://aivideolabs.ch/${lang}`,
      languages: {
        'de': 'https://aivideolabs.ch/de',
        'de-CH': 'https://aivideolabs.ch/ch',
        'en': 'https://aivideolabs.ch/en',
      },
    },
  };
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
