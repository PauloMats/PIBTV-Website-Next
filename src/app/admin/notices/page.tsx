"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarRange, Pencil, Trash2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { useConfirm, useToast } from "@/components/ui/feedback-provider";
import { ApiError, badgesApi, noticesApi } from "@/lib/auth-api";
import type {
  BadgeRecord,
  CreateNoticePayload,
  NoticeRecord,
  NoticesListResponse,
} from "@/types/admin";

const emptyForm: CreateNoticePayload = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  type: "NOTICE",
  coverImageUrl: "",
  isPublished: true,
  publishedAt: "",
  startsAt: "",
  endsAt: "",
  badgeIds: [],
};

const defaultListState: NoticesListResponse = {
  items: [],
  meta: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  },
};

const inputClassName =
  "rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500";

function toDatetimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}

function toIsoOrUndefined(value?: string) {
  return value ? new Date(value).toISOString() : undefined;
}

export default function AdminNoticesPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const [items, setItems] = useState<NoticesListResponse>(defaultListState);
  const [badges, setBadges] = useState<BadgeRecord[]>([]);
  const [form, setForm] = useState<CreateNoticePayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "10",
    });

    if (search.trim()) {
      params.set("search", search.trim());
      params.set("title", search.trim());
    }

    if (typeFilter) {
      params.set("type", typeFilter);
    }

    if (statusFilter === "true" || statusFilter === "false") {
      params.set("isPublished", statusFilter);
    }

    return params;
  }, [page, search, statusFilter, typeFilter]);

  const loadNotices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await noticesApi.list(query);
      setItems(response);
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível carregar os avisos.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams({ page: "1", pageSize: "50" });
    badgesApi
      .list(params)
      .then((response) => setBadges(response.items))
      .catch(() => setBadges([]));
  }, []);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        slug: form.slug?.trim() || undefined,
        coverImageUrl: form.coverImageUrl?.trim() || undefined,
        publishedAt: toIsoOrUndefined(form.publishedAt),
        startsAt: toIsoOrUndefined(form.startsAt),
        endsAt: toIsoOrUndefined(form.endsAt),
        badgeIds: form.badgeIds?.length ? form.badgeIds : undefined,
      };

      if (editingId) {
        await noticesApi.update(editingId, payload);
        toast({
          variant: "success",
          title: "Aviso atualizado",
          description: "O aviso foi atualizado com sucesso.",
        });
      } else {
        await noticesApi.create(payload);
        toast({
          variant: "success",
          title: "Aviso criado",
          description: "O novo aviso foi salvo no painel.",
        });
      }

      resetForm();
      await loadNotices();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível salvar o aviso.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao salvar aviso",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Remover aviso",
      description:
        "Essa ação exclui o aviso do painel e interrompe sua publicação no site.",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    try {
      await noticesApi.remove(id);
      toast({
        variant: "success",
        title: "Aviso removido",
        description: "O aviso foi excluído com sucesso.",
      });
      await loadNotices();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível remover o aviso.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao remover aviso",
        description: message,
      });
    }
  };

  const handleEdit = (item: NoticeRecord) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: item.content,
      type: item.type,
      coverImageUrl: item.coverImageUrl ?? "",
      isPublished: item.isPublished,
      publishedAt: toDatetimeLocal(item.publishedAt),
      startsAt: toDatetimeLocal(item.startsAt),
      endsAt: toDatetimeLocal(item.endsAt),
      badgeIds: item.badges.map((badge) => badge.id),
    });
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Avisos"
        description="Crie comunicados, eventos e cultos especiais com datas, capa, publicação e badges editoriais."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-brand-red">
              <CalendarRange className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                {editingId ? "Editar aviso" : "Novo aviso"}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="Título do aviso"
                className={inputClassName}
              />
              <input
                value={form.slug ?? ""}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                placeholder="Slug opcional"
                className={inputClassName}
              />
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as CreateNoticePayload["type"],
                  }))
                }
                className={inputClassName}
              >
                <option value="NOTICE">Aviso</option>
                <option value="EVENT">Evento</option>
                <option value="SERVICE">Culto</option>
              </select>
              <textarea
                rows={3}
                value={form.summary}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    summary: event.target.value,
                  }))
                }
                placeholder="Resumo curto"
                className={inputClassName}
              />
              <textarea
                rows={6}
                value={form.content}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    content: event.target.value,
                  }))
                }
                placeholder="Conteúdo completo"
                className={inputClassName}
              />
              <input
                value={form.coverImageUrl ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    coverImageUrl: event.target.value,
                  }))
                }
                placeholder="URL da imagem de capa"
                className={inputClassName}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Publicação
                  </span>
                  <input
                    type="datetime-local"
                    value={form.publishedAt ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        publishedAt: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Início
                  </span>
                  <input
                    type="datetime-local"
                    value={form.startsAt ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        startsAt: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Encerramento
                  </span>
                  <input
                    type="datetime-local"
                    value={form.endsAt ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        endsAt: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Badges vinculados
                </span>
                <select
                  multiple
                  value={form.badgeIds ?? []}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      badgeIds: Array.from(event.target.selectedOptions).map(
                        (option) => option.value,
                      ),
                    }))
                  }
                  className={`${inputClassName} min-h-32`}
                >
                  {badges.map((badge) => (
                    <option key={badge.id} value={badge.id}>
                      {badge.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isPublished: event.target.checked,
                    }))
                  }
                />
                Publicado no site
              </label>
            </div>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
              >
                {isSaving ? "Salvando..." : editingId ? "Atualizar" : "Criar aviso"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por título"
                className={inputClassName}
              />
              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setPage(1);
                }}
                className={inputClassName}
              >
                <option value="">Todos os tipos</option>
                <option value="NOTICE">Aviso</option>
                <option value="EVENT">Evento</option>
                <option value="SERVICE">Culto</option>
              </select>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className={inputClassName}
              >
                <option value="all">Todos os status</option>
                <option value="true">Publicados</option>
                <option value="false">Rascunhos</option>
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {isLoading ? (
                <div className="text-sm text-slate-400">Carregando avisos...</div>
              ) : items.items.length === 0 ? (
                <div className="text-sm text-slate-400">
                  Nenhum aviso encontrado com os filtros atuais.
                </div>
              ) : (
                items.items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.type} · {item.slug}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {item.isPublished ? "Publicado" : "Rascunho"}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {item.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <span
                          key={badge.id}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                          style={{ backgroundColor: `${badge.color}22` }}
                        >
                          {badge.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-200 transition hover:text-red-100"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-400">
              <span>
                Página {items.meta.page} de {items.meta.totalPages}
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
                  disabled={page >= items.meta.totalPages}
                  className="rounded-full border border-white/10 px-4 py-2 text-white disabled:opacity-40"
                  onClick={() =>
                    setPage((current) => Math.min(items.meta.totalPages, current + 1))
                  }
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
