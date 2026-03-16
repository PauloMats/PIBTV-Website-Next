"use client";

import { useEffect, useState } from "react";
import { BadgePlus, Pencil, Trash2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { useConfirm, useToast } from "@/components/ui/feedback-provider";
import { ApiError, badgesApi } from "@/lib/auth-api";
import type { BadgeRecord } from "@/types/admin";

const emptyForm = {
  name: "",
  slug: "",
  color: "#970707",
  isActive: true,
};

export default function AdminBadgesPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const [items, setItems] = useState<BadgeRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadBadges = async () => {
    setError(null);

    try {
      const params = new URLSearchParams({ page: "1", pageSize: "50" });
      const response = await badgesApi.list(params);
      setItems(response.items);
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível carregar os badges.",
      );
    }
  };

  useEffect(() => {
    loadBadges();
  }, []);

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
      };

      if (editingId) {
        await badgesApi.update(editingId, payload);
        toast({
          variant: "success",
          title: "Badge atualizado",
          description: "As informações do badge foram salvas com sucesso.",
        });
      } else {
        await badgesApi.create(payload);
        toast({
          variant: "success",
          title: "Badge criado",
          description: "O novo badge já está disponível para os avisos.",
        });
      }
      resetForm();
      await loadBadges();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível salvar o badge.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao salvar badge",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Remover badge",
      description:
        "Essa ação exclui o badge do painel e pode impactar a organização editorial dos avisos.",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    try {
      await badgesApi.remove(id);
      toast({
        variant: "success",
        title: "Badge removido",
        description: "O badge foi excluído com sucesso.",
      });
      await loadBadges();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível remover o badge.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao remover badge",
        description: message,
      });
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Badges"
        description="Cadastro administrativo das categorias editoriais usadas em avisos, eventos e destaques do site."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-brand-red">
              <BadgePlus className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                {editingId ? "Editar badge" : "Novo badge"}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Nome do badge"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                placeholder="Slug opcional"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <input
                type="color"
                value={form.color}
                onChange={(event) =>
                  setForm((current) => ({ ...current, color: event.target.value }))
                }
                className="h-12 rounded-2xl border border-white/10 bg-black/20 px-2"
              />
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isActive: event.target.checked,
                    }))
                  }
                />
                Badge ativo
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
                {isSaving ? "Salvando..." : editingId ? "Atualizar" : "Criar badge"}
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
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  Nenhum badge cadastrado ainda.
                </div>
              ) : null}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {item.name}
                        </h2>
                        <p className="text-sm text-slate-400">{item.slug}</p>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      {item.isActive ? "Ativo" : "Inativo"}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red"
                      onClick={() => {
                        setEditingId(item.id);
                        setForm({
                          name: item.name,
                          slug: item.slug,
                          color: item.color,
                          isActive: item.isActive,
                        });
                      }}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
