# Execução Ativa — Theracorp

Status: iniciado em 2026-04-16
Responsável de orquestração: `01-orquestrador`

## Backlog priorizado

### P0 (crítico)
1. Saneamento da superfície pública (`index.html`) para remover dependências/branding de terceiros e riscos de compliance.
Dono: `03-frontend-engineer` + `08-ui-ux-designer`
Critério de aceite:
- Sem referências externas de outra marca (`forhims`, integrações de terceiros indevidas).
- Copy clínica sem promessa de resultado.
- Disclaimer clínico obrigatório em bloco crítico e no footer.

2. Base técnica de SEO e semântica na home.
Dono: `06-performance-seo-tecnico`
Critério de aceite:
- `title`, `description`, canonical, Open Graph e Twitter Card presentes.
- Schema `MedicalOrganization` presente.

3. Validação mínima de acessibilidade visual e foco.
Dono: `05-qa-acessibilidade`
Critério de aceite:
- Landmark semântico (`header/main/footer`).
- `skip-link`, `focus-visible`, contraste legível e navegação por teclado funcional.

### P1 (alto)
1. Migração para arquitetura Next.js 14 App Router.
Dono: `02-arquiteto-nextjs` + `03-frontend-engineer`
Critério de aceite:
- Estrutura de rotas definida para `/`, `/como-funciona`, `/planos`, `/emagrecimento`, `/exames`, `/app`, `/sobre`, `/blog`, `/login`, `/cadastro`.

2. Sistema base de componentes e tokens compartilhados.
Dono: `04-tailwind-design-system-engineer`
Critério de aceite:
- Tokens de cor/raio/espaçamento consolidados.
- Componentes base: botão, card, input e seção com estados documentados.

3. Pipeline CI/CD com gate de qualidade.
Dono: `07-devops-deploy-web`
Critério de aceite:
- Pipeline com lint, typecheck, build e testes.
- Bloqueio para regressão de acessibilidade e compliance.

### P2 (médio)
1. Conteúdo avançado por rota + blog com governança clínica.
Dono: `08-ui-ux-designer` + `06-performance-seo-tecnico`

2. Otimização contínua de conversão e CWV.
Dono: `01-orquestrador` + `06-performance-seo-tecnico`

## Plano de execução por etapas
1. Etapa A: estabilizar home segura e alinhada ao branding.
2. Etapa B: estruturar arquitetura Next.js + design system.
3. Etapa C: expandir rotas e integrações de produto.
4. Etapa D: performance, SEO avançado e observabilidade de conversão.

## Entregas já iniciadas nesta sessão
- `index.html` substituído por versão Theracorp limpa (P0).
- Metadados SEO base e schema aplicados (P0).
- Disclaimer clínico obrigatório aplicado em contexto crítico + footer (P0).
- Scaffold Next.js 14 App Router + TypeScript + Tailwind criado no mesmo diretório (P1 iniciado).
- Rotas base implementadas: `/`, `/como-funciona`, `/planos`, `/emagrecimento`, `/exames`, `/app`, `/sobre`, `/blog`, `/login`, `/cadastro`.
- Componentes globais implementados: header, footer, hero, disclaimer e cards.
- SEO técnico de infraestrutura implementado com `app/robots.ts` e `app/sitemap.ts`.
- Dependências instaladas com sucesso (`npm install`).
- Validação concluída:
  - `npm run typecheck` ✅
  - `npm run build` ✅
- Design system consolidado (2026-04-16):
  - `tailwind.config.ts` expandido: tokens de tipografia, espaçamento, sombra, raio e transição.
  - `globals.css` refatorado com `@layer components`: `tc-btn-secondary`, `tc-btn-ghost`, `tc-badge`, `tc-badge-teal`, `tc-section-label`, `tc-section-title`, `tc-section-desc`, `tc-divider`, `tc-card-hover`. Estados hover/focus nos inputs melhorados.
  - `components/ui/button.tsx` criado: componente tipado para `primary | secondary | ghost`, funciona como `<button>` ou `<Link>`.
  - `components/ui/badge.tsx` criado: variantes `default` e `teal`.
  - `<img>` substituído por `next/image` em `site-header.tsx`.
- Pipeline CI/CD criado (2026-04-16):
  - `.github/workflows/quality.yml`: lint + typecheck + build em Node 22, ativado em push/PR para main e develop.
- Validação:
  - `npm run lint` ✅
  - `npm run typecheck` ✅
  - `npm run build` ✅ (15 rotas estáticas, sem warnings)

## Checklist final antes de produção
1. Há no máximo 1 CTA de alta ênfase por viewport?
2. Disclaimer obrigatório está em todos os blocos clínicos sensíveis?
3. A copy evita promessa de resultado e linguagem promocional agressiva?
4. Semântica, foco e navegação por teclado estão corretos?
5. Não há chaves/integrações externas indevidas no HTML final?
6. Branding respeita paleta, orb e contenção visual?
