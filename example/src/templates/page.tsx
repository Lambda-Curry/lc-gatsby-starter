import React from `react`;
import { graphql } from `gatsby`;
import { Layout } from `../components/Layout`;

const selectSections = (data: any) =>
  data.directus.page.sections.map(({ item, collection }) => ({ ...item, collection }));

const Page: React.FC<{ data: any }> = ({ data }) => {
  const { page } = data.directus;

  return (
    <Layout>
      <h1>{page.title}</h1>

      {page.sections.length > 0 &&
        page.sections.map((section, index) => {
          return <section>{/* ... */}</section>;
        })}
    </Layout>
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
