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
<<<<<<< HEAD
=======
    },
    {
      resolve: `@lambdacurry/gatsby-theme-directus`,
      options: {
        url: process.env.DIRECTUS_URL,
        authToken: process.env.DIRECTUS_AUTH_TOKEN
      }
>>>>>>> gatsby-theme-directus
    }
  ]
};
