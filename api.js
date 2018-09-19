const yelpKey = require('./config');
const axios = require('axios');
const { conversion } = require('./utils');

module.exports.getYelp = ({ lat, long }) => {
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
      return {
        statusCode: 200,
        body: JSON.stringify(conversion(res.data.businesses, lat, long))
      };
    })
    .catch(() => console.log('egggggsssss'));
};

module.exports.getBusinessData = ({ id }) => {
  console.log(id)
  const config = {
    headers: {
      Authorization: yelpKey
    }
  };
  return axios.get(`https://api.yelp.com/v3/businesses/${id}`, config)
  .then(res => {
    return {
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  }).catch(console.log)
}