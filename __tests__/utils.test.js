const { conversion, latLongToMerc, transformPointToAR } = require('../utils');

describe('latLongToMerc', () => {
  test('returns an object', () => {
    expect(typeof latLongToMerc()).toBe('object');
    expect(latLongToMerc()).not.toBeNull();
  });
  test('converts latitude and longitude coordinates to relative metre values', () => {
    expect(latLongToMerc(53.4863, -2.2397)).toEqual({
      x: -249322.2635296948,
      y: 7073461.772024932
    });
  });
});

describe('transformPointToAR', () => {
  test('returns an array', () => {
    expect(Array.isArray(transformPointToAR())).toBe(true);
  });
  test('returns an array of length 3', () => {
    expect(transformPointToAR()).toHaveLength(3);
  });
  test('returns an array of falsy values when parameters not passed', () => {
    expect(transformPointToAR()).toEqual([NaN, 0, NaN]);
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
      }
    }
  ];
  test('returns an object', () => {
    expect(typeof conversion(val, 53.4863, -2.2397)).toBe('object');
    expect(conversion()).toBeUndefined();
  });
  test('returns an object of objects', () => {
    expect(typeof Object.values(conversion(val, 53.4863, -2.2397))[0]).toBe(
      'object'
    );
  });
  test('returns objects with position property', () => {
    expect(conversion(val, 53.4863, -2.2397)).toHaveProperty('a.position');
    // expect(conversion(val, 53.4863, -2.2397).a.position).('a.position');
    expect()
  });
});
