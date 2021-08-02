import React from 'react';
import { graphql } from 'gatsby';

const Page: React.FC<{ data: any }> = ({ data }) => {
  const { page } = data.directus;

  return (
    <>
      <h1>{page.title}</h1>

      {page.sections.length > 0 &&
        page.sections.map((section, index) => {
          return <section key={index}>{/* ... */}</section>;
        })}
    </>
  );
};

export default Page;

export const pageQuery = graphql`
  query ($id: ID!) {
    directus {
      page: page_by_id(id: $id) {
        ...PageFields
      }
    }
  }
`;
