import React, { FC } from 'react';
import { graphql } from 'gatsby';

export interface PageProps {
  data: {
    directus: {
      page: {
        id: number;
        url: string;
        title: string;
      };
    };
  };
}

const Page: FC<PageProps> = ({ data }) => {
  const { page } = data.directus;

  return (
    <>
      ID: {page.id}
      <br />
      URL: {page.url}
      <br />
      Title: {page.title}
      <br />
    </>
  );
};

export default Page;

export const pageQuery = graphql`
  query ($id: ID!) {
    directus {
      page: page_by_id(id: $id) {
        id
        url
        title
      }
    }
  }
`;
