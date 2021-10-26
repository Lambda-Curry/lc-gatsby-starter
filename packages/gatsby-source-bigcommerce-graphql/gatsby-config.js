const axios = require('axios');

async function getAuthorizationToken({ storeHash, accessToken }) {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.bigcommerce.com/stores/${storeHash}/v3/storefront/api-token`,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken
      },
      data: {
        channel_id: 1,
        expires_at: Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60)
      }
    });

    return response.data.data.token;
  } catch (error) {
    console.error(error);
  }
}

module.exports = ({ storeHash, accessToken }) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-graphql',
        options: {
          typeName: 'BigCommerce',
          fieldName: 'bigcommerce',
          url: 'https://nibll-home.mybigcommerce.com/graphql',
          headers: async () => {
            const token = await getAuthorizationToken({ storeHash, accessToken });

            return {
              Authorization: `Bearer ${token}`
            };
          }
        }
      }
    ]
  };
};
