import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalPage from '../../components/LegalPage';
import { legalContent } from '@/lib/legal';
import type { Lang } from '@/lib/legal';

export default async function DatenschutzPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!['de', 'ch'].includes(lang)) notFound();
  const content = legalContent.datenschutz[lang as Lang];

  return (
    <>
      <Navbar />
      <LegalPage title={content.title} content={content.content} lang={lang} backLabel="← Zurück" />
      <Footer />
    </>
  );
}
