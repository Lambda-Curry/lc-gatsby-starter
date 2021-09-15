import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../layout/Layout';

export interface PageProps {
  data: {
    directus: {
      page: {
        id: number;
        title: string;
        sections: Array<{ id: number }>;
      };
    };
  };
}

const Product: FC<PageProps> = ({ data }) => {
  const { page } = data.directus;

  return (
    <Layout title={page.title}>
      {page.sections.length > 0 &&
        page.sections.map(section => {
          return <section key={section.id}>{/* ... */}</section>;
        })}
    </Layout>
  );
};

export default Product;

export const pageQuery = graphql`
  query ($id: ID!) {
    directus {
      page: page_by_id(id: $id) {
        id
        title
        sections {
          id
        }
      }
    }
  }
`;
