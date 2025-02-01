import FeaturesSection from "./components/features-section";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import Navbar from "./components/navbar";
import PricingSection from "./components/pricing-section";
import PromoBanner from "./components/promo-banner";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
