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
    }
  ]
};
