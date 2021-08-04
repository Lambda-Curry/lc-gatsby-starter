import React, { FC } from 'react';
import { MetaData } from '@lambdacurry/gatsby-theme/src/components';
import { Navigation } from './Navigation/Navigation';

import './layout.scss';

interface LayoutProps {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title }) => (
  <div className="layout">
    <MetaData title={title} />
    <Navigation />
    <main className="layout-content sm:prose-sm md:prose">
      <h2>{title}</h2>
      {children}
    </main>
  </div>
);
