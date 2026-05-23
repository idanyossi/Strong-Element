import React from "react";

export default function Accessibility() {
  return (
    <div className="pt-20">
      <section className="bg-[#0A1628] py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Accessibility Statement
          </h1>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Strong Element is working to make this website accessible in
            accordance with Israeli Standard 5568 and WCAG level AA guidance.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-10 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1628]">
              Accessibility Adjustments
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Semantic page structure, headings, landmarks, and navigation.</li>
              <li>Keyboard-accessible menus, filters, listings, articles, and dialogs.</li>
              <li>Visible focus indicators and skip navigation.</li>
              <li>Text alternatives for meaningful images and hidden decorative icons.</li>
              <li>Support for reduced-motion preferences.</li>
              <li>Screen-reader labels for controls whose purpose is not visible.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1628]">
              Known Limitations
            </h2>
            <p className="mt-4">
              Some listing, article, and agent content may be supplied by site
              administrators or third-party sources. We review this content and
              improve accessibility where issues are found.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1628]">
              Accessibility Contact
            </h2>
            <p className="mt-4">
              If you find an accessibility issue or need information in another
              format, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                Email:{" "}
                <a className="font-medium text-[#0A1628] underline" href="mailto:info@strongelement.com">
                  info@strongelement.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a className="font-medium text-[#0A1628] underline" href="tel:+15551234567">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>

          <p className="text-sm text-slate-500">
            Statement last updated: May 23, 2026.
          </p>
        </div>
      </section>
    </div>
  );
}
