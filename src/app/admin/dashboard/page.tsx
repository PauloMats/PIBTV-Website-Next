import Link from "next/link";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";

const dashboardCards = [
  {
    title: "Membros",
    description: "Consultar, filtrar, cadastrar e remover membros ou visitantes.",
    href: "/admin/members",
  },
  {
    title: "Novo cadastro",
    description: "Adicionar um novo membro diretamente no backend administrativo.",
    href: "/admin/members/new",
  },
  {
    title: "Avisos",
    description: "Criar, editar e publicar notices e eventos com badges vinculados.",
    href: "/admin/notices",
  },
  {
    title: "Células",
    description: "Gerenciar grupos, horários, contatos, bairros e status de publicação.",
    href: "/admin/cells",
  },
  {
    title: "Mídia",
    description: "Cadastrar imagens e vídeos por URL com categoria, tipo e publicação.",
    href: "/admin/media",
  },
  {
    title: "Admins",
    description: "Gerenciar os acessos administrativos da equipe com status e redefinição de senha.",
    href: "/admin/admins",
  },
  {
    title: "Badges",
    description: "Controlar categorias editoriais como culto, evento, célula e santa ceia.",
    href: "/admin/badges",
  },
  {
    title: "Configurações",
    description: "Atualizar dados institucionais e agenda fixa exibidos no site público.",
    href: "/admin/settings",
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminShell
        title="Dashboard"
        description="Painel inicial da liderança. O login, a sessão e todos os módulos principais já estão integrados à API administrativa."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-6 inline-flex text-sm font-semibold text-white transition hover:text-brand-red"
              >
                Abrir módulo
              </Link>
            </article>
          ))}
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
