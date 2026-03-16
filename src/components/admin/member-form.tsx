"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle, Save } from "lucide-react";
import { adminSupportApi } from "@/lib/auth-api";
import { formatPhoneInput } from "@/lib/phone";
import type { CreateMemberPayload } from "@/types/admin";
import type { PublicCellResponse } from "@/types/api";

const schema = z.object({
  fullName: z.string().min(3, { message: "Informe o nome completo." }),
  cellId: z.string().optional(),
  isVisitor: z.boolean().default(false),
  birthDate: z.string().optional(),
  baptismDate: z.string().optional(),
  phone: z.string().min(8, { message: "Informe um contato válido." }),
  address: z.string().min(5, { message: "Informe o endereço." }),
  notes: z.string().optional(),
});

export type MemberFormData = z.infer<typeof schema>;

type MemberFormProps = {
  initialValues?: Partial<MemberFormData>;
  submitLabel: string;
  isSaving: boolean;
  onSubmit: (data: MemberFormData) => Promise<void>;
};

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500";

const defaultValues: MemberFormData = {
  fullName: "",
  cellId: "",
  isVisitor: false,
  birthDate: "",
  baptismDate: "",
  phone: "",
  address: "",
  notes: "",
};

export function buildMemberPayload(data: MemberFormData): CreateMemberPayload {
  return {
    fullName: data.fullName.trim(),
    isVisitor: data.isVisitor,
    birthDate: data.birthDate || undefined,
    baptismDate: data.baptismDate || undefined,
    phone: data.phone.trim(),
    address: data.address.trim(),
    notes: data.notes?.trim() || undefined,
    cellId: data.cellId || undefined,
  };
}

export function MemberForm({
  initialValues,
  submitLabel,
  isSaving,
  onSubmit,
}: MemberFormProps) {
  const [cells, setCells] = useState<PublicCellResponse[]>([]);
  const [isLoadingCells, setIsLoadingCells] = useState(true);
  const mergedDefaults = useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
    }),
    [initialValues],
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(schema),
    defaultValues: mergedDefaults,
  });

  useEffect(() => {
    reset(mergedDefaults);
  }, [mergedDefaults, reset]);

  useEffect(() => {
    adminSupportApi
      .getCells()
      .then(setCells)
      .catch(() => setCells([]))
      .finally(() => setIsLoadingCells(false));
  }, []);

  const phoneValue = watch("phone");

  useEffect(() => {
    const maskedValue = formatPhoneInput(phoneValue ?? "");

    if (phoneValue !== maskedValue) {
      setValue("phone", maskedValue, { shouldDirty: true });
    }
  }, [phoneValue, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Nome completo
        </span>
        <input
          type="text"
          {...register("fullName")}
          className={fieldClassName}
          placeholder="Digite o nome do membro"
        />
        {errors.fullName ? (
          <span className="mt-2 block text-xs text-red-300">
            {errors.fullName.message}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Célula
        </span>
        <select {...register("cellId")} className={fieldClassName}>
          <option value="">
            {isLoadingCells ? "Carregando células..." : "Sem vínculo agora"}
          </option>
          {cells.map((cell) => (
            <option key={cell.id} value={cell.id}>
              {cell.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Data de nascimento
        </span>
        <input type="date" {...register("birthDate")} className={fieldClassName} />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Data de batismo
        </span>
        <input
          type="date"
          {...register("baptismDate")}
          className={fieldClassName}
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Telefone / WhatsApp
        </span>
        <input
          type="text"
          {...register("phone")}
          className={fieldClassName}
          placeholder="(82) 99999-9999"
          inputMode="numeric"
        />
        {errors.phone ? (
          <span className="mt-2 block text-xs text-red-300">
            {errors.phone.message}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Endereço
        </span>
        <input
          type="text"
          {...register("address")}
          className={fieldClassName}
          placeholder="Rua, número e bairro"
        />
        {errors.address ? (
          <span className="mt-2 block text-xs text-red-300">
            {errors.address.message}
          </span>
        ) : null}
      </label>

      <label className="block md:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Observações
        </span>
        <textarea
          {...register("notes")}
          rows={5}
          className={fieldClassName}
          placeholder="Observações pastorais ou administrativas"
        />
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-300 md:col-span-2">
        <input type="checkbox" {...register("isVisitor")} />
        Marcar como visitante
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
