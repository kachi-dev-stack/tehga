export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="pt-32 md:pt-44 pb-16 md:pb-24 border-b border-border">
      <div className="container-tight grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8 reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-5xl md:text-7xl text-balance leading-[0.95]">
            {title}
          </h1>
        </div>
        {subtitle && (
          <div className="md:col-span-4 reveal">
            <p className="text-base text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
