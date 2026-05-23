import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description:
      "Transparent dealings and honest counsel form the bedrock of every client relationship.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven",
    description:
      "We leverage market analytics and deep local insight to maximize your investment returns.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description:
      "Every strategy is tailored to your goals, timeline, and risk profile - no generic playbook.",
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-[#f4f4f4] py-20 lg:py-28">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-black text-[#082b86]">Who We Are</p>
            <h2 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              A Foundation Built on Expertise
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
              Strong Element is a premier real estate firm specializing in
              high-value residential and commercial properties. With over a
              decade of market expertise, we connect discerning clients with
              exceptional investment opportunities.
            </p>
            <Link
              to={createPageUrl("About")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#082b86] px-7 py-4 text-sm font-extrabold text-white hover:bg-[#06216b]"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-2xl bg-white p-7"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#082b86] text-white">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black tracking-[-0.035em] text-[#082b86]">
                  {item.title}
                </h3>
                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
