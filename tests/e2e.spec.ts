// Teste end-to-end básico com Playwright
import { test, expect } from '@playwright/test'

test('regista e faz login', async ({ page }) => {
  const email = `user${Date.now()}@test.com`
  const password = 'palavrapasse'

  await page.goto('/registar')
  await page.fill('input[name="name"]', 'Teste')
  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
  await page.click('input[type="checkbox"]')
  await page.click('button:has-text("Registar")')

  await page.waitForURL(/entrar/)
  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
  await page.click('button:has-text("Entrar")')
  await page.waitForURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Olá')
})
