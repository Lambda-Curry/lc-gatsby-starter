export interface MetadataProps {
  lang?: string;
  charSet?: string;
  favicon?: string;

  title?: string;
  defaultTitle?: string;
  titleTemplate?: string;
  description?: string;
  author?: string;
  image?: string;

  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;

  twitterImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterHandle?: string;

  baseBodyClassName?: string;
  bodyClassName?: string;
}

export interface SiteMetadata extends Omit<MetadataProps, 'bodyClassName'> {
  siteUrl?: string;
  postsPerPage?: number;
}
