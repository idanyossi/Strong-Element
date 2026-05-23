import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone } from "lucide-react";
import { he } from "@/locales/he";

const { cta } = he;

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="mb-4 text-sm font-black">{cta.eyebrow}</p>

        <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl">
          {cta.titleLine1}
          <br />
          {cta.titleLine2}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-relaxed text-white/85">
          {cta.body}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to={createPageUrl("Listings")}>
            <Button className="h-14 w-full rounded-full bg-white px-9 text-sm font-extrabold text-[#082b86] hover:bg-slate-100 sm:w-auto">
              {cta.primaryButton}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link to={createPageUrl("Agents")}>
            <Button
              variant="outline"
              className="h-14 w-full rounded-full border-white/35 bg-white/10 px-9 text-sm font-extrabold text-white backdrop-blur-md hover:bg-white hover:text-[#082b86] sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {cta.secondaryButton}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
