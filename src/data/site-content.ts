import cultoDomingo from "@/assets/Foto_culto_domingo.png";
import mulheresIgreja from "@/assets/Foto Mulheres da Igreja.png";
import celulaComunhao from "@/assets/celula encontro comunhao.png";
import boasVindas from "@/assets/foto_bemvindos.png";
import localStreetView from "@/assets/Print Street Viwer PIBTV.png";
import logoPibtv from "@/assets/Logo PIBTV sem fundo.png";
import ministerioInfantil from "@/assets/img ministerio infantil.jpg";
import ministerioLouvor from "@/assets/img ministerio louvor.jpg";
import ministerioMidia from "@/assets/img ministerio multimidia.jpg";
import ministerioRecepcao from "@/assets/img ministerio recepção.jpg";
import projetoAbase from "@/assets/abase Project.png";
import projetoQuilo from "@/assets/quilo do amor.jpg";
import arteFundo from "@/assets/Arte fundo site.png";
import type {
  AdminModule,
  CellGroup,
  FaqItem,
  GalleryItem,
  HeroSlide,
  HeroStat,
  MemberSnapshot,
  Ministry,
  NavItem,
  Notice,
  Project,
  ServiceTime,
  VisitStep,
} from "@/types/site";

export const churchIdentity = {
  name: "PIBTV",
  fullName: "Primeira Igreja Batista em Teotônio Vilela",
  shortDescription:
    "Comunidade cristã local comprometida com o evangelho, a comunhão, o discipulado e o cuidado com pessoas.",
  slogan: "Uma igreja acolhedora para pertencer, crescer e servir.",
  address: "Av. Maria Jeane Moreira Sampaio, S/N, Teotônio Vilela - AL",
  email: "pibtv.al@gmail.com",
  phone: "(82) 99876-5432",
  instagram: "https://www.instagram.com/pibtv.al/",
  facebook: "https://www.facebook.com/pibtv.al",
  youtube: "https://www.youtube.com/@pibtv",
  mapsUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  whatsappUrl: "https://wa.me/5582999999999",
  logo: logoPibtv,
  heroImage: cultoDomingo,
  locationImage: localStreetView,
};

export const navigationItems: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/sobrenos", label: "Sobre" },
  { href: "/ministerios", label: "Ministérios" },
  { href: "/celulas", label: "Células" },
  { href: "/eventos", label: "Avisos" },
  { href: "/midiapibtv", label: "Mídia" },
];

export const heroStats: HeroStat[] = [
  { label: "Culto principal", value: "Dom 18h" },
  { label: "Células ativas", value: "6" },
  { label: "Ministérios em ação", value: "5" },
];

export const serviceSchedule: ServiceTime[] = [
  {
    day: "Domingo",
    time: "18:00",
    title: "Culto de Celebração",
    description: "Encontro principal da igreja com louvor, palavra, oração e acolhimento de visitantes.",
  },
  {
    day: "Quinta-feira",
    time: "19:30",
    title: "Encontros de Célula",
    description: "Comunhão, discipulado e cuidado pastoral em pequenos grupos espalhados pela cidade.",
  },
  {
    day: "Sábado",
    time: "19:30",
    title: "Células e programações especiais",
    description: "Algumas células e eventos do mês acontecem aos sábados, com horários comunicados nos avisos.",
  },
];

export const featuredSpecialSchedules = [
  {
    title: "Culto de Jovens",
    summary:
      "Uma noite de adoração, comunhão e mensagem bíblica voltada à juventude da igreja e aos visitantes.",
    badge: "Juventude",
    dateLabel: "22/03/26",
    time: "19:30",
  },
  {
    title: "Culto da Mulher",
    summary:
      "Encontro especial de edificação, oração e fortalecimento para mulheres de todas as idades.",
    badge: "Mulher",
    dateLabel: "12/04/26",
    time: "19:30",
  },
  {
    title: "Culto Administrativo",
    summary:
      "Momento de alinhamento, oração e comunicação com a igreja sobre decisões, agenda e próximos passos.",
    badge: "Administrativo",
    dateLabel: "05/05/26",
    time: "19:30",
  },
];

