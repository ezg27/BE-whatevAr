'use strict';
const { getYelp } = require('./api');
module.exports.deviceData = event => getYelp(event.pathParameters);