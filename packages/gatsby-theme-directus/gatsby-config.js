module.exports = ({ url, authToken }) => {
  return {
    plugins: [
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
  };
};
