const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { set: _set } = require('lodash');

const generateLocalImageFile = async (gatsbyAPI, imageURL, localFileFieldPath) => {
  const {
    node,
    actions: { createNode },
    createNodeId,
    getCache,
    reporter
  } = gatsbyAPI;
  let fileNode;

  if (!imageURL) return;

  try {
    // Check if the `imageURL` is a valid URL. (If it is not the `URL` class will throw a TypeError which we catch below.)
    const url = new URL(imageURL);

    fileNode = await createRemoteFileNode({
      url: url.href,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache
    });
  } catch (error) {
    return reporter.error(error);
  }

  if (fileNode) {
    // We don't need to append `___NODE` to the field path because we are using the `@link` extension in our custom schema definitions.
    _set(node, localFileFieldPath, fileNode.id);
  }
};

module.exports = generateLocalImageFile;
