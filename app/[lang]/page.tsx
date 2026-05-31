import ThreeScene from '../components/ThreeScene';
import PortfolioMobile from '../components/PortfolioMobile';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
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
      <ThreeScene />
      <main id="contact" style={{ position: 'relative', zIndex: 15, background: 'var(--bg)' }}>
        {/* Portfolio only on mobile — desktop uses Three.js overlay (unchanged) */}
        <div className="hide-desktop">
          <PortfolioMobile />
        </div>
        <Contact />
        <Footer />
      </main>
      <CookieBanner />
    </>
  );
}
