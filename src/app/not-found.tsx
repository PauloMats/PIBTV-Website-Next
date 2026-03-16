import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
        Página não encontrada
      </p>
      <h1 className="mt-6 font-display text-7xl uppercase tracking-[0.08em] text-white">
        404
      </h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
        O conteúdo que você tentou acessar não está disponível nesta rota. Volte para a página inicial ou siga para uma das áreas institucionais do site.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
        >
          Ir para o início
        </Link>
        <Link
          href="/eventos"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
        >
          Ver avisos
        </Link>
      </div>
    </section>
  );
}
