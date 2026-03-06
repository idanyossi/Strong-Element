import React from "react";
import HeroSection from "../components/landing/HeroSection";
import AboutPreview from "../components/landing/AboutPreview";
import FeaturedListings from "../components/landing/FeaturedListings";
import StatsBar from "../components/landing/StatsBar";
import CTASection from "../components/landing/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <AboutPreview />
      <FeaturedListings />
      <CTASection />
    </div>
  );
}
