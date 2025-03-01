// @ts-check
import { test, expect } from '@playwright/test';
import { sum } from '../backend/functions/sum.js';


test('sum two numbers', () => {

  expect(sum(1, 2)).toStrictEqual(3)
})


