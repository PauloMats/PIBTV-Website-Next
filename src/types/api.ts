export type PaginatedResponse<T> = {
  items: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type PublicSettingsResponse = {
  churchName: string;
  fullName: string;
  slogan: string;
  address: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  mapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  serviceTimes: Array<{
    day: string;
    time: string;
    title: string;
    description: string;
  }>;
};

export type PublicBadgeResponse = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

export type PublicNoticeResponse = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  type: "NOTICE" | "EVENT" | "SERVICE";
  coverImageUrl: string | null;
  publishedAt: string | null;
  startsAt: string | null;
  endsAt: string | null;
  badges: PublicBadgeResponse[];
};

export type PublicCellResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  neighborhood: string;
  scheduleText: string;
  leaderName: string;
  contactPhone: string;
  mapUrl: string | null;
  isActive: boolean;
};

export type PublicMediaResponse = {
  id: string;
  title: string;
  description: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl: string | null;
  category: string;
  cellId: string | null;
};
