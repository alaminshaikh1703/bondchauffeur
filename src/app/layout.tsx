import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Ammar Luxury | Global Chauffeur & Bespoke Travel Concierge",
  description:
    "Book luxury chauffeur services, airport transfers, by-the-hour hire, and curated New Zealand private journeys with professional vetted executive chauffeurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased selection:bg-[#0F63BD] selection:text-white">
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
