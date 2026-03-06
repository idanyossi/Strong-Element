import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Listings", page: "Listings" },
  { label: "About", page: "About" },
  { label: "Agents", page: "Agents" },
  { label: "Articles", page: "Articles" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold tracking-tight">
              STRONG<span className="text-[#C9A84C]">ELEMENT</span>
            </h3>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Premium real estate services built on expertise, integrity, and
              results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    to={createPageUrl(link.page)}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          {/*  <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Residential Sales</li>
              <li>Commercial Properties</li>
              <li>Property Management</li>
              <li>Investment Advisory</li>
              <li>Market Analysis</li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#C9A84C] flex-shrink-0" />
                <span>
                  123 Business Avenue
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <span>info@strongelement.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs tracking-wide">
            © {new Date().getFullYear()} Strong Element. All rights reserved.
          </p>
          {/* <div className="flex gap-6 text-xs text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
