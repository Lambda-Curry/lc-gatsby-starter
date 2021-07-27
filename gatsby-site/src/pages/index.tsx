import React from 'react';
import { Layout } from '../layout/Layout';

const Home: React.FC<{}> = () => {
  return (
    <Layout>
      <main className="sm:prose-sm md:prose">
        <h2>Getting Started</h2>
        <h3>Step 1</h3>
        <p>
          Follow the <a href="https://www.gatsbyjs.com/docs/quick-start/">Gatsby Quick Start Guide</a> to generate your
          initial Gatsby project.
        </p>
        <h3>Step 2</h3>
        <p>Install a bunch of packages.</p>
        <code className="block p-2 bg-gray-200 rounded whitespace-nowrap overflow-scroll">{`npm install @lambdacurry/component-library @lambdacurry/gatsby-theme @tailwindcss/typography @types/react-helmet gatsby gatsby-awesome-pagination gatsby-plugin-client-side-redirect gatsby-plugin-gatsby-cloud gatsby-plugin-image gatsby-plugin-manifest gatsby-plugin-meta-redirect gatsby-plugin-offline gatsby-plugin-postcss gatsby-plugin-react-helmet gatsby-plugin-react-svg gatsby-plugin-sass gatsby-plugin-sharp gatsby-source-filesystem gatsby-source-ghost gatsby-transformer-json gatsby-transformer-sharp react-dom react-helmet react`}</code>
        <p>or</p>
        <code className="block p-2 bg-gray-200 rounded whitespace-nowrap overflow-scroll">{`yarn add @lambdacurry/component-library @lambdacurry/gatsby-theme @tailwindcss/typography @types/react-helmet gatsby gatsby-awesome-pagination gatsby-plugin-client-side-redirect gatsby-plugin-gatsby-cloud gatsby-plugin-image gatsby-plugin-manifest gatsby-plugin-meta-redirect gatsby-plugin-offline gatsby-plugin-postcss gatsby-plugin-react-helmet gatsby-plugin-react-svg gatsby-plugin-sass gatsby-plugin-sharp gatsby-source-filesystem gatsby-source-ghost gatsby-transformer-json gatsby-transformer-sharp react-dom react-helmet react`}</code>
        <h3>Step 3</h3>
        <p>Create your `gatsby-config.js` file.</p>
        <code className="block p-2 bg-gray-200 rounded whitespace-pre-line">
          {`module.exports = {
          plugins: ['gatsby-plugin-image', '@lambdacurry/gatsby-theme']
          };`}
        </code>
        <h3>Step 4</h3>
        <p>
          In your <code className="p-1 bg-gray-200 rounded">./src</code> folder create the following folders:{' '}
          <code className="p-1 bg-gray-200 rounded">data</code>, <code className="p-1 bg-gray-200 rounded">images</code>
          . These will come in handy with the <code className="p-1 bg-gray-200 rounded">gatsby-source-filesystem</code>{' '}
          plugin, but will also break the build if they do not exist.
        </p>

        <h3>Step 5</h3>
        <p>
          Try running <code className="p-1 bg-gray-200 rounded">npm run develop</code> or{' '}
          <code className="p-1 bg-gray-200 rounded">yarn develop</code> to see your first page.
        </p>
      </main>
    </Layout>
  );
};

export default Home;
