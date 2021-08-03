import React from 'react';
import { Layout } from '../layout/Layout';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';

const Images: React.FC<{}> = () => {
  return (
    <Layout title="Working with Images">
      <main className="sm:prose-sm md:prose">
        <h2>Working with Images</h2>
        <h3>1. Static Images</h3>
        <p>
          <code className="block p-2 bg-gray-200 rounded whitespace-pre-line">
            {`import { StaticImage } from 'gatsby-plugin-image';
            <StaticImage src={'../images/example.png'} alt="example static image" placeholder="blurred" />`}
          </code>
          <StaticImage src={'../images/example.png'} alt="example static image" placeholder="blurred" />
        </p>
        <h3>2. Gatsby Image</h3>

        <p className="italic">
          Note: I need to dive a little deeper into the graphql data and how that works with `GatsbyImage` and
          `getImage` so I can document it here.
        </p>
      </main>
    </Layout>
  );
};

export default Images;
