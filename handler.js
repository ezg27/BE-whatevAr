'use strict';
const { getYelp } = require('./api');

module.exports.deviceData = async event => {
  console.log(event)
  const result = await getYelp(event.pathParameters);
  return result;
};
