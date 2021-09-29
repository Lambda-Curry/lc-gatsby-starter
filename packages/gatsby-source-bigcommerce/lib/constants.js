const NODE_TYPE_PREFIX = `BigCommerce`;

const NODE_TYPES = {
  Brand: `${NODE_TYPE_PREFIX}Brand`,
  Category: `${NODE_TYPE_PREFIX}Category`,
  Product: `${NODE_TYPE_PREFIX}Product`,
  ProductImage: `${NODE_TYPE_PREFIX}ProductImage`,
  ProductVariant: `${NODE_TYPE_PREFIX}ProductVariant`
};

const NODE_TYPES_TYPE_DEFS = {
  Brand: `
    type ${NODE_TYPES.Brand} implements Node @infer {
      image_local_file: File
    }
  `,
  Category: `
    type ${NODE_TYPES.Category} implements Node @infer {
      image_local_file: File
    }
  `,
  Product: `
    type ${NODE_TYPES.Product} implements Node @infer {
      primary_image: BigCommerceProductImage
      images: [BigCommerceProductImage]
      variants: [BigCommerceProductVariant]
    }
  `,
  ProductImage: `
    type ${NODE_TYPES.ProductImage} implements Node @infer {
      local_file_standard: File
      local_file_thumbnail: File
      local_file_tiny: File
      local_file_zoom: File
    }
  `,
  ProductVariant: `
    type ${NODE_TYPES.ProductVariant} implements Node @infer {
      image_local_file: File
    }
  `
};

const NODE_TYPES_IMAGE_URL_FIELDS = {
  [NODE_TYPES.Brand]: ['image_url'],
  [NODE_TYPES.Category]: ['image_url'],
  [NODE_TYPES.ProductImage]: ['url_standard', 'url_thumbnail', 'url_tiny', 'url_zoom'],
  [NODE_TYPES.ProductVariant]: ['image_url']
};

const ENDPOINTS = {
  Brand: '/catalog/brands',
  Category: '/catalog/categories',
  Product: '/catalog/products'
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

const ENDPOINTS_QUERY_PARAMS = {
  [ENDPOINTS.Product]: {
    include: ['primary_image', 'images', 'variants', 'custom_fields', 'modifiers', 'options', 'videos']
  }
};

module.exports = {
  NODE_TYPE_PREFIX,
  NODE_TYPES,
  NODE_TYPES_TYPE_DEFS,
  NODE_TYPES_IMAGE_URL_FIELDS,
  NODE_TYPES_TO_ENDPOINTS_MAP,
  ENDPOINTS,
  ENDPOINTS_TO_NODE_TYPES_MAP,
  ENDPOINTS_QUERY_PARAMS
};
