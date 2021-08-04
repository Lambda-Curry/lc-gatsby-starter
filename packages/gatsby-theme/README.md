# Gatsby Theme

## Install the theme

Install the theme via `npm` or `yarn`.

```shell
npm install @lambdacurry/gatsby-theme

# or

yarn add @lambdacurry/gatsby-theme
```

## Configure the theme options

You can modify the `siteMetadata` and `manifest` options. The have the following defaults:

```js
const defaultSiteConfig = {
    siteMetaData: {
    lang: 'en',
    charSet: 'utf-8',
    siteUrl: 'http://localhost:8000',
    title: '',
    description:
        'Customized by Lambda Curry - Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'Lambda Curry',
    titleTemplate: '% | LC Gatsby Starter',
    defaultTitle: 'LC Gatsby Starter',
    baseBodyClassName: '',
    image: '',
    ogImage: '',
    ogTitle: '',
    ogDescription: '',
    twitterSite: '',
    twitterCreator: '',
    twitterHandle: '',
    twitterImage: '',
    twitterTitle: '',
    twitterDescription: '',
    favicon: `${__dirname}/../src/images/gatsby-icon.png`,
    postsPerPage: 12
    },
    manifest: {
    icon: `${__dirname}/../src/images/gatsby-icon.png`,
    name: 'LC Gatsby Starter',
    short_name: 'LC Gatsby Starter',
    start_url: '/',
    theme_color: '#15171a',
    background_color: '#e9e9e9',
    display: `minimal-ui`
    }
};
```

## Use the `MetaData` component

To use the `MetaData` component, add it to your own layout component, and override any of the site meta data options by passing them directly as props.

```tsx
import React, { FC } from 'react';
import { MetaData } from '@lambdacurry/gatsby-theme/src/components';

export const Layout: FC<{ title: string }> = ({ children, title }) => (
  <div className="layout">
    <MetaData title={title} />

    <main>
      <h2>{title}</h2>
      {children}
    </main>
  </div>
);
```
