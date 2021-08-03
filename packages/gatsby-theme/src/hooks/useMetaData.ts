import { useSiteMetadata } from '.';
import { MetaDataProps } from '../types';

export const useMetaData = (props: MetaDataProps) => {
  const siteMetadata = useSiteMetadata();

  const lang = props.lang || siteMetadata.lang;
  const charSet = props.charSet || siteMetadata.charSet;
  const favicon = props.favicon || siteMetadata.favicon;
  const titleTemplate = props.titleTemplate || siteMetadata.titleTemplate;
  const baseBodyClassName = props.baseBodyClassName || siteMetadata.baseBodyClassName;

  const title = props.title || siteMetadata.title;
  const description = props.description || siteMetadata.description;
  const author = props.author || siteMetadata.author;

  const ogImage = props.ogImage || props.image || siteMetadata.ogImage || siteMetadata.image;
  const ogTitle = props.ogTitle || props.title || siteMetadata.ogTitle || siteMetadata.title;
  const ogDescription =
    props.ogDescription || props.description || siteMetadata.ogDescription || siteMetadata.description;

  const twitterHandle = props.twitterHandle || siteMetadata.twitterHandle;
  const twitterSite = props.twitterSite || siteMetadata.twitterSite || twitterHandle;
  const twitterCreator = props.twitterCreator || siteMetadata.twitterCreator || twitterHandle;
  const twitterImage = props.twitterImage || props.image || siteMetadata.twitterImage || siteMetadata.image;
  const twitterTitle = props.twitterTitle || props.title || siteMetadata.twitterTitle || siteMetadata.title;
  const twitterDescription =
    props.twitterDescription || props.description || siteMetadata.twitterDescription || siteMetadata.description;

  return {
    lang,
    charSet,
    favicon,
    titleTemplate,
    baseBodyClassName,
    title,
    description,
    author,
    ogImage,
    ogTitle,
    ogDescription,
    twitterSite,
    twitterCreator,
    twitterImage,
    twitterTitle,
    twitterDescription
  };
};
