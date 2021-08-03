const defaultSiteConfig = {
  siteMetaData: {
    lang: 'en',
    siteUrl: 'http://localhost:8000',
    title: 'LC Gatsby Starter',
    description:
      'Customized by Lambda Curry - Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'Lambda Curry',
    titleTemplate: '',
    baseBodyClassName: '',
    image: '',
    ogImage: '',
    ogTitle: '',
    ogDescription: '',
    twitterSite: '',
    twitterCreator: '',
    twitterHandle: '',
    twitterImage: '',
    twitterTitle: '',
    twitterDescription: '',
    favicon: `${__dirname}/../src/images/gatsby-icon.png`,
    postsPerPage: 12
  },
  manifest: {
    icon: `${__dirname}/../src/images/gatsby-icon.png`,
    name: 'LC Gatsby Starter',
    short_name: 'LC Gatsby Starter',
    start_url: '/',
    theme_color: '#15171a',
    background_color: '#e9e9e9',
    display: `minimal-ui`
  }
};

const getSiteConfig = options => {
  return {
    siteMetaData: {
      ...defaultSiteConfig.siteMetaData,
      ...options.siteMetaData
    },
    manifest: {
      ...defaultSiteConfig.manifest,
      ...options.manifest
    }
  };
};

module.exports = { getSiteConfig };
