import { PageHero } from "@/components/site/page-hero";
import {
  churchHistorySections,
  churchIdentity,
  ministries,
  pastoralFamilyProfiles,
} from "@/data/site-content";

const values = [
  "Centralidade do evangelho em cada encontro.",
  "Comunhão prática entre membros e visitantes.",
  "Serviço com excelência, simplicidade e cuidado.",
  "Discipulado que alcança famílias e novas gerações.",
];

export default function SobreNosPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a igreja"
        title="Uma igreja local com história, missão e uma família pastoral presente"
        description={`${churchIdentity.fullName} existe para anunciar o evangelho, acolher pessoas com amor cristão e servir a cidade com fidelidade bíblica.`}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Identidade institucional
          </p>
          <h2 className="mt-5 font-display text-4xl uppercase tracking-[0.08em] text-white">
            Uma família para pertencer, crescer e servir
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            A PIBTV deseja ser uma igreja que recebe pessoas com graça, comunica a
            verdade das Escrituras com clareza e vive a comunhão cristã de forma
            prática em cada encontro.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Este site existe para ajudar membros e visitantes a encontrarem com
            facilidade horários, avisos, localização, células, ministérios e os
            próximos passos da vida comunitária da igreja.
          </p>
        </article>

        <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Valores
          </p>
          <div className="mt-5 space-y-4">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-slate-300"
              >
                {value}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                História da PIBTV
              </p>
              {churchHistorySections.map((section) => (
                <div key={section.title} className="mt-6">
                  <h2 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-slate-300">
                    {section.content}
                  </p>
                </div>
              ))}
            </article>

            <article className="soft-panel reveal-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Família pastoral
              </p>
              <div className="mt-6 space-y-4">
                {pastoralFamilyProfiles.map((profile) => (
                  <div
                    key={profile.role}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-red">
                      {profile.role}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold text-white">
                      {profile.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {profile.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
          Ministérios em ação
        </p>
        <div className="stagger-grid mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {ministries.map((ministry) => (
            <article
              key={ministry.title}
              className="card-lift rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
            >
              <h3 className="text-xl font-semibold text-white">{ministry.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {ministry.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
