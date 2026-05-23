import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Listings", page: "Listings" },
  { label: "About", page: "About" },
  { label: "Agents", page: "Agents" },
  { label: "Articles", page: "Articles" },
  { label: "Accessibility", page: "Accessibility" },
];

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
              Premium real estate services built on expertise, integrity, and
              results.
            </p>
          </div>

          <div className="rounded-[28px] bg-white/10 p-7 backdrop-blur-md">
            <h4 className="mb-5 text-sm font-black">Navigation</h4>
            <ul className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
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
            <h4 className="mb-5 text-sm font-black">Contact</h4>
            <ul className="space-y-4 text-sm font-bold text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <span>
                  123 Business Avenue
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <a href="tel:+15551234567" className="hover:text-white">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <a href="mailto:info@strongelement.com" className="hover:text-white">
                  info@strongelement.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-7">
          <p className="text-xs font-bold text-white/55">
            © {new Date().getFullYear()} Strong Element. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
