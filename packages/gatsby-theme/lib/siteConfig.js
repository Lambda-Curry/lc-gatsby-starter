const defaultSiteTitle = 'LC Gatsby Starter';

const defaultSiteConfig = {
  siteMetadata: {
    lang: 'en',
    charSet: 'utf-8',
    siteUrl: 'http://localhost:8000',
    title: '',
    description:
      'Customized by Lambda Curry - Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'Lambda Curry',
    titleTemplate: `% | ${defaultSiteTitle}`,
    defaultTitle: defaultSiteTitle,
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
    name: defaultSiteTitle,
    short_name: defaultSiteTitle,
    start_url: '/',
    theme_color: '#15171a',
    background_color: '#e9e9e9',
    display: `minimal-ui`
  }
};

const getSiteConfig = options => {
  return {
    siteMetadata: {
      ...defaultSiteConfig.siteMetadata,
      titleTemplate: `%s | ${options.siteName}`,
      defaultTitle: options.siteName,
      ...options.siteMetadata
    },
    manifest: {
      ...defaultSiteConfig.manifest,
      name: options.siteName,
      short_name: options.siteName,
      ...options.manifest
    }
  };
};

module.exports = { getSiteConfig };
