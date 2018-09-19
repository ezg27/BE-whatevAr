const fakeData = {
  'W1bb3agzrK1VwXDpC-9MyQ': {
    id: 'W1bb3agzrK1VwXDpC-9MyQ',
    alias: 'the-printworks-manchester',
    name: 'The Printworks',
    image_url:
      'https://s3-media3.fl.yelpcdn.com/bphoto/hqW9Yz2swOuFETkzGt3k_w/o.jpg',
    is_closed: false,
    url:
      'https://www.yelp.com/biz/the-printworks-manchester?adjust_creative=3yP4hKOPjtJfpae0SpjWDQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=3yP4hKOPjtJfpae0SpjWDQ',
    review_count: 53,
    categories: [
      {
        alias: 'movietheaters',
        title: 'Cinema'
      },
      {
        alias: 'bars',
        title: 'Bars'
      }
    ],
    rating: 3,
    coordinates: {
      latitude: 53.4856191836238,
      longitude: -2.24017491981954
    }
  }
};

module.exports.getYelp = position => {
  return new Promise(resolve => {
    resolve(fakeData);
  });
};
