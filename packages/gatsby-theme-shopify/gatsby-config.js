module.exports = pluginOptions => {
  console.log(pluginOptions);

  return {
    plugins: [
      {
        resolve: 'gatsby-source-shopify',
        options: {
          password: pluginOptions.password,
          storeUrl: pluginOptions.storeUrl
        }
      }
    ]
  };
};
