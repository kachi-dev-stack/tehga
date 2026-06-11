import { prisma } from "@/lib/prisma";
import { dbFetch } from "@/lib/db-fetch";
import {
  FALLBACK_ABOUT,
  FALLBACK_PRINCIPLES,
  FALLBACK_STATS,
} from "@/lib/fallback-data";
import { PageHero } from "@/app/components/PageHero";
import { WhoWeAreMark } from "@/app/components/WhoWeAreMark";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const [PRINCIPLES, stats, about] = await Promise.all([
    dbFetch(
      () => prisma.principle.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_PRINCIPLES,
    ),
    dbFetch(
      () => prisma.stat.findMany({ orderBy: { order: "asc" } }),
      FALLBACK_STATS,
    ),
    dbFetch(
      () => prisma.aboutCopy.findUnique({ where: { id: 1 } }),
      FALLBACK_ABOUT,
    ),
  ]);

  return (
    <>
      <PageHero
        eyebrow={about?.heroEyebrow ?? "About"}
        title={about?.heroTitle ?? "A firm built for consequential decisions."}
        subtitle={
          about?.heroSubtitle ??
          "TEHGA Consulting was established to close the gap between Africa's growth potential and the international capital, networks, and strategic expertise needed to realise it."
        }
      />
      {/* WHO WE ARE — static markup, DB text */}
      <section className="container-tight py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 reveal">
            <div className="aspect-[4/5] w-full">
              <WhoWeAreMark />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal">
            <p className="eyebrow">{about?.whoEyebrow ?? "Who we are"}</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-balance">
              {about?.whoHeading ??
                "A research-driven advisory firm. Built for Africa and global markets."}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">
              {about?.whoPara1}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {about?.whoPara2}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {about?.whoPara3}
            </p>
          </div>
        </div>
      </section>

      <AboutClient
        principles={PRINCIPLES.map((p) => ({
          id: p.id,
          title: p.title,
          body: p.body,
        }))}
        stats={stats.map((s) => ({
          id: s.id,
          value: s.value,
          label: s.label,
        }))}
        reachHeading={about?.reachHeading ?? ""}
        reachBody={about?.reachBody ?? ""}
        reachEyebrow={about?.reachEyebrow ?? "Our reach"}
        philosophyEyebrow={about?.philosophyEyebrow ?? "Our philosophy"}
        philosophyHeading={
          about?.philosophyHeading ?? "Four principles guide every engagement."
        }
        ctaEyebrow={about?.ctaEyebrow ?? "Work with us"}
        ctaTitle={about?.ctaTitle ?? "A conversation is the best way to begin."}
        ctaBody={about?.ctaBody ?? ""}
        ctaLabel={about?.ctaLabel ?? "Schedule a consultation"}
      />
    </>
  );
}
