"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LoaderCircle, Pencil, RefreshCcw, Trash2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ApiError, adminSupportApi, membersApi } from "@/lib/auth-api";
import { useConfirm, useToast } from "@/components/ui/feedback-provider";
import type { MembersListResponse } from "@/types/admin";
import type { PublicCellResponse } from "@/types/api";

const defaultListState: MembersListResponse = {
  items: [],
  meta: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  },
};

export default function AdminMembersPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const [members, setMembers] = useState<MembersListResponse>(defaultListState);
  const [cells, setCells] = useState<PublicCellResponse[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [visitorFilter, setVisitorFilter] = useState("all");
  const [cellId, setCellId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", "10");

    if (search.trim()) {
      params.set("search", search.trim());
      params.set("fullName", search.trim());
    }

    if (cellId) {
      params.set("cellId", cellId);
    }

    if (visitorFilter === "true" || visitorFilter === "false") {
      params.set("isVisitor", visitorFilter);
    }

    return params;
  }, [cellId, page, search, visitorFilter]);

  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await membersApi.list(query);
      setMembers(data);
    } catch (cause) {
      if (cause instanceof ApiError) {
        setError(cause.message);
      } else {
        setError("Não foi possível carregar os membros.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    adminSupportApi
      .getCells()
      .then(setCells)
      .catch(() => setCells([]));
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Remover cadastro de membro",
      description:
        "Essa ação exclui o registro definitivamente do painel administrativo.",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    setIsDeleting(id);
    setError(null);

    try {
      await membersApi.remove(id);
      toast({
        variant: "success",
        title: "Cadastro removido",
        description: "O registro foi excluído com sucesso.",
      });
      await loadMembers();
    } catch (cause) {
      if (cause instanceof ApiError) {
        setError(cause.message);
        toast({
          variant: "error",
          title: "Falha ao remover cadastro",
          description: cause.message,
        });
      } else {
        setError("Não foi possível remover o membro.");
        toast({
          variant: "error",
          title: "Falha ao remover cadastro",
          description: "Não foi possível remover o membro.",
        });
      }
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Membros"
        description="Listagem administrativa conectada ao backend com filtros, paginação e remoção direta de registros."
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_0.9fr_auto_auto]">
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Buscar por nome"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <select
              value={cellId}
              onChange={(event) => {
                setCellId(event.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="">Todas as células</option>
              {cells.map((cell) => (
                <option key={cell.id} value={cell.id}>
                  {cell.name}
                </option>
              ))}
            </select>
            <select
              value={visitorFilter}
              onChange={(event) => {
                setVisitorFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">Todos</option>
              <option value="true">Visitantes</option>
              <option value="false">Membros</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
              onClick={() => loadMembers()}
            >
              <RefreshCcw className="h-4 w-4" />
              Atualizar
            </button>
            <Link
              href="/admin/members/new"
              className="rounded-full bg-brand-red px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              Novo membro
            </Link>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-8 space-y-4 md:hidden">
            {isLoading ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-8 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Carregando membros...
                </div>
              </div>
            ) : members.items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-8 text-sm text-slate-400">
                Nenhum cadastro encontrado com os filtros atuais.
              </div>
            ) : (
              members.items.map((member) => (
                <article
                  key={member.id}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-semibold text-white">
                        {member.fullName}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {member.cell?.name || "Sem célula"}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      {member.isVisitor ? "Visitante" : "Membro"}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-300">{member.phone}</p>

                  <div className="mt-5 flex flex-wrap gap-4">
                    <Link
                      href={`/admin/members/${member.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red"
                    >
                      <Pencil className="h-4 w-4" />
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-red-200 transition hover:text-red-100"
                      onClick={() => handleDelete(member.id)}
                      disabled={isDeleting === member.id}
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting === member.id ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-[1.5rem] border border-white/10 md:block">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.9fr] gap-4 bg-black/30 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span>Nome</span>
              <span>Célula</span>
              <span>Contato</span>
              <span>Status</span>
              <span>Ações</span>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-3 px-5 py-8 text-sm text-slate-300">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Carregando membros...
              </div>
            ) : members.items.length === 0 ? (
              <div className="px-5 py-8 text-sm text-slate-400">
                Nenhum cadastro encontrado com os filtros atuais.
              </div>
            ) : (
              members.items.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.9fr] gap-4 border-t border-white/10 px-5 py-4 text-sm text-slate-300"
                >
                  <span>{member.fullName}</span>
                  <span>{member.cell?.name || "Sem célula"}</span>
                  <span>{member.phone}</span>
                  <span>{member.isVisitor ? "Visitante" : "Membro"}</span>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/admin/members/${member.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red"
                    >
                      <Pencil className="h-4 w-4" />
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-red-200 transition hover:text-red-100"
                      onClick={() => handleDelete(member.id)}
                      disabled={isDeleting === member.id}
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting === member.id ? "..." : "Excluir"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Página {members.meta.page} de {members.meta.totalPages}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={page <= 1}
                className="rounded-full border border-white/10 px-4 py-2 text-white disabled:opacity-40"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={page >= members.meta.totalPages}
                className="rounded-full border border-white/10 px-4 py-2 text-white disabled:opacity-40"
                onClick={() =>
                  setPage((current) =>
                    Math.min(members.meta.totalPages, current + 1),
                  )
                }
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
