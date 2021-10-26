import { ImageDataLike } from 'gatsby-plugin-image';

export interface BigCommerceImage {
  id: number;
  description: string;
  sort_order: number;
  date_modified: string;
  product_id: number;
  image_file: string;
  image_url: string;
  image_local_file: ImageDataLike;
  is_thumbnail: boolean;
  url_standard: string;
  url_thumbnail: string;
  url_tiny: string;
  url_zoom: string;
  local_file_standard: ImageDataLike;
  local_file_thumbnail: ImageDataLike;
  local_file_tiny: ImageDataLike;
  local_file_zoom: ImageDataLike;
}

export interface BigCommerceProduct {
  bigcommerce_id: number;
  name: string;
  description: string;
  sort_order: number;
  date_created: string;
  date_modified: string;
  price: number;
  images: BigCommerceImage[];
}

export interface BigCommerceCategory {
  bigcommerce_id: number;
  name: string;
  description: string;
  sort_order: number;
  date_modified: string;
}
