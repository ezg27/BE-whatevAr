'use strict';
const { getYelp, getBusinessData } = require('./api');
const { addUserData, getUserData } = require('./dbManager');
module.exports.deviceData = event => getYelp(event.pathParameters);
module.exports.getBusiness = event => getBusinessData(event.pathParameters);
module.exports.addUser = (event, context, callback) => addUserData(event, context, callback);
module.exports.getUser = (event, context, callback) => getUserData(event, context, callback);