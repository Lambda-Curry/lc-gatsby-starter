const path = require('path');
const { THEME_NAME } = require('./constants');

const createPages = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions;
  const { templatePaths = {}, filterPages = () => true } = pluginOptions;

  // Bail if we don't have any pages or posts.
  if (!templatePaths.page) return reporter.warn(`${THEME_NAME}: No page template provided - skipping page creation.`);

  // Query Ghost data
  const result = await graphql(`
    {
      directus {
        page {
          status
          id
          url
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) return reporter.panicOnBuild(`${THEME_NAME}: Error while running GraphQL query.`);

  // Extract query results
  const pages = result.data.directus.page;

  // Bail if we don't have any pages.
  if (!pages.length) return reporter.info(`${THEME_NAME}: No pages to build.`);

  // Create pages
  if (pages.length) {
    pages
      .filter(page => {
        if (page.status === 'archived') return false;
        if (process.env.NODE_ENV === 'production') return page.status === 'published';
        return true;
      })
      .filter(filterPages)
      .forEach(page => {
        createPage({
          path: page.url, // Do we need this to be `slug`?
          component: path.resolve(templatePaths.page),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: page.id
          }
        });
      });

    reporter.success(`${THEME_NAME}: ${pages.length} pages created successfully.`);
    reporter.success(`${THEME_NAME}: Pages created at: ${pages.map(page => `\n  - ${page.url}`).join('')}
    `);
  }
};

module.exports = { createPages };
