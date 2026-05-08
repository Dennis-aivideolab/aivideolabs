import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalPage from '../../components/LegalPage';
import { legalContent } from '@/lib/legal';

export default async function LegalNoticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en') notFound();

  return (
    <>
      <Navbar />
      <LegalPage title={legalContent.impressum.en.title} content={legalContent.impressum.en.content} lang={lang} backLabel="← Back" />
      <Footer />
    </>
  );
}
