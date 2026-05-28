import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const SERVICES = [
  { label: "Strategy & Advisory", to: "/services#strategy" },
  { label: "Infrastructure & Development", to: "/services#infrastructure" },
  { label: "Government & Global Engagement", to: "/services#government" },
  { label: "Innovation, Technology & Execution", to: "/services#innovation" },
  { label: "Investment & Commercial Advisory", to: "/services#investment" },
  { label: "Digital Infrastructure & Innovation", to: "/services#digital" },
];

const INDUSTRIES = [
  { label: "Aviation & Aerospace", to: "/industries#aviation" },
  { label: "Government & Public Sector", to: "/industries#government" },
  { label: "Healthcare & Insurance", to: "/industries#healthcare" },
  { label: "Energy & Natural Resources", to: "/industries#energy" },
  { label: "Transport & Logistics", to: "/industries#transport" },
  { label: "Financial Services", to: "/industries#financial" },
  { label: "Technology & Digital Innovation", to: "/industries#technology" },
  {
    label: "Infrastructure & Urban Development",
    to: "/industries#infrastructure",
  },
  { label: "Trade & Commerce", to: "/industries#trade" },
  { label: "Education & Skills Development", to: "/industries#education" },
  { label: "Agriculture & Food Systems", to: "/industries#agriculture" },
  { label: "Security & Risk Advisory", to: "/industries#security" },
  { label: "Fashion & Textile", to: "/industries#fashion" },
];

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory mt-24">
      <div className="container-tight py-16 grid grid-cols-12 gap-x-8 gap-y-12">
        {/* Brand + Contact */}
        <div className="col-span-12 md:col-span-4">
          <Logo className="text-ivory" />
          <p className="mt-5 text-sm text-ivory/70 leading-relaxed">
            TEHGA Consulting is a strategic advisory firm working with
            governments, institutional investors, and leading corporates on
            strategy, infrastructure, investment, and policy — across Africa and
            international markets.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href="mailto:info@tehgaconsulting.com"
                className="flex items-center gap-2 text-ivory/70 hover:text-ivory transition-colors"
              >
                <Mail size={14} strokeWidth={1.5} />
                info@tehgaconsulting.com
              </a>
            </li>
            <li className="flex items-center gap-2 text-ivory/70">
              <MapPin size={14} strokeWidth={1.5} />
              Lagos · Nairobi · London
            </li>
          </ul>
        </div>

        {/* Navigate */}
        <div className="col-span-6 md:col-span-2">
          <p className="eyebrow text-ivory/60">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  className="text-ivory/80 hover:text-ivory transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-6 md:col-span-2">
          <p className="eyebrow text-ivory/60">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.to}>
                <Link
                  href={s.to}
                  className="text-ivory/70 hover:text-ivory transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries */}
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow text-ivory/60">Industries</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {INDUSTRIES.map((i) => (
              <li key={i.to}>
                <Link
                  href={i.to}
                  className="block text-xs leading-snug text-ivory/70 hover:text-ivory transition-colors"
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>TEHGA Consulting. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </a>
            <span className="text-ivory/20">•</span>
            <a href="/terms" className="hover:text-ivory transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="tracking-[0.15em] uppercase">Africa · Global</p>
        </div>
      </div>
    </footer>
  );
}
