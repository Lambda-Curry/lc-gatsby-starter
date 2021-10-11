const { NODE_TYPES, ENDPOINTS_TO_NODE_TYPES_MAP } = require('./constants');

const generateCustomSchemas = (gatsbyAPI, pluginOptions) => {
  const { actions } = gatsbyAPI;
  const { createTypes } = actions;
  const { endpoints } = pluginOptions;

  const schemas = {
    [NODE_TYPES.Brand]: `
      type ${NODE_TYPES.Brand} implements Node @infer {
        bigcommerce_id: Int
        name: String
        page_title: String
        meta_keywords: [String]
        meta_description: String
        search_keywords: String
        image_url: String
        image_local_file: File @link
        custom_url: CustomURL
      }
    `,
    [NODE_TYPES.Category]: `
      type ${NODE_TYPES.Category} implements Node @infer {
        parent_id: Int
        parent_category: ${NODE_TYPES.Category} @link(by: "bigcommerce_id", from: "parent_id")
        bigcommerce_id: Int
        name: String
        description: String
        views: Int
        sort_order: Int
        page_title: String
        search_keywords: String
        meta_keywords: [String]
        meta_description: [String]
        layout_file: String
        is_visible: Boolean
        default_product_sort: String
        image_url: String
        image_local_file: File @link
        custom_url: CustomURL
      }
    `,
    [NODE_TYPES.Product]: `
      type ${NODE_TYPES.Product} implements Node @infer {
        bigcommerce_id: Int
        name: String
        type: String
        sku: String
        description: String
        weight: Float
        width: Float
        height: Float
        price: Float
        cost_price: Float
        retail_price: Float
        sale_price: Float
        map_price: Float
        calculated_price: Float
        tax_class_id: Int
        product_tax_code: String
        categories: [${NODE_TYPES.Category}] @link(by: "bigcommerce_id")
        brand_id: Int
        inventory_level: Int
        inventory_warning_level: Int
        inventory_tracking: String
        fixed_cost_shipping_price: Float
        is_free_shipping: Boolean
        is_visible: Boolean
        is_featured: Boolean
        related_products: [Int]
        warranty: String
        bin_picking_number: String
        layout_file: String
        upc: String
        search_keywords: String
        availability: String
        availability_description: String
        gift_wrapping_options_type: String
        gift_wrapping_options_list: [Int]
        sort_order: Int
        condition: String
        is_condition_shown: Boolean
        order_quantity_minimum: Int
        order_quantity_maximum: Int
        page_title: String
        meta_keywords: [String]
        meta_description: String
        view_count: Int
        preorder_release_date: Date @dateformat
        preorder_message: String
        is_preorder_only: Boolean
        is_price_hidden: Boolean
        price_hidden_label: String
        custom_url: CustomURL
        open_graph_type: String
        open_graph_title: String
        open_graph_description: String
        open_graph_use_meta_description: Boolean
        open_graph_use_product_name: Boolean
        open_graph_use_image: Boolean
        gtin: String
        mpn: String
        reviews_rating_sum: Int
        reviews_count: Int
        total_sold: Int
        custom_fields: [ProductCustomField]
        bulk_pricing_rules: [ProductBulkPricingRule]
        images: [ProductImage]!
        videos: [ProductVideo]
        date_created: Date @dateformat
        date_modified: Date @dateformat
        base_variant_id: Int
        options: [ProductOption]
        modifiers: [ProductModifier]
        variants: [ProductVariant]!
      }

      type ProductImage {
        image_file: String
        is_thumbnail: Boolean
        sort_order: Int
        description: String
        image_url: String
        image_local_file: File @link
        id: Int
        product_id: Int
        url_standard: String
        url_thumbnail: String
        url_tiny: String
        url_zoom: String
        local_file_standard: File @link
        local_file_thumbnail: File @link
        local_file_tiny: File @link
        local_file_zoom: File @link
        date_modified: Date
      }

      type ProductVariant {
        id: Int
        product_id: Int
        sku: String
        sku_id: Int
        price: Float
        cost_price: Float
        sale_price: Float
        retail_price: Float
        weight: Float
        width: Float
        height: Float
        depth: Float
        is_free_shipping: Boolean
        fixed_cost_shipping_price: Float
        purchasing_disabled: Boolean
        purchasing_disabled_message: String
        image_url: String
        image_local_file: File @link
        inventory_level: Int
        inventory_warning_level: Int
        bin_picking_number: String
        upc: String
        mpn: String
        gtin: String
        option_values: [ProductVariantOptionValue]
        calculated_price: Float
        calculated_weight: Float
      }

      type ProductVariantOptionValue {
        id: Int
        label: String
        option_id: Int
        option_display_name: String
      }

      type ProductModifier {
        id: Int
        product_id: Int
        type: String
        name: String
        display_name: String
        required: Boolean
        sort_order: Int
        option_set_id: Int
        option_set_display: String
        config: ProductModifierConfig
        option_values: [ProductModifierOptionValue]
      }

      type ProductModifierOptionValue {
        id: Int
        option_id: Int
        is_default: Boolean
        label: String
        sort_order: Int
        value_data: OptionValueData
        adjusters: ProductModifierOptionValueAdjuster
      }

      type ProductModifierOptionValueAdjuster {
        price: Adjuster
        weight: Adjuster
        image_url: String
        purchasing_disabled: PurchasingDisabled
      }

      type ProductModifierConfig {
        default_value: String
        checked_by_default: Boolean
        checkbox_label: String
        date_limited: Boolean
        date_limit_mode: String
        date_earliest_value: Date
        date_latest_value: Date
        file_types_mode: String
        file_types_supported: [String]
        file_types_other: [String]
        file_max_size: Int
        text_characters_limited: Boolean
        text_min_length: Int
        text_max_length: Int
        text_lines_limited: Boolean
        text_max_lines: Int
        number_limited: Boolean
        number_limit_mode: String
        number_lowest_value: Float
        number_highest_value: Float
        number_integers_only: Boolean
        product_list_adjusts_inventory: Boolean
        product_list_adjusts_pricing: Boolean
        product_list_shipping_calc: String
      }

      type ProductOption {
        id: Int
        product_id: Int
        display_name: String
        type: String
        sort_order: Int
        image_url: String
        image_local_file: File @link
        name: String
        config: OptionConfig
        option_values: [OptionValue]
      }

      type ProductVideo {
        id: Int
        title: String
        description: String
        sort_order: Int
        type: String
        video_id: String
        product_id: Int
        length: String
      }

      type OptionConfig {
        default_value: String
        checked_by_default: Boolean
        checkbox_label: String
        date_limited: Boolean
        date_limit_mode: String
        date_earliest_value: Date @dateformat
        date_latest_value: Date @dateformat
        file_types_mode: String
        file_types_supported: [String]
        file_types_other: [String]
        file_max_size: Int
        text_characters_limited: Boolean
        text_min_length: Int
        text_max_length: Int
        text_lines_limited: Boolean
        text_max_lines: Int
        number_limited: Boolean
        number_limit_mode: String
        number_lowest_value: Float
        number_highest_value: Float
        number_integers_only: Boolean
        product_list_adjusts_inventory: Boolean
        product_list_adjusts_pricing: Boolean
        product_list_shipping_calc: String
      }

      type OptionValue {
        id: Int
        is_default: Boolean
        label: String
        sort_order: Int
        value_data: OptionValueData
      }

      type OptionValueData {
        colors: [String]
        image_url: String
        product_id: Int
        checked_value: Boolean
      }

      type Adjuster {
        adjust: String
        adjuster_value: Float
      }

      type PurchasingDisabled {
        status: Boolean
        message: String
      }

      type CustomURL {
        url: String
        is_customized: Boolean
      }

      type ProductCustomField {
        id: Int
        name: String
        value: String
      }

      type ProductBulkPricingRule {
        id: Int
        quantity_min: Int
        quantity_max: Int
        type: String
        amount: Int
      }
    `
  };

  const typeDefs = endpoints.map(endpoint => schemas[ENDPOINTS_TO_NODE_TYPES_MAP[endpoint]]);

  createTypes(typeDefs);
};

module.exports = generateCustomSchemas;
