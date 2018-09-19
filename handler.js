'use strict';
const { getYelp, getBusinessData } = require('./api');
module.exports.deviceData = event => getYelp(event.pathParameters);
module.exports.getBusiness = event => getBusinessData(event.pathParameters);