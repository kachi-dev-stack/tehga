import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory mt-24">
      <div className="container-tight py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-ivory" />
          <p className="mt-5 max-w-sm text-sm text-ivory/70 leading-relaxed">
            Placeholder tagline. Strategic advisory for organizations shaping
            the next era of African and global enterprise.
          </p>
        </div>

        <div>
          <p className="eyebrow text-ivory/60">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/industries", label: "Industries" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
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

        <div>
          <p className="eyebrow text-ivory/60">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>hello@tehga.placeholder</li>
            <li>Lagos · Nairobi · London</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-tight py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-ivory/50">
          <p>TEHGA Consulting. All rights reserved.</p>
          <p className="tracking-[0.15em] uppercase">Africa · Global</p>
        </div>
      </div>
    </footer>
  );
}
