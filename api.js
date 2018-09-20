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
  }
  console.log(name);
  const getYelp = axios.get(`https://api.yelp.com/v3/businesses/${id}`, yConfig);
  const getFoodRating = axios.get(`http://api.ratings.food.gov.uk/Establishments?name=${name}&localAuthorityId=180`, rConfig)
  return Promise.all([getYelp, getFoodRating])
    .then(([{data}, RatingData]) => {
      const hours = data.hours[0].open.map((day, i) => {
        if (i != data.hours[0].open[i].day) return 'Closed';
        return `${day.start.slice(0, 2)}:${day.start.slice(2)} - ${day.end.slice(0, 2)}:${day.end.slice(2)}`;
      })
      while (hours && hours.length !== 7) hours.push('Closed');
      
      const theData = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        photos: data.photos,
        isOpen: data.hours ? data.hours[0].is_open_now : null, 
        url: data.url,
        reviewCount: data.review_count,
        foodRating: RatingData.data.establishments ? RatingData.data.establishments[0].RatingKey : null,
        hours: hours
      }
      return {
        statusCode: 200,
        body: JSON.stringify(theData)
      }
    })
    .catch(console.log)
}