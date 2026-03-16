type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(151,7,7,0.24),_transparent_42%),linear-gradient(180deg,_#0b0f18_0%,_#070b11_100%)]">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pb-20 md:pt-40">
        <p className="reveal-fade text-sm font-semibold uppercase tracking-[0.28em] text-brand-red">
          {eyebrow}
        </p>
        <h1 className="reveal-up mt-5 max-w-4xl font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl md:text-7xl">
          {title}
        </h1>
        <p className="reveal-up mt-5 max-w-3xl text-base leading-8 text-slate-300 md:mt-6 md:text-lg">
          {description}
        </p>
        <div className="reveal-fade mt-8 h-px w-24 bg-gradient-to-r from-brand-red to-transparent" />
      </div>
    </section>
  );
}
