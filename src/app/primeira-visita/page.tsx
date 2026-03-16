import Link from "next/link";
import { CheckCircle2, MapPinned, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { churchIdentity, visitFaq, visitJourney } from "@/data/site-content";

export default function PrimeiraVisitaPage() {
  return (
    <>
      <PageHero
        eyebrow="Primeira visita"
        title="Um caminho mais claro para quem está chegando agora"
        description="Sites institucionais de igrejas funcionam melhor quando reduzem a dúvida do visitante. Esta página reúne o essencial para facilitar a primeira chegada."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {visitJourney.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="font-display text-5xl uppercase tracking-[0.08em] text-brand-red">
                0{index + 1}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              O que esperar
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <Users className="mt-1 h-5 w-5 text-brand-red" />
                <p className="text-sm leading-7 text-slate-300">
                  Um ambiente simples, acolhedor e centrado na mensagem bíblica.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-brand-red" />
                <p className="text-sm leading-7 text-slate-300">
                  Equipe de recepção preparada para orientar visitantes e famílias.
                </p>
              </div>
              <div className="flex gap-3">
                <MapPinned className="mt-1 h-5 w-5 text-brand-red" />
                <p className="text-sm leading-7 text-slate-300">
                  Endereço e rota já disponíveis para evitar dificuldade na chegada.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Próximo passo
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
              Fale com a igreja antes ou depois da visita
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Se quiser tirar dúvidas sobre horário, localização, ministério infantil ou células, a secretaria pode ajudar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={churchIdentity.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-red px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Falar no WhatsApp
              </Link>
              <Link
                href="/local"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Ver localização
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Perguntas frequentes
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visitFaq.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
