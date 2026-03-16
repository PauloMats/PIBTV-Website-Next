"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ImageIcon, LoaderCircle, Pencil, Trash2, UploadCloud, Video } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { useConfirm, useToast } from "@/components/ui/feedback-provider";
import { adminSupportApi, ApiError, mediaApi } from "@/lib/auth-api";
import { canUseDirectUpload, uploadMediaAsset } from "@/lib/media-upload";
import type { CreateMediaPayload, MediaListResponse } from "@/types/admin";
import type { PublicCellResponse } from "@/types/api";

const emptyForm: CreateMediaPayload = {
  title: "",
  description: "",
  type: "IMAGE",
  url: "",
  thumbnailUrl: "",
  category: "",
  isPublished: true,
  cellId: "",
};

const defaultListState: MediaListResponse = {
  items: [],
  meta: {
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 1,
  },
};

const inputClassName =
  "rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500";

export default function AdminMediaPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const [items, setItems] = useState<MediaListResponse>(defaultListState);
  const [cells, setCells] = useState<PublicCellResponse[]>([]);
  const [form, setForm] = useState<CreateMediaPayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cellFilter, setCellFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadEnabled = canUseDirectUpload();

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "12",
    });

    if (typeFilter) {
      params.set("type", typeFilter);
    }

    if (categoryFilter.trim()) {
      params.set("category", categoryFilter.trim());
    }

    if (cellFilter) {
      params.set("cellId", cellFilter);
    }

    if (statusFilter === "true" || statusFilter === "false") {
      params.set("isPublished", statusFilter);
    }

    return params;
  }, [categoryFilter, cellFilter, page, statusFilter, typeFilter]);

  const loadMedia = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mediaApi.list(query);
      setItems(response);
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível carregar a mídia.",
      );
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
    loadMedia();
  }, [loadMedia]);

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
        description: form.description?.trim() || undefined,
        thumbnailUrl: form.thumbnailUrl?.trim() || undefined,
        cellId: form.cellId || undefined,
      };

      if (editingId) {
        await mediaApi.update(editingId, payload);
        toast({
          variant: "success",
          title: "Mídia atualizada",
          description: "O item de mídia foi atualizado com sucesso.",
        });
      } else {
        await mediaApi.create(payload);
        toast({
          variant: "success",
          title: "Mídia criada",
          description: "O novo item de mídia foi salvo no painel.",
        });
      }

      resetForm();
      await loadMedia();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível salvar o item de mídia.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao salvar mídia",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Remover item de mídia",
      description:
        "Essa ação exclui a mídia do painel. Confirme apenas se o item realmente não for mais necessário.",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    try {
      await mediaApi.remove(id);
      toast({
        variant: "success",
        title: "Mídia removida",
        description: "O item foi excluído com sucesso.",
      });
      await loadMedia();
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível remover o item de mídia.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao remover mídia",
        description: message,
      });
    }
  };

  const handleFileUpload = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadedUrl = await uploadMediaAsset(file, form.type);
      setForm((current) => ({
        ...current,
        url: uploadedUrl,
        thumbnailUrl:
          current.type === "IMAGE" ? uploadedUrl : current.thumbnailUrl,
      }));
      toast({
        variant: "success",
        title: "Upload concluído",
        description: "O arquivo foi enviado e a URL já foi preenchida no formulário.",
      });
    } catch (cause) {
      const message =
        cause instanceof Error
          ? cause.message
          : "Não foi possível enviar o arquivo selecionado.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha no upload",
        description: message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Mídia"
        description="Cadastre imagens e vídeos por URL, organize por categoria e publique materiais para o site."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-brand-red">
              <ImageIcon className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                {editingId ? "Editar mídia" : "Novo item de mídia"}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="Título"
                className={inputClassName}
              />
              <textarea
                rows={4}
                value={form.description ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Descrição opcional"
                className={inputClassName}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      type: event.target.value as CreateMediaPayload["type"],
                    }))
                  }
                  className={inputClassName}
                >
                  <option value="IMAGE">Imagem</option>
                  <option value="VIDEO">Vídeo</option>
                </select>
                <input
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  placeholder="Categoria"
                  className={inputClassName}
                />
              </div>
              <input
                value={form.url}
                onChange={(event) =>
                  setForm((current) => ({ ...current, url: event.target.value }))
                }
                placeholder="URL principal do arquivo"
                className={inputClassName}
              />
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Upload assistido de arquivo
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {uploadEnabled
                        ? "Selecione uma imagem ou vídeo para enviar direto ao provedor configurado e preencher a URL automaticamente."
                        : "Configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME e NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET para habilitar upload direto. Enquanto isso, você pode continuar usando URL manual."}
                    </p>
                  </div>
                  <label
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ${
                      uploadEnabled
                        ? "cursor-pointer bg-white/10 transition hover:bg-white/15"
                        : "cursor-not-allowed bg-white/5 opacity-60"
                    }`}
                  >
                    {isUploading ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <UploadCloud className="h-4 w-4" />
                    )}
                    {isUploading ? "Enviando..." : "Selecionar arquivo"}
                    <input
                      type="file"
                      accept={form.type === "VIDEO" ? "video/*" : "image/*"}
                      className="hidden"
                      disabled={!uploadEnabled || isUploading}
                      onChange={(event) =>
                        handleFileUpload(event.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
              <input
                value={form.thumbnailUrl ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    thumbnailUrl: event.target.value,
                  }))
                }
                placeholder="URL da miniatura"
                className={inputClassName}
              />
              {form.url ? (
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                  {form.type === "IMAGE" ? (
                    <div className="relative h-52 w-full">
                      <Image
                        src={form.thumbnailUrl || form.url}
                        alt={form.title || "Pré-visualização da mídia"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <video
                      src={form.url}
                      controls
                      className="h-52 w-full bg-black object-cover"
                    />
                  )}
                  <div className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
                    Pré-visualização do arquivo selecionado.
                  </div>
                </div>
              ) : null}
              <select
                value={form.cellId ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    cellId: event.target.value,
                  }))
                }
                className={inputClassName}
              >
                <option value="">Sem vínculo com célula</option>
                {cells.map((cell) => (
                  <option key={cell.id} value={cell.id}>
                    {cell.name}
                  </option>
                ))}
              </select>
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
                disabled={isSaving || isUploading}
                className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
              >
                {isSaving ? "Salvando..." : editingId ? "Atualizar" : "Criar mídia"}
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setPage(1);
                }}
                className={inputClassName}
              >
                <option value="">Todos os tipos</option>
                <option value="IMAGE">Imagem</option>
                <option value="VIDEO">Vídeo</option>
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
              <input
                value={categoryFilter}
                onChange={(event) => {
                  setCategoryFilter(event.target.value);
                  setPage(1);
                }}
                placeholder="Filtrar por categoria"
                className={inputClassName}
              />
              <select
                value={cellFilter}
                onChange={(event) => {
                  setCellFilter(event.target.value);
                  setPage(1);
                }}
                className={inputClassName}
              >
                <option value="">Todas as células</option>
                {cells.map((cell) => (
                  <option key={cell.id} value={cell.id}>
                    {cell.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {isLoading ? (
                <div className="text-sm text-slate-400">Carregando mídia...</div>
              ) : items.items.length === 0 ? (
                <div className="text-sm text-slate-400">
                  Nenhum item encontrado com os filtros atuais.
                </div>
              ) : (
                items.items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-brand-red/10 p-3 text-brand-red">
                          {item.type === "VIDEO" ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <ImageIcon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-white">
                            {item.title}
                          </h2>
                          <p className="text-sm text-slate-400">
                            {item.category} · {item.type}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {item.isPublished ? "Publicado" : "Rascunho"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-400">
                      <p>{item.description || "Sem descrição adicional."}</p>
                      <p className="truncate">URL: {item.url}</p>
                      <p>Célula: {item.cell?.name || "Sem vínculo"}</p>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-red"
                        onClick={() => {
                          setEditingId(item.id);
                          setForm({
                            title: item.title,
                            description: item.description ?? "",
                            type: item.type,
                            url: item.url,
                            thumbnailUrl: item.thumbnailUrl ?? "",
                            category: item.category,
                            isPublished: item.isPublished,
                            cellId: item.cellId ?? "",
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
