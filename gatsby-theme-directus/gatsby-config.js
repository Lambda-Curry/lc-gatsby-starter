module.exports = ({ url, authToken }) => ({
  plugins: [
    // TODO: Should we include the base Gatsby theme here?
    // `@lambdacurry/gatsby-theme`,
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url,
        auth: {
          token: authToken
        }
      }
    }
  ]
});
