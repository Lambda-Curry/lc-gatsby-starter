const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `@lambdacurry/gatsby-theme`,
      options: {
        metaData: {
          title: 'Test site'
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
