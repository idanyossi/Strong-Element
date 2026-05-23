import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";
import { Menu, X } from "lucide-react";
import Footer from "./components/shared/Footer";
import LoginModal from "./components/shared/LoginModal";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Listings", page: "Listings" },
  { label: "About", page: "About" },
  { label: "Agents", page: "Agents" },
  { label: "Articles", page: "Articles" },
];

const mobileNavId = "mobile-navigation";

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();

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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              to={createPageUrl("Home")}
              className="flex items-center"
              aria-label="Strong Element home"
            >
              <span className="text-lg font-bold text-white tracking-tight">
                STRONG<span className="text-[#C9A84C]">ELEMENT</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  aria-current={currentPageName === link.page ? "page" : undefined}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    currentPageName === link.page
                      ? "text-[#C9A84C] underline underline-offset-8"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={logout}
                  className="hidden lg:inline-flex text-sm text-slate-400 hover:text-white transition-colors"
                  type="button"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="hidden lg:inline-flex text-sm text-slate-400 hover:text-white transition-colors"
                  type="button"
                >
                  Sign In
                </button>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2"
                type="button"
                aria-controls={mobileNavId}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[#0A1628] border-t border-white/10" id={mobileNavId}>
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  aria-current={currentPageName === link.page ? "page" : undefined}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    currentPageName === link.page
                      ? "text-[#C9A84C] underline underline-offset-8"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-3 border-t border-white/10">
                {user ? (
                  <button
                    onClick={logout}
                    className="px-4 py-3 text-sm text-slate-400"
                    type="button"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowLogin(true);
                    }}
                    className="px-4 py-3 text-sm text-slate-400"
                    type="button"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <Footer />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
