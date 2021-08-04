import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../layout/Layout';

export interface PageProps {
  data: {
    directus: {
      page: {
        id: number;
        hero_title: string;
        sections: Array<{ id: number }>;
      };
    };
  };
}

const Page: FC<PageProps> = ({ data }) => {
  const { page } = data.directus;

  return (
    <Layout title={page.hero_title}>
      {page.sections.length > 0 &&
        page.sections.map(section => {
          return <section key={section.id}>{/* ... */}</section>;
        })}
    </Layout>
  );
};

export default Page;

export const pageQuery = graphql`
  query ($id: ID!) {
    directus {
      page: page_by_id(id: $id) {
        id
        hero_title
        sections {
          id
        }
      }
    }
  }
`;
