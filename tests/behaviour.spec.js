// @ts-check
import { test, expect } from '@playwright/test';
import { link } from 'fs';

test.describe('step 1 tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
  })

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


//TODO: step2 tests: make a test that checks clicking on different plans background color
// Also check that after switching from monthly to yearly the yearly text correctly shows yearly amounts 
//
