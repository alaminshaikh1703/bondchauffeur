import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AppSection } from "@/components/sections/AppSection";
import { SanctuarySection } from "@/components/sections/SanctuarySection";
import { StandardsSection } from "@/components/sections/StandardsSection";
import { FleetSection } from "@/components/fleet/FleetSection";
import { Footer } from "@/components/layout/Footer";
import { ScrollEffects } from "@/components/ScrollEffects";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0F1319] w-full max-w-full overflow-x-hidden">
      <ScrollEffects />
      <Navbar />
      <Hero />
      <ServicesSection /> 
      <SanctuarySection />
      <StandardsSection />
      <FleetSection />
       <AppSection />
      <Footer />
    </main>
  );
}
