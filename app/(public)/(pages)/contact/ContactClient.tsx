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
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
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
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                    value === o.value
                      ? "text-primary font-medium bg-secondary"
                      : "text-foreground"
                  }`}
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

type ContactContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  detailsEyebrow: string;
  email: string;
  officesLabel: string;
  officesText: string;
  officesNote: string;
  expectEyebrow: string;
  expectStep1: string;
  expectStep2: string;
  expectStep3: string;
  confirmTitle: string;
  confirmBody: string;
  confirmReset: string;
  // new
  engagementTypes: string[];
};

export default function ContactClient({
  content,
  services,
}: {
  content: ContactContent;
  services: { slug: string; title: string }[];
}) {
  useReveal();

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [engagement, setEngagement] = useState("");

  const officesLines = content.officesText.split("\n");

  const serviceOptions = [
    ...services.map((s) => ({ value: s.title, label: s.title })),
    { value: "Not sure yet", label: "Not sure yet" },
  ];

  const engagementOptions = content.engagementTypes.map((t) => ({
    value: t,
    label: t,
  }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        country,
        service,
        engagement,
        message: formData.get("message"),
      }),
    });
    setSending(false);
    if (res.ok) setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
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
                <h2 className="text-3xl md:text-4xl">{content.confirmTitle}</h2>
                <p className="text-base text-muted-foreground max-w-md leading-relaxed">
                  {content.confirmBody}
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
                  {content.confirmReset}
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={onSubmit}>
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
                  options={serviceOptions}
                />
                <Select
                  label="Nature of engagement"
                  name="engagement"
                  value={engagement}
                  onChange={setEngagement}
                  options={engagementOptions}
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
                    disabled={sending}
                    className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:bg-forest-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending…" : "Send message"}
                    {!sending && (
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* DETAILS */}
          <aside className="reveal lg:col-span-5 lg:pl-8 lg:border-l border-border">
            <p className="eyebrow">{content.detailsEyebrow}</p>
            <ul className="mt-6 space-y-8">
              <li>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={16} />
                  <span className="text-xs uppercase tracking-[0.18em]">
                    Email
                  </span>
                </div>
                <a
                  href={`mailto:${content.email}`}
                  className="mt-2 block font-display text-2xl hover:text-primary transition-colors"
                >
                  {content.email}
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={16} />
                  <span className="text-xs uppercase tracking-[0.18em]">
                    {content.officesLabel}
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl leading-tight">
                  {officesLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < officesLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                  {content.officesNote}
                </p>
              </li>
            </ul>

            <div className="mt-12 bg-secondary border border-border p-6 rounded-sm">
              <p className="eyebrow">{content.expectEyebrow}</p>
              <ol className="mt-4 space-y-4">
                {[
                  { n: "01", text: content.expectStep1 },
                  { n: "02", text: content.expectStep2 },
                  { n: "03", text: content.expectStep3 },
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
