// @ts-check
import { test, expect } from '@playwright/test';
import assert from 'assert';
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

  test('transition to step 3 works', async ({ page }) => {

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible();
  })


});

test.describe('step 3 tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible();

  })

  test('input gets checked and add-on styles correctly', async ({ page }) => {
    let addOns = page.locator('.add-on');
    let addOnsLength = await addOns.count();

    for (let i = 0; i < addOnsLength; i++) {
      const addOn = addOns.nth(i);
      const input = addOn.locator(':scope > input');
      await expect(addOn).not.toHaveClass(/card-active/);
      await expect(input).not.toBeChecked();

      await addOn.click();


      await expect(addOn).toHaveClass(/card-active/);
      await expect(input).toBeChecked();


    }

  });

  test('transition to step 4 works', async ({ page }) => {
    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible();


  })


});


test.describe.only('step 4 tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByLabel('Name').fill("Stephen King")

    await page.getByLabel('Email Address').fill('Stephen@King.com')

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();
  });

  test('arcade plan calculation', async ({ page }) => {
    const arcade = page.getByRole('heading', { name: 'Arcade' })
      .locator('..')
      .locator(':scope >> p');

    const arcadeText = await arcade.textContent();

    assert(arcadeText !== null);

    const arcadeAmount = Number(arcadeText.replace(/\D/g, ''));

    expect(arcadeAmount).toStrictEqual(9);

    // navigate to step 3

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible();

    const onlineService = page.getByRole('heading', { name: 'Online service' })
      .locator('..')
      .locator('..')
      .locator(':scope > p');

    const oSText = await onlineService.textContent();

    assert(oSText !== null);

    const oS = Number(oSText.replace(/\D/g, ''));

    expect(oS).toStrictEqual(1);

    const largerStorage = page.getByRole('heading', { name: 'Larger storage' })
      .locator('..')
      .locator('..')
      .locator(':scope > p');

    const lSText = await largerStorage.textContent();

    assert(lSText !== null);

    const lS = Number(lSText.replace(/\D/g, ''));

    expect(lS).toStrictEqual(2);


    const customizableProfile = page.getByRole('heading', { name: 'Customizable profile' })
      .locator('..')
      .locator('..')
      .locator(':scope > p');

    const cPText = await customizableProfile.textContent();

    assert(cPText !== null);

    const cP = Number(cPText.replace(/\D/g, ''));

    expect(cP).toStrictEqual(2);

    // navigate to step 4

    await page.getByRole('button', { name: 'Next Step' }).click();

    await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible();


    // No add ons selected

    let totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    let totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);

    let total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount);

    // one add on selected 


    await page.getByRole('button', { name: 'Go Back' }).click();
    await onlineService.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);
    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + oS);

    await page.getByRole('button', { name: 'Go Back' }).click();
    await onlineService.click();
    await largerStorage.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);

    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + lS);
    await page.getByRole('button', { name: 'Go Back' }).click();
    await largerStorage.click();
    await customizableProfile.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);
    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + cP);

    // two add ons selected

    await page.getByRole('button', { name: 'Go Back' }).click();
    await largerStorage.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);
    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + cP + lS);


    await page.getByRole('button', { name: 'Go Back' }).click();
    await largerStorage.click();
    await onlineService.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);
    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + cP + oS);

    await page.getByRole('button', { name: 'Go Back' }).click();
    await largerStorage.click();
    await customizableProfile.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);
    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + oS + lS);

    // all three add ons selected 
    await page.getByRole('button', { name: 'Go Back' }).click();
    await customizableProfile.click();
    await page.getByRole('button', { name: 'Next Step' }).click();
    totalSummary = page.locator('.total-summary')
      .locator(':scope > p')
    totalText = await totalSummary.nth(1).textContent();
    assert(totalText !== null);
    total = Number(totalText.replace(/\D/g, ''));
    expect(total).toStrictEqual(arcadeAmount + oS + cP + lS);






  })

});
// TODO: write the following step 4 tests:
// - Test pro plan selection with all combinations of add ons 
// - Test advanced plan selection with all combinations of add ons 
// - test all three again but with yearly not monthly 
// - test change plan button by selecting different plans and seeing changes 
