"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/types/site";

type HeroCarouselProps = {
  slides: HeroSlide[];
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export function HeroCarousel({ slides, stats }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={`${slide.title}-${index}`}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[2200ms] ${
                index === currentSlide ? "scale-100" : "scale-105"
              }`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(5,7,11,0.94)_0%,_rgba(5,7,11,0.72)_44%,_rgba(5,7,11,0.86)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(151,7,7,0.30),_transparent_30%)]" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-end gap-8 px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pb-16 md:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-20">
        <div key={`${activeSlide.title}-${currentSlide}`} className="reveal-up max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-red">
            {activeSlide.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-[0.06em] text-white sm:text-6xl md:text-8xl">
            {activeSlide.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:mt-6 md:text-lg">
            {activeSlide.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={activeSlide.ctaHref}
              className="rounded-full bg-brand-red px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(151,7,7,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-red-strong"
            >
              {activeSlide.ctaLabel}
            </Link>
            {activeSlide.secondaryHref && activeSlide.secondaryLabel ? (
              <Link
                href={activeSlide.secondaryHref}
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:border-white/35"
              >
                {activeSlide.secondaryLabel}
              </Link>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-label="Slide anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white transition hover:-translate-y-0.5 hover:border-white/30"
              onClick={() =>
                setCurrentSlide((previous) =>
                  previous === 0 ? slides.length - 1 : previous - 1,
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Próximo slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white transition hover:-translate-y-0.5 hover:border-white/30"
              onClick={() =>
                setCurrentSlide((previous) => (previous + 1) % slides.length)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="ml-2 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.title}-dot-${index}`}
                  type="button"
                  aria-label={`Ir para slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentSlide ? "w-10 bg-brand-red" : "w-2.5 bg-white/35"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="soft-panel reveal-fade grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur md:grid-cols-3 md:p-5 lg:grid-cols-1">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-lift rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
            >
              <div className="font-display text-5xl uppercase tracking-[0.08em] text-white">
                {stat.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
