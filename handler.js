'use strict';
const yelpKey = require('./config');
const axios = require('axios');

const vals = {
  latitude: 53.4863,
  longitude: -2.2397
};

module.exports.deviceData = (event, context, callback) => {
  const obj = {
    statusCode: 200,
    body: JSON.stringify(event.body)
  };
  callback(null, obj);
}

module.exports.getYelp = (event, context, callback) => {
  const config = {
    headers: {
      Authorization: yelpKey
    },
    params: {
      latitude: vals.latitude,
      longitude: vals.longitude,
      radius: 100,
      categories: 'bars,restaurants'
    }
  };
  axios.get('https://api.yelp.com/v3/businesses/search', config).then(res => {
    const obj = {
      statusCode: 200,
      body: JSON.stringify(conversion(res.data.businesses))
    };
    callback(null, obj);
  })
};

const conversion = businesses => {
  return businesses.map(business => {
    business.position = transformPointToAR(
      vals.latitude,
      vals.longitude,
      business.coordinates.latitude,
      business.coordinates.longitude
    );
    return business;
  });
};

const latLongToMerc = (lat, long) => {
  const lon_rad = (long / 180.0) * Math.PI;
  const lat_rad = (lat / 180.0) * Math.PI;
  const sm_a = 6378137.0;
  const xmeters = sm_a * lon_rad;
  const ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
  return { x: xmeters, y: ymeters };
};

const transformPointToAR = (
  deviceLat,
  deviceLong,
  businessLat,
  businessLong
) => {
  const objPoint = latLongToMerc(businessLat, businessLong);
  const devicePoint = latLongToMerc(deviceLat, deviceLong);
  const objFinalPosZ = objPoint.y - devicePoint.y;
  const objFinalPosX = objPoint.x - devicePoint.x;
  return [objFinalPosX, 0, -objFinalPosZ];
};