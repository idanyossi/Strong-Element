import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Footer from "./components/shared/Footer";
import { he } from "@/locales/he";

const { brand, common, layout, routes } = he;

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);

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
        {layout.skipToMain}
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="px-5 py-2 sm:px-7">
          <div className="relative flex h-16 items-center justify-center gap-5 rounded-full px-3 text-white lg:h-[76px]">
            <Link
              to={createPageUrl("Home")}
              className="flex items-center lg:absolute lg:right-3"
              aria-label={layout.homeAria}
            >
              <span className="text-2xl font-black uppercase tracking-[-0.06em] text-white lg:text-[34px]">
                {brand.name}
              </span>
              <span className="me-3 hidden text-[11px] font-extrabold uppercase tracking-wide text-white/70 sm:inline">
                {brand.since}
              </span>
            </Link>

            <nav
              className="hidden items-center gap-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2"
              aria-label={layout.mainNavAria}
            >
              {routes.navLinks.slice(1).reverse().map((link) => (
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

            <div className="hidden items-center gap-3 lg:absolute lg:left-3 lg:flex">
              <Link
                to={createPageUrl("Listings")}
                className="flex h-11 items-center rounded-full bg-white px-6 text-sm font-extrabold text-[#082b86]"
              >
                {common.allListings}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
