import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getPublicSiteSnapshot } from "@/lib/site-api";

export default async function MidiaPage() {
  const site = await getPublicSiteSnapshot();
  const groupedMedia = site.media.reduce<Record<string, typeof site.media>>(
    (groups, item) => {
      const key = item.category || "Geral";
      groups[key] = groups[key] ? [...groups[key], item] : [item];
      return groups;
    },
    {},
  );

  return (
    <>
      <PageHero
        eyebrow="Mídia da igreja"
        title="Registros visuais que mostram a vida da comunidade"
        description="Cultos, encontros de célula, ministérios e programações especiais podem ser organizados por categoria e mantidos atualizados pela administração."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="font-display text-5xl uppercase tracking-[0.08em] text-white">
              {site.media.length}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate-400">
              Itens em destaque
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="font-display text-5xl uppercase tracking-[0.08em] text-white">
              {Object.keys(groupedMedia).length}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate-400">
              Categorias visuais
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="font-display text-5xl uppercase tracking-[0.08em] text-white">
              Viva
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate-400">
              Galeria em atualização constante
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="space-y-12">
            {Object.entries(groupedMedia).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                      Categoria
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-white">
                      {category}
                    </h2>
                  </div>
                  <div className="text-sm text-slate-500">
                    {items.length} item(ns)
                  </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {items.map((item) => (
                    <article
                      key={`${category}-${item.title}`}
                      className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0e14]"
                    >
                      <div className="relative h-72">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        {item.type === "VIDEO" ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-black/50 p-3 text-white backdrop-blur">
                              <PlayCircle className="h-8 w-8" />
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-brand-red">
                          {item.type === "VIDEO" ? "Vídeo" : "Imagem"}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-400">
                          {item.description ||
                            "Registro visual da vida da igreja e de suas programações."}
                        </p>
                        {item.url ? (
                          <Link
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex text-sm font-semibold text-white transition hover:text-brand-red"
                          >
                            {item.type === "VIDEO" ? "Assistir conteúdo" : "Abrir mídia"}
                          </Link>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
