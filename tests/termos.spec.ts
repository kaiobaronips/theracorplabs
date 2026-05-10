import { test, expect } from '@playwright/test';

test.describe('Página de Termos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/termos');
  });

  test('deve exibir o título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Termos e Condições \| MEDVi/i);
  });

  test('deve ter fundo branco na página', async ({ page }) => {
    expect(await page.locator('section').first().getAttribute('class')).toContain('bg-white');
  });

  test('deve usar a fonte Red Hat Text', async ({ page }) => {
    expect(await page.locator('section').first().getAttribute('class')).toContain('font-red-hat');
  });

  test('deve exibir seções dos termos', async ({ page }) => {
    await expect(page.locator('text=I. Introdução')).toBeVisible();
    await expect(page.locator('text=II. Modificação dos Termos')).toBeVisible();
    await expect(page.locator('text=III. Descrição do MEDVi')).toBeVisible();
    await expect(page.locator('text=IV. Elegibilidade')).toBeVisible();
    await expect(page.locator('text=V. Disponibilidade')).toBeVisible();
    await expect(page.locator('text=VI. Cadastro, Contas de Usuário e Dados do Usuário')).toBeVisible();
    await expect(page.locator('text=VII. Suas Responsabilidades e Reconhecimento')).toBeVisible();
    await expect(page.locator('text=VIII. Restrições de Uso')).toBeVisible();
    await expect(page.locator('text=IX. Licenciamento')).toBeVisible();
    await expect(page.locator('text=X. Isenção de Responsabilidade dos Serviços de Saúde Limitados')).toBeVisible();
    await expect(page.locator('text=XI. Consentimento de Telemedicina')).toBeVisible();
    await expect(page.locator('text=XII. Pagamento')).toBeVisible();
    await expect(page.locator('text=XIII. Privacidade')).toBeVisible();
    await expect(page.locator('text=XIV. Propriedade Intelectual')).toBeVisible();
    await expect(page.locator('text=XV. Links e Sites de Terceiros')).toBeVisible();
    await expect(page.locator('text=XVI. Isenção de Garantias')).toBeVisible();
    await expect(page.locator('text=XVII. Limitação de Responsabilidade')).toBeVisible();
    await expect(page.locator('text=XVIII. Indenização')).toBeVisible();
    await expect(page.locator('text=XIX. Modificações à Plataforma')).toBeVisible();
    await expect(page.locator('text=XX. Suspensão e Rescisão de Direitos')).toBeVisible();
    await expect(page.locator('text=XXI. Lei Aplicável; Resolução de Disputas; Arbitragem')).toBeVisible();
    await expect(page.locator('text=XXII. Violação de Direitos Autorais')).toBeVisible();
    await expect(page.locator('text=XXIII. Diversos')).toBeVisible();
    await expect(page.locator('text=XXIV. Informações de Contato')).toBeVisible();
  });

  test('deve exibir o preâmbulo corretamente', async ({ page }) => {
    await expect(page.locator('text=Última atualização: 10 de maio de 2026')).toBeVisible();
    await expect(page.locator('text=O MEDVi é destinado a condições e preocupações médicas não emergenciais específicas.')).toBeVisible();
  });

  test('header deve ter apenas a logo centralizada', async ({ page }) => {
    await expect(page.locator('header').locator('nav')).toHaveCount(0);
    await expect(page.locator('header').locator('img[alt="Logo Theracorp"]')).toBeVisible();
  });
});
