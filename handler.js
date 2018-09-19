'use strict';
const yelpKey = require('./config');
const axios = require('axios');

module.exports.deviceData = async event => {
  console.log(event)
  const result = await getYelp(event.pathParameters);
  return result;
};

const getYelp = ({ lat, long }) => {
  const config = {
    headers: {
      Authorization: yelpKey
    },
    params: {
      latitude: lat,
      longitude: long,
      radius: 100,
      categories: 'bars,restaurants'
    }
  };
  return axios
    .get('https://api.yelp.com/v3/businesses/search', config)
    .then(res => {
      console.log('cheese danish');
      return {
        statusCode: 200,
        body: JSON.stringify(
          conversion(res.data.businesses, lat, long)
        )
      };
    })
    .catch(() => console.log('egggggsssss'));
};

const conversion = (businesses, latitude, longitude) => {
  return businesses.reduce((acc, business)=> {
    business.position = transformPointToAR(
      latitude,
      longitude,
      business.coordinates.latitude,
      business.coordinates.longitude
    );
    acc[business.id] = business;
    return acc;
  }, {});
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
