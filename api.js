const yelpKey = require('./config');
const axios = require('axios');
const { conversion, formatHours } = require('./utils');

module.exports.getYelp = ({ lat, long }) => {
  const config = {
    headers: {
      Authorization: yelpKey
    },
    params: {
      latitude: lat,
      longitude: long,
      radius: 80,
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
    .catch(err => {
      return {
        statusCode: err.response.status,
        body: JSON.stringify({
          source: 'Yelp businesses API call',
          message: err.response.statusText
        })
      };
    });
};

module.exports.getBusinessData = ({ id, name }) => {
  const yConfig = {
    headers: {
      Authorization: yelpKey
    }
  };
  const rConfig = {
    headers: {
      'x-api-version': 2
    }
  };
  const getYelp = axios.get(
    `https://api.yelp.com/v3/businesses/${id}`,
    yConfig
  );
  const getFoodRating = axios.get(
    `http://api.ratings.food.gov.uk/Establishments?name=${name}&localAuthorityId=180`,
    rConfig
  );
  return Promise.all([getYelp, getFoodRating])
    .then(([{ data }, RatingData]) => {
      const theData = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        photos: data.photos,
        isOpen: data.hours ? data.hours[0].is_open_now : null,
        url: data.url,
        reviewCount: data.review_count,
        foodRating:
          RatingData.data.establishments.length !== 0
            ? RatingData.data.establishments[0].RatingKey
            : null,
        hours: !data.hours ? null : formatHours(data.hours[0].open),
        address: data.location.address1,
        postcode: data.location.zip_code
      };
      return {
        statusCode: 200,
        body: JSON.stringify(theData)
      };
    })
    .catch(err => {
      return {
        statusCode: err.response.status,
        body: JSON.stringify({
          source: 'Yelp/Food-Hygiene specific business API call',
          message: err.response.statusText
        })
      };
    });
};
