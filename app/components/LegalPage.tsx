"use client";

import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/app/components/PageHero";
import { useReveal } from "@/app/hooks/useReveal";

interface Section {
  title: string;
  body: string;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: Section[];
  footer: React.ReactNode;
}

function toId(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function LegalPage({
  eyebrow,
  title,
  subtitle,
  sections,
  footer,
}: LegalPageProps) {
  useReveal();
  const [activeId, setActiveId] = useState<string>(toId(sections[0].title));
  const articleRefs = useRef<Map<string, HTMLElement>>(new Map());

  /* ── Active section tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px", // fires when section is in the upper-middle of viewport
        threshold: 0,
      },
    );

    articleRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Click: scroll with header offset ── */
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 80;
    const gap = 32;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - gap;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="container-tight py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12">
          {/* ASIDE NAV */}
          <aside className=" hidden md:block md:col-span-3 reveal">
            <nav className="sticky top-32 space-y-1">
              <p className="eyebrow mb-4">On this page</p>
              {sections.map((s) => {
                const id = toId(s.title);
                const isActive = activeId === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`block w-full text-left text-sm py-1.5 transition-colors border-l-2 pl-3 ${
                      isActive
                        ? "text-foreground border-primary font-medium"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                    }`}
                  >
                    {s.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="md:col-span-8 md:col-start-5 space-y-16">
            {sections.map((s) => {
              const id = toId(s.title);
              return (
                <article
                  key={id}
                  id={id}
                  className="reveal"
                  ref={(el) => {
                    if (el) articleRefs.current.set(id, el);
                    else articleRefs.current.delete(id);
                  }}
                >
                  <h2 className="text-2xl md:text-3xl font-display">
                    {s.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/80 whitespace-pre-line">
                    {s.body}
                  </div>
                </article>
              );
            })}

            <div className="reveal pt-8 border-t border-border">{footer}</div>
          </div>
        </div>
      </section>
    </>
  );
}
