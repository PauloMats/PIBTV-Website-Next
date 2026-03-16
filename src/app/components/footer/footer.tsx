import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  MessageSquare,
  Facebook,
  Mail,
  MapPinned,
} from 'lucide-react';
import { navigationItems } from '@/data/site-content';
import { getPublicSiteSnapshot } from '@/lib/site-api';

export default async function Footer() {
  const site = await getPublicSiteSnapshot();
  const year = new Date().getFullYear();
  const emailLink = `mailto:${site.identity.email}`;
  const linkHoverEffect = "transition-colors duration-200 hover:text-brand-red";

  return (
    <footer className="border-t border-white/10 bg-[#03050b] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] md:px-10">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={site.identity.logo}
              alt={site.identity.name}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <div>
              <div className="font-display text-2xl uppercase tracking-[0.12em] text-white">
                {site.identity.name}
              </div>
              <div className="text-sm text-slate-400">{site.identity.slogan}</div>
            </div>
          </Link>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Site institucional da PIBTV com avisos, células, mídias, localização e informações para membros, visitantes e liderança.
          </p>
          <div className="flex gap-3 text-white">
            <Link
              href={site.identity.instagram}
              className="card-lift inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
              target="_blank"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href={site.identity.facebook}
              className="card-lift inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
              target="_blank"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-slate-300">
          <h4 className="font-display text-2xl uppercase tracking-[0.12em] text-white">Contato</h4>
          <Link href={emailLink} target="_blank" className={`flex items-center gap-2 font-semibold ${linkHoverEffect}`}>
            <Mail className="w-5 h-5" />
            {site.identity.email}
          </Link>
          <Link href={site.identity.whatsappUrl} target="_blank" className={`flex items-center gap-2 font-semibold ${linkHoverEffect}`}>
            <MessageSquare className="w-5 h-5" />
            Falar com a secretaria
          </Link>
          <Link href={site.identity.mapsUrl} target="_blank" className={`flex items-start gap-2 font-semibold ${linkHoverEffect}`}>
            <MapPinned className="mt-0.5 h-5 w-5" />
            {site.identity.address}
          </Link>
        </div>

        <div className="text-sm text-slate-300">
          <h4 className="font-display text-2xl uppercase tracking-[0.12em] text-white">Navegação</h4>
          <ul className="mt-4 space-y-3">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkHoverEffect}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projetos" className={linkHoverEffect}>
                Projetos sociais
              </Link>
            </li>
            <li>
              <Link href="/primeira-visita" className={linkHoverEffect}>
                Primeira visita
              </Link>
            </li>
            <li>
              <Link href="/contato" className={linkHoverEffect}>
                Contato
              </Link>
            </li>
            <li>
              <Link href="/admin" className={linkHoverEffect}>
                Área administrativa
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-sm text-slate-500 sm:px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          © {year} {site.identity.fullName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
