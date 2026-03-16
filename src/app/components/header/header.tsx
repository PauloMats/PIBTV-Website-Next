"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { churchIdentity, navigationItems } from "@/data/site-content";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-ink/85 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={churchIdentity.logo}
            alt={churchIdentity.name}
            width={52}
            height={52}
            className="h-12 w-auto"
            priority
          />
          <div className="hidden sm:block">
            <div className="font-display text-2xl uppercase tracking-[0.12em] text-white">
              {churchIdentity.name}
            </div>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Igreja Batista
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium uppercase tracking-[0.16em] transition-colors ${
                pathname === item.href
                  ? "text-brand-red"
                  : "text-slate-200 hover:text-brand-red"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admin"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-red hover:text-brand-red"
          >
            Área administrativa
          </Link>
          <Link
            href="/primeira-visita"
            className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(151,7,7,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-red-strong"
          >
            Quero visitar
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir navegação"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 bg-current transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="reveal-fade border-t border-white/10 bg-ink/95 px-4 py-5 backdrop-blur-xl sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-5">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                  pathname === item.href ? "text-brand-red" : "text-slate-200"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/admin"
                className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Área administrativa
              </Link>
              <Link
                href="/primeira-visita"
                className="rounded-full bg-brand-red px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Quero visitar
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
