"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeAlert, Pencil, Trash2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { useConfirm, useToast } from "@/components/ui/feedback-provider";
import { adminsApi, ApiError } from "@/lib/auth-api";
import { getStoredAuthUser } from "@/lib/auth-storage";
import type {
  AdminRecord,
  AdminsListResponse,
  CreateAdminPayload,
  UpdateAdminPayload,
} from "@/types/admin";

const defaultListState: AdminsListResponse = {
  items: [],
  meta: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  },
};

const emptyForm: CreateAdminPayload = {
  username: "",
  password: "",
  name: "",
  isActive: true,
};

const inputClassName =
  "rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500";

function formatLastLogin(value: string | null) {
  if (!value) {
    return "Nunca acessou";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminAdminsPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const currentUser = getStoredAuthUser();
  const [admins, setAdmins] = useState<AdminsListResponse>(defaultListState);
  const [form, setForm] = useState<CreateAdminPayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "10",
    });

    if (search.trim()) {
      params.set("search", search.trim());
      params.set("username", search.trim());
      params.set("name", search.trim());
    }

    if (statusFilter === "true" || statusFilter === "false") {
      params.set("isActive", statusFilter);
    }

    return params;
  }, [page, search, statusFilter]);

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await adminsApi.list(query);
      setAdmins(data);
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível carregar os administradores.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const trimmedUsername = form.username.trim();
      const trimmedName = form.name.trim();

      if (!trimmedUsername || !trimmedName) {
        throw new Error("Preencha nome e usuário do administrador.");
      }

      if (!editingId && !form.password.trim()) {
        throw new Error("Informe uma senha para o novo administrador.");
      }

      const payload: UpdateAdminPayload = {
        username: trimmedUsername,
        name: trimmedName,
        isActive: form.isActive,
      };

      if (form.password.trim()) {
        payload.password = form.password;
      }

      if (editingId) {
        await adminsApi.update(editingId, payload);
        toast({
          variant: "success",
          title: "Admin atualizado",
          description: "As informações do administrador foram salvas com sucesso.",
        });
        setSuccess("Administrador atualizado com sucesso.");
      } else {
        await adminsApi.create({
          username: trimmedUsername,
          name: trimmedName,
          password: form.password,
          isActive: form.isActive,
        });
        toast({
          variant: "success",
          title: "Admin criado",
          description: "O novo usuário administrativo foi criado com sucesso.",
        });
        setSuccess("Administrador criado com sucesso.");
      }

      resetForm();
      await loadAdmins();
    } catch (cause) {
      const message =
        cause instanceof ApiError || cause instanceof Error
          ? cause.message
          : "Não foi possível salvar o administrador.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao salvar admin",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (admin: AdminRecord) => {
    setEditingId(admin.id);
    setSuccess(null);
    setError(null);
    setForm({
      username: admin.username,
      name: admin.name,
      password: "",
      isActive: admin.isActive,
    });
  };

  const handleDelete = async (admin: AdminRecord) => {
    if (admin.id === currentUser?.id) {
      const message = "Você não pode remover a própria sessão administrativa.";
      setError(message);
      toast({
        variant: "error",
        title: "Ação não permitida",
        description: message,
      });
      return;
    }

    const confirmed = await confirm({
      title: `Remover ${admin.username}`,
      description:
        "Essa ação exclui o acesso administrativo selecionado. Confirme apenas se não houver mais necessidade dessa conta.",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    setIsDeleting(admin.id);
    setError(null);
    setSuccess(null);

    try {
      await adminsApi.remove(admin.id);
      toast({
        variant: "success",
        title: "Admin removido",
        description: "A conta administrativa foi excluída com sucesso.",
      });
      setSuccess("Administrador removido com sucesso.");
      await loadAdmins();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível remover o administrador.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao remover admin",
        description: message,
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Admins"
        description="Gerencie os usuários administrativos que acessam o painel, controlando nome, login, senha e status."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-brand-red">
              <BadgeAlert className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                {editingId ? "Editar admin" : "Novo admin"}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Nome do responsável"
                className={inputClassName}
              />
              <input
                value={form.username}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    username: event.target.value,
                  }))
                }
                placeholder="Usuário de login"
                className={inputClassName}
              />
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder={
                  editingId ? "Nova senha opcional" : "Senha inicial do admin"
                }
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
                Administrador ativo
              </label>
            </div>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {success}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
              >
                {isSaving ? "Salvando..." : editingId ? "Atualizar" : "Criar admin"}
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
            <div className="grid gap-4 md:grid-cols-[1.3fr_0.9fr_auto]">
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nome ou usuário"
                className={inputClassName}
              />
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className={inputClassName}
              >
                <option value="all">Todos os status</option>
                <option value="true">Ativos</option>
                <option value="false">Inativos</option>
              </select>
              <button
                type="button"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
                onClick={() => loadAdmins()}
              >
                Atualizar
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {isLoading ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  Carregando administradores...
                </div>
              ) : admins.items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  Nenhum administrador encontrado com os filtros atuais.
                </div>
              ) : (
                admins.items.map((admin) => (
                  <article
                    key={admin.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {admin.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                          @{admin.username}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {admin.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-400">
                      <p>Último acesso: {formatLastLogin(admin.lastLoginAt)}</p>
                      <p>
                        {admin.id === currentUser?.id
                          ? "Esta é a sua conta atual."
                          : "Conta administrativa da equipe."}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red"
                        onClick={() => handleEdit(admin)}
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-200 transition hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => handleDelete(admin)}
                        disabled={isDeleting === admin.id || admin.id === currentUser?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting === admin.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Página {admins.meta.page} de {admins.meta.totalPages}
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
                  disabled={page >= admins.meta.totalPages}
                  className="rounded-full border border-white/10 px-4 py-2 text-white disabled:opacity-40"
                  onClick={() =>
                    setPage((current) => Math.min(admins.meta.totalPages, current + 1))
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
