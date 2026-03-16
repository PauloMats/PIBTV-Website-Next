"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  buildMemberPayload,
  MemberForm,
  type MemberFormData,
} from "@/components/admin/member-form";
import { ApiError, membersApi } from "@/lib/auth-api";
import { useToast } from "@/components/ui/feedback-provider";
import type { MemberRecord } from "@/types/admin";

function toFormValues(member: MemberRecord): MemberFormData {
  return {
    fullName: member.fullName,
    cellId: member.cellId ?? "",
    isVisitor: member.isVisitor,
    birthDate: member.birthDate?.slice(0, 10) ?? "",
    baptismDate: member.baptismDate?.slice(0, 10) ?? "",
    phone: member.phone,
    address: member.address,
    notes: member.notes ?? "",
  };
}

export default function AdminMembersEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();
  const memberId = useMemo(() => String(params.id), [params.id]);
  const [member, setMember] = useState<MemberRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    membersApi
      .getById(memberId)
      .then((response) => setMember(response))
      .catch((cause) => {
        const message =
          cause instanceof ApiError
            ? cause.message
            : "Não foi possível carregar o cadastro.";
        setError(message);
        toast({
          variant: "error",
          title: "Falha ao carregar membro",
          description: message,
        });
      })
      .finally(() => setIsLoading(false));
  }, [memberId, toast]);

  const handleUpdate = async (data: MemberFormData) => {
    setError(null);
    setIsSaving(true);

    try {
      await membersApi.update(memberId, buildMemberPayload(data));
      toast({
        variant: "success",
        title: "Cadastro atualizado",
        description: "As informações do membro foram atualizadas com sucesso.",
      });
      router.push("/admin/members");
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível atualizar o cadastro.";
      setError(message);
      toast({
        variant: "error",
        title: "Falha ao atualizar membro",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Editar membro"
        description="Atualize os dados de contato, vínculo com célula e observações do cadastro selecionado."
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <Link
            href="/admin/members"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para membros
          </Link>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-300">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Carregando dados do membro...
            </div>
          ) : member ? (
            <div className="mt-8">
              <MemberForm
                initialValues={toFormValues(member)}
                submitLabel="Salvar alterações"
                isSaving={isSaving}
                onSubmit={handleUpdate}
              />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-400">
              Não foi possível encontrar este cadastro.
            </div>
          )}
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
