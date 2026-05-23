import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";
import { UserRound } from "lucide-react";
import Footer from "./components/shared/Footer";
import LoginModal from "./components/shared/LoginModal";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Listings", page: "Listings" },
  { label: "About", page: "About" },
  { label: "Agents", page: "Agents" },
  { label: "Articles", page: "Articles" },
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = currentPageName === "Home";
  const headerBg =
    scrolled || !isHome
      ? "bg-[#082b86] shadow-lg"
      : "bg-transparent";

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="px-5 py-2 sm:px-7">
          <div className="flex h-16 items-center justify-between gap-5 rounded-full px-3 text-white lg:h-[76px]">
            <Link
              to={createPageUrl("Home")}
              className="flex items-center"
              aria-label="Strong Element home"
            >
              <span className="text-2xl font-black uppercase tracking-[-0.06em] text-white lg:text-[34px]">
                STRONG<span>ELEMENT</span><span>.</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
              {navLinks.slice(1).reverse().map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  aria-current={currentPageName === link.page ? "page" : undefined}
                  className={`text-[15px] font-extrabold text-white transition-opacity hover:opacity-75 ${
                    currentPageName === link.page
                      ? "underline underline-offset-8"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to={createPageUrl("Listings")}
                className="flex h-11 items-center rounded-full bg-white px-6 text-sm font-extrabold text-[#082b86]"
              >
                All Homes
              </Link>
              {user ? (
                <button
                  onClick={logout}
                  className="serhant-pill flex h-11 w-11 items-center justify-center"
                  type="button"
                  aria-label="Sign out"
                >
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="serhant-pill flex h-11 w-11 items-center justify-center"
                  type="button"
                  aria-label="Sign in"
                >
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <Footer />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
