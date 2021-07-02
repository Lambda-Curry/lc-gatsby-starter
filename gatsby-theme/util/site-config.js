const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
const {
  SITE_TITLE = 'LC Gatsby Starter',
  SITE_DESCRIPTION = 'Customized by Lambda Curry - Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
  SITE_AUTHOR = 'Lambda Curry',
  MANIFEST_SHORT_TITLE,
  MANIFEST_THEME_COLOR = '#15171A',
  MANIFEST_BG_COLOR = '#e9e9e9',
  MANIFEST_SITE_ICON = 'src/images/gatsby-icon.png',
  POSTS_PER_PAGE = 12
} = require('dotenv').config({
  path: `.env.${activeEnv}`
});

module.exports = {
  siteUrl: `http://localhost:8000`, // Site domain. Do not include a trailing slash!

  // Metadata
  siteMetadata: {
    title: SITE_TITLE, // This allows an alternative site title for meta data for pages.
    description: SITE_DESCRIPTION, // This allows an alternative site description for meta data for pages.
    author: SITE_AUTHOR
  },

  // Manifest
  shortTitle: MANIFEST_SHORT_TITLE || SITE_TITLE, // Used for App manifest e.g. Mobile Home Screen
  themeColor: MANIFEST_THEME_COLOR, // Used for Offline Manifest
  backgroundColor: MANIFEST_BG_COLOR, // Used for Offline Manifest
  siteIcon: MANIFEST_SITE_ICON, // Logo in /static dir used for SEO, RSS, and App manifest

  // Pagination
  postsPerPage: POSTS_PER_PAGE // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)
};
