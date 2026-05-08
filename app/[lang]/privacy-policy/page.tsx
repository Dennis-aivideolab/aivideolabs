import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalPage from '../../components/LegalPage';
import { legalContent } from '@/lib/legal';

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en') notFound();

  return (
    <>
      <Navbar />
      <LegalPage title={legalContent.datenschutz.en.title} content={legalContent.datenschutz.en.content} lang={lang} backLabel="← Back" />
      <Footer />
    </>
  );
}
