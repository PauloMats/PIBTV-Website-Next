import type {
  PaginatedResponse,
  PublicBadgeResponse,
  PublicCellResponse,
  PublicMediaResponse,
  PublicNoticeResponse,
  PublicSettingsResponse,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

type NextRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

async function fetchJson<T>(path: string, init?: NextRequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: {
      revalidate: 60,
      ...(init?.next ?? {}),
    },
  } as NextRequestInit);

  if (!response.ok) {
    throw new Error(`API request failed for ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const publicApi = {
  getSettings: () => fetchJson<PublicSettingsResponse>("/public/settings"),
  getNotices: () =>
    fetchJson<PaginatedResponse<PublicNoticeResponse>>("/public/notices"),
  getNoticeBySlug: (slug: string) =>
    fetchJson<PublicNoticeResponse>(`/public/notices/${slug}`),
  getEvents: () =>
    fetchJson<PaginatedResponse<PublicNoticeResponse>>("/public/events"),
  getCells: () => fetchJson<PublicCellResponse[]>("/public/cells"),
  getMedia: () =>
    fetchJson<PaginatedResponse<PublicMediaResponse>>("/public/media"),
  getBadges: () => fetchJson<PublicBadgeResponse[]>("/public/badges"),
};

export { API_BASE_URL };
