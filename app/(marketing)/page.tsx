import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import Examples from "@/components/landing/examples";
import Pricing from "@/components/landing/pricing";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Examples />
      <Pricing />
      <Footer />
    </main>
  );
}
