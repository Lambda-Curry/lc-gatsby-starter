import React from 'react';
import { Layout } from '../layout/Layout';

const Pages: React.FC<{}> = () => {
  return (
    <Layout>
      <main className="sm:prose-sm md:prose">
        <h2>Ways to Create Pages</h2>
        <h3>1. gatsby-plugin-page-creator</h3>
        <p>
          In your <code className="p-1 bg-gray-200 rounded">./src/pages</code> directory create files that are named to
          match their expected route. (<code className="p-1 bg-gray-200 rounded">index.tsx</code> will create a root
          home page.)
        </p>
        <h3>2. gatsby-node.js</h3>
        <p>
          <code className="block p-2 bg-gray-200 rounded whitespace-pre-line">
            {`exports.createPages = async ({ graphql, actions, reporter }) => {
              const { createPage, createRedirect } = actions;`}
          </code>
        </p>
        <p>
          You can utilize the <code className="p-1 bg-gray-200 rounded">createPages</code> function to generate pages
          from GraphQL queries or other data sources. Data can be paginated utilizing{' '}
          <code className="p-1 bg-gray-200 rounded">{`const { paginate } = require('gatsby-awesome-pagination');`}</code>
          .
        </p>
        <p className="italic">
          Note: It would be nice if we created helpers for Ghost/Directus sources that could be imported and used in the
          createPages function and documented here.
        </p>
      </main>
    </Layout>
  );
};

export default Pages;
