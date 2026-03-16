import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Tag } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getPublicSiteSnapshot } from "@/lib/site-api";

const badgeStyles: Record<string, string> = {
  Aviso: "bg-white/10 text-slate-100",
  Evento: "bg-amber-500/15 text-amber-200",
  Culto: "bg-sky-500/15 text-sky-200",
  "Santa Ceia": "bg-brand-red/20 text-red-100",
  "Célula": "bg-emerald-500/15 text-emerald-200",
};

export default async function EventosPage() {
  const site = await getPublicSiteSnapshot();

  return (
    <>
      <PageHero
        eyebrow="Avisos e agenda"
        title="A programação da igreja com destaque para o que muda ao longo do mês"
        description="Como cultos e eventos especiais podem acontecer em dias e horários diferentes, esta página organiza com clareza o que faz parte da agenda fixa e o que entra como programação especial."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-brand-red/20 bg-brand-red/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Destaques do mês
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
              Eventos e programações especiais
            </h2>
            <div className="mt-8 space-y-4">
              {site.events.length > 0 ? (
                site.events.map((event) => (
                  <div
                    key={`${event.slug}-${event.dateLabel}`}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${badgeStyles[event.tag]}`}
                      >
                        {event.tag}
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-300">
                        <CalendarDays className="h-4 w-4" />
                        {event.dateLabel}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {event.summary}
                    </p>
                    {event.slug ? (
                      <Link
                        href={`/eventos/${event.slug}`}
                        className="mt-5 inline-flex text-sm font-semibold text-white transition hover:text-brand-red"
                      >
                        Ver detalhes
                      </Link>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-300">
                  Os próximos eventos especiais da igreja aparecerão aqui assim que forem publicados pela administração.
                </div>
              )}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Agenda fixa
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
              O que já faz parte da rotina da igreja
            </h2>
            <div className="mt-8 grid gap-4">
              {site.serviceSchedule.map((item) => (
                <div
                  key={`${item.day}-${item.time}`}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {item.day}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-white">{item.title}</p>
                    </div>
                    <div className="font-display text-4xl uppercase tracking-[0.08em] text-white">
                      {item.time}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Avisos recentes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Comunicados para manter a igreja informada
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-400">
              Escalas, celebrações, atualizações de agenda, encontros especiais e comunicados pastorais podem ser publicados aqui com destaque e badge.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {site.notices.map((notice) => (
              <article
                key={notice.slug ?? notice.title}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0e14]"
              >
                {notice.coverImageUrl ? (
                  <div className="relative h-52">
                    <Image
                      src={notice.coverImageUrl}
                      alt={notice.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${badgeStyles[notice.tag]}`}
                    >
                      {notice.tag}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      {notice.dateLabel}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {notice.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {notice.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {notice.badges?.length ? (
                      notice.badges.map((badge) => (
                        <span
                          key={`${notice.slug}-${badge.name}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300"
                        >
                          <Tag className="h-3.5 w-3.5" />
                          {badge.name}
                        </span>
                      ))
                    ) : null}
                  </div>
                  {notice.slug ? (
                    <Link
                      href={`/eventos/${notice.slug}`}
                      className="mt-6 inline-flex text-sm font-semibold text-white transition hover:text-brand-red"
                    >
                      Ler aviso completo
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
