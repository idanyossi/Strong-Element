import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "בית", page: "Home" },
  { label: "נכסים", page: "Listings" },
  { label: "אודות", page: "About" },
  { label: "הצוות", page: "Agents" },
  { label: "מאמרים", page: "Articles" },
  { label: "נגישות", page: "Accessibility" },
  { label: "מדיניות פרטיות", page: "Privacy" },
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
              ניסיון, מומחיות משפטית, חשיבה שיווקית אגרסיבית והבנה עמוקה בשוק
              הנדל"ן.
            </p>
          </div>

          <div className="rounded-[28px] bg-white/10 p-7 backdrop-blur-md">
            <h4 className="mb-5 text-sm font-black">ניווט</h4>
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
            <h4 className="mb-5 text-sm font-black">יצירת קשר</h4>
            <ul className="space-y-4 text-sm font-bold text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <span>
                  בן יהודה 191 א'
                  <br />
                  תל אביב
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <a href="tel:+972548078079" className="hover:text-white">
                  0548078079
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                <a href="mailto:guy@ha-tovim.co.il" className="hover:text-white">
                  guy@ha-tovim.co.il
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-7">
          <p className="text-xs font-bold text-white/55">
            © {new Date().getFullYear()} Strong Element Ltd. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
