import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { BigCommerceProduct, BigCommerceCategory } from '../types/bigcommerce';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Layout } from '../layout/Layout';

export interface PageProps {
  data: {
    allBigCommerceProduct: {
      products: BigCommerceProduct[];
    };
  };
}

const Products: FC<PageProps> = ({ data }) => {
  const { products } = data.allBigCommerceProduct;

  return (
    <Layout title="Products">
      <h1>Products Page</h1>

      <h2>Products</h2>
      {products.map(product => {
        const gatsbyImageData = getImage(product.images[0].local_file_standard);

        return (
          <div key={product.bigcommerce_id} className="rounded-lg p-8 border border-gray-light">
            {gatsbyImageData && <GatsbyImage image={gatsbyImageData} alt={product.description} />}
            <h2>{product.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
          </div>
        );
      })}
    </Layout>
  );
};

export default Products;

export const pageQuery = graphql`
  query ProductsQuery {
    allBigCommerceProduct {
      products: nodes {
        ...BigCommerceProductFields
      }
    }
  }
`;
