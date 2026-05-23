import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "נכסים שנמכרו" },
  { value: "98%", label: "שביעות רצון לקוחות" },
  { value: "15+", label: "שנות ניסיון" },
  { value: "$2B+", label: "היקף עסקאות" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#f4f4f4] pt-16">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white px-6 py-7"
            >
              <p className="text-4xl font-black tracking-[-0.05em] text-[#082b86] lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-extrabold tracking-tight text-slate-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
