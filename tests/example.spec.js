// @ts-check
import { test, expect } from '@playwright/test';
import { sum } from '../backend/functions/sum.js';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('sum two numbers', () => {

  expect(sum(1, 2)).toStrictEqual(3)
})

test('go to next step', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the get started link.
  await page.getByRole('button', { name: 'Next Step' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Personal info' })).toBeVisible();
});
