"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { useToast } from "@/components/ui/feedback-provider";
import { ApiError, settingsApi } from "@/lib/auth-api";
import { formatPhoneInput } from "@/lib/phone";
import type { SettingsRecord } from "@/types/admin";

const emptySettings: SettingsRecord = {
  churchName: "",
  fullName: "",
  slogan: "",
  address: "",
  email: "",
  phone: "",
  whatsappUrl: "",
  mapsUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  serviceTimesJson: JSON.stringify(
    [
      {
        day: "Domingo",
        time: "18:00",
        title: "Culto de Celebração",
        description: "Culto principal da igreja.",
      },
    ],
    null,
    2,
  ),
};

export default function AdminSettingsPage() {
  const toast = useToast();
  const [form, setForm] = useState<SettingsRecord>(emptySettings);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    settingsApi
      .get()
      .then(setForm)
      .catch((cause) => {
        const message =
          cause instanceof ApiError
            ? cause.message
            : "Não foi possível carregar as configurações.";
        setError(message);
        toast({
          variant: "error",
          title: "Falha ao carregar configurações",
          description: message,
        });
      });
  }, [toast]);

  const updateField = (field: keyof SettingsRecord, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === "phone" ? formatPhoneInput(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      JSON.parse(form.serviceTimesJson);
      await settingsApi.update(form);
      toast({
        variant: "success",
        title: "Configurações salvas",
        description: "Os dados institucionais foram atualizados com sucesso.",
      });
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Verifique o JSON de horários e tente novamente.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao salvar configurações",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Configurações"
        description="Edição dos dados institucionais e da agenda fixa exibida no site público."
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ["churchName", "Nome curto"],
                ["fullName", "Nome completo"],
                ["slogan", "Slogan"],
                ["email", "E-mail"],
                ["phone", "Telefone"],
                ["whatsappUrl", "WhatsApp URL"],
                ["mapsUrl", "Maps URL"],
                ["instagramUrl", "Instagram URL"],
                ["facebookUrl", "Facebook URL"],
                ["youtubeUrl", "YouTube URL"],
              ] as Array<[keyof SettingsRecord, string]>
            ).map(([field, label]) => (
              <label key={field} className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {label}
                </span>
                <input
                  value={form[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                />
              </label>
            ))}

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Endereço
              </span>
              <input
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Agenda fixa em JSON
              </span>
              <textarea
                rows={10}
                value={form.serviceTimesJson}
                onChange={(event) =>
                  updateField("serviceTimesJson", event.target.value)
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              />
            </label>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Salvando..." : "Salvar configurações"}
            </button>
          </div>
        </form>
      </AdminShell>
    </AdminGuard>
  );
}
