import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { getPublicNoticeBySlug } from "@/lib/site-api";

const badgeStyles: Record<string, string> = {
  Aviso: "bg-white/10 text-slate-100",
  Evento: "bg-amber-500/15 text-amber-200",
  Culto: "bg-sky-500/15 text-sky-200",
  "Santa Ceia": "bg-brand-red/20 text-red-100",
  "Célula": "bg-emerald-500/15 text-emerald-200",
};

type NoticeDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function NoticeDetailPage({
  params,
}: NoticeDetailPageProps) {
  const notice = await getPublicNoticeBySlug(params.slug);

  if (!notice) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-32 md:px-10">
      <Link
        href="/eventos"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para avisos
      </Link>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
        {notice.coverImageUrl ? (
          <div className="relative h-72 md:h-96">
            <Image
              src={notice.coverImageUrl}
              alt={notice.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ) : null}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${badgeStyles[notice.tag]}`}
            >
              {notice.tag}
            </span>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              <CalendarDays className="h-4 w-4" />
              {notice.dateLabel}
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.08em] text-white">
            {notice.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{notice.summary}</p>

          {notice.badges?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {notice.badges.map((badge) => (
                <span
                  key={`${notice.slug}-${badge.name}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {badge.name}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 space-y-5 text-base leading-8 text-slate-300">
            {(notice.content ?? notice.summary)
              .split("\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={`${notice.slug}-paragraph-${index}`}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
