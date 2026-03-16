"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  buildMemberPayload,
  MemberForm,
  type MemberFormData,
} from "@/components/admin/member-form";
import { ApiError, membersApi } from "@/lib/auth-api";
import { useToast } from "@/components/ui/feedback-provider";

export default function AdminMembersNewPage() {
  const router = useRouter();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const handleCreate = async (data: MemberFormData) => {
    setApiMessage(null);
    setIsSaving(true);

    try {
      await membersApi.create(buildMemberPayload(data));
      toast({
        variant: "success",
        title: "Membro cadastrado",
        description: "O novo registro foi salvo no backend com sucesso.",
      });
      router.push("/admin/members");
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Não foi possível salvar o cadastro.";
      setApiMessage(message);
      toast({
        variant: "error",
        title: "Falha ao cadastrar membro",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminGuard>
      <AdminShell
        title="Novo membro"
        description="Cadastre membros e visitantes com dados de contato, vínculo com célula e observações administrativas."
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {apiMessage ? (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {apiMessage}
            </div>
          ) : null}

          <MemberForm
            submitLabel="Salvar membro"
            isSaving={isSaving}
            onSubmit={handleCreate}
          />
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
