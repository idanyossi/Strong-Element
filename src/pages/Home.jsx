import React from "react";
import HeroSection from "../components/landing/HeroSection";
import AboutPreview from "../components/landing/AboutPreview";
import FeaturedListings from "../components/landing/FeaturedListings";
import StatsBar from "../components/landing/StatsBar";
import CTASection from "../components/landing/CTASection";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <div className="relative z-10 -mt-12 overflow-hidden rounded-t-[44px] bg-[#f4f4f4] lg:-mt-16 lg:rounded-t-[64px]">
        <StatsBar />
        <AboutPreview />
        <FeaturedListings />
        <CTASection />
      </div>
    </div>
  );
}
