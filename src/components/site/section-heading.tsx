type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`reveal-up max-w-3xl ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-red md:tracking-[0.28em]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 md:text-lg">
        {description}
      </p>
    </div>
  );
}
