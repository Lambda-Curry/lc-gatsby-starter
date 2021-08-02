import React from 'react';
import { graphql } from 'gatsby';

const Page: React.FC<{ data: any }> = ({ data }) => {
  const { page } = data.directus;

  return (
    <>
      <h1>{page.hero_title}</h1>

      {page.sections.length > 0 &&
        page.sections.map(section => {
          return <section key={section.id}>{/* ... */}</section>;
        })}
    </>
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
