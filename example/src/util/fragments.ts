import { graphql } from 'gatsby';

/**
 * These so called fragments are the fields we query on each template.
 * A fragment make queries a bit more reuseable, so instead of typing and
 * remembering every possible field, you can just use
 *   ...BigCommerceProductFields
 * for example to load all post fields into your GraphQL query.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
 *
 */

export const bigCommerceProductFields = graphql`
  fragment BigCommerceProductFields on BigCommerceProduct {
    bigcommerce_id
    name
    page_title
    description
    type
    price
    sale_price
    retail_price
    calculated_price
    is_visible
    sku
    sort_order
    custom_url {
      url
      is_customized
    }

    # Metadata
    meta_description
    open_graph_description
    open_graph_title
    open_graph_type
    open_graph_use_image
    open_graph_use_meta_description
    open_graph_use_product_name

    # Dates
    date_created
    date_modified

    # Categories
    categories {
      bigcommerce_id
      name
    }

    # Options
    options {
      id
      name
      type
      display_name
      sort_order
      option_values {
        id
        label
        sort_order
      }
      image_local_file {
        childImageSharp {
          gatsbyImageData
        }
      }
    }

    # Variants
    variants {
      id
      price
      calculated_price
      sku
      sku_id
      option_values {
        id
        label
        option_display_name
        option_id
      }
      image_local_file {
        childImageSharp {
          gatsbyImageData
        }
      }
    }

    # Images
    images {
      description
      sort_order
      local_file_standard {
        childImageSharp {
          gatsbyImageData
        }
      }
      local_file_zoom {
        childImageSharp {
          gatsbyImageData
        }
      }
      local_file_thumbnail {
        childImageSharp {
          gatsbyImageData
        }
      }
      local_file_tiny {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export const bigCommerceCategoryFields = graphql`
  fragment BigCommerceCategoryFields on BigCommerceCategory {
    bigcommerce_id
    name
    description
    sort_order
    is_visible
    default_product_sort
    custom_url {
      url
      is_customized
    }
    image_url
    image_local_file {
      childImageSharp {
        gatsbyImageData
      }
    }

    # Metadata
    page_title
    search_keywords
    meta_keywords
    meta_description

    # Parent category
    parent_id
  }
`;
