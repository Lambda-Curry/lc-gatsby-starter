import React from 'react';
import { Link } from 'gatsby';
import './navigation.scss';

export const Navigation: React.FC<{}> = () => {
  return (
    <nav className="sm:prose-sm md:prose navigation">
      <h1>Lambda Curry Gatsby Starter</h1>
      <ul>
        <li>
          <Link to="/">Getting Started</Link>
        </li>
        <li>
          <Link to="/pages">Ways to Create Pages</Link>
        </li>
        <li>
          <Link to="/images">Working with Images</Link>
        </li>
      </ul>
    </nav>
  );
};
