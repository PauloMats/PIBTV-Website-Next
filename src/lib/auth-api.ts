import { API_BASE_URL } from "@/lib/api";
import { clearSession, getStoredAccessToken } from "@/lib/auth-storage";
import type {
  AdminsListResponse,
  BadgesListResponse,
  CellsListResponse,
  CreateAdminPayload,
  CreateMemberPayload,
  CreateBadgePayload,
  CreateCellPayload,
  CreateMediaPayload,
  CreateNoticePayload,
  LoginResponse,
  MediaListResponse,
  MemberRecord,
  MembersListResponse,
  NoticesListResponse,
  SettingsRecord,
  UpdateAdminPayload,
  UpdateMemberPayload,
} from "@/types/admin";
import type { PublicCellResponse } from "@/types/api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const token = options.auth ? getStoredAccessToken() : null;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401) {
    clearSession();

    if (typeof window !== "undefined") {
      window.location.href = "/admin";
    }

    throw new ApiError("Sua sessão expirou. Faça login novamente.", 401);
  }

  if (!response.ok) {
    let message = "Não foi possível concluir a operação.";

    try {
      const payload = (await response.json()) as {
        message?: string | string[];
      };
      if (Array.isArray(payload.message)) {
        message = payload.message.join(" ");
      } else if (payload.message) {
        message = payload.message;
      }
    } catch {
      message = "Não foi possível concluir a operação.";
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export const authApi = {
  login: (payload: { username: string; password: string }) =>
    apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
    }),
  me: () => apiRequest<LoginResponse["user"]>("/auth/me", { auth: true }),
};

export const membersApi = {
  list: (query: URLSearchParams) =>
    apiRequest<MembersListResponse>(`/members?${query.toString()}`, {
      auth: true,
    }),
  getById: (id: string) =>
    apiRequest<MemberRecord>(`/members/${id}`, {
      auth: true,
    }),
  create: (payload: CreateMemberPayload) =>
    apiRequest("/members", {
      method: "POST",
      body: payload,
      auth: true,
    }),
  update: (id: string, payload: UpdateMemberPayload) =>
    apiRequest(`/members/${id}`, {
      method: "PATCH",
      body: payload,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest(`/members/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const adminsApi = {
  list: (query: URLSearchParams) =>
    apiRequest<AdminsListResponse>(`/admins?${query.toString()}`, {
      auth: true,
    }),
  create: (payload: CreateAdminPayload) =>
    apiRequest("/admins", {
      method: "POST",
      body: payload,
      auth: true,
    }),
  update: (id: string, payload: UpdateAdminPayload) =>
    apiRequest(`/admins/${id}`, {
      method: "PATCH",
      body: payload,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest(`/admins/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const adminSupportApi = {
  getCells: () => apiRequest<PublicCellResponse[]>("/public/cells"),
};

export const badgesApi = {
  list: (query: URLSearchParams) =>
    apiRequest<BadgesListResponse>(`/badges?${query.toString()}`, {
      auth: true,
    }),
  create: (payload: CreateBadgePayload) =>
    apiRequest("/badges", {
      method: "POST",
      body: payload,
      auth: true,
    }),
  update: (id: string, payload: Partial<CreateBadgePayload>) =>
    apiRequest(`/badges/${id}`, {
      method: "PATCH",
      body: payload,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest(`/badges/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const cellsApi = {
  list: (query: URLSearchParams) =>
    apiRequest<CellsListResponse>(`/cells?${query.toString()}`, {
      auth: true,
    }),
  create: (payload: CreateCellPayload) =>
    apiRequest("/cells", {
      method: "POST",
      body: payload,
      auth: true,
    }),
  update: (id: string, payload: Partial<CreateCellPayload>) =>
    apiRequest(`/cells/${id}`, {
      method: "PATCH",
      body: payload,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest(`/cells/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const mediaApi = {
  list: (query: URLSearchParams) =>
    apiRequest<MediaListResponse>(`/media?${query.toString()}`, {
      auth: true,
    }),
  create: (payload: CreateMediaPayload) =>
    apiRequest("/media", {
      method: "POST",
      body: payload,
      auth: true,
    }),
  update: (id: string, payload: Partial<CreateMediaPayload>) =>
    apiRequest(`/media/${id}`, {
      method: "PATCH",
      body: payload,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest(`/media/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const noticesApi = {
  list: (query: URLSearchParams) =>
    apiRequest<NoticesListResponse>(`/notices?${query.toString()}`, {
      auth: true,
    }),
  create: (payload: CreateNoticePayload) =>
    apiRequest("/notices", {
      method: "POST",
      body: payload,
      auth: true,
    }),
  update: (id: string, payload: Partial<CreateNoticePayload>) =>
    apiRequest(`/notices/${id}`, {
      method: "PATCH",
      body: payload,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest(`/notices/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const settingsApi = {
  get: () => apiRequest<SettingsRecord>("/settings", { auth: true }),
  update: (payload: SettingsRecord) =>
    apiRequest("/settings", {
      method: "PUT",
      body: payload,
      auth: true,
    }),
};
