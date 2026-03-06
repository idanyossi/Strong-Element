import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A1628]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px),
                           repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px)`,
          }}
        />
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#1B2D4F] rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C] rounded-full blur-[150px] opacity-[0.07]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                Premium Real Estate
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              Build Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#D4B96A]">
                Strongest
              </span>
              <br />
              Investment
            </h1>

            <p className="mt-8 text-slate-400 text-lg max-w-lg leading-relaxed">
              Strong Element delivers elite real estate services with
              data-driven precision. We find properties that perform — not just
              today, but for decades.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl("Listings")}>
                <Button className="bg-[#C9A84C] hover:bg-[#D4B96A] text-[#0A1628] h-14 px-8 text-base font-semibold rounded-none tracking-wide">
                  Explore Properties
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("About")}>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white h-14 px-8 text-base rounded-none tracking-wide"
                >
                  About Us
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Modern architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-8 bottom-24 bg-white/10 backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A84C]/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-slate-400 text-sm">Properties Sold</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
