"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeAlert,
  Badge,
  CalendarRange,
  ImageIcon,
  Home,
  LogOut,
  Settings,
  ShieldCheck,
  SquareGanttChart,
  Users,
  UserPlus,
} from "lucide-react";
import { clearSession, getStoredAuthUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/types/admin";

type AdminShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/members", label: "Membros", icon: Users },
  { href: "/admin/members/new", label: "Novo membro", icon: UserPlus },
  { href: "/admin/notices", label: "Avisos", icon: CalendarRange },
  { href: "/admin/badges", label: "Badges", icon: Badge },
  { href: "/admin/cells", label: "Células", icon: SquareGanttChart },
  { href: "/admin/media", label: "Mídia", icon: ImageIcon },
  { href: "/admin/admins", label: "Admins", icon: BadgeAlert },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export function AdminShell({ title, description, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredAuthUser());
  }, []);

  const handleLogout = () => {
    clearSession();
    router.replace("/admin");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-32">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:block">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-red/20 p-3 text-brand-red">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Painel admin
                </p>
                <p className="text-base font-semibold text-white">
                  {user?.name || user?.username || "Liderança"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:text-brand-red lg:mt-6"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>

          <nav className="mt-8 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition lg:flex ${
                    active
                      ? "bg-brand-red text-white"
                      : "bg-black/20 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400">
            Sessão autenticada com a API. Use os módulos ao lado para manter conteúdo institucional, avisos, células, mídia e cadastros.
          </div>
        </aside>

        <div className="space-y-6">
          <header className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3 text-brand-red">
              <Settings className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                Área administrativa
              </p>
            </div>
            <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.08em] text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
              {description}
            </p>
          </header>

          {children}
        </div>
      </div>
    </section>
  );
}
