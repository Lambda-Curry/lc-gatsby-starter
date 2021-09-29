const axios = require('axios');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`
});

const { BIGCOMMERCE_STORE_HASH, BIGCOMMERCE_ACCESS_TOKEN, BIGCOMMERCE_CLIENT_ID } = process.env;

const fetchToken = async () => {
  const now = new Date();
  const expires = now.setDate(now.getDate() + 30) / 1000;

  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/storefront/api-token`,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Client': BIGCOMMERCE_CLIENT_ID,
        'X-Auth-Token': BIGCOMMERCE_ACCESS_TOKEN
      },
      data: {
        channel_id: 1,
        expires_at: parseInt(expires, 10)
        // allowed_cors_origins: [
        //   // array (accepts 1 origin currently)
        //   'https://localhost:8000'
        // ]
      }
    });

    const { token } = response.data.data;

    return token;
  } catch (error) {
    console.error(error);
  }
};

exports.sourceNodes = async gatsbyApi => {
  const token = await fetchToken();
  const { url, dev, graphql, auth, type = {}, ...opts } = options;

  // See: https://github.com/directus/directus/blob/51148c11d6496b16a8be29860c6afa3ee4b942ba/packages/gatsby-source-directus/gatsby-node.js#L141
  return await sourceNodes(gatsbyApi, {
    ...graphql,
    ...opts,
    url: `${endpoints.graphql}`,
    typeName: 'BigCommerceData',
    fieldName: type.field || 'bigCommerce',
    moduleName: 'gatsby-source-bigcommerce',
    moduleSource: 'BigCommerceSource',
    refreshInterval,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  // try {
  //   const productQuery = `
  //     products {
  //       edges {
  //         node {
  //           entityId
  //           name
  //           type
  //           sku
  //           description
  //         }
  //       }
  //     }
  //   `;

  //   const query = `
  //     query productsQuery {
  //       site {
  //         ${productQuery}
  //       }
  //     }
  //   `;

  //   const response = await axios({
  //     url: `https://nibll-home.mybigcommerce.com/graphql`,
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     data: { query }
  //   });

  //   const products = response.data.data.site.products.edges;

  //   products.forEach(({ product }) =>
  //     createNode({
  //       ...product,
  //       id: createNodeId(`BigCommerceProduct-${product.entityId}`),
  //       parent: null,
  //       children: [],
  //       internal: {
  //         type: 'BigCommerceProduct',
  //         content: JSON.stringify(product),
  //         contentDigest: createContentDigest(product)
  //       }
  //     })
  //   );
  // } catch (error) {
  //   console.debug(error.response || error);
  // }
};
