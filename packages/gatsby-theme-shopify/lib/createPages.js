const path = require('path');
const { THEME_NAME } = require('./constants');

const createPages = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions;
  const { templatePaths = {} } = pluginOptions;

  // Bail if we don't have any pages or posts.
  if (!templatePaths.product)
    return reporter.warn(`${THEME_NAME}: No product template provided - skipping product detail page creation.`);

  // Query for all products in Shopify
  const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }, filter: { status: { eq: "ACTIVE" } }) {
        edges {
          product: node {
            id
            title
            images {
              originalSrc
            }
            shopifyId
            handle
            description
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
            status
          }
        }
      }
    }
  `);

  // Extract query results
  const products = result.data.allShopifyProduct.edges;

  // Bail if we don't have any products.
  if (!products.length) return reporter.info(`${THEME_NAME}: No products to build.`);

  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  if (products.length) {
    products.forEach(({ product }) => {
      createPage({
        path: `/products/${product.handle}`,
        component: path.resolve(templatePaths.product),
        context: {
          product
        }
      });
    });

    reporter.success(`${THEME_NAME}: ${products.length} pages created successfully.`);
    reporter.success(
      `${THEME_NAME}: Pages created at: ${products.map(({ product }) => `\n  - ${product.handle}`).join('')}`
    );
  }
};

module.exports = { createPages };
