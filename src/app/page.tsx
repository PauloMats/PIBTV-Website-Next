import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { SectionHeading } from "@/components/site/section-heading";
import {
  cellGroups,
  featuredSpecialSchedules,
  heroStats,
  ministries,
} from "@/data/site-content";
import { getPublicSiteSnapshot } from "@/lib/site-api";

const badgeStyles: Record<string, string> = {
  Aviso: "bg-white/10 text-slate-100",
  Evento: "bg-amber-500/15 text-amber-200",
  Culto: "bg-sky-500/15 text-sky-200",
  "Santa Ceia": "bg-brand-red/20 text-red-100",
  "Célula": "bg-emerald-500/15 text-emerald-200",
};

export default async function HomePage() {
  const site = await getPublicSiteSnapshot();

  return (
    <>
      <HeroCarousel slides={site.heroSlides} stats={heroStats} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Nossos encontros"
          title="Culto, células e programações especiais"
          description="Os encontros principais já ficam em destaque logo na entrada do site. Abaixo da agenda fixa, a igreja também pode destacar programações especiais do mês com leitura simples e objetiva."
        />
        <div className="stagger-grid mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {site.serviceSchedule.slice(0, 3).map((item) => (
            <article
              key={`${item.day}-${item.time}`}
              className="card-lift soft-panel rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-brand-red">
                    {item.day}
                  </p>
                  <h3 className="mt-2 font-display text-4xl uppercase tracking-[0.08em] text-white">
                    {item.time}
                  </h3>
                </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                    Agenda fixa
                  </span>
              </div>
              <h4 className="mt-5 text-xl font-semibold text-white">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="stagger-grid mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredSpecialSchedules.map((item) => (
            <article
              key={`${item.title}-${item.dateLabel}`}
              className="card-lift soft-panel rounded-[1.75rem] border border-brand-red/20 bg-brand-red/10 p-6"
            >
              <div className="flex flex-wrap items-start gap-2">
                <span className="rounded-full border border-brand-red/30 bg-brand-red/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-100">
                  {item.badge}
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                  {item.dateLabel}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-white">
                    {item.time}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                  Programação especial
                </span>
              </div>
              <h4 className="mt-5 text-xl font-semibold text-white">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Avisos da semana"
            title="Uma comunicação viva para a rotina da igreja"
            description="Os avisos precisam ter destaque porque a programação da igreja pode variar ao longo do mês com cultos, celebrações e encontros em dias diferentes."
          />
          <div className="stagger-grid mt-10 grid gap-5 lg:grid-cols-3">
            {site.notices.map((notice) => (
              <article
                key={notice.title}
                className="card-lift rounded-[1.75rem] border border-white/10 bg-ink/80 p-6"
              >
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${badgeStyles[notice.tag]}`}
                >
                  {notice.tag}
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {notice.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {notice.summary}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-slate-500">
                  {notice.dateLabel}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Células"
            title="Seis células para fortalecer comunhão, oração e discipulado"
            description="As células são parte importante da vida da igreja. Por isso, a página já foi preparada para mostrar horários, liderança, contatos e futuras atualizações vindas do painel."
          />
          <div className="stagger-grid mt-8 flex flex-col gap-4">
            {cellGroups.map((cell) => (
              <div
                key={cell.name}
                className="card-lift rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{cell.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{cell.focus}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                    {cell.schedule}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                  <p>Local: {cell.neighborhood}</p>
                  <p>Líder: {cell.leader}</p>
                  <p>Contato: {cell.contact}</p>
                  <p>Categoria: Célula</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Ministérios em ação"
            title="Cinco frentes de serviço que sustentam o cuidado da igreja"
            description="Ministérios bem apresentados ajudam novos visitantes a entenderem a vida da comunidade e ajudam membros a identificarem onde servir."
          />
          <div className="stagger-grid mt-8 grid gap-4 md:grid-cols-2">
            {ministries.map((ministry) => (
              <article
                key={ministry.title}
                className="card-lift rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-xl font-semibold text-white">{ministry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {ministry.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04)_0%,_rgba(255,255,255,0.02)_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Mídia da igreja"
            title="Registros de cultos, células e momentos importantes da comunidade"
            description="A galeria foi pensada para receber fotos e vídeos publicados pela administração, mantendo o site sempre vivo e atualizado."
            align="center"
          />
          <div className="stagger-grid mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {site.media.map((item) => (
              <article
                key={item.title}
                className="card-lift overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-red">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card-lift soft-panel rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Primeira visita
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
              Tudo preparado para receber quem está chegando agora
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              A jornada do visitante agora tem uma página própria com perguntas frequentes, orientações de chegada e próximos passos para integração.
            </p>
            <div className="mt-8">
              <Link
                href="/primeira-visita"
                className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Ver página de visita
              </Link>
            </div>
          </article>

          <article className="card-lift soft-panel rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Projetos e impacto
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
              A presença da igreja também se revela no cuidado com a cidade
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Além dos cultos e da comunhão, o site agora destaca projetos e ações que mostram o serviço cristão da igreja no contexto local.
            </p>
            <div className="mt-8">
              <Link
                href="/projetos"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Conhecer projetos
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="soft-float relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 md:min-h-[320px]">
          <Image
            src={site.identity.locationImage}
            alt="Localização da igreja"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <div>
          <SectionHeading
            eyebrow="Visite a PIBTV"
            title="Informações claras para chegar, participar e permanecer perto"
            description="Localização, contato e horários precisam estar acessíveis logo de início para tornar a primeira visita mais tranquila e acolhedora."
          />
          <div className="soft-panel mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-red">
              Endereço
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-200">
              {site.identity.address}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={site.identity.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-red px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Abrir no mapa
              </Link>
              <Link
                href={site.identity.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Falar com a secretaria
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