export const notices: Notice[] = [
  {
    title: "Acompanhe os avisos do mês e programações especiais",
    summary:
      "Cultos especiais, encontros aos sábados, celebrações e atualizações da agenda aparecem aqui para manter a igreja bem informada.",
    dateLabel: "Atualização contínua",
    tag: "Aviso",
    slug: "avisos-do-mes-e-programacoes-especiais",
    content:
      "Os avisos da igreja ajudam membros e visitantes a acompanharem cultos especiais, programações sazonais, celebrações e atividades com horários diferentes da agenda fixa.",
    coverImageUrl: cultoDomingo,
  },
  {
    title: "Encontros de célula às quintas e aos sábados",
    summary:
      "As células seguem como espaço de comunhão, oração, discipulado e integração durante a semana.",
    dateLabel: "19:30",
    tag: "Célula",
    slug: "encontros-de-celula-quintas-e-sabados",
    content:
      "As células acontecem como extensão do cuidado da igreja ao longo da semana, fortalecendo comunhão, oração, discipulado e acolhimento em diferentes bairros.",
    coverImageUrl: celulaComunhao,
  },
  {
    title: "Culto de celebração todos os domingos",
    summary:
      "O encontro principal da igreja acontece todos os domingos às 18h, com mensagem bíblica, adoração e comunhão.",
    dateLabel: "Domingo, 18:00",
    tag: "Culto",
    slug: "culto-de-celebracao-todos-os-domingos",
    content:
      "Todos os domingos às 18h a igreja se reúne para um tempo de adoração, oração, leitura bíblica, mensagem e comunhão entre irmãos e visitantes.",
    coverImageUrl: mulheresIgreja,
  },
];

export const ministries: Ministry[] = [
  {
    title: "Ministério Infantil",
    description:
      "Ambiente seguro, bíblico e acolhedor para crianças crescerem no evangelho.",
  },
  {
    title: "Louvor",
    description:
      "Equipe responsável por conduzir a igreja em adoração com excelência e reverência.",
  },
  {
    title: "Multimídia",
    description:
      "Operação de som, projeção, transmissão e suporte técnico dos encontros.",
  },
  {
    title: "Recepção",
    description:
      "Primeiro contato com membros e visitantes, com foco em cuidado e hospitalidade.",
  },
  {
    title: "Intercessão",
    description:
      "Equipe que sustenta a igreja em oração e cuidado espiritual em diferentes frentes.",
  },
];

export const churchHistorySections = [
  {
    title: "Nossa história",
    content:
      "Aqui ficará o texto completo da história da Primeira Igreja Batista em Teotônio Vilela. Você poderá inserir depois o conteúdo enviado pelo pastor, contando origem, marcos importantes, crescimento da igreja, desafios vencidos e testemunhos que formam a identidade da comunidade ao longo dos anos.",
  },
  {
    title: "Nossa missão local",
    content:
      "A PIBTV deseja servir Teotônio Vilela com fidelidade bíblica, acolhimento sincero, ensino das Escrituras e uma vida comunitária que leve pessoas a conhecer, amar e seguir a Cristo em cada fase da vida.",
  },
];

export const pastoralFamilyProfiles = [
  {
    role: "Pastor titular",
    name: "Pr. Nome a confirmar",
    description:
      "Espaço reservado para apresentar o pastor, sua história ministerial, ênfases de ensino e visão para a igreja.",
  },
  {
    role: "Família pastoral",
    name: "Família pastoral",
    description:
      "Aqui você poderá incluir uma apresentação acolhedora da família pastoral, fortalecendo proximidade com membros e visitantes.",
  },
];

export const ministryHighlights = [
  {
    title: "Ministério Infantil",
    description:
      "Cultiva ensino bíblico e cuidado intencional com crianças em cada encontro.",
    image: ministerioInfantil,
    emphasis: "Formação das novas gerações",
  },
  {
    title: "Louvor",
    description:
      "Conduz a igreja em adoração congregacional com reverência, preparo e excelência.",
    image: ministerioLouvor,
    emphasis: "Adoração que serve a igreja",
  },
  {
    title: "Multimídia",
    description:
      "Dá suporte técnico aos cultos, transmissões, som, projeção e comunicação.",
    image: ministerioMidia,
    emphasis: "Estrutura para comunicar melhor",
  },
  {
    title: "Recepção",
    description:
      "Acolhe membros e visitantes com cuidado, informação e presença atenta.",
    image: ministerioRecepcao,
    emphasis: "Hospitalidade desde a chegada",
  },
  {
    title: "Intercessão",
    description:
      "Serve a igreja com oração, acompanhamento e sensibilidade espiritual nos encontros e demandas da comunidade.",
    image: arteFundo,
    emphasis: "Cuidado espiritual constante",
  },
];

