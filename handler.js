'use strict';

module.exports.getYelp = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world!!!'
    }),
  };
};
