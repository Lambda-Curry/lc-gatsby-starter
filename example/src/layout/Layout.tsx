import React from 'react';
import { MetaData } from '@lambdacurry/gatsby-theme/src/components';
import { Navigation } from './Navigation/Navigation';

import './layout.scss';

interface LayoutProps {
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <MetaData />
      <Navigation />
      <div className="layout-content">{children}</div>
    </div>
  );
};
