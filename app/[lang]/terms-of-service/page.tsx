import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalPage from '../../components/LegalPage';
import { legalContent } from '@/lib/legal';

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en') notFound();

  return (
    <>
      <Navbar />
      <LegalPage title={legalContent.agb.en.title} content={legalContent.agb.en.content} lang={lang} backLabel="← Back" />
      <Footer />
    </>
  );
}
