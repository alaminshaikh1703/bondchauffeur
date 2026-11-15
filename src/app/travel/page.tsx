import TravelApp from "@/travel/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated New Zealand Journeys | Ammar Luxury New Zealand",
  description:
    "Set forth on a private, tailor-made luxury expedition to the furthest reaches of Aotearoa New Zealand.",
};

export default function TravelPage() {
  return <TravelApp />;
}
