"use client";

import Link from "next/link";

interface CtaBannerProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}

export function CtaBanner({
  eyebrow = "Let's talk",
  title = "Ready to move from strategy to outcome?",
  body = "Placeholder copy inviting the visitor to start a conversation with the firm about a specific engagement or advisory need.",
  primary = { to: "/contact", label: "Schedule a consultation" },
  secondary,
}: CtaBannerProps) {
  return (
    <section className="container-tight my-24 md:my-32">
      <div className="reveal relative overflow-hidden rounded-sm bg-forest text-ivory px-8 md:px-16 py-16 md:py-24 grain">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-ivory/15"
        />
        <div
          aria-hidden
          className="absolute -right-12 -bottom-32 h-96 w-96 rounded-full border border-ivory/10"
        />
        <p className="eyebrow text-ivory/60">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-4xl md:text-5xl text-balance">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-ivory/70 text-base leading-relaxed">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={primary.to} // Changed from 'to' to 'href'
            className="inline-flex items-center rounded-sm bg-ivory px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-forest-deep hover:bg-ivory/90 transition-colors"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.to} // Changed from 'to' to 'href'
              className="inline-flex items-center rounded-sm border border-ivory/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory hover:bg-ivory/10 transition-colors"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
