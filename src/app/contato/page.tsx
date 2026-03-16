import Link from "next/link";
import { Mail, MapPinned, MessageSquareMore } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getPublicSiteSnapshot } from "@/lib/site-api";

export default async function ContatoPage() {
  const site = await getPublicSiteSnapshot();
  const contactCards = [
    {
      title: "WhatsApp",
      description:
        "Canal rápido para dúvidas, informações de cultos e atendimento inicial.",
      href: site.identity.whatsappUrl,
      icon: MessageSquareMore,
      external: true,
    },
    {
      title: "E-mail",
      description: "Contato institucional para solicitações e informações gerais.",
      href: `mailto:${site.identity.email}`,
      icon: Mail,
      external: true,
    },
    {
      title: "Localização",
      description: "Abra a rota no mapa e planeje sua visita ao templo.",
      href: site.identity.mapsUrl,
      icon: MapPinned,
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Canais diretos para quem precisa falar com a igreja"
        description="WhatsApp, e-mail e localização reunidos em uma página simples para facilitar o contato de membros, visitantes e famílias."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <Icon className="h-5 w-5 text-brand-red" />
                <h2 className="mt-4 text-xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {card.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Endereço da igreja
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {site.identity.fullName}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            {site.identity.address}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Atendimento e orientações também podem ser feitos pelo WhatsApp da
            secretaria.
          </p>
        </div>
      </section>
    </>
  );
}
