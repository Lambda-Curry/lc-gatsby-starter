const createPages =
  () =>
  async ({ graphql, actions, reporter }, pluginOptions) => {
    const { createPage } = actions;

    const { templatePath } = pluginOptions;

    // Query Ghost data
    const result = await graphql(`
      {
        directus {
          page {
            id
            url
          }
        }
      }
    `);

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    // Extract query results
    const pages = result.data.directus.page;

    // Bail if we don't have any pages or posts.
    if (!pages.length) return;

    // Create pages
    if (pages.length) {
      pages.forEach(page => {
        createPage({
          path: page.url, // Do we need this to be `slug`?
          component: path.resolve(templatePath),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: page.id
          }
        });
      });
    }
  };

exports = {
  createPages
};
