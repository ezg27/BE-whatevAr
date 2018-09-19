'use strict';
const { deviceData } = require('../handler');

xdescribe('deviceData', () => {
  test('', () => {
    // expect.assertions(1);
    //   return deviceData({
    //     pathParameters: {
    //       lat: 53.4863,
    //       long: -2.2397
    //     }
    //   }).then(data => {
    //     expect(data).toBe('');
    //   })
    return expect(
      Promise.resolve(
        deviceData({
          pathParameters: {
            lat: 53.4863,
            long: -2.2397
          }
        })
      )
    ).resolves.toBe('');
  });
});
