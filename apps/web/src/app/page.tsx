import FeaturesSection from "./components/features-section";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import Navbar from "./components/navbar";
import PricingSection from "./components/pricing-section";

export async function generateMetadata() {
  return {
    title: "Resumy | Crie seu portfólio profissional",
    description:
      "Crie e compartilhe seu portfólio profissional com facilidade usando Resumy.",
    openGraph: {
      title: "Resumy | Crie seu portfólio profissional",
      description:
        "Crie e compartilhe seu portfólio profissional com facilidade usando Resumy.",
      // images: ["/images/landing-page-banner.png"],
    },
  };
}

export default function Home() {
  return (
    <>
      {/* <PromoBanner /> */}
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
