import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, Lightbulb, Shield, Target } from "lucide-react";

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
    <div className="bg-[#f4f4f4]">
      <section className="overflow-hidden bg-black text-white">
        <div className="relative flex min-h-[650px] items-center px-7 pb-20 pt-32 sm:px-10 lg:min-h-[760px] lg:px-14 lg:pt-36">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 mx-auto w-full max-w-[1760px]">
            <p className="mb-4 text-sm font-black text-white/75">About Us</p>
            <h1 className="max-w-5xl text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Where Strength Meets Strategy in Real Estate
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-relaxed text-white/80">
              Strong Element was founded on a simple principle: real estate
              decisions should be driven by data, guided by expertise, and
              delivered with integrity. We are not just agents - we are
              strategic partners in your wealth-building journey.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-black text-[#082b86]">Our Story</p>
            <h2 className="text-5xl font-black leading-none tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              Built to Move Differently
            </h2>
            <div className="mt-7 space-y-5 text-lg font-medium leading-relaxed text-slate-600">
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
                brings decades of combined experience across luxury residential,
                commercial investments, and development consulting.
              </p>
              <p>
                We believe that every property transaction is a significant life
                event - and we treat it as such. From first-time homebuyers to
                seasoned investors, we deliver the same unwavering commitment to
                results.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85"
              alt="Modern office"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white px-6 py-5">
              <p className="text-4xl font-black tracking-[-0.05em] text-[#082b86]">
                15+
              </p>
              <p className="text-sm font-black text-slate-500">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-black text-[#082b86]">
              Core Values
            </p>
            <h2 className="text-5xl font-black leading-none tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              What Drives Us
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white p-7"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#082b86] text-white">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black tracking-[-0.035em] text-[#082b86]">
                  {v.title}
                </h3>
                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 lg:p-10">
            <h2 className="text-4xl font-black tracking-[-0.05em] text-[#082b86]">
              Our Journey
            </h2>
            <div className="mt-8 space-y-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl bg-[#f4f4f4] p-5"
                >
                  <p className="text-xl font-black text-[#082b86]">{m.year}</p>
                  <p className="mt-1 font-medium leading-relaxed text-slate-600">
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-[#082b86] text-white">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85"
              alt="Property"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-8 lg:p-10">
              <h2 className="text-4xl font-black tracking-[-0.05em]">
                Why Choose Strong Element
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  "Access to exclusive off-market properties",
                  "Dedicated agent support from first call to closing",
                  "Data-backed market intelligence and pricing strategy",
                  "Proven track record with $2B+ in transactions",
                  "Full-service: buying, selling, investing, and management",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                    <p className="font-bold text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
