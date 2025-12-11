import { Header } from '../../components/landing/Header';
import { Hero } from '../../components/landing/Hero';
import { Features } from '../../components/landing/Features';
import { HowItWorks } from '../../components/landing/HowItWorks';
import { Showcase } from '../../components/landing/Showcase';
import { Pricing } from '../../components/landing/Pricing';
import { CTASection } from '../../components/landing/CTASection';
import { Footer } from '../../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}
