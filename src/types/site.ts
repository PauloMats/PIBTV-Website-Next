import type { StaticImageData } from "next/image";

export type NavItem = {
  href: string;
  label: string;
};

export type HeroStat = {
  label: string;
  value: string;
};

export type ServiceTime = {
  day: string;
  time: string;
  title: string;
  description: string;
};

export type NoticeTag =
  | "Aviso"
  | "Evento"
  | "Culto"
  | "Santa Ceia"
  | "Célula";

export type Notice = {
  title: string;
  summary: string;
  dateLabel: string;
  tag: NoticeTag;
  slug?: string;
  content?: string;
  coverImageUrl?: string | StaticImageData | null;
  startsAt?: string | null;
  endsAt?: string | null;
  badges?: Array<{
    name: string;
    color?: string;
  }>;
};

export type Ministry = {
  title: string;
  description: string;
};

export type CellGroup = {
  name: string;
  neighborhood: string;
  schedule: string;
  leader: string;
  contact: string;
  focus: string;
  address?: string;
  mapUrl?: string | null;
};

export type GalleryItem = {
  title: string;
  category: string;
  image: string | StaticImageData;
  description?: string;
  type?: "IMAGE" | "VIDEO";
  url?: string;
  thumbnailUrl?: string | null;
};

export type AdminModule = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
  image: StaticImageData;
  impact: string;
};

export type VisitStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type MemberSnapshot = {
  fullName: string;
  cellName: string;
  phone: string;
  isVisitor: boolean;
};

export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image: string | StaticImageData;
};
