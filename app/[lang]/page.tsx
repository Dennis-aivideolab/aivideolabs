import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Stats from '../components/Stats';
import CTA from '../components/CTA';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChipBackground from '../components/ChipBackground';
import CookieBanner from '../components/CookieBanner';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { notFound } from 'next/navigation';

const VALID_LANGS = ['de', 'ch', 'en'];

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!VALID_LANGS.includes(lang)) notFound();

  return (
    <>
      <GoogleAnalytics />
      <ChipBackground />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Stats />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
