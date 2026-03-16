import Link from "next/link";
import { MapPinned, MessageSquareMore, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { cellGroups } from "@/data/site-content";

export default async function CelulasPage() {
  const quintaFeiraCells = cellGroups.filter((cell) =>
    cell.schedule.toLowerCase().includes("quinta"),
  );
  const sabadoCells = cellGroups.filter((cell) =>
    cell.schedule.toLowerCase().includes("sábado") ||
    cell.schedule.toLowerCase().includes("sabado"),
  );

  return (
    <>
      <PageHero
        eyebrow="Células"
        title="Pequenos grupos para comunhão, cuidado e discipulado"
        description="A vida da igreja continua durante a semana. As células ajudam a manter relacionamentos próximos, oração constante e crescimento bíblico em comunidade."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Quintas-feiras
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Células às 19h30
            </h2>
            <div className="mt-8 space-y-4">
              {quintaFeiraCells.map((cell) => (
                <div
                  key={cell.name}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{cell.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {cell.focus}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                      {cell.schedule}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                    <p>Líder: {cell.leader}</p>
                    <p>Bairro: {cell.neighborhood}</p>
                    <p>Contato: {cell.contact}</p>
                    <p>Endereço: {cell.address || cell.neighborhood}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {cell.mapUrl ? (
                      <Link
                        href={cell.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                      >
                        <MapPinned className="h-4 w-4" />
                        Ver mapa
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Sábados
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Células e encontros especiais às 19h30
            </h2>
            <div className="mt-8 space-y-4">
              {sabadoCells.map((cell) => (
                <div
                  key={cell.name}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{cell.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {cell.focus}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                      {cell.schedule}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                    <p>Líder: {cell.leader}</p>
                    <p>Bairro: {cell.neighborhood}</p>
                    <p>Contato: {cell.contact}</p>
                    <p>Endereço: {cell.address || cell.neighborhood}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {cell.mapUrl ? (
                      <Link
                        href={cell.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                      >
                        <MapPinned className="h-4 w-4" />
                        Ver mapa
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Por que participar
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <Users className="mt-1 h-5 w-5 text-brand-red" />
                  <p className="text-sm leading-7 text-slate-300">
                    As células criam vínculos mais próximos entre membros, famílias e visitantes.
                  </p>
                </div>
                <div className="flex gap-3">
                  <MessageSquareMore className="mt-1 h-5 w-5 text-brand-red" />
                  <p className="text-sm leading-7 text-slate-300">
                    São ambientes de oração, discipulado, cuidado pastoral e integração ao longo da semana.
                  </p>
                </div>
              </div>
            </article>

            <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Vida em comunidade
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
                Células para acolher, discipular e caminhar perto
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                As células ajudam a igreja a viver cuidado pastoral, amizade cristã,
                oração e acompanhamento de forma mais próxima durante a semana.
              </p>
            </article>

            <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Precisa de ajuda para encontrar uma célula?
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
                A secretaria pode orientar o melhor grupo para você
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Se você está chegando agora ou quer entender qual célula fica mais perto, fale com a igreja e receba orientação.
              </p>
              <div className="mt-8">
                <Link
                  href="/contato"
                  className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Falar com a igreja
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
