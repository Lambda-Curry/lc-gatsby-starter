import React from 'react';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation/Navigation';
import './layout.scss';

interface LayoutProps {
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title = 'Lambda Curry Gatsby Starter' }) => {
  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content="Documentation site for Lambda Curry's Gatsby Starter" />
      </Helmet>
      <Navigation />
      <div className="layout-content">{children}</div>
    </div>
  );
};
