const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`
});

const siteTitle = 'Lambda Curry Gatsby Starter';

module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `@lambdacurry/gatsby-source-bigcommerce`,
      options: {
        storeHash: process.env.BIGCOMMERCE_STORE_HASH,
        accessToken: process.env.BIGCOMMERCE_ACCESS_TOKEN,
        endpoints: ['/catalog/products', '/catalog/categories']
      }
    },
    {
      resolve: `@lambdacurry/gatsby-theme`,
      options: {
        siteMetadata: {
          titleTemplate: `%s | ${siteTitle}`,
          defaultTitle: siteTitle,
          description: `Documentation site for Lambda Curry's Gatsby Starter`
        },
        manifest: {
          name: siteTitle,
          short_name: siteTitle
        }
      }
    },
    {
      resolve: `@lambdacurry/gatsby-theme-directus`,
      options: {
        url: process.env.DIRECTUS_URL,
        authToken: process.env.DIRECTUS_AUTH_TOKEN,
        templatePaths: {
          page: `${__dirname}/src/templates/page.tsx`
        }
      }
    }
  ]
};
