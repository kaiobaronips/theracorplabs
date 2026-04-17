# Theracorp Inc. — Contexto Interno para Agentes

## Fontes oficiais (ordem de prioridade)
1. `/Users/kaiobp/Documents/theracorp-project/Theracorp_Briefing_Site.pdf`
2. `/Users/kaiobp/Documents/theracorp-project/site/Brand Identity Style Guide.html`
3. Regras base do projeto já definidas nos prompts dos agentes

> Todo agente deve tratar os arquivos acima como fonte de verdade. Em caso de conflito, priorizar briefing + style guide.

## Identidade do projeto
- Nome: **Theracorp Inc.**
- Tipo: **healthtech clínica premium**
- Papel do site: **Superfície 01 de 03** (site público)
- Função principal: converter visitante em paciente agendado
- Função estratégica: criar o primeiro momento de confiança clínica
- Princípio central: **precisão antes de impacto**

## Objetivos de negócio e KPIs
- Conversão landing → consulta: **> 8%** (crítico)
- Bounce da home: **< 45%** (crítico)
- Pacientes elegíveis: **> 70%** (alto)
- Tempo médio na página: **> 3 min** (alto)
- Opt-in: **> 15%** (médio)
- SEO competitivo (benchmark VOY Saúde): **médio**

## Persona primária
- Persona: **“Maria”**, 32–48, classe B, urbana, Brasil
- Origem de tráfego: Google/Instagram
- Estado emocional na chegada: curiosidade + vergonha + ceticismo
- Dor: frustração com tentativas anteriores
- Medos: julgamento, promessa vazia, desperdício de tempo
- Barreiras: vergonha + logística de deslocamento

## Mapa de rotas (escopo)
- `/`
- `/como-funciona`
- `/planos`
- `/emagrecimento`
- `/exames`
- `/app`
- `/sobre`
- `/blog`
- `/login`
- `/cadastro`

## Header — padrão definitivo (não negociável)

O header do site Theracorp **não possui navegação**. Contém **apenas a logo Theracorp**, centralizada ou alinhada à esquerda conforme layout vigente.

**Proibido:**
- Adicionar links de navegação (`navLinks`, `<nav>`, `<ul>` de rotas) ao header
- Adicionar botões de CTA, login ou menu hamburger ao header
- Restaurar o modelo antigo (`SiteHeader` com `navLinks`) em qualquer circunstância

**Padrão de implementação obrigatório:**
```tsx
<header className="sticky top-0 z-50 border-b border-tc-gray-100 bg-white/90 backdrop-blur">
  <div className="mx-auto flex min-h-20 w-full max-w-[1200px] items-center px-4 py-3 md:px-8">
    <Link href="/" aria-label="Theracorp, página inicial">
      <Image src="/logo-theracorp.png" alt="Logo Theracorp" width={120} height={44} className="h-11 w-auto" priority />
    </Link>
  </div>
</header>
```

Qualquer agente que receber instrução de "adicionar navegação ao header" deve recusar e apontar esta diretriz.

## Diretrizes de branding e UI (não negociáveis)
- Orb gradient **apenas** no Orb e acentos circulares
- CTA primário: **teal #00D4AA**
- Máximo de **1 CTA de alta ênfase por viewport**
- Ícones lineares com stroke **1.5px**
- Cards com raio **12–16px**
- Inputs com borda **1.5px** e focus teal
- Muito espaço negativo
- Evitar estética fitness/beauty/stock genérico
- Evitar copy agressiva/promocional
- Não misturar estilos de ícones outline/filled na mesma tela

## Tokens e padrões de componente (resumo técnico)
- Sistema de espaçamento baseado em múltiplos de 8
- Grid:
  - Desktop: 12 colunas, gutter 24px, max-width 1200px
  - Tablet: 8 colunas, gutter 16px
  - Mobile: 4 colunas, gutter 16px
- Botão primário:
  - bg `#00D4AA`, hover `#00A88A`, raio 12px
- Card:
  - borda 1px `#E8EAED`, raio 16px, sombra leve
- Input:
  - borda 1.5px `#E8EAED`, focus 1.5px `#00D4AA`, altura 48px

## Tom de voz e copy clínica
- Clínico sem ser frio
- Empático sem apelo emocional manipulativo
- Confiante sem prometer resultado
- Direto sem urgência artificial
- Premium por clareza, não por adjetivação exagerada

### Regras explícitas de copy
- Correto: “tratamento baseado em evidências”
- Proibido: “perca X kg em Y meses” / “resultados garantidos” / “remédio milagroso”
- Toda menção a tratamento, consulta, prescrição, GLP-1 ou resultado clínico exige disclaimer visível

### Disclaimer padrão obrigatório
"Os resultados variam conforme adesão ao tratamento, contexto clínico e fatores individuais. O tratamento só pode ser iniciado após avaliação clínica individual realizada por médico credenciado via telemedicina regulamentada pela Resolução CFM 2.314/2022."

Aplicar este disclaimer:
- abaixo de CTAs de conversão
- no footer de todas as páginas
- em toda seção com GLP-1/emagrecimento

## Stack e implementação
- Next.js 14 (App Router), React, TypeScript
- Tailwind CSS com design tokens Theracorp
- Framer Motion (animações sutis; máx 300ms)
- Sem adicionar bibliotecas sem justificativa
- Não alterar arquivos fora do escopo solicitado
- Responsividade obrigatória
- Acessibilidade obrigatória
- TypeScript sem erros

## Performance, SEO e compliance
- Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- Lighthouse alvo:
  - Performance > 90
  - Acessibilidade > 95
  - SEO > 95
  - Best Practices > 90
- SEO técnico:
  - metadata por rota
  - Open Graph por rota
  - sitemap.xml
  - schema `MedicalOrganization`
- LGPD:
  - banner de cookies com recusa
  - sem tracking antes de consentimento

## Integrações de produto (site → ecossistema)
- CTA “Começar”: leva para `/cadastro` e dispara fluxo no Make/n8n
- Busca de exames: API (ou lista inicial estática)
- Login: redireciona para portal do paciente (Superfície 02)
- Blog: via CMS, com revisão clínica antes de publicar
- Formulário contato: webhook (Make/n8n), notificação operacional
- Pixels:
  - `CompleteRegistration` ao concluir onboarding
  - `Lead` ao agendar consulta

## Roadmap de entrega
- Fase 1 (MVP): Home, `/como-funciona`, `/planos`, `/cadastro`, `/login`, nav/footer
- Fase 2 (Conversão): `/emagrecimento`, `/exames`, `/sobre`, FAQ
- Fase 3 (Crescimento): blog + CMS, `/app`, SEO avançado, pixels
- Fase 4 (Otimização): A/B de CTA, heatmaps, otimização CWV, personalização por URL

## Checklist de alinhamento para qualquer agente
Antes de entregar, validar:
1. Está fiel ao briefing e ao Brand Identity Style Guide?
2. Há apenas 1 CTA de alta ênfase por viewport?
3. Copy clínica está precisa e sem promessa indevida?
4. Disclaimer clínico foi aplicado onde obrigatório?
5. Acessibilidade e responsividade foram cobridas?
6. Não houve adição de biblioteca sem justificativa?
7. TypeScript está sem erros?
