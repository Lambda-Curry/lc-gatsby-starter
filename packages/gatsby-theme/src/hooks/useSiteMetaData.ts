import { useStaticQuery, graphql } from 'gatsby';
import { SiteMetadata } from '../types';

export const useSiteMetadata = (): SiteMetadata => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            lang
            charSet
            favicon
            titleTemplate
            defaultTitle
            baseBodyClassName

            title
            description
            author
            image

            ogImage
            ogTitle
            ogDescription

            twitterHandle
            twitterSite
            twitterCreator
            twitterImage
            twitterTitle
            twitterDescription

            siteUrl
            postsPerPage
          }
        }
      }
    `
  );

  return site.siteMetadata;
};
