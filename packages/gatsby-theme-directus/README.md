# Gatsby Theme - Directus
## 🚀 Quick start

1.  **Install the theme.**

    Install the theme via `npm` or `yarn`.

    ```shell
    npm install @lambdacurry/gatsby-theme-directus

    # or

    yarn add @lambdacurry/gatsby-theme-directus
    ```

2.  **Add the theme to your `gatsby-config.js`**

    Add the theme to the `plugins` array with the appropriate options.

    _Note: All options are **required**. If you do not provide a page template, no pages will be created._

    ```js
    module.exports = {
      plugins: [
        // ...other plugins
        {
          resolve: `@lambdacurry/gatsby-theme-directus`,
          options: {
            url: `https://cms.example.com`, // Replace w/ the url for your hosted Directus instance
            authToken: `myAuthTokenExample`, // Replace w/ your Directus auth token
            templatePaths: {
              page: `${__dirname}/src/templates/page.tsx`
            }
          }
        }
      ]
    };
    ```

3.  **Create the page template.**

    Create a page template at the path you provided in the plugin options (i.e., `src/templates/page.tsx`).

    ```tsx
    import React from `react`;
    import { graphql } from `gatsby`;
    import { Layout } from `../components/Layout`;

    const Page: React.FC<{ data: any }> = ({ data }) => {
      const { page } = data.directus;

      return (
        <Layout>
          <h1>{page.title}</h1>

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
            title
            sections {
              id
            }
          }
        }
      }
    `;
    ```

4.  **Run your site and start customizing!**

    Run your site using `yarn develop`.

    Your site should now be running at http://localhost:8000!

    Edit your page template to see your site update in real-time!
