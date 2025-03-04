// @ts-check
import { test, expect } from '@playwright/test';
import exp from 'constants';
import { link } from 'fs';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000")
})


test.describe('step 1 tests', () => {


  test('go to next step without input', async ({ page }) => {

    // Click the get started link.
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Expects page to have a heading with the name of Personal Info.
    await expect(page.getByRole('heading', { name: 'Personal info' })).toBeVisible();
  });

  test('go to next page with invalid email', async ({ page }) => {

    await page.getByLabel('Name').fill("Stephen King")


    // email with no @
    await page.getByLabel('Email Address').fill('Stephen')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Personal info' })).toBeVisible();

    let inputEmail = page.locator(`input[name="email"]`);
    let message = await inputEmail.evaluate(el => el.validationMessage);

    expect(message).not.toBe('');

    // email with @ but no char after it 
    await page.getByLabel('Email Address').fill('Stephen@')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Personal info' })).toBeVisible();

    inputEmail = page.locator(`input[name="email"]`);
    message = await inputEmail.evaluate(el => el.validationMessage);

    expect(message).not.toBe('');

    // email with @ but with spaces after it
    await page.getByLabel('Email Address').fill('Stephen@      ')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Personal info' })).toBeVisible();

    inputEmail = page.locator(`input[name="email"]`);
    message = await inputEmail.evaluate(el => el.validationMessage);

    expect(message).not.toBe('');

  });

  test('go to next page with valid email', async ({ page }) => {

    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();

    let inputEmail = page.locator(`input[name="email"]`);
    let message = await inputEmail.evaluate(el => el.validationMessage);


    expect(message).toBe('');


  });


});



test.describe('step 2 tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();
  })

  test('check arcade is default selected', async ({ page }) => {

    // Check arcade is chosen
    const arcade = page.getByRole('heading', { name: 'Arcade' })
      .locator('..')
      .locator('..');

    await expect(arcade).toHaveClass(/card-active/);

  });

  test('check plan changes to advanced', async ({ page }) => {
    // Check arcade is chosen
    const arcade = page.getByRole('heading', { name: 'Arcade' })
      .locator('..')
      .locator('..');

    const advanced = page.getByRole('heading', { name: 'Advanced' })
      .locator('..')
      .locator('..');

    await expect(arcade).toHaveClass(/card-active/);

    await expect(advanced).not.toHaveClass(/card-active/);

    await advanced.click();

    await expect(arcade).not.toHaveClass(/card-active/);

    await expect(advanced).toHaveClass(/card-active/);
  })

  test('check plan changes to pro', async ({ page }) => {
    // Check arcade is chosen
    const arcade = page.getByRole('heading', { name: 'Arcade' })
      .locator('..')
      .locator('..');

    const pro = page.getByRole('heading', { name: 'Pro' })
      .locator('..')
      .locator('..');

    await expect(arcade).toHaveClass(/card-active/);

    await expect(pro).not.toHaveClass(/card-active/);

    await pro.click();

    await expect(arcade).not.toHaveClass(/card-active/);

    await expect(pro).toHaveClass(/card-active/);
  })


  test('check monthly to yearly switch works', async ({ page }) => {
    const switchButton = page.locator('.time-period')
      .locator(':scope > span')
      .locator(':scope > span');

    await expect(switchButton).not.toHaveClass('yearly-switch');

    await switchButton.click();

    await expect(switchButton).toHaveClass('yearly-switch');


  })

  test('check 2 months free text rendering when yearly switch', async ({ page }) => {
    // Check arcade is chosen
    let cards = page.locator('.card');
    let cardsLength = await cards.count();

    const switchButton = page.locator('.time-period')
      .locator(':scope > span')
      .locator(':scope > span');

    for (let i = 0; i < cardsLength; i++) {

      const pElements = await cards.nth(i).locator('p').count();
      expect(pElements).toBe(1)
    }

    cards = page.locator('.card');
    cardsLength = await cards.count();

    await switchButton.click();

    for (let i = 0; i < cardsLength; i++) {

      const pElements = await cards.nth(i).locator('p').count();
      expect(pElements).toBe(2)
    }


  })


});

