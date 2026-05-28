"use client";

import { useState, useRef, useEffect } from "react";
import { PageHero } from "@/app/components/PageHero";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import countries from "world-countries";

const COUNTRY_LIST = countries
  .map((c) => ({ code: c.cca2, name: c.name.common }))
  .sort((a, b) => a.name.localeCompare(b.name));

const SERVICES = [
  "Strategy & Advisory",
  "Infrastructure & Development",
  "Government & Global Engagement",
  "Innovation, Technology & Execution",
  "Investment & Commercial Advisory",
  "Digital Infrastructure & Innovation",
  "Not sure yet",
];

const ENGAGEMENT_TYPES = [
  "Retained advisory",
  "Project-based engagement",
  "Exploratory conversation",
  "Not sure yet",
];

/* ── Text / Textarea Field ── */
function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors";
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={base}
          placeholder="Describe the situation, mandate, or challenge you are facing…"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={base}
          placeholder=" "
        />
      )}
    </label>
  );
}

/* ── Custom Select Dropdown ── */
function Select({
  label,
  name,
  options,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="block" ref={ref}>
      <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>

      <input type="hidden" name={name} value={value} required={required} />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between border-b border-border py-3 text-base text-left focus:outline-none focus:border-primary transition-colors"
      >
        <span
          className={selected ? "text-foreground" : "text-muted-foreground/50"}
        >
          {selected ? selected.label : "\u00a0"}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel — always opens downward */}
      {open && (
        <div className="relative z-50">
          <ul className="absolute top-0 left-0 right-0 bg-background border border-border rounded-sm shadow-lg max-h-60 overflow-y-auto">
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-secondary
                    ${value === o.value ? "text-primary font-medium bg-secondary" : "text-foreground"}`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function ContactPage() {
  useReveal();

  const [sent, setSent] = useState(false);
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [engagement, setEngagement] = useState("");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are working on."
        subtitle="Whether you are exploring a mandate, responding to an opportunity, or navigating a complex situation — share a brief and we will respond promptly."
      />

      <section className="container-tight pb-16 md:pb-24">
        <div className="mt-16 grid lg:grid-cols-12 gap-12">
          {/* FORM */}
          <div className="reveal lg:col-span-7">
            {sent ? (
              <div className="flex flex-col items-start gap-5 py-12">
                <CheckCircle2
                  size={40}
                  strokeWidth={1.5}
                  className="text-primary"
                />
                <h2 className="text-3xl md:text-4xl">
                  We have received your brief.
                </h2>
                <p className="text-base text-muted-foreground max-w-md leading-relaxed">
                  A member of our team will review your enquiry and come back to
                  you within one business day. All submissions are treated with
                  strict confidence.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setCountry("");
                    setService("");
                    setEngagement("");
                  }}
                  className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" name="name" required />
                  <Field label="Organisation" name="company" />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Email" name="email" type="email" required />
                  <Select
                    label="Country"
                    name="country"
                    required
                    value={country}
                    onChange={setCountry}
                    options={COUNTRY_LIST.map((c) => ({
                      value: c.code,
                      label: c.name,
                    }))}
                  />
                </div>

                <Select
                  label="Practice area of interest"
                  name="service"
                  value={service}
                  onChange={setService}
                  options={SERVICES.map((s) => ({ value: s, label: s }))}
                />

                <Select
                  label="Nature of engagement"
                  name="engagement"
                  value={engagement}
                  onChange={setEngagement}
                  options={ENGAGEMENT_TYPES.map((t) => ({
                    value: t,
                    label: t,
                  }))}
                />

                <Field
                  label="Brief — describe the situation or mandate you are considering"
                  name="message"
                  textarea
                  required
                />

                <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-muted-foreground">
                    Submissions are confidential. View our{" "}
                    <a
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-foreground transition-colors"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:bg-forest-deep transition-colors"
                  >
                    Send message
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* DETAILS */}
          <aside className="reveal lg:col-span-5 lg:pl-8 lg:border-l border-border">
            <p className="eyebrow">Direct</p>
            <ul className="mt-6 space-y-8">
              <li>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={16} />
                  <span className="text-xs uppercase tracking-[0.18em]">
                    Email
                  </span>
                </div>
                <a
                  href="mailto:info@tehgaconsulting.com"
                  className="mt-2 block font-display text-2xl hover:text-primary transition-colors"
                >
                  info@tehgaconsulting.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={16} />
                  <span className="text-xs uppercase tracking-[0.18em]">
                    Offices
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl leading-tight">
                  Lagos · Nairobi
                  <br />
                  London
                </p>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                  Meetings and engagements by appointment only.
                </p>
              </li>
            </ul>

            <div className="mt-12 bg-secondary border border-border p-6 rounded-sm">
              <p className="eyebrow">What to expect</p>
              <ol className="mt-4 space-y-4">
                {[
                  { n: "01", text: "Submit your brief using the form." },
                  {
                    n: "02",
                    text: "A senior member of our team reviews your enquiry personally.",
                  },
                  { n: "03", text: "We respond to discuss next steps." },
                ].map(({ n, text }) => (
                  <li key={n} className="flex items-start gap-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground tabular-nums pt-0.5">
                      {n}
                    </span>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
