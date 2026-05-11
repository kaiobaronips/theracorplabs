import { test, expect } from '@playwright/test';

test.describe('Página de Privacidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacidade');
  });

  test('deve exibir o título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Privacidade/i);
  });

  test('deve ter fundo branco na página', async ({ page }) => {
    const section = page.locator('section').first();
    const bgClass = await section.getAttribute('class');
    expect(bgClass).toContain('bg-white');
  });

  test('deve usar a fonte Red Hat Text', async ({ page }) => {
    const section = page.locator('section').first();
    const fontClass = await section.getAttribute('class');
    expect(fontClass).toContain('font-red-hat');
  });

  test('deve exibir seções da política', async ({ page }) => {
    await expect(page.locator('text=1. Introdução')).toBeVisible();
    await expect(page.locator('text=2. Dados que Coletamos')).toBeVisible();
    await expect(page.locator('text=3. Como Usamos seus Dados')).toBeVisible();
  });

  test('deve exibir informações de contato do DPO', async ({ page }) => {
    await expect(page.locator('text=privacidade@theracorp.org').first()).toBeVisible();
    await expect(page.locator('text=Encarregado de Dados')).toBeVisible();
  });
});
