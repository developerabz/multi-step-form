// @ts-check
import { test, expect } from '@playwright/test';
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

  test('check arcade is default selected', async ({ page }) => {

    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();

    // Check arcade is chosen
    const arcade = page.getByRole('heading', { name: 'Arcade' })
      .locator('..')
      .locator('..');

    await expect(arcade).toHaveClass(/card-active/);

  });

  test('check plan changes to advanced', async ({ page }) => {
    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();

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
    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();

    // Check arcade is chosen
    const arcade = page.getByRole('heading', { name: 'Arcade' })
      .locator('..')
      .locator('..');

    const pro = page.getByRole('heading', { name: 'Advanced' })
      .locator('..')
      .locator('..');

    await expect(arcade).toHaveClass(/card-active/);

    await expect(pro).not.toHaveClass(/card-active/);

    await pro.click();

    await expect(arcade).not.toHaveClass(/card-active/);

    await expect(pro).toHaveClass(/card-active/);
  })

  // TODO: Add tests for the monthly to yearly switch and also checking text 
  // when each card switches to yearly check that 2 months free text is added



});
