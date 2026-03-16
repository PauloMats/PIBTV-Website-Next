import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinned, MessageSquareMore } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getPublicSiteSnapshot } from "@/lib/site-api";

export default async function LocalPage() {
  const site = await getPublicSiteSnapshot();

  return (
    <>
      <PageHero
        eyebrow="Faça uma visita"
        title="Informações claras para chegar, participar e falar com a igreja"
        description="Queremos tornar sua chegada mais tranquila com endereço, horários e canais de contato apresentados de forma simples e acolhedora."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-start gap-3">
              <MapPinned className="mt-1 h-5 w-5 text-brand-red" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                  Endereço
                </p>
                <p className="mt-3 text-lg leading-8 text-slate-200">
                  {site.identity.address}
                </p>
                <Link
                  href={site.identity.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Ver no Google Maps
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={`mailto:${site.identity.email}`}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <Mail className="h-5 w-5 text-brand-red" />
              <h2 className="mt-4 text-lg font-semibold text-white">E-mail</h2>
              <p className="mt-2 text-sm text-slate-400">{site.identity.email}</p>
            </Link>
            <Link
              href={site.identity.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <MessageSquareMore className="h-5 w-5 text-brand-red" />
              <h2 className="mt-4 text-lg font-semibold text-white">Secretaria</h2>
              <p className="mt-2 text-sm text-slate-400">
                Canal rápido para dúvidas, primeira visita e informações da rotina da igreja.
              </p>
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Horários principais
            </p>
            <div className="mt-5 space-y-3">
              {site.serviceSchedule.map((item) => (
                <div
                  key={`${item.day}-${item.time}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      {item.day}
                    </p>
                  </div>
                  <div className="font-display text-3xl uppercase tracking-[0.08em] text-white">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10">
          <div className="relative min-h-[280px] md:min-h-[420px]">
            <Image
              src={site.identity.locationImage}
              alt="Street view da localização da PIBTV"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}
