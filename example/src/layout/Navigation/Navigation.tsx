import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import './navigation.scss';

export interface NavigationData {
  dataJson: {
    navigation: { link: string; title: string }[];
  };
}

const query = graphql`
  query NavigationData {
    dataJson {
      navigation {
        link
        title
      }
    }
  }
`;

export const Navigation: React.FC<{}> = () => {
  const {
    dataJson: { navigation }
  } = useStaticQuery(query);

  return (
    <nav className="sm:prose-sm md:prose navigation">
      <h1>Lambda Curry Gatsby Starter</h1>
      <ul>
        {navigation.map(({ link, title }) => (
          <li key={title}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
