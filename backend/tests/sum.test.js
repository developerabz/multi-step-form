import { sum } from '../functions/sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toStrictEqual(3)
})
