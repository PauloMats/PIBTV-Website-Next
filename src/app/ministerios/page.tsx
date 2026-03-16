import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ministryHighlights } from "@/data/site-content";

export default function MinisteriosPage() {
  return (
    <>
      <PageHero
        eyebrow="Ministérios"
        title="Áreas de serviço que sustentam a vida da igreja"
        description="Cada ministério serve a igreja de forma prática, fortalecendo o culto, a comunhão, a recepção de visitantes e o cuidado com pessoas."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {ministryHighlights.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-72">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-red">
                  {item.emphasis}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Caminho de serviço
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
            Há espaço para servir com dons, tempo e disposição
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Se você deseja conhecer melhor uma área de atuação da igreja, participe dos cultos, converse com a liderança e descubra como caminhar e servir junto com a comunidade.
          </p>
          <div className="mt-8">
            <Link
              href="/contato"
              className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              Falar com a igreja
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
