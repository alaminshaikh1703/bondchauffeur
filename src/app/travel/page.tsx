import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NzTravelExperience } from "@/components/travel/NzTravelExperience";
import { ScrollEffects } from "@/components/ScrollEffects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated New Zealand Journeys | Ammar Luxury New Zealand",
  description:
    "",
};

export default function TravelPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0F1319] w-full max-w-full overflow-x-hidden">
      <ScrollEffects />
      <Navbar />
      <NzTravelExperience />
      <Footer />
    </main>
  );
}
