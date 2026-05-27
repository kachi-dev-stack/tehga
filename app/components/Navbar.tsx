// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Next.js hook to get current path

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-tight flex h-16 md:h-20 items-center justify-between">
        <Link
          href="/"
          className="text-foreground hover:opacity-80 transition-opacity"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to} // Changed from 'to' to 'href'
                className={`relative text-sm tracking-wide transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <Link
          href="/contact" // Changed from 'to' to 'href'
          className="hidden md:inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground hover:bg-forest-deep transition-colors"
        >
          Get in touch
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container-tight flex flex-col py-4">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to} // Changed from 'to' to 'href'
                  className={`py-3 text-base ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact" // Changed from 'to' to 'href'
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
