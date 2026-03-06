import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A1628] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)`,
          }}
        />
      </div>
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#C9A84C] rounded-full blur-[150px] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
            Get Started
          </span>
          <div className="h-px w-12 bg-[#C9A84C]" />
        </div>

        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to Find Your
          <br />
          Next Property?
        </h2>

        <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you're buying, selling, or investing — our team of expert
          agents is ready to guide you through every step of the journey.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl("Listings")}>
            <Button className="bg-[#C9A84C] hover:bg-[#D4B96A] text-[#0A1628] h-14 px-10 text-base font-semibold rounded-none tracking-wide w-full sm:w-auto">
              Browse Listings
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to={createPageUrl("Agents")}>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white h-14 px-10 text-base rounded-none tracking-wide w-full sm:w-auto"
            >
              <Phone className="mr-2 w-4 h-4" />
              Contact an Agent
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
