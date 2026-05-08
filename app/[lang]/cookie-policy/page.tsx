import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalPage from '../../components/LegalPage';
import { legalContent } from '@/lib/legal';
import type { Lang } from '@/lib/legal';

const backLabels: Record<string, string> = { de: '← Zurück', ch: '← Zrugg', en: '← Back' };

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = (['de', 'ch', 'en'].includes(lang) ? lang : 'de') as Lang;
  const content = legalContent.cookiePolicy[l];

  return (
    <>
      <Navbar />
      <LegalPage title={content.title} content={content.content} lang={lang} backLabel={backLabels[lang] || '← Back'} />
      <Footer />
    </>
  );
}
