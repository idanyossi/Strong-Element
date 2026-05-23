import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Shield,
    title: "יחסי אנוש",
    description:
      "אנחנו בונים קשרים, לא רשימות תפוצה. אנחנו יודעים איפה נמצאת ההזדמנות הבאה עוד לפני שהיא יוצאת לשוק, כי עסקים עושים עם אנשים, לא עם עסקים.",
  },
  {
    icon: TrendingUp,
    title: "בחינה משפטית",
    description:
      "אנחנו מפרקים כל עסקה לגורמים כדי להבטיח ביטחון וודאות, וכך אנו מזהים בעיות משפטיות לפני שהן מתרחשות ומונעים אותן מראש.",
  },
  {
    icon: Users,
    title: "שיווק יצירתי בשוק משתנה",
    description:
      "אנחנו לא \"מפרסמים\" נכסים, אנחנו מספרים עליהם סיפור שגורם לשוק לעצור את הנשימה.",
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-[#f4f4f4] py-20 lg:py-28">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-black text-[#082b86]">WHO WE ARE</p>
            <h2 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              נדל"ן הוא לא רק קירות ובטון
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
              ב- Strong Element, אנחנו מאמינים שנדל"ן הוא שילוב של שלוש זרועות
              עוצמתיות שחייבות לעבוד בסנכרון מושלם.
            </p>
            <Link
              to={createPageUrl("About")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#082b86] px-7 py-4 text-sm font-extrabold text-white hover:bg-[#06216b]"
            >
              קרא עוד עלינו
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
