const bigCommerce = require('./lib/bigcommerce');
const { consoleMessage } = require('./lib/helpers');
const {
  NODE_TYPES_TYPE_DEFS,
  NODE_TYPES_IMAGE_URL_FIELDS,
  NODE_TYPES_TO_ENDPOINTS_MAP,
  ENDPOINTS,
  ENDPOINTS_TO_NODE_TYPES_MAP,
  ENDPOINTS_QUERY_PARAMS
} = require('./lib/constants');
const generateNode = require('./lib/generateNode');
const generateFileNode = require('./lib/generateFileNode');

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
      })
  });

exports.sourceNodes = async (gatsbyAPI, pluginOptions) => {
  const { storeHash, accessToken, endpoints } = pluginOptions;
  const bigCommerceAPI = bigCommerce({ storeHash, accessToken });

  try {
    await Promise.all(
      endpoints.map(endpoint => {
        const nodeType = ENDPOINTS_TO_NODE_TYPES_MAP[endpoint];
        const queryParams = ENDPOINTS_QUERY_PARAMS[endpoint] || {};

        if (!nodeType) return consoleMessage(`${endpoint} is not a supported endpoint.`, `error`);

        return bigCommerceAPI.get(endpoint, { params: queryParams }).then(response => {
          // If the data object is not on the response, it could be v2 which returns an array as the root, so use that as a fallback
          const responseData = response.data?.data || response.data;

          return responseData.map(data => generateNode(gatsbyAPI, nodeType, data));
        });
      })
    );
  } catch (error) {
    consoleMessage(error.response || error);
  }
};

exports.createSchemaCustomization = (gatsbyAPI, pluginOptions) => {
  const { actions } = gatsbyAPI;
  const { createTypes } = actions;
  const { endpoints } = pluginOptions;

  const typeDefs = `
    ${endpoints.includes(ENDPOINTS.Brand) ? [NODE_TYPES_TYPE_DEFS.Brand] : ''}
    ${endpoints.includes(ENDPOINTS.Category) ? [NODE_TYPES_TYPE_DEFS.Category] : ''}
    ${endpoints.includes(ENDPOINTS.Product) ? [NODE_TYPES_TYPE_DEFS.Product] : ''}
    ${endpoints.includes(ENDPOINTS.Product) ? [NODE_TYPES_TYPE_DEFS.ProductImage] : ''}
    ${endpoints.includes(ENDPOINTS.Product) ? [NODE_TYPES_TYPE_DEFS.ProductVariant] : ''}
  `;

  createTypes(typeDefs);
};

exports.createResolvers = (gatsbyAPI, pluginOptions) => {
  generateImageFileFieldResolvers(gatsbyAPI, pluginOptions);
};

function generateImageFileFieldResolvers(gatsbyAPI, pluginOptions) {
  const { createResolvers } = gatsbyAPI;
  const { endpoints } = pluginOptions;

  const resolvers = Object.keys(NODE_TYPES_IMAGE_URL_FIELDS).reduce((fieldResolvers, nodeType) => {
    // Return early if the nodeType matches an excluded endpoint
    if (NODE_TYPES_TO_ENDPOINTS_MAP[nodeType] && !endpoints.includes(NODE_TYPES_TO_ENDPOINTS_MAP[nodeType]))
      return fieldResolvers;

    // Generate resolvers for each of our `local_file_${name}` and `image_local_file` fields.
    fieldResolvers[nodeType] = NODE_TYPES_IMAGE_URL_FIELDS[nodeType].reduce((imageFileFields, imageURLFieldName) => {
      imageFileFields[`${imageURLFieldName.replace('url', 'local_file')}`] = {
        type: `File`,
        resolve: source => generateFileNode(gatsbyAPI, imageURLFieldName, source)
      };

      return imageFileFields;
    }, {});

    return fieldResolvers;
  }, {});

  createResolvers(resolvers);

  // NOTE: The above code ultimately createsResolvers with the following shape:
  //
  // createResolvers({
  //   [NODE_TYPES.ProductImage]: {
  //     local_file_standard: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'url_standard', source);
  //       }
  //     },
  //     local_file_thumbnail: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'url_thumbnail', source);
  //       }
  //     },
  //     local_file_tiny: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'url_tiny', source);
  //       }
  //     },
  //     local_file_zoom: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'url_zoom', source);
  //       }
  //     }
  //   },
  //   [NODE_TYPES.ProductVariant]: {
  //     image_local_file: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'image_url', source);
  //       }
  //     }
  //   },
  //   [NODE_TYPES.Brand]: {
  //     image_local_file: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'image_url', source);
  //       }
  //     }
  //   },
  //   [NODE_TYPES.Category]: {
  //     image_local_file: {
  //       type: `File`,
  //       resolve(source) {
  //         return generateFileNode(gatsbyAPI, 'image_url', source);
  //       }
  //     }
  //   }
  // });
}
