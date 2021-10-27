const { getSiteConfig } = require(`./lib/siteConfig`);

module.exports = pluginOptions => {
  const siteConfig = getSiteConfig(pluginOptions);

  return {
    siteMetadata: siteConfig.siteMetadata,
    flags: { PRESERVE_WEBPACK_CACHE: true, PRESERVE_FILE_DOWNLOAD_CACHE: true },
    plugins: [
      `gatsby-plugin-material-ui`, // Preventing style flicker on initial load, will need to upgrade version when MUI is upgrade (https://github.com/gatsbyjs/gatsby/issues/15097)
      {
        resolve: 'gatsby-plugin-page-creator',
        options: {
          path: './src/pages'
        }
      },
      `gatsby-plugin-react-helmet`,
      // `gatsby-plugin-image`, // NOTE: Gatsby Plugin cannot be within a theme and must be used in the site plugins
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-react-svg`,
      `gatsby-plugin-meta-redirect`,
      `gatsby-plugin-client-side-redirect`,
      `gatsby-transformer-json`, // See: https://valtism.com/src/gatsby-multiple-images-json.html
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `./src/images`
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `./src/data/`
        }
      },
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          postCssPlugins: [require('tailwindcss'), require('autoprefixer')]
        }
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: siteConfig.manifest
      },
      `gatsby-plugin-gatsby-cloud`

      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
    ]
  };
};
