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

const NODE_TYPES_TYPE_DEFS = {
  Brand: `
    type ${NODE_TYPES.Brand} implements Node @infer {
      image_local_file: File @link
    }
  `,
  Category: `
    type ${NODE_TYPES.Category} implements Node @infer {
      image_local_file: File @link
    }
  `,
  Product: `
    type ${NODE_TYPES.Product} implements Node @infer {
      primary_image: BigCommerceProductImage
      images: [BigCommerceProductImage]!
      variants: [BigCommerceProductVariant]!
    }

    type BigCommerceProductImage {
      local_file_standard: File @link
      local_file_thumbnail: File @link
      local_file_tiny: File @link
      local_file_zoom: File @link
    }

    type BigCommerceProductVariant {
      image_local_file: File @link
    }
  `
};

const ENDPOINTS_QUERY_PARAMS = {
  [ENDPOINTS.Product]: {
    include: ['primary_image', 'images', 'variants', 'custom_fields', 'modifiers', 'options', 'videos']
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
  NODE_TYPES_TYPE_DEFS,
  NODE_TYPES_TO_ENDPOINTS_MAP,
  ENDPOINTS,
  ENDPOINTS_TO_NODE_TYPES_MAP,
  ENDPOINTS_QUERY_PARAMS
};
