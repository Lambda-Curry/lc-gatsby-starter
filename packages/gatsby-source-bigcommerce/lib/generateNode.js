function generateNode(gatsbyAPI, nodeType, data) {
  const { actions, createContentDigest, createNodeId } = gatsbyAPI;
  const { createNode } = actions;

  return createNode({
    ...data,
    id: createNodeId(`${nodeType}-${data.id}`),
    bigcommerce_id: data.id,
    parent: null,
    children: [],
    internal: {
      type: nodeType,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data)
    }
  });
}

module.exports = generateNode;
