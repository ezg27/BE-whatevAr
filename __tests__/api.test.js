'use strict';
const { getYelp, getBusinessData } = require('../api');
jest.mock('../api');

describe('getYelp', () => {
  const obj = {
    lat: 53.4863,
    long: -2.2397
  };
  test('returns data object', () => {
    expect.assertions(1);
    return getYelp(obj).then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('returns objects with coordinates key', () => {
    expect.assertions(1);
    return getYelp(obj).then(data => {
      expect(data['1']).toHaveProperty('coordinates');
    });
  });
});

describe('getBusinessData', () => {
  const obj = {
    id: '',
    name: ''
  };
  test('returns an object', () => {
    expect.assertions(1);
    return getBusinessData(obj).then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('returns an object with property foodRating', () => {
    expect.assertions(1);
    return getBusinessData(obj).then(data => {
      expect(data).toHaveProperty('foodRating');
    });
  });
  test('returns array with key hours', () => {
    expect.assertions(2);
    return getBusinessData(obj).then(data => {
      expect(Array.isArray(data.hours)).toBe(true);
      expect(data.hours).toHaveLength(7);
    });
  });
});
