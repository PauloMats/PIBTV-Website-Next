import { cache } from "react";
import {
  cellGroups,
  churchIdentity,
  galleryHighlights,
  heroSlides,
  notices,
  serviceSchedule,
} from "@/data/site-content";
import { publicApi } from "@/lib/api";
import type {
  CellGroup,
  GalleryItem,
  HeroSlide,
  Notice,
  ServiceTime,
} from "@/types/site";

function formatDateLabel(
  startsAt?: string | null,
  endsAt?: string | null,
  publishedAt?: string | null,
) {
  const source = startsAt ?? endsAt ?? publishedAt;

  if (!source) {
    return "Programação especial";
  }

  const date = new Date(source);

  if (Number.isNaN(date.getTime())) {
    return "Programação especial";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function mapBadgeToTag(name?: string): Notice["tag"] {
  switch (name?.toLowerCase()) {
    case "evento":
      return "Evento";
    case "culto":
      return "Culto";
    case "santa ceia":
      return "Santa Ceia";
    case "célula":
    case "celula":
      return "Célula";
    default:
      return "Aviso";
  }
}

function mapNoticeItem(item: Awaited<ReturnType<typeof publicApi.getNotices>>["items"][number]): Notice {
  const primaryBadge = item.badges[0]?.name;

  return {
    title: item.title,
    summary: item.summary,
    dateLabel: formatDateLabel(item.startsAt, item.endsAt, item.publishedAt),
    tag: mapBadgeToTag(primaryBadge),
    slug: item.slug,
    content: item.content,
    coverImageUrl: item.coverImageUrl,
    startsAt: item.startsAt,
    endsAt: item.endsAt,
    badges: item.badges.map((badge) => ({
      name: badge.name,
      color: badge.color,
    })),
  };
}

function mapCellItem(item: Awaited<ReturnType<typeof publicApi.getCells>>[number]): CellGroup {
  return {
    name: item.name,
    neighborhood: item.neighborhood || item.address,
    schedule: item.scheduleText,
    leader: item.leaderName,
    contact: item.contactPhone,
    focus: item.description,
    address: item.address,
    mapUrl: item.mapUrl,
  };
}

function mapMediaItem(
  item: Awaited<ReturnType<typeof publicApi.getMedia>>["items"][number],
): GalleryItem {
  return {
    title: item.title,
    category: item.category,
    image: item.thumbnailUrl || item.url,
    description: item.description,
    type: item.type,
    url: item.url,
    thumbnailUrl: item.thumbnailUrl,
  };
}

export const getPublicSiteSnapshot = cache(async () => {
  const [settingsResult, noticesResult, eventsResult, cellsResult, mediaResult] =
    await Promise.allSettled([
      publicApi.getSettings(),
      publicApi.getNotices(),
      publicApi.getEvents(),
      publicApi.getCells(),
      publicApi.getMedia(),
    ]);

  const settings =
    settingsResult.status === "fulfilled" ? settingsResult.value : null;

  const noticeCards =
    noticesResult.status === "fulfilled"
      ? noticesResult.value.items.slice(0, 3).map(mapNoticeItem)
      : notices;

  const eventCards =
    eventsResult.status === "fulfilled"
      ? eventsResult.value.items.slice(0, 3).map(mapNoticeItem)
      : notices.filter((item) => item.tag !== "Aviso").slice(0, 2);

  const cells =
    cellsResult.status === "fulfilled"
      ? cellsResult.value.slice(0, 6).map(mapCellItem)
      : cellGroups;

  const media =
    mediaResult.status === "fulfilled"
      ? mediaResult.value.items.slice(0, 4).map(mapMediaItem)
      : galleryHighlights;

  const resolvedServiceSchedule: ServiceTime[] =
    settings?.serviceTimes?.length
      ? settings.serviceTimes.map((item) => ({
          day: item.day,
          time: item.time,
          title: item.title,
          description: item.description,
        }))
      : serviceSchedule;

  const resolvedIdentity = {
    ...churchIdentity,
    fullName: settings?.fullName || churchIdentity.fullName,
    name: settings?.churchName || churchIdentity.name,
    slogan: settings?.slogan || churchIdentity.slogan,
    address: settings?.address || churchIdentity.address,
    email: settings?.email || churchIdentity.email,
    phone: settings?.phone || churchIdentity.phone,
    whatsappUrl: settings?.whatsappUrl || churchIdentity.whatsappUrl,
    mapsUrl: settings?.mapsUrl || churchIdentity.mapsUrl,
    instagram: settings?.instagramUrl || churchIdentity.instagram,
    facebook: settings?.facebookUrl || churchIdentity.facebook,
    youtube: settings?.youtubeUrl || churchIdentity.youtube,
  };

  const dynamicHeroSlides: HeroSlide[] = [
    {
      ...heroSlides[0],
      eyebrow: resolvedIdentity.fullName,
      title: "Uma igreja acolhedora para adorar a Cristo e crescer em comunhão",
      description:
        "Informações claras para membros, visitantes e liderança, com espaço para avisos, cultos, células e toda a vida da igreja.",
    },
    {
      ...heroSlides[1],
      title: "Todos os domingos às 18h, a igreja se reúne em celebração",
    },
  ];

  const eventHeroSlides =
    eventCards.length > 0
      ? eventCards.slice(0, 2).map<HeroSlide>((item) => ({
          eyebrow: item.tag,
          title: item.title,
          description: item.summary,
          ctaLabel: "Ver avisos",
          ctaHref: "/eventos",
          secondaryLabel: "Planejar visita",
          secondaryHref: "/primeira-visita",
          image: heroSlides[2].image,
        }))
      : [heroSlides[2]];

  return {
    identity: resolvedIdentity,
    serviceSchedule: resolvedServiceSchedule,
    notices: noticeCards,
    events: eventCards,
    cells,
    media,
    heroSlides: [...dynamicHeroSlides, ...eventHeroSlides],
  };
});

export const getPublicNoticeBySlug = cache(async (slug: string) => {
  try {
    const notice = await publicApi.getNoticeBySlug(slug);
    return mapNoticeItem(notice);
  } catch {
    return notices.find((item) => item.slug === slug) ?? null;
  }
});
