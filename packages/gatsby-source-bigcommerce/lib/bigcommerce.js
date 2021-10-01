const axios = require('axios');

const bigCommerce = ({ storeHash, accessToken }) =>
  axios.create({
    baseURL: `https://api.bigcommerce.com/stores/${storeHash}/v3`,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken
    },
    timeout: 10000
  });

module.exports = bigCommerce;
