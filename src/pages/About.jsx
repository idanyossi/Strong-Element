import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Lightbulb, Award, CheckCircle } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    text: "We operate with full transparency and uphold the highest ethical standards in every transaction.",
  },
  {
    icon: Target,
    title: "Precision",
    text: "Every property we recommend is backed by rigorous market analysis and financial modeling.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "We leverage cutting-edge technology and data to stay ahead of market trends.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "We hold ourselves to the highest standards in service delivery and client outcomes.",
  },
];

const milestones = [
  {
    year: "2010",
    text: "Strong Element founded with a vision to redefine real estate services.",
  },
  {
    year: "2014",
    text: "Expanded operations to commercial real estate and investment advisory.",
  },
  { year: "2018", text: "Surpassed $1B in total transaction volume." },
  {
    year: "2022",
    text: "Launched data-driven property analytics platform for clients.",
  },
  {
    year: "2025",
    text: "Celebrating 15+ years of market leadership and client trust.",
  },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-[#0A1628] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                About Us
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Where Strength Meets Strategy in Real Estate
            </h1>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Strong Element was founded on a simple principle: real estate
              decisions should be driven by data, guided by expertise, and
              delivered with integrity. We are not just agents — we are
              strategic partners in your wealth-building journey.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] tracking-tight">
                Our Story
              </h2>
              <div className="mt-8 space-y-5 text-slate-500 leading-relaxed">
                <p>
                  What began as a boutique advisory firm in 2010 has grown into
                  one of the most trusted names in premium real estate. Our
                  founder envisioned a company that would marry deep market
                  intelligence with white-glove client service.
                </p>
                <p>
                  Today, Strong Element represents a curated portfolio of
                  residential and commercial properties, serving discerning
                  clients who demand excellence. Our team of seasoned agents
                  brings decades of combined experience across luxury
                  residential, commercial investments, and development
                  consulting.
                </p>
                <p>
                  We believe that every property transaction is a significant
                  life event — and we treat it as such. From first-time
                  homebuyers to seasoned investors, we deliver the same
                  unwavering commitment to results.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
                alt="Modern office"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0A1628] text-white p-8 hidden lg:block">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm text-slate-400 mt-1">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                Core Values
              </span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] tracking-tight">
              What Drives Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0A1628] flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="font-semibold text-[#0A1628] text-lg">
                  {v.title}
                </h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] tracking-tight">
              Our Journey
            </h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#C9A84C] flex-shrink-0 mt-1.5" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-slate-200" />
                  )}
                </div>
                <div className="pb-10">
                  <p className="text-sm font-semibold text-[#C9A84C] tracking-wider">
                    {m.year}
                  </p>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Why Choose Strong Element
              </h2>
              <div className="mt-10 space-y-5">
                {[
                  "Access to exclusive off-market properties",
                  "Dedicated agent support from first call to closing",
                  "Data-backed market intelligence and pricing strategy",
                  "Proven track record with $2B+ in transactions",
                  "Full-service: buying, selling, investing, and management",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80"
                alt="Property"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
