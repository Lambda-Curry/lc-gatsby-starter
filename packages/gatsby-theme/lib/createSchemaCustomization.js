const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Customize type definition for SiteSiteMetadata to add additional fields.
  const typeDefs = `
    type SiteSiteMetadata implements Node {
      lang: String
      charSet: String
      favicon: String
      titleTemplate: String
      defaultTitle: String
      baseBodyClassName: String

      title: String
      description: String
      author: String
      image: String

      ogImage: String
      ogTitle: String
      ogDescription: String

      twitterImage: String
      twitterTitle: String
      twitterDescription: String
      twitterSite: String
      twitterCreator: String
      twitterHandle: String

      siteUrl: String
      postsPerPage: Int
    }
  `;

  createTypes(typeDefs);
};

module.exports = { createSchemaCustomization };
