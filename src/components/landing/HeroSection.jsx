import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, LocateFixed, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-black text-white lg:min-h-[92vh]">
      <img
        src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1900&q=85"
        alt="Modern real estate presentation"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center lg:min-h-[92vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
            Build Your Strongest Investment
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base font-extrabold leading-relaxed text-white sm:text-lg">
            Strong Element delivers elite real estate services with data-driven
            precision. We find properties that perform - not just today, but for
            decades.
          </p>

          <div className="mx-auto mt-9 flex max-w-[740px] items-center rounded-full bg-white p-2 shadow-2xl">
            <div className="flex min-h-16 flex-1 items-center gap-3 px-6 text-start text-slate-400">
              <span className="text-sm font-medium sm:text-base">
                Search Strong Element properties, locations, agents...
              </span>
            </div>
            <LocateFixed className="ms-4 hidden h-5 w-5 text-slate-500 sm:block" aria-hidden="true" />
            <Link to={createPageUrl("Listings")} aria-label="Explore properties">
              <Button className="h-14 w-14 rounded-full bg-[#082b86] p-0 text-white hover:bg-[#06216b] sm:h-16 sm:w-16">
                <Search className="h-7 w-7" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          <div className="mt-7 flex justify-center gap-3">
            <Link to={createPageUrl("Listings")}>
              <Button className="h-12 rounded-full bg-white px-7 text-sm font-extrabold text-[#082b86] hover:bg-slate-100">
                Explore Properties
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to={createPageUrl("About")}>
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/40 bg-white/10 px-7 text-sm font-extrabold text-white backdrop-blur-md hover:bg-white hover:text-[#082b86]"
              >
                About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
