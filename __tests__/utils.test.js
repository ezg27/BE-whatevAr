'use strict';
const { conversion, latLongToMerc, transformPointToAR, formatHours } = require('../utils');
const { testHours, hoursWoLastDay, hoursWoMidDay} = require('../testData');

describe('latLongToMerc', () => {
  test('returns an object', () => {
    const funcCall = latLongToMerc();
    expect(typeof funcCall).toBe('object');
    expect(funcCall).not.toBeNull();
  });
  test('converts latitude and longitude coordinates to relative metre values', () => {
    expect(latLongToMerc(53.4863, -2.2397)).toEqual({
      x: -249322.2635296948,
      y: 7073461.772024932
    });
  });
});

describe('transformPointToAR', () => {
  const funcCall = transformPointToAR();
  test('returns an array', () => {
    expect(Array.isArray(funcCall)).toBe(true);
  });
  test('returns an array of length 3', () => {
    expect(funcCall).toHaveLength(3);
  });
  test('returns an array of falsy values when parameters not passed', () => {
    expect(funcCall).toEqual([NaN, 0, NaN]);
  });
  test('returns an array of integers', () => {
    expect(
      transformPointToAR(53.4863, -2.2397, 53.4856191836238, -2.24017491981954)
    ).toEqual([-52.86783247886342, 0, 127.37078336626291]);
  });
});

describe('conversion', () => {
  const val = [
    {
      id: 'a',
      coordinates: {
        latitude: 53.4856191836238,
        longitude: -2.24017491981954
      },
      categories: [
        {
          alias: 'restaurants',
          title: 'Restaurants'
        }
      ]
    }
  ];
  const funcCall = conversion(val, 53.4863, -2.2397);
  test('returns an object', () => {
    expect(typeof funcCall).toBe('object');
    expect(conversion()).toBeUndefined();
  });
  test('returns an object of objects', () => {
    expect(typeof Object.values(funcCall)[0]).toBe(
      'object'
    );
  });
  test('returns objects with position property', () => {
    expect(conversion(val, 53.4863, -2.2397)).toHaveProperty('a.position');
    expect(Array.isArray(funcCall.a.position)).toBe(true);
    expect(funcCall.a.position[0]).toBe(-52.86783247886342);
  });
});

describe('formatHours', () => {
  const testfunc = formatHours(testHours);
  test('returns an array', () => {
    expect(Array.isArray(testfunc)).toBe(true);
  });
  test('returns an array of 7 strings', () => {
    expect(typeof testfunc[0]).toBe('string');
    expect(testfunc).toHaveLength(7);
  });
  test('returns an array of time string in specific format', () => {
    expect(testfunc[0]).toBe('11:00 - 00:00');
    expect(testfunc.indexOf('Closed')).toBe(-1)
  });
  test('commpletes week array if last element is missing',() => {
    const lastDayMissing = formatHours(hoursWoLastDay);
    expect(lastDayMissing[6]).toBe('Closed');
    expect(lastDayMissing).toHaveLength(7);
  });
  test('commpletes week array if multiple elements are missing', () => {
    const midDayMissing = formatHours(hoursWoMidDay);
    expect(midDayMissing[3]).toBe('Closed');
    expect(midDayMissing).toHaveLength(7);
  });
});
