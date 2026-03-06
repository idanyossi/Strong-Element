import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, TrendingUp, Users, ArrowRight } from "lucide-react";
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
      "Every strategy is tailored to your goals, timeline, and risk profile — no generic playbook.",
  },
];

export default function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                Who We Are
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] leading-tight tracking-tight">
              A Foundation Built
              <br />
              on Expertise
            </h2>
            <p className="mt-6 text-slate-500 text-lg leading-relaxed max-w-lg">
              Strong Element is a premier real estate firm specializing in
              high-value residential and commercial properties. With over a
              decade of market expertise, we connect discerning clients with
              exceptional investment opportunities.
            </p>
            <Link
              to={createPageUrl("About")}
              className="inline-flex items-center mt-8 text-[#0A1628] font-semibold hover:text-[#C9A84C] transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5 p-6 bg-slate-50 hover:bg-slate-100/80 transition-colors"
              >
                <div className="w-12 h-12 bg-[#0A1628] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A1628] text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
