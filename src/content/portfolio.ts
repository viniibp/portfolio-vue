export type SocialLinks = {
  linkedin: string
  github: string
}

export type TimelineItem = {
  title: string
  org: string
  start: string
  end: string
  kind: 'work' | 'education'
  description: string
}

export type ProjectItem = {
  name: string
  summary: string
  stack: string[]
  link?: string
  highlights?: string[]
  images?: string[]
  presentation?: 'mobile' | 'web' | 'backend'
  tags?: string[]
}

type HeroContent = {
  name: string
  role: string
  intro: string
  location: string
  availability: string
}

type AboutContent = {
  title: string
  paragraphs: string[]
}

type ContactContent = {
  email: string
  whatsappLabel?: string
  whatsappUrl?: string
  note: string
}

export type PortfolioData = {
  hero: HeroContent
  about: AboutContent
  skills: string[]
  timeline: TimelineItem[]
  projects: ProjectItem[]
  social: SocialLinks
  contact: ContactContent
}

export const portfolioData: PortfolioData = {
  hero: {
    name: 'Vinicius Batista Pereira',
    role: 'Desenvolvedor Full Stack',
    intro:
      'Atuo com React, Next.js, Node.js, C#/.NET e Flutter, construindo produtos robustos com foco em performance, escalabilidade e qualidade de entrega.',
    location: 'Brasil',
    availability: 'Disponível para novos desafios',
  },
  about: {
    title: 'Sobre',
    paragraphs: [
      'Sou desenvolvedor Full Stack com experiência em web, mobile e backend, trabalhando desde sustentação e refatorações até produtos novos em produção.',
      'Tenho foco em integrações de APIs, arquitetura escalável, boas práticas de código e atuação em times ágeis (Scrum e Kanban).',
    ],
  },
  skills: [
    'Next.js',
    'React',
    'React Native',
    'Node.js',
    'C# / .NET',
    'Flutter',
    'Python',
    'PostgreSQL',
    'Prisma',
    'TypeScript',
    'AWS S3 + CloudFront',
    'Ant Design',
  ],
  timeline: [
    {
      title: 'Analista Desenvolvedor Pleno',
      org: 'Qintess (Remoto)',
      start: 'Nov 2025',
      end: 'Atual',
      kind: 'work',
      description:
        'Desenvolvimento em C#/.NET, criação de biblioteca de agenda em React e customização de componentes Ant Design, com foco em qualidade, acessibilidade e escalabilidade.',
    },
    {
      title: 'Freelancer Full Stack',
      org: 'Freelancer',
      start: 'Jan 2024',
      end: 'Ago 2025',
      kind: 'work',
      description:
        'Entrega de painéis administrativos em Vue/React, backend com Fastify + Prisma + Postgres, autenticação JWT e integrações com chatbot (Typebot, EvolutionAPI, Node.js e C#).',
    },
    {
      title: 'Analista de Software Jr',
      org: 'Atman Systems (Vitória)',
      start: 'Abr 2022',
      end: 'Ago 2023',
      kind: 'work',
      description:
        'Desenvolvimento mobile em React Native (Expo), incluindo notificações, rastreamento, recursos offline, mapas com Mapbox e animações interativas.',
    },
    {
      title: 'Desenvolvedor Junior',
      org: 'Canção Nova (Cachoeira Paulista)',
      start: 'Abr 2021',
      end: 'Abr 2022',
      kind: 'work',
      description:
        'Manutenção de mais de 80 sites WordPress, refatorações para React Native/Next.js e desenvolvimento de sistemas internos com Nest.js e C# ASP.NET Core.',
    },
    {
      title: 'Estágio Desenvolvedor',
      org: 'Canção Nova (Cachoeira Paulista)',
      start: 'Abr 2020',
      end: 'Abr 2021',
      kind: 'work',
      description:
        'Sustentação de sites WordPress, criação de plugins e protótipo de sistema interno em C# com WPF para gestão e engajamento de colaboradores.',
    },
    {
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      org: 'Fatec Cruzeiro - Prof. Waldomiro May',
      start: 'Jan 2018',
      end: 'Jun 2021',
      kind: 'education',
      description:
        'TCC com protótipo em .NET (WPF) voltado para motivação de colaboradores por meio de sistema de ranking.',
    },
    {
      title: 'Técnico de Informática',
      org: "Etec Prof. José Sant'Ana de Castro",
      start: '2015',
      end: '2017',
      kind: 'education',
      description:
        'Formação técnica com base em desenvolvimento de software, redes e fundamentos de tecnologia.',
    },
  ],
  projects: [
    {
      name: 'Pipoca do João - Pedidos Online',
      summary:
        'Página de pedidos de pipoca artesanal com personalização de itens, carrinho e envio direto para o WhatsApp.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      tags: ['Web', 'React'],
      highlights: [
        'Status de loja aberta/fechada em tempo real (terça a sábado, 16h-20h).',
        'Carrinho com múltiplos itens personalizados e cálculo automático do total.',
        'Mensagem de pedido formatada para envio direto no WhatsApp.',
      ],
      images: ['/assets/pipoca-1.png', '/assets/pipoca-2.png'],
      presentation: 'web',
      link: 'https://pipoca-do-joao.vercel.app/',
    },
    {
      name: 'Ice Crown - Sistema de Gestão Financeira Mobile',
      summary:
        'Aplicativo mobile para controle financeiro com dashboard personalizável, vendas, relatórios e geolocalização.',
      stack: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'FL Chart', 'Google Maps'],
      tags: ['Mobile', 'Flutter'],
      highlights: [
        'Arquitetura com Riverpod + Firebase para dados em tempo real.',
        'Fluxos de vendas e relatórios analíticos com experiência mobile completa.',
        'Interface Material Design 3 com múltiplas telas funcionais.',
      ],
      images: ['/assets/ice-1.png', '/assets/ice-2.png', '/assets/ice-3.png', '/assets/ice-4.png', '/assets/ice-5.png'],
      presentation: 'mobile',
    },
    {
      name: 'Pepoca Manager - Gestão Mobile',
      summary:
        'Aplicativo Flutter para gestão de vendas de pipoca artesanal, com fluxo rápido de pedidos, clientes e acompanhamento financeiro.',
      stack: ['Flutter', 'Dart', 'Provider', 'Go Router', 'Firebase', 'Cloud Firestore'],
      tags: ['Mobile', 'Flutter', 'Firestore'],
      highlights: [
        'Onboarding com saldo inicial e dashboard com métricas do dia/mês, transações e filtros operacionais.',
        'Fluxo completo de venda: personalização de pedidos, carrinho, taxa de entrega e pagamento (pix, dinheiro e cartão).',
        'Persistência em nuvem com Cloud Firestore para vendas, clientes e despesas, com histórico financeiro detalhado.',
      ],
      images: ['/assets/pepoca-1.png', '/assets/pepoca-2.png', '/assets/pepoca-3.png'],
      presentation: 'mobile',
    },
    {
      name: 'API de Gerenciamento de Hábitos Saudáveis',
      summary:
        'Backend para cadastro de hábitos, check-ins diários, relatórios de progresso e autenticação JWT.',
      stack: ['Node.js', 'TypeScript', 'JWT', 'REST API'],
      tags: ['Backend', 'Node.js'],
      highlights: [
        'CRUD completo de hábitos com filtros por data e tipo.',
        'Check-ins diários para acompanhamento de consistência.',
        'Relatórios de progresso semanal e mensal.',
      ],
      presentation: 'backend',
    },
    {
      name: 'Protótipo de Semáforo Noturno Inteligente com Raspberry',
      summary:
        'Protótipo acadêmico para ajuste de sinais no período noturno com base em sensores, reduzindo espera no tráfego.',
      stack: ['Python 3.8', 'Raspberry Pi', 'Sensores'],
      tags: ['Hardware', 'Python'],
      presentation: 'backend',
    },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/vinicius-batista-dev/',
    github: 'https://github.com/viniibp',
  },
  contact: {
    email: 'viniibp.dev@gmail.com',
    whatsappLabel: '(51) 99104-6060',
    whatsappUrl: 'https://wa.me/5551991046060',
    note: 'Aberto a oportunidades, freelas e projetos colaborativos.',
  },
}



