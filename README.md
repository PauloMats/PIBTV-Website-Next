# PIBTV Website Frontend

Frontend institucional da PIBTV em `Next.js + React + TypeScript + Tailwind CSS`.

O foco deste repositório é o site público e a base visual do painel administrativo. A recomendação é manter a API, autenticação, Prisma, PostgreSQL e Docker em um repositório separado.

## Arquitetura recomendada

### Frontend
- Deploy na Vercel.
- Responsável pelo site institucional e pelas telas do painel.
- Consome uma API externa depois via `REST` ou `tRPC`, conforme a decisão do backend.

### Backend
- Repositório separado com `NestJS + Prisma + PostgreSQL`.
- Deploy em Railway, já que você pretende usar Docker, banco e uma API Node dedicada.
- Responsável por autenticação, CRUD administrativo, upload/media, membros, células, avisos e eventos.

## Motivo da separação

- Vercel é excelente para hospedar o frontend Next.
- Vercel não hospeda PostgreSQL nem é o melhor encaixe para uma API Nest dockerizada de forma tradicional.
- Railway encaixa melhor para API Node, Docker e banco.
- Separando, o frontend fica mais leve e o backend evolui sem travar o deploy do site.

## Estrutura atual do frontend

- `src/app`: rotas do App Router.
- `src/components/site`: componentes visuais reutilizáveis.
- `src/data/site-content.ts`: conteúdo institucional tipado, pronto para depois vir da API.
- `src/lib/api.ts`: helper inicial para integração com a futura API.
- `src/types/site.ts`: contratos básicos do domínio institucional.

## Escopo do painel administrativo

- Login simples para equipe administrativa.
- CRUD de avisos e eventos com badges.
- CRUD de células.
- CRUD de mídias e galerias.
- Cadastro básico de membros.

## Páginas institucionais já estruturadas

- Início
- Sobre
- Ministérios
- Projetos sociais
- Avisos
- Células
- Mídia
- Localização
- Primeira visita
- Contato
- Área administrativa

## Próximos passos sugeridos

1. Criar o repositório `pibtv-api`.
2. Subir `NestJS + Prisma + PostgreSQL` no Railway.
3. Definir autenticação para admins.
4. Expor endpoints para avisos, células, mídias e membros.
5. Trocar o conteúdo estático do frontend por consumo da API.
