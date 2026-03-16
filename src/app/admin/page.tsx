"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldCheck, UserRound } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { useToast } from "@/components/ui/feedback-provider";
import { adminModules } from "@/data/site-content";
import { authApi, ApiError } from "@/lib/auth-api";
import {
  getStoredAccessToken,
  persistSession,
} from "@/lib/auth-storage";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getStoredAccessToken();

    if (!token) {
      return;
    }

    authApi
      .me()
      .then((user) => {
        persistSession({ accessToken: token, user });
        router.replace("/admin/dashboard");
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const session = await authApi.login({ username, password });
      persistSession(session);
      router.push(redirectTo);
    } catch (cause) {
      if (cause instanceof ApiError) {
        setError(cause.message);
        toast({
          variant: "error",
          title: "Falha no login",
          description: cause.message,
        });
      } else {
        setError("Não foi possível entrar. Verifique a API e tente novamente.");
        toast({
          variant: "error",
          title: "Falha no login",
          description:
            "Não foi possível entrar. Verifique a API e tente novamente.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex items-center gap-3 text-brand-red">
          <ShieldCheck className="h-5 w-5" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Login administrativo
          </p>
        </div>

        <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.08em] text-white md:text-4xl">
          Entrar no painel
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          Use o usuário administrativo cadastrado no backend. A sessão é validada pela API e mantida no navegador para agilizar o uso do painel.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Usuário
            </span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <UserRound className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="PIBTV.adm01"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Senha
            </span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <Lock className="h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          {error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brand-red-strong disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {adminModules.map((module) => (
          <article
            key={module.title}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <h3 className="text-xl font-semibold text-white">{module.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              {module.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Área administrativa"
        title="Acesso da liderança para manter o site atualizado"
        description="Login direto contra a API administrativa para controlar membros, avisos, células, mídias e demais informações da igreja."
      />
      <Suspense
        fallback={
          <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-300">
              Carregando formulário de acesso...
            </div>
          </section>
        }
      >
        <AdminLoginContent />
      </Suspense>
    </>
  );
}
