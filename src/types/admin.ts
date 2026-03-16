export type AuthUser = {
  id: string;
  username: string;
  name: string;
  isActive: boolean;
};

export type AdminRecord = {
  id: string;
  username: string;
  name: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminsListResponse = {
  items: AdminRecord[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type CreateAdminPayload = {
  username: string;
  password: string;
  name: string;
  isActive: boolean;
};

export type UpdateAdminPayload = {
  username?: string;
  password?: string;
  name?: string;
  isActive?: boolean;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type MemberRecord = {
  id: string;
  fullName: string;
  isVisitor: boolean;
  birthDate: string | null;
  baptismDate: string | null;
  phone: string;
  address: string;
  notes: string | null;
  createdAt?: string;
  updatedAt?: string;
  cellId: string | null;
  cell?: {
    id: string;
    name: string;
  } | null;
};

export type MembersListResponse = {
  items: MemberRecord[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type CreateMemberPayload = {
  fullName: string;
  isVisitor: boolean;
  birthDate?: string;
  baptismDate?: string;
  phone: string;
  address: string;
  notes?: string;
  cellId?: string;
};

export type UpdateMemberPayload = Partial<CreateMemberPayload>;

export type BadgeRecord = {
  id: string;
  name: string;
  slug: string;
  color: string;
  isActive: boolean;
};

export type BadgesListResponse = {
  items: BadgeRecord[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type CreateBadgePayload = {
  name: string;
  slug?: string;
  color: string;
  isActive: boolean;
};

export type CellRecord = {
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

export type CellsListResponse = {
  items: CellRecord[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type CreateCellPayload = {
  name: string;
  slug?: string;
  description: string;
  address: string;
  neighborhood: string;
  scheduleText: string;
  leaderName: string;
  contactPhone: string;
  mapUrl?: string;
  isActive: boolean;
};

export type MediaRecord = {
  id: string;
  title: string;
  description: string | null;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl: string | null;
  category: string;
  isPublished: boolean;
  cellId: string | null;
  cell?: {
    id: string;
    name: string;
  } | null;
};

export type MediaListResponse = {
  items: MediaRecord[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type CreateMediaPayload = {
  title: string;
  description?: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl?: string;
  category: string;
  isPublished: boolean;
  cellId?: string;
};

export type NoticeRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  type: "NOTICE" | "EVENT" | "SERVICE";
  coverImageUrl: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  startsAt: string | null;
  endsAt: string | null;
  badges: BadgeRecord[];
};

export type NoticesListResponse = {
  items: NoticeRecord[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type CreateNoticePayload = {
  title: string;
  slug?: string;
  summary: string;
  content: string;
  type: "NOTICE" | "EVENT" | "SERVICE";
  coverImageUrl?: string;
  isPublished: boolean;
  publishedAt?: string;
  startsAt?: string;
  endsAt?: string;
  badgeIds?: string[];
};

export type SettingsRecord = {
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
  serviceTimesJson: string;
};
