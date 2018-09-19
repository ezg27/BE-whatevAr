'use strict';
const { getYelp } = require('../api');
jest.mock('../api')

describe('getYelp', () => {
  const obj = {
    lat: 53.4863,
    long: -2.2397
  }
  test('returns data object', () => {
    expect.assertions(1);
    return getYelp(obj)
      .then(data => {
        expect(typeof data).toBe('object');
      });
  });
  test('returns objects with coordinates key', () => {
  expect.assertions(1);
    return getYelp(obj).then(data => {
      expect(data['1']).toHaveProperty('coordinates');
    });
  })
});
