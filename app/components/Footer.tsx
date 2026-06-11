import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import {
  FALLBACK_FOOTER,
  FALLBACK_SERVICES,
  FALLBACK_INDUSTRIES,
} from "@/lib/fallback-data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
];

export async function Footer() {
  const [footer, services, industries] = await Promise.all([
    dbFetch(
      () => prisma.footerContent.findUnique({ where: { id: 1 } }),
      FALLBACK_FOOTER,
    ),
    dbFetch(
      () => prisma.service.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_SERVICES,
    ),
    dbFetch(
      () => prisma.industry.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_INDUSTRIES,
    ),
  ]);

  const f = footer ?? FALLBACK_FOOTER;

  return (
    <footer className="bg-forest-deep text-ivory mt-24">
      <div className="container-tight py-16 grid grid-cols-12 gap-x-8 gap-y-12">
        {/* Brand + Contact */}
        <div className="col-span-12 md:col-span-4">
          <Logo className="text-ivory" />
          <p className="mt-5 text-sm text-ivory/70 leading-relaxed">
            {f.description}
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${f.email}`}
                className="flex items-center gap-2 text-ivory/70 hover:text-ivory transition-colors"
              >
                <Mail size={14} strokeWidth={1.5} />
                {f.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-ivory/70">
              <MapPin size={14} strokeWidth={1.5} />
              {f.offices}
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
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services?service=${s.slug}`}
                  className="text-ivory/70 hover:text-ivory transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries */}
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow text-ivory/60">Industries</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries?industry=${i.slug}`}
                  className="block text-xs leading-snug text-ivory/70 hover:text-ivory transition-colors"
                >
                  {i.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>{f.copyright}</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </a>
            <span className="text-ivory/20">•</span>
            <a href="/terms" className="hover:text-ivory transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="tracking-[0.15em] uppercase">{f.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
