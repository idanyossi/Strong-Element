import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import { he } from "@/locales/he";

const { footer, routes } = he;

export default function Footer() {
  return (
    <footer className="bg-[#082b86] text-white">
      <div className="mx-auto max-w-[1760px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-4xl font-black uppercase tracking-[-0.06em]">
              STRONG<span>ELEMENT</span><span>.</span>
            </p>
            <p className="mt-5 max-w-md text-base font-bold leading-relaxed text-white/75">
              {footer.summary}
            </p>
          </div>

          <div className="rounded-[28px] bg-white/10 p-7 backdrop-blur-md">
            <h4 className="mb-5 text-sm font-black">{footer.navigation}</h4>
            <ul className="grid grid-cols-2 gap-3">
              {routes.footerLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    to={createPageUrl(link.page)}
                    className="text-sm font-bold text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-white/10 p-7 backdrop-blur-md">
            <h4 className="mb-5 text-sm font-black">{footer.contact}</h4>
            <ul className="space-y-4 text-sm font-bold text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <span>
                  {footer.addressLine1}
                  <br />
                  {footer.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <a href={`tel:+972${footer.phone.replace(/^0/, "")}`} className="hover:text-white">
                  {footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <a href={`mailto:${footer.email}`} className="hover:text-white">
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-7">
          <p className="text-xs font-bold text-white/55">
            © {new Date().getFullYear()} Strong Element Ltd. {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
