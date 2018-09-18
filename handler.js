'use strict';
const yelpKey = require('./config');
const axios = require('axios');

module.exports.getYelp = (event, context, callback) => {
  const config = {
    headers: {
      Authorization: yelpKey
    },
    params: {
      latitude: 53.4863,
      longitude: -2.2397,
      radius: 100,
      categories: 'bars,restaurants'
    }
  };
  axios.get('https://api.yelp.com/v3/businesses/search', config).then(res => {
    const obj = {
      statusCode: 200,
      body: JSON.stringify(res.data.businesses)
    };
    callback(null, obj);
  })
};
