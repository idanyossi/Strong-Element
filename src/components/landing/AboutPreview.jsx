import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { he } from "@/locales/he";

const iconMap = {
  relationships: Shield,
  legal: TrendingUp,
  marketing: Users,
};

const { aboutPreview } = he;

export default function AboutPreview() {
  return (
    <section className="bg-[#f4f4f4] py-20 lg:py-28">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-black text-[#082b86]">{aboutPreview.eyebrow}</p>
            <h2 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              {aboutPreview.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
              {aboutPreview.body}
            </p>
            <Link
              to={createPageUrl("About")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#082b86] px-7 py-4 text-sm font-extrabold text-white hover:bg-[#06216b]"
            >
              {aboutPreview.readMore}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {aboutPreview.values.map((item, i) => {
              const Icon = iconMap[item.id];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="rounded-2xl bg-white p-7"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#082b86] text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black tracking-[-0.035em] text-[#082b86]">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-medium leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
