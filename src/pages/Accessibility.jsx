import React from "react";
import { he } from "@/locales/he";

const { accessibilityPage: t, legal } = he;

export default function Accessibility() {
  return (
    <div className="bg-[#f4f4f4] pt-24">
      <section className="px-5 pb-8 pt-8 sm:px-8 lg:pt-14">
        <div className="mx-auto max-w-[1760px] rounded-[34px] bg-[#082b86] px-7 py-14 text-white sm:px-10 lg:rounded-[44px] lg:px-14 lg:py-20">
          <p className="mb-4 text-sm font-black text-white/75">
            {legal.updated}
          </p>
          <h1 className="text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-relaxed text-white/75">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 pt-8 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl space-y-4">
          {t.sections.map((section) => (
            <article key={section.title} className="rounded-2xl bg-white p-7">
              <h2 className="text-2xl font-black text-[#082b86]">
                {section.title}
              </h2>
              {section.body && (
                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pr-6 font-medium leading-relaxed text-slate-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
