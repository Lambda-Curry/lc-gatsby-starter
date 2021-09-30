const bigCommerce = require('./lib/bigcommerce');
const { consoleMessage } = require('./lib/helpers');
const {
  NODE_TYPES_TYPE_DEFS,
  ENDPOINTS,
  ENDPOINTS_TO_NODE_TYPES_MAP,
  ENDPOINTS_QUERY_PARAMS
} = require('./lib/constants');
const generateNode = require('./lib/generateNode');
const generateLocalImageFilesForNodeType = require('./lib/generateLocalImageFilesForNodeType');

exports.pluginOptionsSchema = ({ Joi }) =>
  Joi.object({
    storeHash: Joi.string().required().messages({
      'any.required': 'You must provide a BigCommerce store hash.'
    }),
    accessToken: Joi.string().required().messages({
      'any.required': 'You must provide a BigCommerce API access token.'
    }),
    endpoints: Joi.array()
      .items(
        Joi.string()
          .valid(...Object.values(ENDPOINTS))
          .required()
      )
      .required()
      .messages({
        'any.only': `Endpoints must be one of: ${Object.values(ENDPOINTS)
          .map(endpoint => `"${endpoint}`)
          .join('," ')}"`,
        'array.includesRequiredUnknowns': `You must provide at least one BigCommerce API endpoint in the endpoints array.`,
        'any.required': 'You must provide at least one BigCommerce API endpoint in the endpoints array.'
      }),
    downloadImages: Joi.boolean()
  });

exports.sourceNodes = async (gatsbyAPI, pluginOptions) => {
  const { storeHash, accessToken, endpoints } = pluginOptions;
  const bigCommerceAPI = bigCommerce({ storeHash, accessToken });

  try {
    await Promise.all(
      endpoints.map(endpoint => {
        const nodeType = ENDPOINTS_TO_NODE_TYPES_MAP[endpoint];
        const queryParams = ENDPOINTS_QUERY_PARAMS[endpoint] || {};

        return bigCommerceAPI.get(endpoint, { params: queryParams }).then(response => {
          // If the data object is not on the response, it could be v2 which returns an array as the root, so use that as a fallback
          const responseData = response.data?.data || response.data;

          responseData.map(data => generateNode(gatsbyAPI, nodeType, data));

          return { nodeType, data: responseData };
        });
      })
    );
  } catch (error) {
    consoleMessage(error.response || error);
  }
};

exports.onCreateNode = async (gatsbyAPI, pluginOptions) => {
  const { node } = gatsbyAPI;

  if (!pluginOptions.downloadImages) return;

  await generateLocalImageFilesForNodeType(gatsbyAPI, node.internal.type);
};

exports.createSchemaCustomization = (gatsbyAPI, pluginOptions) => {
  const { actions } = gatsbyAPI;
  const { createTypes } = actions;
  const { endpoints } = pluginOptions;

  if (!pluginOptions.downloadImages) return;

  createTypes(`
    ${endpoints.includes(ENDPOINTS.Brand) ? [NODE_TYPES_TYPE_DEFS.Brand] : ''}
    ${endpoints.includes(ENDPOINTS.Category) ? [NODE_TYPES_TYPE_DEFS.Category] : ''}
    ${endpoints.includes(ENDPOINTS.Product) ? [NODE_TYPES_TYPE_DEFS.Product] : ''}
  `);
};
