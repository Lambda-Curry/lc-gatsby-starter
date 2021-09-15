const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`
});

const siteTitle = 'Lambda Curry Gatsby Starter';

console.log(process.env.SHOPIFY_ADMIN_PASSWORD);

module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
    },
    {
      resolve: `@lambdacurry/gatsby-theme-shopify`,
      options: {
        password: process.env.SHOPIFY_ADMIN_PASSWORD,
        storeUrl: process.env.SHOPIFY_STORE_URL,
        templatePaths: {
          product: `${__dirname}/src/templates/product.tsx`
        }
      }
    }
  ]
};
