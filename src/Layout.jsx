import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Menu, X } from "lucide-react";
import Footer from "./components/shared/Footer";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Listings", page: "Listings" },
  { label: "About", page: "About" },
  { label: "Agents", page: "Agents" },
  { label: "Articles", page: "Articles" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPageName]);

  const isHome = currentPageName === "Home";
  const headerBg =
    scrolled || !isHome
      ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg"
      : "bg-transparent";

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <span className="text-lg font-bold text-white tracking-tight">
                STRONG<span className="text-[#C9A84C]">ELEMENT</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    currentPageName === link.page
                      ? "text-[#C9A84C]"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth + Mobile Toggle */}
            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={() => base44.auth.logout()}
                  className="hidden lg:inline-flex text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="hidden lg:inline-flex text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Sign In
                </button>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0A1628] border-t border-white/10">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    currentPageName === link.page
                      ? "text-[#C9A84C]"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-3 border-t border-white/10">
                {user ? (
                  <button
                    onClick={() => base44.auth.logout()}
                    className="px-4 py-3 text-sm text-slate-400"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => base44.auth.redirectToLogin()}
                    className="px-4 py-3 text-sm text-slate-400"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
