import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { churchProjects } from "@/data/site-content";

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow="Projetos sociais"
        title="A presença da igreja também alcança a cidade"
        description="Além dos encontros e do cuidado interno, vale destacar ações sociais e projetos que comunicam serviço, compaixão e compromisso com a comunidade."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {churchProjects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-80">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-red">
                  {project.impact}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{project.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
