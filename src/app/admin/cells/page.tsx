"use client";

import { useEffect, useState } from "react";
import { Pencil, SquareGanttChart, Trash2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { useConfirm, useToast } from "@/components/ui/feedback-provider";
import { ApiError, cellsApi } from "@/lib/auth-api";
import type { CellRecord, CreateCellPayload } from "@/types/admin";

const emptyForm: CreateCellPayload = {
  name: "",
  slug: "",
  description: "",
  address: "",
  neighborhood: "",
  scheduleText: "Quinta-feira, 19h30",
  leaderName: "",
  contactPhone: "",
  mapUrl: "",
  isActive: true,
};

const inputClassName =
  "rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500";

export default function AdminCellsPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const [items, setItems] = useState<CellRecord[]>([]);
  const [form, setForm] = useState<CreateCellPayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCells = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ page: "1", pageSize: "50" });
      const response = await cellsApi.list(params);
      setItems(response.items);
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível carregar as células.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCells();
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
        mapUrl: form.mapUrl?.trim() || undefined,
        slug: form.slug?.trim() || undefined,
      };

      if (editingId) {
        await cellsApi.update(editingId, payload);
        toast({
          variant: "success",
          title: "Célula atualizada",
          description: "As informações da célula foram salvas com sucesso.",
        });
      } else {
        await cellsApi.create(payload);
        toast({
          variant: "success",
          title: "Célula criada",
          description: "A nova célula já está disponível no painel.",
        });
      }

      resetForm();
      await loadCells();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível salvar a célula.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao salvar célula",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Remover célula",
      description:
        "Essa ação exclui a célula do cadastro administrativo. Revise antes de confirmar.",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    try {
      await cellsApi.remove(id);
      toast({
        variant: "success",
        title: "Célula removida",
        description: "O registro da célula foi excluído com sucesso.",
      });
      await loadCells();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível remover a célula.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao remover célula",
        description: message,
      });
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Células"
        description="Gerencie os grupos da igreja com bairro, horário, liderança, contato e link de localização."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-brand-red">
              <SquareGanttChart className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                {editingId ? "Editar célula" : "Nova célula"}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Nome da célula"
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
              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Descreva o foco e o perfil do grupo"
                className={inputClassName}
              />
              <input
                value={form.neighborhood}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    neighborhood: event.target.value,
                  }))
                }
                placeholder="Bairro"
                className={inputClassName}
              />
              <input
                value={form.address}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    address: event.target.value,
                  }))
                }
                placeholder="Endereço completo"
                className={inputClassName}
              />
              <input
                value={form.scheduleText}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    scheduleText: event.target.value,
                  }))
                }
                placeholder="Quinta-feira, 19h30"
                className={inputClassName}
              />
              <input
                value={form.leaderName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    leaderName: event.target.value,
                  }))
                }
                placeholder="Nome da liderança"
                className={inputClassName}
              />
              <input
                value={form.contactPhone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    contactPhone: event.target.value,
                  }))
                }
                placeholder="Telefone / WhatsApp"
                className={inputClassName}
              />
              <input
                value={form.mapUrl ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    mapUrl: event.target.value,
                  }))
                }
                placeholder="Link do Google Maps"
                className={inputClassName}
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
                Célula ativa
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
                {isSaving ? "Salvando..." : editingId ? "Atualizar" : "Criar célula"}
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
            {isLoading ? (
              <div className="text-sm text-slate-400">Carregando células...</div>
            ) : items.length === 0 ? (
              <div className="text-sm text-slate-400">
                Nenhuma célula cadastrada ainda.
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.neighborhood} · {item.scheduleText}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {item.isActive ? "Ativa" : "Inativa"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-400">
                      <p>Liderança: {item.leaderName}</p>
                      <p>Contato: {item.contactPhone}</p>
                      <p>Endereço: {item.address}</p>
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
                            description: item.description,
                            address: item.address,
                            neighborhood: item.neighborhood,
                            scheduleText: item.scheduleText,
                            leaderName: item.leaderName,
                            contactPhone: item.contactPhone,
                            mapUrl: item.mapUrl ?? "",
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
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
