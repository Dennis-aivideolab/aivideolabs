import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChipBackground from './components/ChipBackground';

export default function Home() {
  return (
    <>
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
    </>
  );
}