export const cellGroups: CellGroup[] = [
  {
    name: "Huiós",
    neighborhood: "Centro",
    schedule: "Quintas, 19:30",
    leader: "Liderança local",
    contact: "(82) 98765-4321",
    focus: "Comunhão, discipulado e oração.",
    address: "Rua principal, Centro",
    mapUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  },
  {
    name: "Pedras Vivas",
    neighborhood: "Parque do Futuro",
    schedule: "Quintas, 19:30",
    leader: "Equipe local",
    contact: "(82) 98765-4322",
    focus: "Integração de famílias e cuidado pastoral.",
    address: "Rua das Flores, Parque do Futuro",
    mapUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  },
  {
    name: "Unidos Pela Fé",
    neighborhood: "Vila Operária",
    schedule: "Quintas, 19:30",
    leader: "Liderança local",
    contact: "(82) 98765-4323",
    focus: "Ambiente de acolhimento, oração e discipulado.",
    address: "Rua Esperança, Vila Operária",
    mapUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  },
  {
    name: "Chamas Vivas",
    neighborhood: "São Miguel",
    schedule: "Sábados, 19:30",
    leader: "Liderança local",
    contact: "(82) 98765-4324",
    focus: "Comunhão cristã e acompanhamento de novos participantes.",
    address: "Rua da Paz, São Miguel",
    mapUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  },
  {
    name: "Kairós",
    neighborhood: "Centro",
    schedule: "Sábados, 19:30",
    leader: "Liderança local",
    contact: "(82) 98765-4325",
    focus: "Fortalecimento de famílias e vida devocional.",
    address: "Travessa Central, Centro",
    mapUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  },
  {
    name: "Emmanuel",
    neighborhood: "Parque do Futuro",
    schedule: "Sábados, 19:30",
    leader: "Liderança local",
    contact: "(82) 98765-4326",
    focus: "Evangelismo, comunhão e crescimento bíblico.",
    address: "Rua Nova Vida, Parque do Futuro",
    mapUrl: "https://maps.app.goo.gl/QW8paEocsWxE2QXo8",
  },
];

export const galleryHighlights: GalleryItem[] = [
  {
    title: "Celebração no templo",
    category: "Culto",
    image: cultoDomingo,
    description: "Registro do culto congregacional e momentos de adoração no templo.",
    type: "IMAGE",
  },
  {
    title: "Encontro das mulheres",
    category: "Ministério",
    image: mulheresIgreja,
    description: "Momentos de comunhão e edificação em encontros ministeriais.",
    type: "IMAGE",
  },
  {
    title: "Comunhão nas células",
    category: "Célula",
    image: celulaComunhao,
    description: "Pequenos grupos reunidos em oração, cuidado e discipulado.",
    type: "IMAGE",
  },
  {
    title: "Recepção de visitantes",
    category: "Igreja",
    image: boasVindas,
    description: "Acolhimento e integração de quem está chegando à igreja.",
    type: "IMAGE",
  },
];

export const churchProjects: Project[] = [
  {
    title: "Projeto ABASE",
    description:
      "Iniciativa voltada ao cuidado de crianças e adolescentes em situação de vulnerabilidade social.",
    image: projetoAbase,
    impact: "Acompanhamento social e discipulado",
  },
  {
    title: "Quilo do Amor",
    description:
      "Ação solidária para arrecadação e distribuição de alimentos a famílias em necessidade.",
    image: projetoQuilo,
    impact: "Apoio prático à cidade",
  },
];

