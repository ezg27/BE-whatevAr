'use strict';
const { getYelp, getBusinessData } = require('./api');
const { addUserData } = require('./dbManager');
module.exports.deviceData = event => getYelp(event.pathParameters);
module.exports.getBusiness = event => getBusinessData(event.pathParameters);
module.exports.addUser = (event, context, callback) => addUserData(event, context, callback);