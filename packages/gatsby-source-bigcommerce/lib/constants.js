const NODE_TYPE_PREFIX = `BigCommerce`;

const NODE_TYPES = {
  Brand: `${NODE_TYPE_PREFIX}Brand`,
  Category: `${NODE_TYPE_PREFIX}Category`,
  Product: `${NODE_TYPE_PREFIX}Product`
};

const ENDPOINTS = {
  Brand: '/catalog/brands',
  Category: '/catalog/categories',
  Product: '/catalog/products'
};

const ENDPOINTS_QUERY_PARAMS = {
  [ENDPOINTS.Product]: {
    include: ['images', 'variants', 'custom_fields', 'modifiers', 'options', 'videos']
  }
};

const ENDPOINTS_TO_NODE_TYPES_MAP = {
  [ENDPOINTS.Brand]: NODE_TYPES.Brand,
  [ENDPOINTS.Category]: NODE_TYPES.Category,
  [ENDPOINTS.Product]: NODE_TYPES.Product
};

const NODE_TYPES_TO_ENDPOINTS_MAP = {
  [NODE_TYPES.Brand]: ENDPOINTS.Brand,
  [NODE_TYPES.Category]: ENDPOINTS.Category,
  [NODE_TYPES.Product]: ENDPOINTS.Product
};

module.exports = {
  NODE_TYPE_PREFIX,
  NODE_TYPES,
  NODE_TYPES_TO_ENDPOINTS_MAP,
  ENDPOINTS,
  ENDPOINTS_TO_NODE_TYPES_MAP,
  ENDPOINTS_QUERY_PARAMS
};