export const adminModules: AdminModule[] = [
  {
    title: "Avisos e eventos",
    description:
      "Criar, editar e remover avisos com badges como culto, evento, santa ceia e célula.",
  },
  {
    title: "Mídias e galerias",
    description:
      "Publicar fotos e vídeos por categoria, inclusive mídia geral ou vinculada às células.",
  },
  {
    title: "Células e líderes",
    description:
      "Cadastrar células, horários, localização, líder, contato e destaques de cada grupo.",
  },
  {
    title: "Cadastro de membros",
    description:
      "Registrar nome, célula, visitante, batismo, nascimento, contato e endereço.",
  },
  {
    title: "Equipe administrativa",
    description:
      "Controlar quem acessa o painel, com usuários ativos, redefinição de senha e organização do time.",
  },
  {
    title: "Configurações da igreja",
    description:
      "Atualizar nome, contatos, links oficiais e agenda fixa exibida em todas as páginas públicas.",
  },
];

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Primeira Igreja Batista em Teotônio Vilela",
    title: "Uma comunidade para adorar a Cristo e caminhar em família",
    description:
      "Um ambiente digital pensado para acolher visitantes, informar a igreja e comunicar com clareza cada passo da nossa agenda.",
    ctaLabel: "Conheça a igreja",
    ctaHref: "/sobrenos",
    secondaryLabel: "Planejar visita",
    secondaryHref: "/primeira-visita",
    image: cultoDomingo,
  },
  {
    eyebrow: "Culto de celebração",
    title: "Todos os domingos às 18h, a igreja se reúne para adorar",
    description:
      "Louvor congregacional, mensagem bíblica, oração e um ambiente acolhedor para membros, famílias e visitantes.",
    ctaLabel: "Ver localização",
    ctaHref: "/local",
    secondaryLabel: "Falar com a secretaria",
    secondaryHref: "/contato",
    image: mulheresIgreja,
  },
  {
    eyebrow: "Células e avisos",
    title: "Quintas e sábados às 19h30 com atualizações especiais durante o mês",
    description:
      "Os avisos têm papel central porque algumas programações acontecem em dias e horários diferentes. A home já pode destacar esses comunicados no carrossel.",
    ctaLabel: "Ver avisos",
    ctaHref: "/eventos",
    secondaryLabel: "Conhecer células",
    secondaryHref: "/celulas",
    image: celulaComunhao,
  },
];

export const memberFormFields = [
  "Nome completo",
  "Célula",
  "É visitante?",
  "Data de batismo",
  "Data de nascimento",
  "Telefone / WhatsApp",
  "Endereço",
];

export const visitJourney: VisitStep[] = [
  {
    title: "Chegue com tranquilidade",
    description:
      "Horário, endereço e contato aparecem de forma clara para facilitar a primeira chegada ao templo.",
  },
  {
    title: "Seja recebido com clareza",
    description:
      "Uma igreja acolhedora comunica bem o que esperar do culto, da recepção e da vida em comunidade.",
  },
  {
    title: "Encontre seu próximo passo",
    description:
      "Depois da visita, o próximo passo natural é encontrar uma célula, falar com a liderança e permanecer perto.",
  },
];

export const visitFaq: FaqItem[] = [
  {
    question: "Preciso avisar antes de visitar?",
    answer:
      "Não. Você pode chegar diretamente ao culto, mas também pode falar com a secretaria para receber orientação e acolhimento.",
  },
  {
    question: "Como funciona o culto?",
    answer:
      "O culto reúne a igreja em adoração, oração, leitura bíblica, pregação da Palavra e comunhão.",
  },
  {
    question: "Há programação para crianças?",
    answer:
      "A comunicação dessa informação pode aparecer com clareza nos avisos e nas páginas institucionais da igreja.",
  },
  {
    question: "Como encontro uma célula?",
    answer:
      "A página de células mostra grupos, horários e formas de contato para facilitar a integração durante a semana.",
  },
];

export const sampleMembers: MemberSnapshot[] = [
  {
    fullName: "João da Silva",
    cellName: "Célula Huiós",
    phone: "(82) 98888-1001",
    isVisitor: false,
  },
  {
    fullName: "Maria de Souza",
    cellName: "Unidos Pela Fé",
    phone: "(82) 98888-1002",
    isVisitor: false,
  },
  {
    fullName: "Ana Vitória",
    cellName: "Sem célula vinculada",
    phone: "(82) 98888-1003",
    isVisitor: true,
  },
];
