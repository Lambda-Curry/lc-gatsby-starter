const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const generateFileNode = (gatsbyAPI, sourceField, source) => {
  const { actions, cache, createNodeId, store, reporter } = gatsbyAPI;
  const { createNode } = actions;
  const sourceFieldValue = source[sourceField];

  const errorMessage = message => consoleMessage(`Cannot generate file node: ${message}`);

  if (!sourceField) return errorMessage(`invalid "sourceField" argument provided.`);

  if (!sourceFieldValue) return errorMessage(`value for "${sourceField}" sourceField is ${sourceFieldValue}.`);

  try {
    // Check if the `sourceFieldValue` is a valid URL. (If it is not the `URL` class will throw a TypeError.)
    const url = new URL(sourceFieldValue);

    return createRemoteFileNode({
      url: sourceFieldValue,
      store,
      cache,
      createNode,
      createNodeId,
      reporter
    });
  } catch (error) {
    return reporter.error(error);
  }
};

module.exports = generateFileNode;
